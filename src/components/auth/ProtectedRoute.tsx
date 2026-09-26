import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeartPulse } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-900/40 animate-pulse mb-4">
          <HeartPulse className="w-7 h-7 text-white" />
        </div>
        <p className="text-xs font-semibold text-slate-400">Verifying security session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
