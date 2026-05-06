export type ConfidenceLevel = 'high' | 'medium' | 'check';
export type DifficultyLevel = 'easy' | 'medium' | 'complex';
export type DocumentStatus = 'uploaded' | 'missing' | 'needs-review';
export type DocumentCategory =
  | 'medical-receipts'
  | 'dental-receipts'
  | 'rent-proof'
  | 'tuition-receipts'
  | 'payslips'
  | 'employment-details'
  | 'utility-bills'
  | 'other';

export type EligibleStatus = 'eligible' | 'possible' | 'check';

export interface Relief {
  id: string;
  name: string;
  description: string;
  eligibilityRules: string[];
  proofRequired: string[];
  revenueSection: string;
  difficulty: DifficultyLevel;
  estimationMethod: 'percentage' | 'fixed' | 'range';
  estimationRate?: number;
  estimationMin?: number;
  estimationMax?: number;
}

export interface QuizAnswers {
  isPAYE?: boolean;
  taxYears?: number[];
  rents?: boolean;
  rentAmount?: number;
  medicalExpenses?: boolean;
  medicalAmount?: number;
  dentalExpenses?: boolean;
  dentalAmount?: number;
  tuitionFees?: boolean;
  tuitionAmount?: number;
  workedFromHome?: boolean;
  wfhDays?: number;
  wfhCosts?: number;
  changedJobs?: boolean;
  emergencyTax?: boolean;
  multipleJobs?: boolean;
  uniformTools?: boolean;
  pensionContributions?: boolean;
  pensionAmount?: number;
  wasStudent?: boolean;
}

export interface ReliefResult {
  reliefId: string;
  reliefName: string;
  taxYear: number;
  eligibleStatus: EligibleStatus;
  estimatedRefundMin: number;
  estimatedRefundMax: number;
  confidence: ConfidenceLevel;
  proofNeeded: string[];
  revenueSection: string;
  difficulty: DifficultyLevel;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  taxYear: number;
  uploadedAt: string;
  status: DocumentStatus;
  size?: number;
}

export interface ChecklistItem {
  id: string;
  reliefId: string;
  reliefName: string;
  taxYear: number;
  steps: string[];
  proofNeeded: string[];
  amountToEnter?: string;
  revenueSection: string;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  employmentType: string;
  isStudent: boolean;
  taxYearsChecked: number[];
  reminderEnabled: boolean;
  reminderMonth?: number;
}
