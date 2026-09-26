import React from 'react';
import { ShieldCheck, Lock, Eye, Server, UserCheck, Key, FileCheck } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const PrivacyHealthCenterPage: React.FC = () => {
  const trustCards = [
    {
      title: '256-Bit End-to-End Encryption',
      desc: 'All health records, lab summaries, and vital logs are encrypted at rest and in transit using bank-grade AES-256 standards.',
      icon: Lock,
      color: 'text-teal-600 dark:text-teal-400',
    },
    {
      title: 'Zero-Knowledge Privacy Controls',
      desc: 'You control what attributes paramedics or doctors see via your Emergency QR. Unselected data stays strictly private.',
      icon: Eye,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'HIPAA & GDPR Data Compliance',
      desc: 'Engineered following international health data privacy principles. We never monetize, sell, or train public AI on your personal records.',
      icon: Server,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Transparent & Clinical AI Safety',
      desc: 'Our AI models output plain-language summaries while clearly deferring medical diagnoses and treatment plans to licensed doctors.',
      icon: ShieldCheck,
      color: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'User-Controlled Token Access',
      desc: 'Revoke or regenerate public emergency tokens with a single click at any time from your settings panel.',
      icon: Key,
      color: 'text-sky-600 dark:text-sky-400',
    },
    {
      title: 'Export & Permanent Erasure',
      desc: 'Export your complete medical summary to PDF or request full row-level deletion with zero data retention lingering.',
      icon: FileCheck,
      color: 'text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>TRUST & PRIVACY GUARANTEE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your Health Data Stays Yours.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            HEALINK uses zero-knowledge privacy boundaries and client-side encryption so you remain in total control of your health intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card key={idx} glass className="saas-card p-6 space-y-3">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 w-fit">
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{card.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{card.desc}</p>
              </Card>
            );
          })}
        </div>

        <Card glass className="saas-card p-6 text-center space-y-3 bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Need to update your Emergency QR Visibility settings?</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Tailor what slice of data paramedics see when scanning your physical QR code.
          </p>
          <a href="/settings" className="inline-block pt-2">
            <Button variant="primary" size="sm">
              Configure Emergency Privacy Toggles
            </Button>
          </a>
        </Card>
      </div>
    </DashboardLayout>
  );
};
