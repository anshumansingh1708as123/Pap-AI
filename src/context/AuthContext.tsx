import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { LocalMockDB } from '../lib/demoData';
import { Profile } from '../types/database.types';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: Profile | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileState: (updates: Partial<Profile>) => void;
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

  const login = async (email: string) => {
    setLoading(true);
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signInWithOtp({ email });
      } catch (err) {
        console.warn('Supabase auth failed, using demo auth:', err);
      }
    }
    // Demo login logic
    setUser({ id: 'a0000000-0000-0000-0000-000000000001', email });
    setProfile(LocalMockDB.getProfile());
    setLoading(false);
  };

  const signup = async (email: string, name: string) => {
    setLoading(true);
    const updated = LocalMockDB.updateProfile({ full_name: name });
    setUser({ id: 'a0000000-0000-0000-0000-000000000001', email });
    setProfile(updated);
    setLoading(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  };

  const updateProfileState = (updates: Partial<Profile>) => {
    const updated = LocalMockDB.updateProfile(updates);
    setProfile(updated);
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
