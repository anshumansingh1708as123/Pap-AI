export interface EmergencyVisibilityConfig {
  show_blood_group: boolean;
  show_allergies: boolean;
  show_emergency_contacts: boolean;
  show_active_medications: boolean;
  show_chronic_conditions: boolean;
  show_insurance: boolean;
}

export interface Profile {
  id: string;
  auth_user_id?: string;
  full_name: string;
  dob: string;
  blood_group: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
  primary_physician: string;
  insurance_provider: string;
  insurance_policy_no: string;
  organ_donor: boolean;
  address: string;
  public_emergency_token: string;
  emergency_visibility_config: EmergencyVisibilityConfig;
  created_at?: string;
  updated_at?: string;
}

export interface Allergy {
  id: string;
  profile_id: string;
  allergen: string;
  severity: 'Severe' | 'Moderate' | 'Mild';
  reaction: string;
  notes?: string;
  created_at?: string;
}

export interface Condition {
  id: string;
  profile_id: string;
  condition_name: string;
  diagnosed_date?: string;
  status: 'Active' | 'Managed' | 'In Remission' | 'Resolved';
  severity: 'Severe' | 'Moderate' | 'Mild';
  notes?: string;
  created_at?: string;
}

export interface Medication {
  id: string;
  profile_id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date?: string;
  end_date?: string;
  prescribing_doctor?: string;
  instructions?: string;
  active: boolean;
  created_at?: string;
}

export interface Vital {
  id: string;
  profile_id: string;
  blood_pressure_sys: number;
  blood_pressure_dia: number;
  heart_rate: number;
  spo2: number;
  blood_sugar: number;
  weight_kg: number;
  height_cm: number;
  recorded_at: string;
  notes?: string;
}

export interface Report {
  id: string;
  profile_id: string;
  title: string;
  category: 'Lab Test' | 'Prescription' | 'Imaging' | 'Discharge Summary' | 'Other';
  report_date: string;
  file_url?: string;
  extracted_data: {
    key_findings?: string[];
    abnormal_biomarkers?: { name: string; value: string; range: string; status: 'High' | 'Low' | 'Normal' | 'Critical' }[];
    summary?: string;
    suggested_questions?: string[];
  };
  summary?: string;
  flags?: string[];
  created_at?: string;
}

export interface MedicationLog {
  id: string;
  medication_id: string;
  log_date: string;
  taken_at: string;
  status: 'Taken' | 'Skipped' | 'Snoozed';
  notes?: string;
}

export interface FamilyMember {
  id: string;
  primary_profile_id: string;
  full_name: string;
  relationship: string;
  dob?: string;
  blood_group?: string;
  notes?: string;
  created_at?: string;
}

export interface DailyCheckin {
  id: string;
  profile_id: string;
  checkin_date: string;
  mood: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Severe Distress';
  pain_level: number; // 0-10
  energy_level: number; // 1-5
  water_intake_ml: number;
  symptoms: string[];
  notes?: string;
  created_at?: string;
}

export interface Vaccination {
  id: string;
  profile_id: string;
  vaccine_name: string;
  dose_number: number;
  date_administered?: string;
  next_due_date?: string;
  administered_by?: string;
  status: 'Completed' | 'Scheduled' | 'Overdue';
  document_url?: string;
  created_at?: string;
}
