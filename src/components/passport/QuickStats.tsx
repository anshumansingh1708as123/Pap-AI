import React from 'react';
import { Heart, Activity, Droplets, ShieldAlert, Pill, Sparkles } from 'lucide-react';
import { Vital, Allergy, Medication } from '../../types/database.types';
import { Card } from '../ui/Card';

interface QuickStatsProps {
  latestVital?: Vital;
  allergies: Allergy[];
  medications: Medication[];
}

export const QuickStats: React.FC<QuickStatsProps> = ({ latestVital, allergies, medications }) => {
  const activeMeds = medications.filter((m) => m.active);

  const stats = [
    {
      label: 'Blood Pressure',
      value: latestVital ? `${latestVital.blood_pressure_sys}/${latestVital.blood_pressure_dia}` : '122/82',
      unit: 'mmHg',
      icon: Activity,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/50 border-emerald-800/40',
      status: 'Optimal',
    },
    {
      label: 'Heart Rate',
      value: latestVital ? `${latestVital.heart_rate}` : '74',
      unit: 'bpm',
      icon: Heart,
      color: 'text-rose-400',
      bg: 'bg-rose-950/50 border-rose-800/40',
      status: 'Normal Sinus',
    },
    {
      label: 'Blood Glucose',
      value: latestVital ? `${latestVital.blood_sugar}` : '110',
      unit: 'mg/dL',
      icon: Droplets,
      color: 'text-amber-400',
      bg: 'bg-amber-950/50 border-amber-800/40',
      status: 'Managed',
    },
    {
      label: 'Active Medications',
      value: `${activeMeds.length}`,
      unit: 'prescribed',
      icon: Pill,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/50 border-indigo-800/40',
      status: 'Daily checklist',
    },
    {
      label: 'Flagged Allergies',
      value: `${allergies.length}`,
      unit: 'known allergens',
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-950/50 border-rose-800/40',
      status: allergies.some((a) => a.severity === 'Severe') ? 'Severe Alert' : 'Monitored',
    },
    {
      label: 'SpO2 Oxygen',
      value: latestVital ? `${latestVital.spo2}` : '98',
      unit: '%',
      icon: Sparkles,
      color: 'text-teal-400',
      bg: 'bg-teal-950/50 border-teal-800/40',
      status: 'Normal',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} glass className={`p-4 border ${stat.bg} transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 truncate">{stat.label}</span>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-100">{stat.value}</span>
              <span className="text-[10px] text-slate-400">{stat.unit}</span>
            </div>
            <p className={`text-[10px] mt-1 font-medium ${stat.color}`}>{stat.status}</p>
          </Card>
        );
      })}
    </div>
  );
};
