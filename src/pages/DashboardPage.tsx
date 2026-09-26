import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  FileText,
  Pill,
  Stethoscope,
  Plus,
  ArrowRight,
  ShieldCheck,
  Activity,
  Heart,
  CalendarCheck,
  Bot,
  User,
  Send,
  Sparkles,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useHealthPassport } from '../hooks/useHealthPassport';
import { useMedications } from '../hooks/useMedications';
import { PassportCompletionMeter } from '../components/passport/PassportCompletionMeter';
import { AllergyCard } from '../components/passport/AllergyCard';
import { ConditionCard } from '../components/passport/ConditionCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { calculatePassportCompletion } from '../lib/utils';
import { LocalMockDB } from '../lib/demoData';
import { askReportAI } from '../lib/gemini';
import { DisclaimerBanner } from '../components/layout/DisclaimerBanner';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { allergies, conditions, vitals, deleteAllergy, deleteCondition } = useHealthPassport();
  const { medications } = useMedications();
  const reports = LocalMockDB.getReports();

  const completionMetrics = calculatePassportCompletion(profile, allergies, conditions, medications, vitals);
  const activeMeds = medications.filter((m) => m.active);

  // AI Assistant Chat State (Section 7)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'user',
      text: 'What does my latest blood report mean?',
    },
    {
      sender: 'bot',
      text: 'Your recent lab report shows an HbA1c of 6.4%, indicating improved glycemic control compared to last quarter (6.9%). Fasting blood glucose is 112 mg/dL. Please note: HEALINK AI provides educational guidance only and does not diagnose or replace professional medical care.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const suggestedPrompts = [
    'Explain my report',
    'Prepare questions for my doctor',
    'Summarize my records',
    'What should I ask my doctor?',
  ];

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isAiLoading) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: promptText }]);
    setChatInput('');
    setIsAiLoading(true);

    try {
      const response = await askReportAI(
        JSON.stringify(reports[0] || {}),
        promptText,
        chatMessages.map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text }))
      );
      setChatMessages((prev) => [...prev, { sender: 'bot', text: response }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Your parameters show consistent management. Please discuss any questions during your next appointment. Informational and educational assistance only.',
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                ACTIVE PASSPORT SESSION
              </span>
              <span className="text-xs text-slate-500">ID: {profile?.public_emergency_token || 'emg_rahul'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Welcome back, {profile?.full_name || 'Rahul Sharma'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Blood Group: <strong className="text-slate-900 dark:text-slate-200 font-bold">{profile?.blood_group || 'B+'}</strong> | Emergency Contact: {profile?.emergency_contact_name || 'Ananya Sharma'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button variant="emergency" size="sm" onClick={() => navigate('/emergency')}>
              <ShieldAlert className="w-4 h-4 mr-1.5" />
              <span>EMERGENCY SOS</span>
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/reports')}>
              <FileText className="w-4 h-4 mr-1.5" />
              <span>Upload Report</span>
            </Button>
          </div>
        </div>

        {/* Section 6: YOUR HEALTH OVERVIEW SUMMARY CARDS */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Health Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Health Records */}
            <Card glass className="saas-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Health Records</span>
                <FileCheck className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">24</div>
              <p className="text-xs text-slate-500">Documents securely organized</p>
            </Card>

            {/* Recent Reports */}
            <Card glass className="saas-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Recent Reports</span>
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">6</div>
              <p className="text-xs text-slate-500">Reports analyzed by AI</p>
            </Card>

            {/* Doctor Prep */}
            <Card glass className="saas-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Doctor Prep</span>
                <Stethoscope className="w-5 h-5 text-sky-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">3</div>
              <p className="text-xs text-slate-500">Topics ready for discussion</p>
            </Card>

            {/* Health Insights */}
            <Card glass className="saas-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Health Insights</span>
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">Stable</div>
              <p className="text-xs text-slate-500">Glycemic & BP managed</p>
            </Card>
          </div>
        </div>

        {/* Section 7: AI ASSISTANT CARD */}
        <Card glass className="saas-card p-6 border-teal-200 dark:border-teal-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ask Health AI</h2>
                <p className="text-xs text-slate-500">Understand your health information in simple language.</p>
              </div>
            </div>
          </div>

          <DisclaimerBanner className="py-2 text-xs" />

          {/* Chat Messages */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-teal-600 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="flex items-center gap-2 text-xs text-teal-600 italic">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Health AI is interpreting your prompt...</span>
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 block">Suggested Quick Prompts:</span>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(p)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-300 hover:text-teal-700 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Field */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt(chatInput)}
              placeholder="Ask anything about your health information…"
              className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
            <Button variant="primary" size="md" onClick={() => handleSendPrompt(chatInput)} isLoading={isAiLoading} className="rounded-2xl">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Passport Readiness Meter */}
        <PassportCompletionMeter metrics={completionMetrics} />

        {/* Known Allergies & Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Flagged Allergies</h3>
              <Link to="/passport" className="text-xs text-teal-600 dark:text-teal-400 hover:underline">Edit List</Link>
            </div>
            <div className="space-y-3">
              {allergies.map((a) => (
                <AllergyCard key={a.id} allergy={a} onDelete={deleteAllergy} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Chronic Conditions</h3>
              <Link to="/passport" className="text-xs text-teal-600 dark:text-teal-400 hover:underline">Edit List</Link>
            </div>
            <div className="space-y-3">
              {conditions.map((c) => (
                <ConditionCard key={c.id} condition={c} onDelete={deleteCondition} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
