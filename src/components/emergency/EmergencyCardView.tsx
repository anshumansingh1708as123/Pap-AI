import React from 'react';
import { ShieldAlert, Heart, Phone, AlertOctagon, Pill, User, HeartHandshake } from 'lucide-react';
import { BoundedEmergencyData } from '../../hooks/useEmergencyProfile';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { calculateAge } from '../../lib/utils';

interface EmergencyCardViewProps {
  data: BoundedEmergencyData;
}

export const EmergencyCardView: React.FC<EmergencyCardViewProps> = ({ data }) => {
  const age = data.dob ? calculateAge(data.dob) : null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 border-2 border-rose-600/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <ShieldAlert className="w-48 h-48 text-rose-300" />
        </div>

        <div className="flex items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-black text-rose-300 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-700/60 inline-block mb-1.5">
              CRITICAL MEDICAL PASSPORT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{data.full_name}</h1>
            <p className="text-xs text-rose-200 mt-0.5">
              {age ? `${age} yrs old` : ''} {data.dob ? `(DOB: ${data.dob})` : ''}
            </p>
          </div>

          {data.blood_group && (
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg">
              <span className="text-[10px] uppercase font-bold text-rose-200 block">BLOOD GROUP</span>
              <span className="text-3xl font-black text-white drop-shadow-md">{data.blood_group}</span>
            </div>
          )}
        </div>

        {data.organ_donor && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-rose-100">
            <HeartHandshake className="w-4 h-4 text-rose-300" />
            <span>Registered Organ Donor</span>
          </div>
        )}
      </div>

      {/* Emergency Contact */}
      {data.emergency_contact_name && (
        <Card glass={false} className="border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-950/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-600 text-white shadow-md">
                <Phone className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 dark:text-rose-400 block">
                  PRIMARY EMERGENCY CONTACT ({data.emergency_contact_relation || 'Kin'})
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{data.emergency_contact_name}</h3>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 mt-0.5">{data.emergency_contact_phone}</p>
              </div>
            </div>

            <a
              href={`tel:${data.emergency_contact_phone}`}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95 shrink-0"
            >
              CALL NOW
            </a>
          </div>
        </Card>
      )}

      {/* Severe Allergies */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Known Allergies ({data.allergies.length})</h3>
        </div>

        {data.allergies.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            No allergies specified by user for public emergency view.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.allergies.map((allergy) => (
              <div
                key={allergy.id}
                className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">{allergy.allergen}</h4>
                  <Badge variant={allergy.severity === 'Severe' ? 'severe' : 'moderate'}>
                    {allergy.severity}
                  </Badge>
                </div>
                <p className="text-xs text-rose-800 dark:text-rose-300/90 font-medium">Reaction: {allergy.reaction}</p>
                {allergy.notes && <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">{allergy.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Medications */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Active Prescribed Medications ({data.active_medications.length})</h3>
        </div>

        {data.active_medications.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            No active medications configured.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.active_medications.map((med) => (
              <div key={med.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{med.name}</h4>
                  <span className="text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                    {med.dosage}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{med.frequency}</p>
                {med.instructions && <p className="text-[11px] text-slate-500 italic">{med.instructions}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chronic Conditions */}
      {data.chronic_conditions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Chronic Conditions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.chronic_conditions.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1 shadow-xs">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">{c.condition_name}</h4>
                <p className="text-slate-500 dark:text-slate-400">Status: {c.status}</p>
                {c.notes && <p className="text-slate-500 dark:text-slate-400 italic text-[11px]">{c.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insurance info if enabled */}
      {data.insurance_provider && (
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center shadow-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">INSURANCE COVERAGE</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{data.insurance_provider}</span>
          </div>
          <span className="font-mono text-teal-600 dark:text-teal-400">{data.insurance_policy_no}</span>
        </div>
      )}
    </div>
  );
};
