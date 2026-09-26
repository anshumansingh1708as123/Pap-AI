import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { LocalMockDB } from '../lib/demoData';
import { Profile } from '../types/database.types';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: Profile | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, name: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfileState: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>({
    id: 'a0000000-0000-0000-0000-000000000001',
    email: 'rahul.sharma@healink.demo',
  });
  const [profile, setProfile] = useState<Profile | null>(LocalMockDB.getProfile());
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured());

  useEffect(() => {
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' });
          setIsDemoMode(false);
          fetchSupabaseProfile(session.user.id);
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' });
          setIsDemoMode(false);
          fetchSupabaseProfile(session.user.id);
        } else {
          // Fall back to demo user
          setUser({
            id: 'a0000000-0000-0000-0000-000000000001',
            email: 'rahul.sharma@healink.demo',
          });
          setProfile(LocalMockDB.getProfile());
          setIsDemoMode(true);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const fetchSupabaseProfile = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (!error && data) {
        setProfile(data as Profile);
      } else {
        // Fall back to local mock profile if no DB row found
        setProfile(LocalMockDB.getProfile());
      }
    } catch {
      setProfile(LocalMockDB.getProfile());
    }
  };

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    if (isSupabaseConfigured() && supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data.user) {
          setUser({ id: data.user.id, email: data.user.email || email });
          setIsDemoMode(false);
          await fetchSupabaseProfile(data.user.id);
          setLoading(false);
          return { success: true };
        } else if (error) {
          console.warn('Supabase password login error:', error.message);
        }
      } catch (err) {
        console.warn('Supabase auth connection exception, falling back to local auth:', err);
      }
    }

    // Demo/Fallback authentication logic
    setUser({ id: 'a0000000-0000-0000-0000-000000000001', email });
    setProfile(LocalMockDB.getProfile());
    setLoading(false);
    return { success: true };
  };

  const signup = async (email: string, name: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    if (isSupabaseConfigured() && supabase && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (!error && data.user) {
          setUser({ id: data.user.id, email: data.user.email || email });
          setIsDemoMode(false);

          // Create initial profile record in Supabase
          const newProfile: Partial<Profile> = {
            auth_user_id: data.user.id,
            full_name: name,
            public_emergency_token: `emg_${name.toLowerCase().replace(/\s+/g, '_')}_${Math.floor(1000 + Math.random() * 9000)}`,
          };

          await supabase.from('profiles').insert([newProfile]);
          await fetchSupabaseProfile(data.user.id);
          setLoading(false);
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase signup exception, falling back to demo signup:', err);
      }
    }

    const updated = LocalMockDB.updateProfile({ full_name: name });
    setUser({ id: 'a0000000-0000-0000-0000-000000000001', email });
    setProfile(updated);
    setLoading(false);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  };

  const updateProfileState = async (updates: Partial<Profile>) => {
    const updated = LocalMockDB.updateProfile(updates);
    setProfile(updated);

    if (isSupabaseConfigured() && supabase && profile?.id) {
      try {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', profile.id);
      } catch (err) {
        console.warn('Supabase profile update warning:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isDemoMode,
        login,
        signup,
        logout,
        updateProfileState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
