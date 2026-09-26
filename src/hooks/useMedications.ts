import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { LocalMockDB } from '../lib/demoData';
import { Medication } from '../types/database.types';

export const useMedications = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMedications = useCallback(async () => {
    setLoading(true);

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('medications')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setMedications(data as Medication[]);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase medication fetch warning:', err);
      }
    }

    setMedications(LocalMockDB.getMedications());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMedications();
  }, [loadMedications]);

  const addMedication = async (med: Omit<Medication, 'id' | 'profile_id'>) => {
    const newRecord = LocalMockDB.addMedication(med);
    setMedications((prev) => [newRecord, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('medications').insert([newRecord]);
      } catch (e) {
        console.warn('Supabase medication insert warning:', e);
      }
    }
    return newRecord;
  };

  const toggleActive = async (id: string) => {
    const updated = LocalMockDB.toggleMedicationActive(id);
    setMedications(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        const item = updated.find((m) => m.id === id);
        if (item) {
          await supabase.from('medications').update({ active: item.active }).eq('id', id);
        }
      } catch (e) {
        console.warn('Supabase medication toggle warning:', e);
      }
    }
  };

  const deleteMedication = async (id: string) => {
    const updated = LocalMockDB.deleteMedication(id);
    setMedications(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('medications').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase medication delete warning:', e);
      }
    }
  };

  return {
    medications,
    loading,
    refreshMedications: loadMedications,
    addMedication,
    toggleActive,
    deleteMedication,
  };
};
