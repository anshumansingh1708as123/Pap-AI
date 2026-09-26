import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CalendarCheck, Smile, Flame, Droplet, Heart, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LocalMockDB } from '../lib/demoData';
import { useNotification } from '../context/NotificationContext';

export const DailyCheckinPage: React.FC = () => {
  const { showToast } = useNotification();
  const [mood, setMood] = useState<'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Severe Distress'>('Good');
  const [painLevel, setPainLevel] = useState(1);
  const [energyLevel, setEnergyLevel] = useState(4);
  const [waterIntake, setWaterIntake] = useState(2500);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const availableSymptoms = [
    'Mild Fatigue',
    'Headache',
    'Joint Stiffess',
    'Nausea',
    'Dizziness',
    'Cough',
    'Shortness of Breath',
  ];

  const handleToggleSymptom = (sym: string) => {
    setSymptoms((prev) => (prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]));
  };

  const handleSubmitCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    LocalMockDB.addCheckin({
      checkin_date: new Date().toISOString().split('T')[0],
      mood,
      pain_level: painLevel,
      energy_level: energyLevel,
      water_intake_ml: waterIntake,
      symptoms,
      notes,
    });

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setIsCompleted(true);
    showToast('Daily Check-in Recorded', 'Logged to your health timeline.', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-100">Daily Health Check-in</h1>
            <p className="text-xs text-slate-400">30-second wellness & symptom tracker</p>
          </div>
        </div>

        {isCompleted ? (
          <Card glass className="border border-emerald-500/40 text-center p-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce-slow" />
            <h2 className="text-xl font-bold text-white">Daily Check-in Complete!</h2>
            <p className="text-xs text-slate-300">Your wellness metrics have been logged for today.</p>
            <Button variant="outline" size="sm" onClick={() => setIsCompleted(false)}>
              Update Today's Log
            </Button>
          </Card>
        ) : (
          <Card glass className="border border-teal-500/30 p-6 space-y-6">
            <form onSubmit={handleSubmitCheckin} className="space-y-6">
              {/* Mood Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  1. How are you feeling overall today?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(['Excellent', 'Good', 'Fair', 'Poor', 'Severe Distress'] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMood(m)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        mood === m
                          ? 'bg-teal-600 text-white border-teal-400 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pain Scale */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  <span>2. Pain Level (0 - 10 Scale)</span>
                  <span className="text-rose-400 font-extrabold text-sm">{painLevel} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Energy & Water Intake */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Energy Level (1 - 5)
                  </label>
                  <select
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                  >
                    <option value={5}>5 - High Energy</option>
                    <option value={4}>4 - Normal / Good</option>
                    <option value={3}>3 - Moderate</option>
                    <option value={2}>2 - Low Energy</option>
                    <option value={1}>1 - Exhausted</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Water Intake (mL)
                  </label>
                  <input
                    type="number"
                    step="250"
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(parseInt(e.target.value) || 2000)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                  />
                </div>
              </div>

              {/* Symptom Checkbox Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  Select Any Active Symptoms
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSymptoms.map((sym) => {
                    const isSel = symptoms.includes(sym);
                    return (
                      <button
                        type="button"
                        key={sym}
                        onClick={() => handleToggleSymptom(sym)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          isSel
                            ? 'bg-amber-600 text-white border-amber-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Submit Daily Check-in Log
              </Button>
            </form>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
