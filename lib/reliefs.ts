import type { Relief } from './types';

export const RELIEFS: Relief[] = [
  {
    id: 'rent-tax-credit',
    name: 'Rent Tax Credit',
    description:
      'A tax credit for tenants renting private accommodation. Worth up to €1,000 per year (€2,000 for couples).',
    eligibilityRules: ['Must be a PAYE worker', 'Must be renting private accommodation', 'Must have a valid tenancy'],
    proofRequired: ['Tenancy agreement or lease', 'Rent receipts or bank statements showing payments', 'Landlord PPSN (if available)', 'Your own PPSN'],
    revenueSection: 'PAYE Services > Review your Tax > Tax Credits & Reliefs > Rent Tax Credit',
    difficulty: 'easy',
    estimationMethod: 'range',
    estimationMin: 500,
    estimationMax: 1000,
  },
  {
    id: 'health-expenses',
    name: 'Medical Expenses Relief',
    description:
      'Tax relief at 20% on qualifying medical expenses not covered by insurance or employer.',
    eligibilityRules: ['Qualifying medical expenses incurred', 'Not reimbursed by health insurance or employer'],
    proofRequired: ['Doctor/GP receipts', 'Specialist/consultant receipts', 'Hospital receipts', 'Prescription receipts'],
    revenueSection: 'PAYE Services > Review your Tax > Tax Credits & Reliefs > Health Expenses',
    difficulty: 'easy',
    estimationMethod: 'percentage',
    estimationRate: 0.2,
  },
  {
    id: 'dental-expenses',
    name: 'Dental Expenses Relief',
    description:
      'Tax relief at 20% on qualifying non-routine dental treatment (e.g. crowns, orthodontics, implants). Routine dental is not covered.',
    eligibilityRules: ['Must be non-routine dental treatment', 'Not reimbursed by dental insurance'],
    proofRequired: ['Dentist receipts for non-routine treatment', 'Form Med 2 signed by dentist'],
    revenueSection: 'PAYE Services > Review your Tax > Tax Credits & Reliefs > Health Expenses',
    difficulty: 'easy',
    estimationMethod: 'percentage',
    estimationRate: 0.2,
  },
  {
    id: 'tuition-fees',
    name: 'Tuition Fees Relief',
    description:
      'Tax relief at 20% on qualifying third-level tuition fees. First €3,000 is disregarded (€1,500 for part-time). Relief applies to fees above that.',
    eligibilityRules: ['Approved third-level course', 'Fees paid personally (not by employer)', 'Full-time or part-time approved courses'],
    proofRequired: ['Receipt from college/institution', 'Course details and duration', 'Payment receipts'],
    revenueSection: 'PAYE Services > Review your Tax > Tax Credits & Reliefs > Tuition Fees',
    difficulty: 'medium',
    estimationMethod: 'percentage',
    estimationRate: 0.2,
  },
  {
    id: 'remote-working',
    name: 'Remote Working Relief',
    description:
      'Tax relief on a portion of home utility costs (electricity, heating, broadband) for days worked from home. Relief is 30% of qualifying costs.',
    eligibilityRules: ['Must work from home as a PAYE employee', 'Employer confirmed remote working arrangement'],
    proofRequired: ['Utility bills (electricity, gas, broadband)', 'Number of remote working days', 'Employer confirmation (if available)'],
    revenueSection: 'PAYE Services > Review your Tax > Tax Credits & Reliefs > Remote Working Relief',
    difficulty: 'medium',
    estimationMethod: 'percentage',
    estimationRate: 0.3,
  },
  {
    id: 'emergency-tax-refund',
    name: 'Emergency Tax / Job Change Refund',
    description:
      'If you were taxed on emergency basis or changed jobs, you may have overpaid tax. Revenue will refund the difference.',
    eligibilityRules: ['Were emergency taxed', 'Changed employers during the year', 'Had multiple jobs'],
    proofRequired: ['Payslips from all employers', 'P60 or Employment Detail Summary', 'Employer details and dates of employment'],
    revenueSection: 'PAYE Services > Review your Tax > Complete Income Tax Return',
    difficulty: 'medium',
    estimationMethod: 'range',
    estimationMin: 200,
    estimationMax: 1500,
  },
  {
    id: 'flat-rate-expenses',
    name: 'Flat-Rate Expenses',
    description:
      'Fixed annual tax credit for employees who buy uniforms, tools, or equipment for work. Amount varies by occupation.',
    eligibilityRules: ['Must purchase uniforms, tools, or equipment for work', 'Employer does not reimburse costs', 'Must be a PAYE worker in an eligible occupation'],
    proofRequired: ['Receipts for work-related purchases', 'Confirmation of occupation/role'],
    revenueSection: 'PAYE Services > Review your Tax > Tax Credits & Reliefs > Flat Rate Expenses',
    difficulty: 'easy',
    estimationMethod: 'range',
    estimationMin: 40,
    estimationMax: 400,
  },
  {
    id: 'pension-contributions',
    name: 'Pension Contributions Relief',
    description:
      'Tax relief on personal pension contributions at your marginal rate. Up to age-related limits.',
    eligibilityRules: ['Must have made personal pension contributions', 'Not already claimed through payroll', 'Within age-related contribution limits'],
    proofRequired: ['Pension provider statements', 'Annual pension contribution certificate'],
    revenueSection: 'PAYE Services > Review your Tax > Tax Credits & Reliefs > Pension Contributions',
    difficulty: 'medium',
    estimationMethod: 'percentage',
    estimationRate: 0.2,
  },
];

export function getReliefById(id: string): Relief | undefined {
  return RELIEFS.find((r) => r.id === id);
}
