import { Profile, Allergy, Condition, Medication, Vital, Report, FamilyMember, DailyCheckin, Vaccination } from '../types/database.types';

export const INITIAL_DEMO_PROFILE: Profile = {
  id: 'a0000000-0000-0000-0000-000000000001',
  full_name: 'Rahul Sharma',
  dob: '1992-08-14',
  blood_group: 'B+',
  phone: '+91 98765 43210',
  emergency_contact_name: 'Ananya Sharma',
  emergency_contact_relation: 'Spouse',
  emergency_contact_phone: '+91 98765 00000',
  primary_physician: 'Dr. Vikram Seth (Cardiologist, Max Healthcare)',
  insurance_provider: 'Star Health Comprehensive Plan',
  insurance_policy_no: 'SH-8874-9021-IND',
  organ_donor: true,
  address: 'Flat 402, Green Park Apartments, New Delhi 110016',
  public_emergency_token: 'emg_rahul_sharma_7721',
  emergency_visibility_config: {
    show_blood_group: true,
    show_allergies: true,
    show_emergency_contacts: true,
    show_active_medications: true,
    show_chronic_conditions: true,
    show_insurance: false,
  },
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

export const INITIAL_DEMO_ALLERGIES: Allergy[] = [
  {
    id: 'alg-1',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    allergen: 'Penicillin',
    severity: 'Severe',
    reaction: 'Anaphylactic shock, severe facial swelling & acute dyspnea',
    notes: 'Strict contraindication. Carry EpiPen if available.',
    created_at: '2024-01-02T10:00:00Z',
  },
  {
    id: 'alg-2',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    allergen: 'Peanuts & Tree Nuts',
    severity: 'Moderate',
    reaction: 'Skin hives, throat tightness',
    notes: 'Avoid processed food with nut traces.',
    created_at: '2024-01-03T11:00:00Z',
  },
  {
    id: 'alg-3',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    allergen: 'Dust Mites & Pollen',
    severity: 'Mild',
    reaction: 'Allergic rhinitis, sneezing',
    notes: 'Prescribed Montelukast as needed.',
    created_at: '2024-01-04T12:00:00Z',
  },
];

export const INITIAL_DEMO_CONDITIONS: Condition[] = [
  {
    id: 'cnd-1',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    condition_name: 'Type 2 Diabetes Mellitus',
    diagnosed_date: '2021-03-10',
    status: 'Active',
    severity: 'Moderate',
    notes: 'Managed with Metformin 500mg twice daily and low glycemic index diet.',
    created_at: '2024-01-02T10:00:00Z',
  },
  {
    id: 'cnd-2',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    condition_name: 'Essential Hypertension',
    diagnosed_date: '2022-06-18',
    status: 'Active',
    severity: 'Mild',
    notes: 'Controlled with Telmisartan 40mg daily morning dose.',
    created_at: '2024-01-03T11:00:00Z',
  },
  {
    id: 'cnd-3',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    condition_name: 'Asthma (Mild Exercise-Induced)',
    diagnosed_date: '2018-11-05',
    status: 'Managed',
    severity: 'Mild',
    notes: 'Uses Salbutamol Inhaler prior to intense cardio exercises.',
    created_at: '2024-01-04T12:00:00Z',
  },
];

export const INITIAL_DEMO_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    name: 'Metformin HCl',
    dosage: '500 mg',
    frequency: 'Twice daily (Breakfast & Dinner)',
    start_date: '2021-03-12',
    prescribing_doctor: 'Dr. Vikram Seth',
    instructions: 'Take immediately after food to reduce gastrointestinal upset.',
    active: true,
    created_at: '2024-01-02T10:00:00Z',
  },
  {
    id: 'med-2',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    name: 'Telmisartan',
    dosage: '40 mg',
    frequency: 'Once daily (Morning)',
    start_date: '2022-06-20',
    prescribing_doctor: 'Dr. Vikram Seth',
    instructions: 'Take with glass of water upon waking up.',
    active: true,
    created_at: '2024-01-03T11:00:00Z',
  },
  {
    id: 'med-3',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    name: 'Salbutamol Inhaler',
    dosage: '100 mcg / puff',
    frequency: 'As needed (SOS)',
    start_date: '2018-11-06',
    prescribing_doctor: 'Dr. Meera Kapoor',
    instructions: '1-2 puffs 15 mins before intense workouts.',
    active: true,
    created_at: '2024-01-04T12:00:00Z',
  },
  {
    id: 'med-4',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    name: 'Vitamin D3 (Cholecalciferol)',
    dosage: '60,000 IU',
    frequency: 'Once weekly (Sunday)',
    start_date: '2024-01-10',
    prescribing_doctor: 'Dr. Vikram Seth',
    instructions: 'Take with milk after lunch.',
    active: true,
    created_at: '2024-01-05T12:00:00Z',
  },
];

