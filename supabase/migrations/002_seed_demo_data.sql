-- HEALINK Supabase Seed Data 002
-- Insert Demo Profile for Rahul Sharma (B+)

INSERT INTO public.profiles (
  id,
  full_name,
  dob,
  blood_group,
  phone,
  emergency_contact_name,
  emergency_contact_relation,
  emergency_contact_phone,
  primary_physician,
  insurance_provider,
  insurance_policy_no,
  organ_donor,
  address,
  public_emergency_token,
  emergency_visibility_config
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Rahul Sharma',
  '1992-08-14',
  'B+',
  '+91 98765 43210',
  'Ananya Sharma',
  'Spouse',
  '+91 98765 00000',
  'Dr. Vikram Seth (Cardiologist, Max Healthcare)',
  'Star Health Comprehensive Plan',
  'SH-8874-9021-IND',
  true,
  'Flat 402, Green Park Apartments, New Delhi 110016',
  'emg_rahul_sharma_7721',
  '{
    "show_blood_group": true,
    "show_allergies": true,
    "show_emergency_contacts": true,
    "show_active_medications": true,
    "show_chronic_conditions": true,
    "show_insurance": false
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Seed Allergies
INSERT INTO public.allergies (profile_id, allergen, severity, reaction, notes) VALUES
('a0000000-0000-0000-0000-000000000001', 'Penicillin', 'Severe', 'Anaphylactic shock, severe facial swelling & acute dyspnea', 'Strict contraindication. Carry EpiPen if available.'),
('a0000000-0000-0000-0000-000000000001', 'Peanuts & Tree Nuts', 'Moderate', 'Skin hives, mild throat tightness', 'Avoid processed food with nut traces.'),
('a0000000-0000-0000-0000-000000000001', 'Dust Mites & Pollen', 'Mild', 'Allergic rhinitis, sneezing', 'Prescribed Montelukast as needed.');

-- Seed Conditions
INSERT INTO public.conditions (profile_id, condition_name, diagnosed_date, status, severity, notes) VALUES
('a0000000-0000-0000-0000-000000000001', 'Type 2 Diabetes Mellitus', '2021-03-10', 'Active', 'Moderate', 'Managed with Metformin 500mg twice daily and low glycemic index diet.'),
('a0000000-0000-0000-0000-000000000001', 'Essential Hypertension', '2022-06-18', 'Active', 'Mild', 'Controlled with Telmisartan 40mg daily morning dose.'),
('a0000000-0000-0000-0000-000000000001', 'Asthma (Mild Exercise-Induced)', '2018-11-05', 'Managed', 'Mild', 'Uses Salbutamol Inhaler prior to intense cardio exercises.');

-- Seed Medications
INSERT INTO public.medications (profile_id, name, dosage, frequency, start_date, prescribing_doctor, instructions, active) VALUES
('a0000000-0000-0000-0000-000000000001', 'Metformin HCl', '500 mg', 'Twice daily (Breakfast & Dinner)', '2021-03-12', 'Dr. Vikram Seth', 'Take immediately after food to reduce gastrointestinal upset.', true),
('a0000000-0000-0000-0000-000000000001', 'Telmisartan', '40 mg', 'Once daily (Morning)', '2022-06-20', 'Dr. Vikram Seth', 'Take with glass of water upon waking up.', true),
('a0000000-0000-0000-0000-000000000001', 'Salbutamol Inhaler', '100 mcg / puff', 'As needed (SOS)', '2018-11-06', 'Dr. Meera Kapoor', '1-2 puffs 15 mins before intense workouts.', true),
('a0000000-0000-0000-0000-000000000001', 'Vitamin D3 (Cholecalciferol)', '60,000 IU', 'Once weekly (Sunday)', '2024-01-10', 'Dr. Vikram Seth', 'Take with milk after lunch.', true);

-- Seed Vitals
INSERT INTO public.vitals (profile_id, blood_pressure_sys, blood_pressure_dia, heart_rate, spo2, blood_sugar, weight_kg, height_cm, notes) VALUES
('a0000000-0000-0000-0000-000000000001', 122, 82, 74, 98, 110, 74.5, 178, 'Morning fasting check - stable'),
('a0000000-0000-0000-0000-000000000001', 125, 84, 78, 97, 135, 74.8, 178, 'Post-prandial blood sugar 2h after lunch');

-- Seed Family Members
INSERT INTO public.family_members (primary_profile_id, full_name, relationship, dob, blood_group, notes) VALUES
('a0000000-0000-0000-0000-000000000001', 'Aarav Sharma', 'Son', '2019-04-12', 'B+', 'Pediatric immunizations up to date. Mild lactose sensitivity.'),
('a0000000-0000-0000-0000-000000000001', 'Kamla Sharma', 'Mother', '1961-11-20', 'O+', 'Osteoarthritis in knees, Thyroid supplement Thyronorm 50mcg.');

-- Seed Vaccinations
INSERT INTO public.vaccinations (profile_id, vaccine_name, dose_number, date_administered, next_due_date, administered_by, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'COVID-19 Booster (Covaxin)', 3, '2023-04-15', NULL, 'Max Super Speciality Hospital', 'Completed'),
('a0000000-0000-0000-0000-000000000001', 'Influenza (Quadrivalent)', 1, '2023-10-05', '2024-10-05', 'Apollo Health Clinic', 'Overdue'),
('a0000000-0000-0000-0000-000000000001', 'Hepatitis B Booster', 1, '2022-01-20', NULL, 'AIIMS New Delhi', 'Completed'),
('a0000000-0000-0000-0000-000000000001', 'Tdap (Tetanus, Diphtheria, Pertussis)', 1, '2021-08-10', '2031-08-10', 'City Care Clinic', 'Completed');
