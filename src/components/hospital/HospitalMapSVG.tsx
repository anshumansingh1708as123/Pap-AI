import React from 'react';

interface HospitalMapSVGProps {
  activeDeptId?: string;
  routePath?: string[];
  onSelectDept?: (id: string) => void;
}

export const HospitalMapSVG: React.FC<HospitalMapSVGProps> = ({
  activeDeptId,
  routePath = [],
  onSelectDept,
}) => {
  const departments = [
    { id: 'entrance', label: 'Main Entrance & Triage', x: 50, y: 320, width: 140, height: 60, color: '#0d9488' },
    { id: 'emergency', label: 'Emergency Trauma / ICU', x: 220, y: 320, width: 160, height: 60, color: '#e11d48' },
    { id: 'billing', label: 'Admission & Billing Desk', x: 410, y: 320, width: 150, height: 60, color: '#4f46e5' },
    { id: 'opd', label: 'OPD Clinics (Cardio & Diabetes)', x: 50, y: 180, width: 180, height: 70, color: '#0284c7' },
    { id: 'radiology', label: 'Radiology (CT Scan & MRI)', x: 260, y: 180, width: 160, height: 70, color: '#d97706' },
    { id: 'pathology', label: 'Pathology & Blood Diagnostics Lab', x: 440, y: 180, width: 190, height: 70, color: '#16a34a' },
    { id: 'pharmacy', label: '24/7 Outpatient Pharmacy', x: 200, y: 50, width: 220, height: 80, color: '#9333ea' },
  ];

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 text-xs text-slate-400 border-b border-slate-800 pb-2">
        <span className="font-bold text-slate-200">MAX SUPER SPECIALITY HOSPITAL - GROUND FLOOR BLUEPRINT</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Emergency Trauma</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" /> Triage/Entrance</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Pathology Lab</span>
        </div>
      </div>

      <svg viewBox="0 0 680 410" className="w-full h-auto max-h-[420px] select-none">
        {/* Background corridor grid pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        <rect width="680" height="410" fill="url(#grid)" rx="12" />

        {/* Corridors / Connecting Walkways */}
        <rect x="30" y="270" width="620" height="30" fill="#1e293b" rx="4" />
        <rect x="30" y="140" width="620" height="25" fill="#1e293b" rx="4" />
        <rect x="120" y="140" width="25" height="160" fill="#1e293b" />
        <rect x="300" y="50" width="25" height="250" fill="#1e293b" />
        <rect x="520" y="140" width="25" height="160" fill="#1e293b" />

        {/* Route Line Animation overlay if route requested */}
        {routePath.length > 1 && (
          <path
            d="M 120 320 L 120 285 L 120 160 L 535 160 L 535 180"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="6"
            strokeDasharray="10 6"
            className="animate-pulse"
            strokeLinecap="round"
          />
        )}

        {/* Department Rectangles */}
        {departments.map((dept) => {
          const isSelected = activeDeptId === dept.id;
          const isInRoute = routePath.includes(dept.id);

          return (
            <g
              key={dept.id}
              onClick={() => onSelectDept && onSelectDept(dept.id)}
              className="cursor-pointer transition-transform hover:scale-[1.02] transform-origin-center"
            >
              <rect
                x={dept.x}
                y={dept.y}
                width={dept.width}
                height={dept.height}
                rx="10"
                fill={dept.color}
                fillOpacity={isSelected ? 0.95 : isInRoute ? 0.8 : 0.4}
                stroke={isSelected ? '#ffffff' : dept.color}
                strokeWidth={isSelected ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text
                x={dept.x + dept.width / 2}
                y={dept.y + dept.height / 2 + 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="700"
                className="pointer-events-none drop-shadow-md"
              >
                {dept.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
