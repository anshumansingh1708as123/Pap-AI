import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Pill,
  Stethoscope,
  Users,
  CalendarCheck,
  Syringe,
  MapPin,
  ShieldAlert,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Health Passport', icon: ShieldCheck, path: '/passport' },
    { label: 'Medical Reports & AI', icon: FileText, path: '/reports' },
    { label: 'Medications', icon: Pill, path: '/medications' },
    { label: 'Doctor Visit Prep', icon: Stethoscope, path: '/doctor-prep' },
    { label: 'Family Hub', icon: Users, path: '/family' },
    { label: 'Daily Check-in', icon: CalendarCheck, path: '/daily-checkin' },
    { label: 'Vaccination Tracker', icon: Syringe, path: '/vaccinations' },
    { label: 'Hospital Navigator', icon: MapPin, path: '/hospital-nav' },
    { label: 'Emergency Screen', icon: ShieldAlert, path: '/emergency', isEmergency: true },
    { label: 'Settings & Visibility', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-30 w-64 glass-panel border-r border-slate-800/80 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between md:hidden pb-3 border-b border-slate-800">
            <span className="text-sm font-bold text-slate-200">HEALINK Menu</span>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">
              Main Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200',
                      isActive
                        ? item.isEmergency
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                          : 'bg-teal-600/20 text-teal-300 border border-teal-500/40 shadow-sm'
                        : item.isEmergency
                        ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-200'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    )
                  }
                >
                  <Icon className={cn('w-4 h-4 shrink-0', item.isEmergency && 'text-rose-400')} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-[11px] leading-relaxed">
            <p className="font-semibold text-slate-300 mb-0.5">HEALINK v1.0 Hackathon</p>
            <p>Your Health. One Place. Even when you can't speak.</p>
          </div>
        </div>
      </aside>
    </>
  );
};