export const INITIAL_DEMO_VITALS: Vital[] = [
  {
    id: 'vtl-1',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    blood_pressure_sys: 122,
    blood_pressure_dia: 82,
    heart_rate: 74,
    spo2: 98,
    blood_sugar: 110,
    weight_kg: 74.5,
    height_cm: 178,
    recorded_at: new Date().toISOString(),
    notes: 'Morning fasting check - stable',
  },
  {
    id: 'vtl-2',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    blood_pressure_sys: 125,
    blood_pressure_dia: 84,
    heart_rate: 78,
    spo2: 97,
    blood_sugar: 135,
    weight_kg: 74.8,
    height_cm: 178,
    recorded_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Post-prandial blood sugar 2h after lunch',
  },
];

export const INITIAL_DEMO_REPORTS: Report[] = [
  {
    id: 'rpt-1',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    title: 'Comprehensive Metabolic & HbA1c Panel',
    category: 'Lab Test',
    report_date: '2024-02-15',
    file_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    summary: 'HbA1c is 6.4%, showing improved glycemic control compared to last quarter (6.9%). Fasting blood glucose is 112 mg/dL. Kidney and liver markers remain well within normal physiological ranges.',
    extracted_data: {
      key_findings: [
        'HbA1c level: 6.4% (Target < 7.0% for managed T2D)',
        'Fasting Blood Glucose: 112 mg/dL (Slightly elevated)',
        'eGFR: > 90 mL/min/1.73m2 (Normal renal clearance)',
        'Serum Creatinine: 0.9 mg/dL (Normal)',
        'ALT / AST: 22 / 19 U/L (Normal hepatic enzymes)',
      ],
      abnormal_biomarkers: [
        { name: 'HbA1c', value: '6.4 %', range: '4.0 - 5.6 % (Non-diabetic)', status: 'High' },
        { name: 'Fasting Plasma Glucose', value: '112 mg/dL', range: '70 - 99 mg/dL', status: 'High' },
        { name: 'Serum Triglycerides', value: '168 mg/dL', range: '< 150 mg/dL', status: 'High' },
      ],
      summary: 'Overall satisfactory diabetic management on Metformin 500mg BD. Lipid profile shows slight hypertriglyceridemia.',
      suggested_questions: [
        'Should we adjust the Metformin dosage given HbA1c improved to 6.4%?',
        'What dietary changes can help lower triglycerides from 168 mg/dL?',
        'When should I repeat the lipid panel?'
      ]
    },
    flags: ['HbA1c 6.4%', 'Triglycerides 168 mg/dL'],
    created_at: '2024-02-15T14:30:00Z',
  },
  {
    id: 'rpt-2',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    title: 'Cardiology Follow-up & Echocardiogram Report',
    category: 'Imaging',
    report_date: '2024-01-20',
    file_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    summary: 'Left ventricular ejection fraction (LVEF) is 62%. Normal valvular anatomy. No regional wall motion abnormalities. Blood pressure well controlled on Telmisartan 40mg.',
    extracted_data: {
      key_findings: [
        'LVEF: 62% (Preserved systolic function)',
        'No valvular regurgitation or stenosis',
        'Normal cardiac chamber dimensions',
        'Resting ECG: Normal sinus rhythm at 72 bpm'
      ],
      abnormal_biomarkers: [],
      summary: 'Normal echocardiographic study. Continue Telmisartan 40mg daily.',
      suggested_questions: [
        'Is my heart function fully healthy for running a 10k marathon?',
        'How often should I schedule cardiac stress tests?'
      ]
    },
    flags: [],
    created_at: '2024-01-20T09:15:00Z',
  }
];

