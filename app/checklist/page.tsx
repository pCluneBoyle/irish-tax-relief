'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckSquare, Square, ExternalLink, Info, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { computeResults } from '@/lib/eligibility';
import type { QuizAnswers, ReliefResult } from '@/lib/types';

interface ChecklistEntry {
  id: string;
  reliefName: string;
  taxYear: number;
  revenueSection: string;
  proofNeeded: string[];
  estimatedMax: number;
  completed: boolean;
}

function buildChecklist(results: ReliefResult[]): ChecklistEntry[] {
  return results
    .filter((r) => r.eligibleStatus !== 'check' || r.estimatedRefundMax > 0)
    .map((r) => ({
      id: `${r.reliefId}-${r.taxYear}`,
      reliefName: r.reliefName,
      taxYear: r.taxYear,
      revenueSection: r.revenueSection,
      proofNeeded: r.proofNeeded,
      estimatedMax: r.estimatedRefundMax,
      completed: false,
    }));
}

const CLAIM_STEPS: Record<string, string[]> = {
  'rent-tax-credit': [
    'Log in to Revenue myAccount (myaccount.revenue.ie)',
    'Go to PAYE Services',
    'Select "Review your tax" for the relevant year',
    'Click "Tax Credits & Reliefs"',
    'Find and select "Rent Tax Credit"',
    'Enter the total rent paid for the year',
    'Provide landlord details if requested',
    'Submit and note your confirmation number',
  ],
  'health-expenses': [
    'Log in to Revenue myAccount',
    'Go to PAYE Services → Review your tax',
    'Select the tax year',
    'Click "Tax Credits & Reliefs"',
    'Select "Health Expenses"',
    'Enter your total qualifying medical expenses',
    'Keep all receipts for 6 years',
    'Submit the claim',
  ],
  'dental-expenses': [
    'Get Form Med 2 signed by your dentist',
    'Log in to Revenue myAccount',
    'Go to PAYE Services → Review your tax',
    'Click "Tax Credits & Reliefs" → Health Expenses',
    'Enter non-routine dental expenses',
    'Upload or reference Form Med 2',
    'Submit',
  ],
  'tuition-fees': [
    'Get a receipt from your college/institution showing fees paid',
    'Log in to Revenue myAccount',
    'Go to PAYE Services → Review your tax',
    'Click "Tax Credits & Reliefs" → Tuition Fees',
    'Enter the course name, institution, and fees paid',
    'Note: first €3,000 is disregarded',
    'Submit the claim',
  ],
  'remote-working': [
    'Gather utility bills (electricity, gas, broadband)',
    'Calculate your total annual utility spend',
    'Count your WFH days for the year',
    'Log in to Revenue myAccount',
    'Go to PAYE Services → Review your tax',
    'Click "Tax Credits & Reliefs" → Remote Working',
    'Enter utility costs and WFH days',
    'Submit',
  ],
  'emergency-tax-refund': [
    'Gather all payslips for the year',
    'Log in to Revenue myAccount',
    'Check your Employment Detail Summary',
    'Go to PAYE Services → Review your tax',
    'Complete your Income Tax Return for the year',
    'Enter income from all employments',
    'Revenue will calculate any overpayment',
    'Submit and await refund',
  ],
  'flat-rate-expenses': [
    'Check Revenue\'s flat-rate expenses list for your occupation',
    'Log in to Revenue myAccount',
    'Go to PAYE Services → Review your tax',
    'Click "Tax Credits & Reliefs" → Flat Rate Expenses',
    'Select your occupation category',
    'The credit is applied automatically',
    'Submit',
  ],
  'pension-contributions': [
    'Get annual contribution statement from your pension provider',
    'Log in to Revenue myAccount',
    'Go to PAYE Services → Review your tax',
    'Click "Tax Credits & Reliefs" → Pension Contributions',
    'Enter the amount you contributed personally',
    'Relief is applied at your marginal rate',
    'Submit',
  ],
};

