import type { QuizAnswers, ReliefResult, ConfidenceLevel, EligibleStatus } from './types';
import { getReliefById } from './reliefs';

function makeResult(
  reliefId: string,
  taxYear: number,
  eligibleStatus: EligibleStatus,
  confidence: ConfidenceLevel,
  estimatedMin: number,
  estimatedMax: number,
  notes?: string
): ReliefResult {
  const relief = getReliefById(reliefId)!;
  return {
    reliefId,
    reliefName: relief.name,
    taxYear,
    eligibleStatus,
    estimatedRefundMin: Math.round(estimatedMin),
    estimatedRefundMax: Math.round(estimatedMax),
    confidence,
    proofNeeded: relief.proofRequired,
    revenueSection: relief.revenueSection,
    difficulty: relief.difficulty,
    notes,
  };
}

export function computeResults(answers: QuizAnswers): ReliefResult[] {
  const results: ReliefResult[] = [];
  const years = answers.taxYears ?? [2024];

  for (const year of years) {
    // Rent Tax Credit
    if (answers.rents) {
      const rent = answers.rentAmount ?? 0;
      const creditMax = 1000;
      const estimated = Math.min(rent * 0.20, creditMax);
      results.push(
        makeResult(
          'rent-tax-credit',
          year,
          'eligible',
          'high',
          Math.max(0, estimated * 0.7),
          Math.min(estimated, creditMax),
          'Based on 20% of rent paid, capped at €1,000 per year.'
        )
      );
    }

    // Medical Expenses
    if (answers.medicalExpenses && (answers.medicalAmount ?? 0) > 0) {
      const amount = answers.medicalAmount ?? 0;
      const relief = amount * 0.2;
      results.push(
        makeResult(
          'health-expenses',
          year,
          'eligible',
          'high',
          relief * 0.8,
          relief,
          'Estimated at 20% of qualifying medical expenses. Routine checkups excluded.'
        )
      );
    }

    // Dental Expenses
    if (answers.dentalExpenses && (answers.dentalAmount ?? 0) > 0) {
      const amount = answers.dentalAmount ?? 0;
      const relief = amount * 0.2;
      results.push(
        makeResult(
          'dental-expenses',
          year,
          'eligible',
          'medium',
          relief * 0.7,
          relief,
          'Only non-routine treatment qualifies. Dentist must sign Form Med 2.'
        )
      );
    }

    // Tuition Fees
    if (answers.tuitionFees && (answers.tuitionAmount ?? 0) > 3000) {
      const amount = answers.tuitionAmount ?? 0;
      const qualifying = amount - 3000;
      const relief = qualifying * 0.2;
      results.push(
        makeResult(
          'tuition-fees',
          year,
          'eligible',
          'medium',
          relief * 0.8,
          relief,
          'First €3,000 of fees is disregarded. Relief at 20% on the remainder.'
        )
      );
    } else if (answers.tuitionFees) {
      results.push(
        makeResult(
          'tuition-fees',
          year,
          'check',
          'check',
          0,
          0,
          'Fees must exceed €3,000 for full-time (€1,500 for part-time) before relief applies.'
        )
      );
    }

    // Remote Working Relief
    if (answers.workedFromHome) {
      const days = answers.wfhDays ?? 100;
      const costs = answers.wfhCosts ?? 2500;
      const workingYear = 235;
      const proportion = Math.min(days / workingYear, 1);
      const qualifyingCosts = costs * proportion;
      const relief = qualifyingCosts * 0.3;
      results.push(
        makeResult(
          'remote-working',
          year,
          'possible',
          'medium',
          relief * 0.7,
          relief,
          'Estimated at 30% of your proportional utility costs based on WFH days.'
        )
      );
    }

    // Emergency Tax / Job Change
    if (answers.emergencyTax || answers.changedJobs || answers.multipleJobs) {
      results.push(
        makeResult(
          'emergency-tax-refund',
          year,
          'check',
          'check',
          200,
          1500,
          'Check your payslips and Employment Detail Summary on Revenue myAccount to confirm overpayment.'
        )
      );
    }

    // Flat-Rate Expenses
    if (answers.uniformTools) {
      results.push(
        makeResult(
          'flat-rate-expenses',
          year,
          'possible',
          'medium',
          40,
          400,
          'Amount depends on your occupation. Revenue has fixed amounts for different roles.'
        )
      );
    }

    // Pension Contributions
    if (answers.pensionContributions && (answers.pensionAmount ?? 0) > 0) {
      const amount = answers.pensionAmount ?? 0;
      const relief = amount * 0.2;
      results.push(
        makeResult(
          'pension-contributions',
          year,
          'possible',
          'medium',
          relief * 0.8,
          relief,
          'Relief at 20% (or 40% if higher rate taxpayer). Subject to age-related limits.'
        )
      );
    }
  }

  return results;
}

export function totalRefundRange(results: ReliefResult[]): { min: number; max: number } {
  const uniqueYearRelief = new Map<string, ReliefResult>();
  for (const r of results) {
    const key = `${r.reliefId}-${r.taxYear}`;
    if (!uniqueYearRelief.has(key)) uniqueYearRelief.set(key, r);
  }
  const items = Array.from(uniqueYearRelief.values());
  return {
    min: items.reduce((sum, r) => sum + r.estimatedRefundMin, 0),
    max: items.reduce((sum, r) => sum + r.estimatedRefundMax, 0),
  };
}
