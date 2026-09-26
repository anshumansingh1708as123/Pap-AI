import React, { useState } from 'react';
import { Syringe, Plus, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { LocalMockDB } from '../lib/demoData';
import { Vaccination } from '../types/database.types';
import { useNotification } from '../context/NotificationContext';

export const VaccinationTrackerPage: React.FC = () => {
  const { showToast } = useNotification();
  const [vaccines, setVaccines] = useState<Vaccination[]>(LocalMockDB.getVaccinations());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    vaccine_name: '',
    dose_number: 1,
    date_administered: new Date().toISOString().split('T')[0],
    administered_by: 'Max Healthcare Hospital',
    status: 'Completed' as const,
  });

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vaccine_name) return;
    const newRecord = LocalMockDB.addVaccination(form);
    setVaccines((prev) => [newRecord, ...prev]);
    setIsModalOpen(false);
    setForm({ vaccine_name: '', dose_number: 1, date_administered: new Date().toISOString().split('T')[0], administered_by: '', status: 'Completed' });
    showToast('Vaccine Record Added', 'Saved to your Health Passport immunization log.', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Syringe className="w-5 h-5 text-teal-400" />
              <h1 className="text-2xl font-extrabold text-slate-100">Vaccination & Immunization Passport</h1>
            </div>
            <p className="text-xs text-slate-400">Record completed vaccines and upcoming booster dues</p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Immunization Record</span>
          </Button>
        </div>

        {/* Vaccines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vaccines.map((v) => (
            <Card key={v.id} glass className="border border-slate-800/80 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-teal-950 border border-teal-800 text-teal-300">
                    <Syringe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{v.vaccine_name}</h3>
                    <p className="text-xs text-slate-400">Dose {v.dose_number}</p>
                  </div>
                </div>

                <Badge variant={v.status === 'Completed' ? 'completed' : 'overdue'}>
                  {v.status}
                </Badge>
              </div>

              <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                {v.date_administered && <p><strong className="text-slate-400">Administered:</strong> {v.date_administered}</p>}
                {v.next_due_date && <p><strong className="text-rose-400">Next Booster Due:</strong> {v.next_due_date}</p>}
                {v.administered_by && <p><strong className="text-slate-400">Facility:</strong> {v.administered_by}</p>}
              </div>
            </Card>
          ))}
        </div>

        {/* Modal: Add Vaccine */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Immunization Record">
          <form onSubmit={handleAddVaccine} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Vaccine Name</label>
              <input
                type="text"
                value={form.vaccine_name}
                onChange={(e) => setForm({ ...form, vaccine_name: e.target.value })}
                placeholder="e.g. COVID-19 Booster, Influenza"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Dose Number</label>
                <input
                  type="number"
                  value={form.dose_number}
                  onChange={(e) => setForm({ ...form, dose_number: parseInt(e.target.value) || 1 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Date Administered</label>
                <input
                  type="date"
                  value={form.date_administered}
                  onChange={(e) => setForm({ ...form, date_administered: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Administering Facility / Hospital</label>
              <input
                type="text"
                value={form.administered_by}
                onChange={(e) => setForm({ ...form, administered_by: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Save Immunization Record
            </Button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
