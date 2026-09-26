import React from 'react';
import { Activity, Calendar, Trash2 } from 'lucide-react';
import { Condition } from '../../types/database.types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { formatDate } from '../../lib/utils';

interface ConditionCardProps {
  condition: Condition;
  onDelete?: (id: string) => void;
  readOnly?: boolean;
}

export const ConditionCard: React.FC<ConditionCardProps> = ({ condition, onDelete, readOnly = false }) => {
  return (
    <Card hoverEffect className="border-indigo-950/40 relative group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">{condition.condition_name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={condition.status === 'Active' ? 'active' : 'managed'}>
                {condition.status}
              </Badge>
              <Badge variant={condition.severity === 'Severe' ? 'severe' : 'mild'}>
                {condition.severity}
              </Badge>
            </div>
          </div>
        </div>

        {!readOnly && onDelete && (
          <button
            onClick={() => onDelete(condition.id)}
            className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove condition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
        {condition.diagnosed_date && (
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Diagnosed: {formatDate(condition.diagnosed_date)}</span>
          </div>
        )}
        {condition.notes && <p className="text-slate-400 leading-relaxed">{condition.notes}</p>}
      </div>
    </Card>
  );
};
