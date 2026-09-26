import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { PassportCompletionMetrics } from '../../lib/utils';

export const PassportCompletionMeter: React.FC<{ metrics: PassportCompletionMetrics }> = ({ metrics }) => {
  const { totalPercent, completedItems } = metrics;

  const getMeterColor = (percent: number) => {
    if (percent >= 80) return 'from-teal-500 to-emerald-400';
    if (percent >= 50) return 'from-amber-500 to-yellow-400';
    return 'from-rose-500 to-amber-500';
  };

  return (
    <Card glass className="border border-teal-500/20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-teal-950/80 border border-teal-800/60 text-teal-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Passport Readiness Score</h3>
            <p className="text-xs text-slate-400">Completeness of critical health data for emergency readiness</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <span className="text-2xl font-black text-slate-100">{totalPercent}%</span>
            <span className="text-xs text-slate-400 block">Complete</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden my-4 p-0.5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getMeterColor(totalPercent)} transition-all duration-700 ease-out`}
          style={{ width: `${totalPercent}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
        {completedItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${
              item.completed
                ? 'bg-teal-950/30 border-teal-800/40 text-teal-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            {item.completed ? (
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span className="truncate">{item.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
