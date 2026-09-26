import React, { useState } from 'react';
import { Stethoscope, Printer, Download, Plus, CheckCircle, HelpCircle, FileText, Activity } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useHealthPassport } from '../hooks/useHealthPassport';
import { useMedications } from '../hooks/useMedications';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNotification } from '../context/NotificationContext';
import { LocalMockDB } from '../lib/demoData';

export const DoctorPrepPage: React.FC = () => {
  const { profile } = useAuth();
  const { allergies, conditions, vitals } = useHealthPassport();
  const { medications } = useMedications();
  const reports = LocalMockDB.getReports();
  const { showToast } = useNotification();

  const [visitReason, setVisitReason] = useState('Quarterly Diabetes & Hypertension Follow-up Visit');
  const [questions, setQuestions] = useState<string[]>([
    'Should we adjust Metformin 500mg BD given my HbA1c improved to 6.4%?',
    'What dietary changes are recommended to bring serum triglycerides below 150 mg/dL?',
    'Is my Telmisartan 40mg dose optimal for morning BP readings?',
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions([...questions, newQuestion.trim()]);
    setNewQuestion('');
    showToast('Question Added', 'Added to your doctor prep list.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-400" />
              <h1 className="text-2xl font-extrabold text-slate-100">Doctor Visit Prep Hub</h1>
            </div>
            <p className="text-xs text-slate-400">Synthesize your Central Health Passport into a 1-page Doctor Brief</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1.5" />
              <span>Print Brief</span>
            </Button>
            <Button variant="primary" size="sm" onClick={() => showToast('PDF Exported', 'Doctor visit brief downloaded.', 'success')}>
              <Download className="w-4 h-4 mr-1.5" />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>

        {/* 1-Page Printable Doctor Brief Container */}
        <div className="space-y-6 print:p-0 print:text-black">
          <Card glass className="border border-teal-500/40 p-6 space-y-6 print:bg-white print:text-black print:border-none">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:border-gray-300">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-800 print:bg-gray-100 print:text-black">
                  EXECUTIVE HEALTH BRIEF
                </span>
                <h2 className="text-2xl font-black text-slate-100 print:text-black mt-1">
                  {profile?.full_name || 'Rahul Sharma'}
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600">
                  Age: 32 | Blood Group: {profile?.blood_group || 'B+'} | DOB: {profile?.dob || '1992-08-14'}
                </p>
              </div>

              <div className="text-right text-xs text-slate-300 print:text-gray-800">
                <p className="font-bold">{profile?.primary_physician || 'Dr. Vikram Seth'}</p>
                <p className="text-slate-400 print:text-gray-600">Cardiology & Internal Medicine</p>
                <p className="text-[10px] text-teal-400 font-mono mt-0.5">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300 print:text-gray-800">
                Primary Reason for Visit & Clinical Goal
              </h3>
              <input
                type="text"
                value={visitReason}
                onChange={(e) => setVisitReason(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-100 print:bg-gray-50 print:border-gray-300 print:text-black"
              />
            </div>

            {/* Questions for Doctor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-gray-800 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Questions for the Doctor ({questions.length})</span>
                </h3>
              </div>

              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 print:bg-gray-100 print:text-black print:border-gray-200">
                    <strong>Q{idx + 1}:</strong> {q}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1 print:hidden">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
                  placeholder="Type a custom question for your doctor..."
                  className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
                <Button variant="outline" size="sm" onClick={handleAddQuestion}>
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Add</span>
                </Button>
              </div>
            </div>

            {/* Active Medications & Severe Allergies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-black">
                  Active Prescribed Medications
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-200 print:text-gray-800">
                  {medications.filter((m) => m.active).map((med) => (
                    <li key={med.id} className="flex justify-between border-b border-slate-800/60 pb-1">
                      <span>{med.name} ({med.dosage})</span>
                      <span className="text-slate-400 text-[11px]">{med.frequency}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 print:bg-gray-50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 print:text-black">
                  Flagged Allergies & Contraindications
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-200 print:text-gray-800">
                  {allergies.map((alg) => (
                    <li key={alg.id} className="flex justify-between border-b border-rose-900/40 pb-1">
                      <strong className="font-semibold">{alg.allergen}</strong>
                      <span className="text-rose-300 text-[11px]">{alg.severity} ({alg.reaction})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vitals Summary */}
            {vitals.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 print:text-black">
                  Recent Vital Measurement Logs
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>Blood Pressure: <strong className="text-slate-100">{vitals[0].blood_pressure_sys}/{vitals[0].blood_pressure_dia} mmHg</strong></div>
                  <div>Blood Sugar: <strong className="text-slate-100">{vitals[0].blood_sugar} mg/dL</strong></div>
                  <div>Heart Rate: <strong className="text-slate-100">{vitals[0].heart_rate} bpm</strong></div>
                  <div>SpO2: <strong className="text-slate-100">{vitals[0].spo2}%</strong></div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
