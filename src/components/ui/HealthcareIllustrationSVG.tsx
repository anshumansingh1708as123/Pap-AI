import React from 'react';

export const HealthcareIllustrationSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 540 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="540" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0fdf4" />
          <stop offset="1" stopColor="#ccfbf1" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d9488" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>

      {/* Soft rounded background container */}
      <rect width="540" height="380" rx="24" fill="url(#bgGrad)" />

      {/* Abstract floating circles */}
      <circle cx="450" cy="80" r="60" fill="#0d9488" fillOpacity="0.08" />
      <circle cx="80" cy="300" r="70" fill="#0284c7" fillOpacity="0.06" />

      {/* Central Tablet / Laptop Display Screen */}
      <rect x="130" y="80" width="280" height="190" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" filter="drop-shadow(0 10px 25px rgba(13, 148, 136, 0.12))" />
      <rect x="145" y="95" width="250" height="24" rx="6" fill="#f0fdf4" />
      <circle cx="160" cy="107" r="5" fill="#0d9488" />
      <rect x="175" y="103" width="80" height="8" rx="4" fill="#0f766e" />

      {/* Heart Rate / ECG Wave Pattern inside tablet */}
      <path d="M 150 160 L 200 160 L 215 130 L 230 190 L 245 145 L 260 170 L 275 160 L 370 160" fill="none" stroke="#0d9488" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dashboard Stats Bars */}
      <rect x="150" y="200" width="65" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="160" y="210" width="30" height="6" rx="3" fill="#64748b" />
      <rect x="160" y="222" width="45" height="12" rx="3" fill="#0d9488" />

      <rect x="230" y="200" width="65" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="240" y="210" width="30" height="6" rx="3" fill="#64748b" />
      <rect x="240" y="222" width="45" height="12" rx="3" fill="#0284c7" />

      <rect x="310" y="200" width="80" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="320" y="210" width="40" height="6" rx="3" fill="#64748b" />
      <rect x="320" y="222" width="55" height="12" rx="3" fill="#d97706" />

      {/* Friendly Healthcare Doctor Avatar Vector */}
      <g transform="translate(60, 110)">
        <circle cx="45" cy="40" r="28" fill="#fdba74" />
        {/* Hair */}
        <path d="M 22 35 C 22 15, 68 15, 68 35 C 68 25, 22 25, 22 35 Z" fill="#1e293b" />
        {/* Coat */}
        <path d="M 15 110 C 15 75, 75 75, 75 110 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 35 75 L 45 95 L 55 75" fill="none" stroke="#0d9488" strokeWidth="3" />
        {/* Stethoscope */}
        <path d="M 30 75 Q 45 105 60 75" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="45" cy="98" r="5" fill="#94a3b8" />
      </g>

      {/* Patient Avatar */}
      <g transform="translate(410, 130)">
        <circle cx="35" cy="35" r="24" fill="#fcd34d" />
        <path d="M 15 32 C 15 15, 55 15, 55 32 Z" fill="#475569" />
        <path d="M 10 90 C 10 60, 60 60, 60 90 Z" fill="#38bdf8" />
      </g>

      {/* Top Floating Shield Badge */}
      <g transform="translate(225, 20)">
        <path d="M 45 0 L 90 20 V 55 C 90 85 45 110 45 110 C 45 110 0 85 0 55 V 20 Z" fill="url(#shieldGrad)" filter="drop-shadow(0 6px 12px rgba(15, 118, 110, 0.3))" />
        <path d="M 45 35 V 75 M 25 55 H 65" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  );
};
