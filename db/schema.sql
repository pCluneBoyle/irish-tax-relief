-- Tax Relief Finder Ireland — Database Schema
-- Compatible with PostgreSQL / Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tax profiles
CREATE TABLE tax_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  paye_worker BOOLEAN DEFAULT TRUE,
  student_status BOOLEAN DEFAULT FALSE,
  tax_years INTEGER[] DEFAULT '{}',
  employment_changes BOOLEAN DEFAULT FALSE,
  emergency_tax_possible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz answers (one row per question per user per tax year)
CREATE TABLE quiz_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  answer_value TEXT NOT NULL,
  tax_year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_key, tax_year)
);

-- Reliefs (seeded)
CREATE TABLE reliefs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  eligibility_rules JSONB DEFAULT '[]',
  proof_required JSONB DEFAULT '[]',
  revenue_section TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'complex')),
  estimation_method TEXT CHECK (estimation_method IN ('percentage', 'fixed', 'range')),
  estimation_rate NUMERIC,
  estimation_min NUMERIC,
  estimation_max NUMERIC
);

-- User relief results
CREATE TABLE user_relief_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relief_id TEXT NOT NULL REFERENCES reliefs(id),
  tax_year INTEGER NOT NULL,
  eligible_status TEXT CHECK (eligible_status IN ('eligible', 'possible', 'check')),
  estimated_refund_min NUMERIC DEFAULT 0,
  estimated_refund_max NUMERIC DEFAULT 0,
  confidence TEXT CHECK (confidence IN ('high', 'medium', 'check')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, relief_id, tax_year)
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN (
    'medical-receipts', 'dental-receipts', 'rent-proof',
    'tuition-receipts', 'payslips', 'employment-details',
    'utility-bills', 'other'
  )),
  tax_year INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'missing', 'needs-review')),
  size_bytes INTEGER
);

-- Checklist items
CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relief_id TEXT REFERENCES reliefs(id),
  tax_year INTEGER,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_quiz_answers_user ON quiz_answers(user_id);
CREATE INDEX idx_results_user ON user_relief_results(user_id);
CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_checklist_user ON checklist_items(user_id);
