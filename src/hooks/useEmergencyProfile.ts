import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { LocalMockDB } from '../lib/demoData';
import { Allergy, Condition, Medication, EmergencyVisibilityConfig } from '../types/database.types';

export interface BoundedEmergencyData {
  full_name: string;
  dob?: string;
  blood_group?: string;
  phone?: string;
  emergency_contact_name?: string;
  emergency_contact_relation?: string;
  emergency_contact_phone?: string;
  insurance_provider?: string;
  insurance_policy_no?: string;
  organ_donor?: boolean;
  allergies: Allergy[];
  active_medications: Medication[];
  chronic_conditions: Condition[];
  visibility: EmergencyVisibilityConfig;
}

export const useEmergencyProfile = (publicToken?: string) => {
  const [data, setData] = useState<BoundedEmergencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmergencyData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Get current profile or fetch by public token
    let profile = LocalMockDB.getProfile();
    let allergies = LocalMockDB.getAllergies();
    let conditions = LocalMockDB.getConditions();
    let medications = LocalMockDB.getMedications();

    if (isSupabaseConfigured() && supabase && publicToken) {
      try {
        const { data: dbProfile, error: pErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('public_emergency_token', publicToken)
          .single();

        if (!pErr && dbProfile) {
          profile = dbProfile;
          const [aRes, cRes, mRes] = await Promise.all([
            supabase.from('allergies').select('*').eq('profile_id', profile.id),
            supabase.from('conditions').select('*').eq('profile_id', profile.id),
            supabase.from('medications').select('*').eq('profile_id', profile.id).eq('active', true),
          ]);
          if (aRes.data) allergies = aRes.data;
          if (cRes.data) conditions = cRes.data;
          if (mRes.data) medications = mRes.data;
        }
      } catch (err) {
        console.warn('Emergency token query warning:', err);
      }
    }

    if (!profile) {
      setError('Emergency profile not found or link has expired.');
      setLoading(false);
      return;
    }

    const cfg = profile.emergency_visibility_config || {
      show_blood_group: true,
      show_allergies: true,
      show_emergency_contacts: true,
      show_active_medications: true,
      show_chronic_conditions: true,
      show_insurance: false,
    };

    // Construct Data-Minimized Bounded Profile
    const bounded: BoundedEmergencyData = {
      full_name: profile.full_name,
      dob: profile.dob,
      organ_donor: profile.organ_donor,
      blood_group: cfg.show_blood_group ? profile.blood_group : undefined,
      phone: cfg.show_emergency_contacts ? profile.phone : undefined,
      emergency_contact_name: cfg.show_emergency_contacts ? profile.emergency_contact_name : undefined,
      emergency_contact_relation: cfg.show_emergency_contacts ? profile.emergency_contact_relation : undefined,
      emergency_contact_phone: cfg.show_emergency_contacts ? profile.emergency_contact_phone : undefined,
      insurance_provider: cfg.show_insurance ? profile.insurance_provider : undefined,
      insurance_policy_no: cfg.show_insurance ? profile.insurance_policy_no : undefined,
      allergies: cfg.show_allergies ? allergies : [],
      active_medications: cfg.show_active_medications ? medications.filter(m => m.active) : [],
      chronic_conditions: cfg.show_chronic_conditions ? conditions : [],
      visibility: cfg,
    };

    setData(bounded);
    setLoading(false);
  }, [publicToken]);

  useEffect(() => {
    fetchEmergencyData();
  }, [fetchEmergencyData]);

  return {
    data,
    loading,
    error,
    refreshEmergency: fetchEmergencyData,
  };
};
