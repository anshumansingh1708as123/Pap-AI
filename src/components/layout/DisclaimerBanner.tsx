import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200/90 text-xs sm:text-sm font-medium shadow-sm ${className}`}>
      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
      <span>
        <strong className="font-semibold text-amber-300">Medical Disclaimer:</strong> Informational and educational assistance only. Always consult a qualified physician for clinical care.
      </span>
    </div>
  );
};