function fmt(n: number) {
  return `€${Math.round(n).toLocaleString('en-IE')}`;
}

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState<ChecklistEntry[]>([]);
  const [savedChecked, setSavedChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('quiz-answers');
    const savedCheck = localStorage.getItem('checklist-checked');
    if (savedCheck) setSavedChecked(JSON.parse(savedCheck));
    if (saved) {
      const answers: QuizAnswers = JSON.parse(saved);
      const results = computeResults(answers);
      setChecklist(buildChecklist(results));
    }
  }, []);

  function toggleItem(id: string) {
    const updated = { ...savedChecked, [id]: !savedChecked[id] };
    setSavedChecked(updated);
    localStorage.setItem('checklist-checked', JSON.stringify(updated));
  }

  const total = checklist.length;
  const done = checklist.filter((c) => savedChecked[c.id]).length;

  if (checklist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No checklist yet</h2>
          <p className="text-slate-500 mb-6 text-sm">Complete the quiz first to generate your personalised claim checklist.</p>
          <Link href="/quiz"><Button>Start the quiz</Button></Link>
        </div>
      </div>
    );
  }

  const groupedByYear = checklist.reduce((acc, item) => {
    const yr = item.taxYear;
    if (!acc[yr]) acc[yr] = [];
    acc[yr].push(item);
    return acc;
  }, {} as Record<number, ChecklistEntry[]>);

  const years = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Claim Checklist</h1>
          <p className="text-slate-500 text-sm">Step-by-step instructions for each relief. Tick items off as you go.</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">{done} of {total} reliefs claimed</span>
            {done === total && (
              <Badge variant="high">All done!</Badge>
            )}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all"
              style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400">Total estimated refund: <strong className="text-emerald-700">{fmt(checklist.reduce((s, c) => s + c.estimatedMax, 0))}</strong></span>
            <Link href="/walkthrough" className="text-xs text-emerald-600 font-medium hover:underline flex items-center gap-1">
              Revenue walkthrough <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6 text-xs text-blue-700">
          These steps are guidance only. Revenue screens and options may change. Always verify steps in your myAccount.
        </div>

        {/* Checklist by year */}
        {years.map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-base font-bold text-slate-700 mb-3">Tax Year {year}</h2>
            <div className="space-y-3">
              {groupedByYear[year].map((item) => {
                const isChecked = !!savedChecked[item.id];
                const isOpen = expanded === item.id;
                const steps = CLAIM_STEPS[item.id.split('-').slice(0, -1).join('-')] ?? [];
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border transition-all shadow-sm ${isChecked ? 'border-emerald-200 opacity-75' : 'border-slate-200'}`}
                  >
                    <div className="flex items-center gap-3 p-4">
                      <button onClick={() => toggleItem(item.id)} className="shrink-0">
                        {isChecked
                          ? <CheckSquare className="w-5 h-5 text-emerald-500" />
                          : <Square className="w-5 h-5 text-slate-300 hover:text-emerald-400 transition-colors" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-semibold text-sm ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {item.reliefName}
                          </span>
                          {item.estimatedMax > 0 && (
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              up to {fmt(item.estimatedMax)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{item.revenueSection}</p>
                      </div>
                      <button
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                        className="text-xs text-emerald-600 font-medium hover:underline shrink-0"
                      >
                        {isOpen ? 'Hide' : 'How to claim'}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-4 py-4">
                        {/* Proof needed */}
                        {item.proofNeeded.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Documents you need</p>
                            <ul className="space-y-1">
                              {item.proofNeeded.map((p, i) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                  <span className="text-slate-300 mt-0.5">•</span> {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Steps */}
                        {steps.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Steps on Revenue myAccount</p>
                            <ol className="space-y-2">
                              {steps.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {i + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-6 flex gap-3">
          <Link href="/walkthrough">
            <Button>Full Revenue walkthrough</Button>
          </Link>
          <Link href="/results">
            <Button variant="outline">Back to results</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