export const INITIAL_DEMO_FAMILY: FamilyMember[] = [
  {
    id: 'fam-1',
    primary_profile_id: 'a0000000-0000-0000-0000-000000000001',
    full_name: 'Aarav Sharma',
    relationship: 'Son',
    dob: '2019-04-12',
    blood_group: 'B+',
    notes: 'Pediatric immunizations up to date. Mild lactose sensitivity.',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fam-2',
    primary_profile_id: 'a0000000-0000-0000-0000-000000000001',
    full_name: 'Kamla Sharma',
    relationship: 'Mother',
    dob: '1961-11-20',
    blood_group: 'O+',
    notes: 'Osteoarthritis in knees, Thyroid supplement Thyronorm 50mcg.',
    created_at: '2024-01-01T00:00:00Z',
  }
];

export const INITIAL_DEMO_VACCINATIONS: Vaccination[] = [
  {
    id: 'vac-1',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    vaccine_name: 'COVID-19 Booster (Covaxin)',
    dose_number: 3,
    date_administered: '2023-04-15',
    administered_by: 'Max Super Speciality Hospital',
    status: 'Completed',
    created_at: '2023-04-15T00:00:00Z',
  },
  {
    id: 'vac-2',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    vaccine_name: 'Influenza (Quadrivalent)',
    dose_number: 1,
    date_administered: '2023-10-05',
    next_due_date: '2024-10-05',
    administered_by: 'Apollo Health Clinic',
    status: 'Overdue',
    created_at: '2023-10-05T00:00:00Z',
  },
  {
    id: 'vac-3',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    vaccine_name: 'Hepatitis B Booster',
    dose_number: 1,
    date_administered: '2022-01-20',
    administered_by: 'AIIMS New Delhi',
    status: 'Completed',
    created_at: '2022-01-20T00:00:00Z',
  },
  {
    id: 'vac-4',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    vaccine_name: 'Tdap (Tetanus, Diphtheria, Pertussis)',
    dose_number: 1,
    date_administered: '2021-08-10',
    next_due_date: '2031-08-10',
    administered_by: 'City Care Clinic',
    status: 'Completed',
    created_at: '2021-08-10T00:00:00Z',
  },
];

export const INITIAL_DEMO_CHECKINS: DailyCheckin[] = [
  {
    id: 'chk-1',
    profile_id: 'a0000000-0000-0000-0000-000000000001',
    checkin_date: new Date().toISOString().split('T')[0],
    mood: 'Good',
    pain_level: 1,
    energy_level: 4,
    water_intake_ml: 2500,
    symptoms: ['Mild fatigue after workout'],
    notes: 'Took medications on time. Felt energetic overall.',
    created_at: new Date().toISOString(),
  }
];

