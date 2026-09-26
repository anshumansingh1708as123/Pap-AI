import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, HeartPulse, QrCode, FileText, Pill, Users, Stethoscope, ArrowRight, Lock, Sparkles, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { HealthcareIllustrationSVG } from '../components/ui/HealthcareIllustrationSVG';

import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-slate-950 text-stone-900 dark:text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white transition-colors duration-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                HEALINK
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                HEALTH PLATFORM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>HIPAA Compliant Security</span>
            </div>

            <button
              onClick={toggleTheme}
              title="Toggle Light / Dark Mode"
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section Container (Section 5) */}
      <section className="pt-8 pb-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="saas-card p-6 sm:p-10 lg:p-12 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>HUMAN-CENTERED HEALTH INTELLIGENCE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Your Health, <br />
                <span className="text-teal-600 dark:text-teal-400">Smarter.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                AI-powered health insights that help you understand your information and prepare for better conversations with healthcare professionals.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2 text-white" />
                  <span>Ask Health AI</span>
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/passport')}
                  className="rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold border-slate-300 dark:border-slate-700"
                >
                  <ShieldCheck className="w-5 h-5 mr-2 text-teal-600" />
                  <span>View Health Records</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/reports')}
                  className="rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold border-teal-600 text-teal-600 dark:text-teal-400"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  <span>Analyze Medical Report</span>
                </Button>
              </div>
            </div>

            {/* Right Column: Friendly Healthcare Illustration with Overlays */}
            <div className="lg:col-span-5 relative">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
                <HealthcareIllustrationSVG />
              </div>

              {/* Overlay floating info cards */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100">
                <Lock className="w-4 h-4 text-teal-600" />
                <span>Zero-Knowledge Encrypted</span>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Doctor-Ready Summaries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Healthcare Intelligence Platform</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Designed for patient empowerment and clinical communication</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card glass className="saas-card p-6 space-y-3">
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950 w-fit text-teal-600">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Medical Report Simplifier</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upload complex blood panels, prescriptions, or imaging summaries to receive plain-language explanations.
            </p>
          </Card>

          <Card glass className="saas-card p-6 space-y-3">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950 w-fit text-indigo-600">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Doctor Visit Preparation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Synthesize 1-page executive summaries containing your recent vitals, active medications, and structured questions.
            </p>
          </Card>

          <Card glass className="saas-card p-6 space-y-3">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950 w-fit text-amber-600">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Emergency QR Protocol</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Expose a permission-bounded, zero-knowledge slice of your health passport for paramedics when you can't speak.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 HEALINK Health AI. Human-Centered Healthcare Intelligence.</p>
      </footer>
    </div>
  );
};
