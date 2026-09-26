import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Shield,
  HeartPulse,
  Lock,
  Sun,
  Moon,
  Type,
  Menu,
  X,
  UserCheck,
  Settings,
  LogOut,
  Users,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export const Navbar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const [fontScaleLg, setFontScaleLg] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (fontScaleLg) {
      document.documentElement.classList.add('text-scale-lg');
    } else {
      document.documentElement.classList.remove('text-scale-lg');
    }
  }, [fontScaleLg]);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'AI Assistant', path: '/reports' },
    { label: 'Reports & Analyzer', path: '/reports' },
    { label: 'Simplify Report', path: '/simplify-report' },
    { label: 'Health Records', path: '/passport' },
    { label: 'Doctor Prep', path: '/doctor-prep' },
    { label: 'Privacy / Health Center', path: '/privacy' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Logo & Brand Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                HEALINK
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                AI COMPANION
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'mint-pill-active shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side: Indicators & User Controls */}
        <div className="flex items-center gap-2.5">
          {/* Security Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>256-Bit Encrypted</span>
          </div>

          {/* Accessibility Font Size Toggle */}
          <button
            onClick={() => setFontScaleLg(!fontScaleLg)}
            title="Accessibility: Toggle Larger Font Size"
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-extrabold border transition-colors',
              fontScaleLg
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            )}
          >
            A+
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Light / Dark Mode"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                {profile?.blood_group || 'B+'}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-100 pr-2">
                {profile?.full_name?.split(' ')[0] || 'Rahul'}
              </span>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-xl border border-slate-200 dark:border-slate-800 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="font-bold text-slate-900 dark:text-white">{profile?.full_name || 'Rahul Sharma'}</p>
                  <p className="text-[11px] text-slate-500">Blood Group: {profile?.blood_group || 'B+'}</p>
                </div>
                <Link
                  to="/passport"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <UserCheck className="w-4 h-4 text-teal-600" />
                  <span>Health Records</span>
                </Link>
                <Link
                  to="/family"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>Family Hub</span>
                </Link>
                <Link
                  to="/privacy"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Privacy & Controls</span>
                </Link>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl mt-1 border-t border-slate-100 dark:border-slate-800"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
