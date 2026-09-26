import React from 'react';
import { Settings, ShieldCheck, Database, Sparkles, RefreshCw } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { QRConfigurator } from '../components/emergency/QRConfigurator';
import { isSupabaseConfigured } from '../lib/supabase';
import { isGeminiConfigured } from '../lib/gemini';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNotification } from '../context/NotificationContext';

export const SettingsPage: React.FC = () => {
  const { showToast } = useNotification();
  const supabaseConnected = isSupabaseConfigured();
  const geminiConnected = isGeminiConfigured();

  const handleResetDemoData = () => {
    localStorage.clear();
    showToast('Demo State Reset', 'Restored default Rahul Sharma demo data.', 'success');
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Settings & Visibility Controls</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage privacy boundaries, Supabase connections & local state</p>
        </div>

        {/* QR Visibility Configurator */}
        <QRConfigurator />

        {/* Integration Engine Status */}
        <Card glass={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>Backend Services & Safe Fallback Diagnostics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-200">Supabase DB Engine</span>
                <Badge variant={supabaseConnected ? 'completed' : 'moderate'}>
                  {supabaseConnected ? 'Connected Live' : 'Resilient Fallback Local DB'}
                </Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {supabaseConnected
                  ? 'Connected to live cloud PostgreSQL instance.'
                  : 'Operating seamlessly via Local Storage Engine pre-populated with Rahul Sharma (B+).'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-200">Gemini 1.5 Flash AI</span>
                <Badge variant={geminiConnected ? 'completed' : 'moderate'}>
                  {geminiConnected ? 'API Key Active' : 'Intelligent Fallback Parser'}
                </Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {geminiConnected
                  ? 'Live Gemini AI multimodal document parsing enabled.'
                  : 'Using built-in intelligent clinical fallback parser for stage demo reliability.'}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button variant="outline" size="sm" onClick={handleResetDemoData}>
              <RefreshCw className="w-4 h-4 mr-1.5" />
              <span>Reset Local Demo State</span>
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
