import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glass = true,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-5 transition-all duration-300',
        glass ? 'glass-card' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800',
        hoverEffect && 'hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
