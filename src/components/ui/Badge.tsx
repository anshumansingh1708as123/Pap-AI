import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'severe' | 'moderate' | 'mild' | 'active' | 'managed' | 'completed' | 'overdue' | 'teal' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'teal',
  ...props
}) => {
  const styles = {
    severe: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
    moderate: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    mild: 'bg-sky-950/80 text-sky-300 border-sky-800/60',
    active: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    managed: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60',
    completed: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    overdue: 'bg-red-950/80 text-red-300 border-red-800/60',
    teal: 'bg-teal-950/80 text-teal-300 border-teal-800/60',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
