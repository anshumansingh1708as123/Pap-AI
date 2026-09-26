import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { UrgentSymptomModal } from '../emergency/UrgentSymptomModal';

export const SafetyGuardrailBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`w-full bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 transition-colors ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong className="font-semibold">Safety Guardrail Active:</strong> The AI prioritizes clinical safety over automation. Always consult a licensed doctor.
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-300 hover:underline shrink-0"
          >
            <span>Simulate Urgent Symptom Check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <UrgentSymptomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
