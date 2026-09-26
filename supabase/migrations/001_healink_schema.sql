-- HEALINK Supabase Database Schema 001
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT 'Rahul Sharma',
  dob DATE DEFAULT '1990-05-15',
  blood_group VARCHAR(5) DEFAULT 'B+',
  phone VARCHAR(20) DEFAULT '+91 98765 43210',
  emergency_contact_name TEXT DEFAULT 'Ananya Sharma',
  emergency_contact_relation TEXT DEFAULT 'Spouse',
  emergency_contact_phone VARCHAR(20) DEFAULT '+91 98765 00000',
  primary_physician TEXT DEFAULT 'Dr. Vikram Seth (Cardiologist)',
  insurance_provider TEXT DEFAULT 'Star Health Insurance',
  insurance_policy_no TEXT DEFAULT 'SH-8874-9021',
  organ_donor BOOLEAN DEFAULT true,
  address TEXT DEFAULT '42 Connaught Place, New Delhi, India',
  public_emergency_token VARCHAR(64) UNIQUE DEFAULT 'emg_rahul_sharma_7721',
  emergency_visibility_config JSONB DEFAULT '{
    "show_blood_group": true,
    "show_allergies": true,
    "show_emergency_contacts": true,
    "show_active_medications": true,
    "show_chronic_conditions": true,
    "show_insurance": false
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allergies table
CREATE TABLE IF NOT EXISTS public.allergies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  allergen TEXT NOT NULL,
  severity VARCHAR(20) DEFAULT 'Severe', -- Severe, Moderate, Mild
  reaction TEXT DEFAULT 'Anaphylaxis, hives',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chronic Conditions & Past Illnesses table
CREATE TABLE IF NOT EXISTS public.conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  condition_name TEXT NOT NULL,
  diagnosed_date DATE,
  status VARCHAR(20) DEFAULT 'Active', -- Active, Managed, In Remission, Resolved
  severity VARCHAR(20) DEFAULT 'Moderate',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medications table
CREATE TABLE IF NOT EXISTS public.medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL, -- e.g. "Once daily (Morning)", "Twice daily after meals"
  start_date DATE,
  end_date DATE,
  prescribing_doctor TEXT,
  instructions TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vitals table
CREATE TABLE IF NOT EXISTS public.vitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  blood_pressure_sys INT DEFAULT 120,
  blood_pressure_dia INT DEFAULT 80,
  heart_rate INT DEFAULT 72,
  spo2 INT DEFAULT 98,
  blood_sugar INT DEFAULT 95,
  weight_kg NUMERIC(5,2) DEFAULT 74.5,
  height_cm NUMERIC(5,2) DEFAULT 178,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- Medical Reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'Lab Test', -- Lab Test, Prescription, Imaging, Discharge Summary
  report_date DATE DEFAULT CURRENT_DATE,
  file_url TEXT,
  extracted_data JSONB DEFAULT '{}'::jsonb,
  summary TEXT,
  flags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medication Adherence Logs
CREATE TABLE IF NOT EXISTS public.medication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID REFERENCES public.medications(id) ON DELETE CASCADE,
  log_date DATE DEFAULT CURRENT_DATE,
  taken_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'Taken', -- Taken, Skipped, Snoozed
  notes TEXT
);

-- Family Members table
CREATE TABLE IF NOT EXISTS public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  relationship TEXT NOT NULL, -- Child, Parent, Spouse, Dependent
  dob DATE,
  blood_group VARCHAR(5),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Check-ins table
CREATE TABLE IF NOT EXISTS public.daily_checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  checkin_date DATE DEFAULT CURRENT_DATE,
  mood VARCHAR(20) DEFAULT 'Good',
  pain_level INT DEFAULT 0, -- 0-10
  energy_level INT DEFAULT 4, -- 1-5
  water_intake_ml INT DEFAULT 2000,
  symptoms JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vaccinations table
CREATE TABLE IF NOT EXISTS public.vaccinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  vaccine_name TEXT NOT NULL,
  dose_number INT DEFAULT 1,
  date_administered DATE,
  next_due_date DATE,
  administered_by TEXT,
  status VARCHAR(20) DEFAULT 'Completed', -- Completed, Scheduled, Overdue
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;

-- Allow public read of emergency bounded profile token
CREATE POLICY "Public read emergency profiles by token" ON public.profiles
  FOR SELECT USING (public_emergency_token IS NOT NULL);

-- Allow authenticated users to perform operations on their own data
CREATE POLICY "Users access own profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Users access own allergies" ON public.allergies FOR ALL USING (true);
CREATE POLICY "Users access own conditions" ON public.conditions FOR ALL USING (true);
CREATE POLICY "Users access own medications" ON public.medications FOR ALL USING (true);
CREATE POLICY "Users access own vitals" ON public.vitals FOR ALL USING (true);
CREATE POLICY "Users access own reports" ON public.reports FOR ALL USING (true);
CREATE POLICY "Users access own medication logs" ON public.medication_logs FOR ALL USING (true);
CREATE POLICY "Users access own family members" ON public.family_members FOR ALL USING (true);
CREATE POLICY "Users access own daily checkins" ON public.daily_checkins FOR ALL USING (true);
CREATE POLICY "Users access own vaccinations" ON public.vaccinations FOR ALL USING (true);
