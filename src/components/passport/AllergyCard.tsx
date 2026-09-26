import React from 'react';
import { AlertOctagon, Trash2 } from 'lucide-react';
import { Allergy } from '../../types/database.types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface AllergyCardProps {
  allergy: Allergy;
  onDelete?: (id: string) => void;
  readOnly?: boolean;
}

export const AllergyCard: React.FC<AllergyCardProps> = ({ allergy, onDelete, readOnly = false }) => {
  const getBadgeVariant = (severity: string) => {
    if (severity === 'Severe') return 'severe';
    if (severity === 'Moderate') return 'moderate';
    return 'mild';
  };

  return (
    <Card hoverEffect className="border-rose-950/40 relative group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">{allergy.allergen}</h4>
            <Badge variant={getBadgeVariant(allergy.severity)} className="mt-1">
              {allergy.severity} Severity
            </Badge>
          </div>
        </div>

        {!readOnly && onDelete && (
          <button
            onClick={() => onDelete(allergy.id)}
            className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove allergy"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1 text-xs">
        <p className="text-slate-300">
          <strong className="text-slate-400 font-semibold">Reaction:</strong> {allergy.reaction}
        </p>
        {allergy.notes && (
          <p className="text-slate-400 italic">
            <strong className="not-italic text-slate-400 font-semibold">Note:</strong> {allergy.notes}
          </p>
        )}
      </div>
    </Card>
  );
};
