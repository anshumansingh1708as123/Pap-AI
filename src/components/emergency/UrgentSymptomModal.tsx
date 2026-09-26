import React from 'react';
import { AlertTriangle, PhoneCall, MapPin, CheckCircle, ShieldAlert, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface UrgentSymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UrgentSymptomModal: React.FC<UrgentSymptomModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⚠️ Safety Guardrail: Urgent Symptom Evaluation">
      <div className="space-y-5">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold">Possible Urgent Situation</h4>
            <p className="leading-relaxed">
              If you or someone around you is experiencing acute chest pain, sudden numbness, difficulty breathing, or severe bleeding, seek immediate emergency medical care. The AI does not diagnose or manage medical emergencies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="tel:108" className="block">
            <Button variant="danger" className="w-full py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Contact Emergency (108 / 911)</span>
            </Button>
          </a>

          <a href="https://maps.google.com/?q=hospital+urgent+care+near+me" target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-teal-600 text-teal-600 dark:text-teal-400">
              <MapPin className="w-4 h-4" />
              <span>Find Urgent Care Near Me</span>
            </Button>
          </a>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-500">
            <span>Continue to Learn</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
