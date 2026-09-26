import React, { useState } from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { HospitalMapSVG } from '../components/hospital/HospitalMapSVG';
import { RouteNavigator } from '../components/hospital/RouteNavigator';

export const HospitalNavPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('opd');
  const [activeRoutePath, setActiveRoutePath] = useState<string[]>(['entrance', 'opd', 'pathology']);

  const handleRouteCalc = (from: string, to: string) => {
    setSelectedDept(to);
    setActiveRoutePath([from, to]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">In-Hospital Map & Route Navigator</h1>
          </div>
          <p className="text-xs text-slate-400">Interactive hospital blueprint & indoor wayfinding guidance</p>
        </div>

        {/* SVG Blueprint Map */}
        <HospitalMapSVG
          activeDeptId={selectedDept}
          routePath={activeRoutePath}
          onSelectDept={(id) => setSelectedDept(id)}
        />

        {/* Wayfinding Controls */}
        <RouteNavigator onRouteCalculated={handleRouteCalc} />
      </div>
    </DashboardLayout>
  );
};
