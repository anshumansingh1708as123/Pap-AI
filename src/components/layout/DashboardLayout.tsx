import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { SafetyGuardrailBar } from './SafetyGuardrailBar';
import { ToastContainer } from '../ui/Toast';

export const DashboardLayout: React.FC<{ children: React.ReactNode; showAIBanner?: boolean }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <SafetyGuardrailBar />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden min-w-0">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
