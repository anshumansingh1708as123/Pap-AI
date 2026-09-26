import React, { useState } from 'react';
import { Pill, Plus, CheckCircle2, Clock, AlertTriangle, Trash2, Info } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useMedications } from '../hooks/useMedications';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useNotification } from '../context/NotificationContext';

export const MedicationManagerPage: React.FC = () => {
  const { medications, addMedication, toggleActive, deleteMedication } = useMedications();
  const { showToast } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily (Morning)',
    prescribing_doctor: 'Dr. Vikram Seth',
    instructions: 'Take after food',
  });

  const [takenDoses, setTakenDoses] = useState<Record<string, boolean>>({
    'med-1': true, // Metformin breakfast taken
  });

  const handleToggleDose = (id: string) => {
    setTakenDoses((prev) => {
      const next = !prev[id];
      showToast(
        next ? 'Dose Logged as Taken' : 'Dose Unmarked',
        next ? 'Recorded in daily adherence log.' : 'Updated dose log.',
        next ? 'success' : 'info'
      );
      return { ...prev, [id]: next };
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.dosage) return;
    addMedication({
      name: form.name,
      dosage: form.dosage,
      frequency: form.frequency,
      prescribing_doctor: form.prescribing_doctor,
      instructions: form.instructions,
      active: true,
    });
    setIsModalOpen(false);
    setForm({ name: '', dosage: '', frequency: 'Once daily (Morning)', prescribing_doctor: 'Dr. Vikram Seth', instructions: '' });
    showToast('Medication Added', 'New prescription bound to Health Passport.', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-indigo-400" />
              <h1 className="text-2xl font-extrabold text-slate-100">Medication Manager & Adherence Checklist</h1>
            </div>
            <p className="text-xs text-slate-400">Track daily doses and active prescription schedules</p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Prescription</span>
          </Button>
        </div>

        {/* Medical Safety Invariant Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5 shadow-sm">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            <strong className="text-sky-300 font-semibold">Interaction Safety Notice:</strong> Medication interaction checking is not configured yet. Always verify potential drug-drug interactions directly with your prescribing physician or pharmacist.
          </span>
        </div>

        {/* Today's Dosage Checklist */}
        <Card glass className="border border-indigo-950 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Today's Daily Dose Checklist</span>
            </h3>
            <span className="text-xs text-slate-400">
              {Object.values(takenDoses).filter(Boolean).length} / {medications.filter((m) => m.active).length} Doses Logged
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {medications
              .filter((m) => m.active)
              .map((med) => {
                const isTaken = takenDoses[med.id];
                return (
                  <div
                    key={med.id}
                    onClick={() => handleToggleDose(med.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isTaken
                        ? 'bg-emerald-950/30 border-emerald-800/60 text-slate-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-500/40'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold">{med.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {med.dosage} • {med.frequency}
                      </p>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isTaken ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Active Prescriptions Table */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-100">All Prescriptions ({medications.length})</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((med) => (
              <Card key={med.id} glass className="border border-slate-800/80 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-100">{med.name}</h4>
                      <Badge variant={med.active ? 'active' : 'neutral'}>
                        {med.active ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                    <p className="text-xs text-indigo-300 font-semibold mt-1">Dosage: {med.dosage}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleActive(med.id)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                    >
                      {med.active ? 'Pause' : 'Resume'}
                    </button>
                    <button
                      onClick={() => deleteMedication(med.id)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded hover:bg-rose-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                  <p><strong className="text-slate-300">Frequency:</strong> {med.frequency}</p>
                  <p><strong className="text-slate-300">Doctor:</strong> {med.prescribing_doctor}</p>
                  {med.instructions && <p className="italic text-slate-400">"{med.instructions}"</p>}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal: Add Medication */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Medication">
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Medication Trade / Generic Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Metformin HCl, Telmisartan"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Dose Strength</label>
                <input
                  type="text"
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  placeholder="e.g. 500 mg, 40 mg"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Frequency</label>
                <select
                  value={form.frequency}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                >
                  <option value="Once daily (Morning)">Once daily (Morning)</option>
                  <option value="Twice daily (BD)">Twice daily (Breakfast & Dinner)</option>
                  <option value="Three times daily (TDS)">Three times daily (TDS)</option>
                  <option value="As needed (SOS)">As needed (SOS)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Prescribing Physician</label>
              <input
                type="text"
                value={form.prescribing_doctor}
                onChange={(e) => setForm({ ...form, prescribing_doctor: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Instructions</label>
              <input
                type="text"
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                placeholder="Take immediately after meals..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Save Medication
            </Button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
