import type { QuizAnswers } from './types';

export interface QuizQuestion {
  id: keyof QuizAnswers;
  question: string;
  hint?: string;
  type: 'boolean' | 'number' | 'multiselect' | 'currency';
  options?: { value: string | number; label: string }[];
  condition?: (answers: QuizAnswers) => boolean;
  followUpOf?: keyof QuizAnswers;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

export const CURRENT_YEAR = 2024;
export const TAX_YEARS = [2024, 2023, 2022, 2021, 2020];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'isPAYE',
    question: 'Are you a PAYE worker (employed and taxed through payroll)?',
    hint: 'This tool is designed for PAYE employees. Self-employed users have different requirements.',
    type: 'boolean',
  },
  {
    id: 'taxYears',
    question: 'Which tax years would you like to check?',
    hint: 'You can claim for the current year and up to 4 previous years.',
    type: 'multiselect',
    options: TAX_YEARS.map((y) => ({ value: y, label: `${y}` })),
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'rents',
    question: 'Do you rent private accommodation (not social housing)?',
    hint: 'The Rent Tax Credit is worth up to €1,000 per year for eligible renters.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'rentAmount',
    question: 'How much rent did you pay in total per year?',
    hint: 'Enter the approximate annual rent amount.',
    type: 'currency',
    prefix: '€',
    placeholder: '12,000',
    condition: (a) => a.rents === true,
    followUpOf: 'rents',
  },
  {
    id: 'medicalExpenses',
    question: 'Did you pay out-of-pocket medical expenses? (GP, specialist, hospital, prescriptions)',
    hint: 'Expenses not covered by health insurance may qualify for 20% tax relief.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'medicalAmount',
    question: 'What was your total out-of-pocket medical spend?',
    hint: 'Include GP visits, specialist fees, hospital charges, and prescription costs not covered by insurance.',
    type: 'currency',
    prefix: '€',
    placeholder: '500',
    condition: (a) => a.medicalExpenses === true,
    followUpOf: 'medicalExpenses',
  },
  {
    id: 'dentalExpenses',
    question: 'Did you pay for non-routine dental treatment? (crowns, implants, orthodontics)',
    hint: 'Routine dental (fillings, extractions, cleanings) does not qualify. Non-routine treatment may get 20% relief.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'dentalAmount',
    question: 'How much did you pay for non-routine dental treatment?',
    type: 'currency',
    prefix: '€',
    placeholder: '1,200',
    condition: (a) => a.dentalExpenses === true,
    followUpOf: 'dentalExpenses',
  },
  {
    id: 'tuitionFees',
    question: 'Did you pay third-level tuition fees for yourself or a dependent?',
    hint: 'Approved college/university courses may qualify for tax relief on fees above €3,000.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'tuitionAmount',
    question: 'What were the total tuition fees paid?',
    hint: 'Enter the total fee amount. The first €3,000 is disregarded.',
    type: 'currency',
    prefix: '€',
    placeholder: '6,000',
    condition: (a) => a.tuitionFees === true,
    followUpOf: 'tuitionFees',
  },
  {
    id: 'workedFromHome',
    question: 'Did you work from home for any part of the year?',
    hint: 'You may be able to claim relief on a portion of your home utility costs.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'wfhDays',
    question: 'Approximately how many days did you work from home per year?',
    hint: 'Used to calculate your proportion of qualifying home utility costs.',
    type: 'number',
    suffix: 'days',
    placeholder: '120',
    condition: (a) => a.workedFromHome === true,
    followUpOf: 'workedFromHome',
  },
  {
    id: 'wfhCosts',
    question: 'What were your approximate annual utility costs? (electricity + heating + broadband)',
    hint: 'Add up your estimated annual electricity, heating, and broadband bills.',
    type: 'currency',
    prefix: '€',
    placeholder: '3,000',
    condition: (a) => a.workedFromHome === true,
    followUpOf: 'workedFromHome',
  },
  {
    id: 'changedJobs',
    question: 'Did you change jobs or start a new job during any of the tax years?',
    hint: 'Job changes can result in tax credit under-allocation and a potential refund.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'emergencyTax',
    question: 'Were you taxed on an emergency basis? (higher tax rate with no credits)',
    hint: 'Check your payslips — emergency tax appears as a higher deduction with no tax credits applied.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'multipleJobs',
    question: 'Did you have more than one job at the same time?',
    hint: 'Tax credits may not have been split correctly between employers.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'uniformTools',
    question: 'Did you buy uniforms, tools, or equipment required for your job?',
    hint: 'If your employer does not reimburse these costs, you may qualify for flat-rate expenses.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'pensionContributions',
    question: 'Did you make personal pension contributions not through your employer payroll?',
    hint: 'Additional voluntary contributions (AVCs) or PRSA contributions may qualify for tax relief.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
  {
    id: 'pensionAmount',
    question: 'How much did you contribute personally to pension?',
    type: 'currency',
    prefix: '€',
    placeholder: '2,000',
    condition: (a) => a.pensionContributions === true,
    followUpOf: 'pensionContributions',
  },
  {
    id: 'wasStudent',
    question: 'Were you a student during any of the tax years you want to check?',
    hint: 'Students may have overpaid tax through part-time work.',
    type: 'boolean',
    condition: (a) => a.isPAYE === true,
  },
];

export function getVisibleQuestions(answers: QuizAnswers): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => !q.condition || q.condition(answers));
}
