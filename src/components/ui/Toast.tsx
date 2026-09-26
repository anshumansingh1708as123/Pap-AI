import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useNotification, ToastMessage } from '../../context/NotificationContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onClose: () => void }> = ({ toast, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-200 dark:border-emerald-500/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100',
    error: 'border-rose-200 dark:border-rose-500/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100',
    warning: 'border-amber-200 dark:border-amber-500/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100',
    info: 'border-sky-200 dark:border-sky-500/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100',
  };

  return (
    <div className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300 ${borderColors[toast.type]}`}>
      {icons[toast.type]}
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{toast.title}</h4>
        {toast.message && <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{toast.message}</p>}
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
