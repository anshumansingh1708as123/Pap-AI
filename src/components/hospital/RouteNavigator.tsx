import React, { useState } from 'react';
import { Navigation, MapPin, ArrowRight, Clock, Footprints } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface RouteNavigatorProps {
  onRouteCalculated?: (from: string, to: string) => void;
}

export const RouteNavigator: React.FC<RouteNavigatorProps> = ({ onRouteCalculated }) => {
  const [fromDept, setFromDept] = useState('entrance');
  const [toDept, setToDept] = useState('pathology');
  const [isNavigating, setIsNavigating] = useState(false);

  const depts = [
    { id: 'entrance', name: 'Main Entrance & Triage' },
    { id: 'emergency', name: 'Emergency Trauma & ICU' },
    { id: 'opd', name: 'OPD Clinics (Cardio & Diabetes)' },
    { id: 'radiology', name: 'Radiology (CT Scan & MRI)' },
    { id: 'pathology', name: 'Pathology & Diagnostics Lab' },
    { id: 'pharmacy', name: '24/7 Pharmacy' },
    { id: 'billing', name: 'Billing & Cash Counter' },
  ];

  const getRouteSteps = (from: string, to: string) => {
    if (from === 'entrance' && to === 'pathology') {
      return [
        { step: 1, text: 'Start at Main Entrance / Triage Lobby (Ground Floor)' },
        { step: 2, text: 'Walk straight 25 meters down Corridor A past Cardiology OPD' },
        { step: 3, text: 'Turn RIGHT at Elevator Bank 2 towards Diagnostics Wing' },
        { step: 4, text: 'Pathology Blood Draw Room 104 is on your RIGHT (Est. 2 mins walk)' },
      ];
    }
    if (from === 'opd' && to === 'pharmacy') {
      return [
        { step: 1, text: 'Exit OPD Clinic 3 and head North towards Central Atrium' },
        { step: 2, text: 'Take Escalator 1 to 1st Floor Pharmacy Lobby' },
        { step: 3, text: '24/7 Outpatient Dispensing Counter is straight ahead (Est. 1.5 mins walk)' },
      ];
    }
    return [
      { step: 1, text: `Depart from ${depts.find((d) => d.id === from)?.name}` },
      { step: 2, text: 'Follow illuminated blue floor arrows towards Main Central Corridor' },
      { step: 3, text: `Arrive safely at ${depts.find((d) => d.id === to)?.name} (Est. 2 mins walk)` },
    ];
  };

  const steps = getRouteSteps(fromDept, toDept);

  const handleStartNav = () => {
    setIsNavigating(true);
    if (onRouteCalculated) onRouteCalculated(fromDept, toDept);
  };

  return (
    <Card glass={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
          <Navigation className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Step-by-Step Wayfinding Navigator</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">Indoor navigation for hospital visits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1 block">Starting Location</label>
          <select
            value={fromDept}
            onChange={(e) => setFromDept(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-teal-600"
          >
            {depts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1 block">Destination</label>
          <select
            value={toDept}
            onChange={(e) => setToDept(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-teal-600"
          >
            {depts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button variant="primary" onClick={handleStartNav} className="w-full">
        <MapPin className="w-4 h-4 mr-1.5" />
        <span>Calculate Indoor Route</span>
      </Button>

      {isNavigating && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-teal-800 dark:text-teal-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Turn-by-Turn Guidance</span>
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-normal">
              <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>~2 mins walk</span>
            </span>
          </div>

          <div className="space-y-2">
            {steps.map((st) => (
              <div key={st.step} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {st.step}
                </span>
                <span>{st.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
