import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { LocalMockDB } from '../lib/demoData';
import { Allergy, Condition, Vital } from '../types/database.types';

export const useHealthPassport = () => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);

    if (isSupabaseConfigured() && supabase) {
      try {
        const [algRes, cndRes, vtlRes] = await Promise.all([
          supabase.from('allergies').select('*').order('created_at', { ascending: false }),
          supabase.from('conditions').select('*').order('created_at', { ascending: false }),
          supabase.from('vitals').select('*').order('recorded_at', { ascending: false }),
        ]);

        if (algRes.data) setAllergies(algRes.data as Allergy[]);
        else setAllergies(LocalMockDB.getAllergies());

        if (cndRes.data) setConditions(cndRes.data as Condition[]);
        else setConditions(LocalMockDB.getConditions());

        if (vtlRes.data) setVitals(vtlRes.data as Vital[]);
        else setVitals(LocalMockDB.getVitals());

        setLoading(false);
        return;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local mock storage:', err);
      }
    }

    // Fallback to local storage engine
    setAllergies(LocalMockDB.getAllergies());
    setConditions(LocalMockDB.getConditions());
    setVitals(LocalMockDB.getVitals());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addAllergy = async (entry: Omit<Allergy, 'id' | 'profile_id'>) => {
    const newRecord = LocalMockDB.addAllergy(entry);
    setAllergies((prev) => [newRecord, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('allergies').insert([newRecord]);
      } catch (e) {
        console.warn('Supabase allergy insert warning:', e);
      }
    }
    return newRecord;
  };

  const deleteAllergy = async (id: string) => {
    const updated = LocalMockDB.deleteAllergy(id);
    setAllergies(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('allergies').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase allergy delete warning:', e);
      }
    }
  };

  const addCondition = async (entry: Omit<Condition, 'id' | 'profile_id'>) => {
    const newRecord = LocalMockDB.addCondition(entry);
    setConditions((prev) => [newRecord, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('conditions').insert([newRecord]);
      } catch (e) {
        console.warn('Supabase condition insert warning:', e);
      }
    }
    return newRecord;
  };

  const deleteCondition = async (id: string) => {
    const updated = LocalMockDB.deleteCondition(id);
    setConditions(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('conditions').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase condition delete warning:', e);
      }
    }
  };

  const addVital = async (entry: Omit<Vital, 'id' | 'profile_id' | 'recorded_at'>) => {
    const newRecord = LocalMockDB.addVital(entry);
    setVitals((prev) => [newRecord, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('vitals').insert([newRecord]);
      } catch (e) {
        console.warn('Supabase vital insert warning:', e);
      }
    }
    return newRecord;
  };

  return {
    allergies,
    conditions,
    vitals,
    loading,
    refreshPassport: loadData,
    addAllergy,
    deleteAllergy,
    addCondition,
    deleteCondition,
    addVital,
  };
};