// Helper functions for Local Storage Persistence Engine
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(`healink_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`healink_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Local storage write failed for ${key}:`, err);
  }
};

export const LocalMockDB = {
  getProfile: (): Profile => getStorageItem('profile', INITIAL_DEMO_PROFILE),
  updateProfile: (updates: Partial<Profile>): Profile => {
    const current = LocalMockDB.getProfile();
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
    setStorageItem('profile', updated);
    return updated;
  },

  getAllergies: (): Allergy[] => getStorageItem('allergies', INITIAL_DEMO_ALLERGIES),
  addAllergy: (allergy: Omit<Allergy, 'id' | 'profile_id'>): Allergy => {
    const current = LocalMockDB.getAllergies();
    const newEntry: Allergy = {
      ...allergy,
      id: `alg-${Date.now()}`,
      profile_id: INITIAL_DEMO_PROFILE.id,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('allergies', updated);
    return newEntry;
  },
  deleteAllergy: (id: string): Allergy[] => {
    const updated = LocalMockDB.getAllergies().filter(a => a.id !== id);
    setStorageItem('allergies', updated);
    return updated;
  },

  getConditions: (): Condition[] => getStorageItem('conditions', INITIAL_DEMO_CONDITIONS),
  addCondition: (condition: Omit<Condition, 'id' | 'profile_id'>): Condition => {
    const current = LocalMockDB.getConditions();
    const newEntry: Condition = {
      ...condition,
      id: `cnd-${Date.now()}`,
      profile_id: INITIAL_DEMO_PROFILE.id,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('conditions', updated);
    return newEntry;
  },
  deleteCondition: (id: string): Condition[] => {
    const updated = LocalMockDB.getConditions().filter(c => c.id !== id);
    setStorageItem('conditions', updated);
    return updated;
  },

  getMedications: (): Medication[] => getStorageItem('medications', INITIAL_DEMO_MEDICATIONS),
  addMedication: (medication: Omit<Medication, 'id' | 'profile_id'>): Medication => {
    const current = LocalMockDB.getMedications();
    const newEntry: Medication = {
      ...medication,
      id: `med-${Date.now()}`,
      profile_id: INITIAL_DEMO_PROFILE.id,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('medications', updated);
    return newEntry;
  },
  toggleMedicationActive: (id: string): Medication[] => {
    const updated = LocalMockDB.getMedications().map(m => 
      m.id === id ? { ...m, active: !m.active } : m
    );
    setStorageItem('medications', updated);
    return updated;
  },
  deleteMedication: (id: string): Medication[] => {
    const updated = LocalMockDB.getMedications().filter(m => m.id !== id);
    setStorageItem('medications', updated);
    return updated;
  },

  getVitals: (): Vital[] => getStorageItem('vitals', INITIAL_DEMO_VITALS),
  addVital: (vital: Omit<Vital, 'id' | 'profile_id' | 'recorded_at'>): Vital => {
    const current = LocalMockDB.getVitals();
    const newEntry: Vital = {
      ...vital,
      id: `vtl-${Date.now()}`,
      profile_id: INITIAL_DEMO_PROFILE.id,
      recorded_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('vitals', updated);
    return newEntry;
  },

  getReports: (): Report[] => getStorageItem('reports', INITIAL_DEMO_REPORTS),
  addReport: (report: Omit<Report, 'id' | 'profile_id'>): Report => {
    const current = LocalMockDB.getReports();
    const newEntry: Report = {
      ...report,
      id: `rpt-${Date.now()}`,
      profile_id: INITIAL_DEMO_PROFILE.id,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('reports', updated);
    return newEntry;
  },

  getFamilyMembers: (): FamilyMember[] => getStorageItem('family', INITIAL_DEMO_FAMILY),
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'primary_profile_id'>): FamilyMember => {
    const current = LocalMockDB.getFamilyMembers();
    const newEntry: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}`,
      primary_profile_id: INITIAL_DEMO_PROFILE.id,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('family', updated);
    return newEntry;
  },

  getCheckins: (): DailyCheckin[] => getStorageItem('checkins', INITIAL_DEMO_CHECKINS),
  addCheckin: (checkin: Omit<DailyCheckin, 'id' | 'profile_id'>): DailyCheckin => {
    const current = LocalMockDB.getCheckins();
    const newEntry: DailyCheckin = {
      ...checkin,
      id: `chk-${Date.now()}`,
      profile_id: INITIAL_DEMO_PROFILE.id,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('checkins', updated);
    return newEntry;
  },

  getVaccinations: (): Vaccination[] => getStorageItem('vaccinations', INITIAL_DEMO_VACCINATIONS),
  addVaccination: (vaccine: Omit<Vaccination, 'id' | 'profile_id'>): Vaccination => {
    const current = LocalMockDB.getVaccinations();
    const newEntry: Vaccination = {
      ...vaccine,
      id: `vac-${Date.now()}`,
      profile_id: INITIAL_DEMO_PROFILE.id,
      created_at: new Date().toISOString(),
    };
    const updated = [newEntry, ...current];
    setStorageItem('vaccinations', updated);
    return newEntry;
  }
};
