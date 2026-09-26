import React, { useState } from 'react';
import { Users, Plus, UserCheck, ShieldCheck, Heart, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { LocalMockDB } from '../lib/demoData';
import { FamilyMember } from '../types/database.types';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

export const FamilyHubPage: React.FC = () => {
  const { profile, updateProfileState } = useAuth();
  const { showToast } = useNotification();
  const [familyList, setFamilyList] = useState<FamilyMember[]>(LocalMockDB.getFamilyMembers());
  const [activeMemberId, setActiveMemberId] = useState<string>('self');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    relationship: 'Child',
    dob: '2020-01-01',
    blood_group: 'B+',
    notes: '',
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name) return;
    const newMember = LocalMockDB.addFamilyMember(form);
    setFamilyList((prev) => [newMember, ...prev]);
    setIsModalOpen(false);
    setForm({ full_name: '', relationship: 'Child', dob: '2020-01-01', blood_group: 'B+', notes: '' });
    showToast('Family Member Added', `${form.full_name} added to your family health hub.`, 'success');
  };

  const handleSwitchProfile = (memberId: string, name: string, bloodGroup?: string) => {
    setActiveMemberId(memberId);
    if (memberId !== 'self') {
      updateProfileState({ full_name: name, blood_group: bloodGroup || 'B+' });
      showToast('Switched Active Passport', `Viewing passport for ${name}`, 'info');
    } else {
      updateProfileState({ full_name: 'Rahul Sharma', blood_group: 'B+' });
      showToast('Switched Active Passport', 'Viewing primary passport for Rahul Sharma', 'info');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h1 className="text-2xl font-extrabold text-slate-100">Family Health Hub</h1>
            </div>
            <p className="text-xs text-slate-400">Manage dependent passports for children & elderly parents</p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Dependent</span>
          </Button>
        </div>

        {/* Profile Switcher Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Primary User Card */}
          <Card
            glass
            onClick={() => handleSwitchProfile('self', 'Rahul Sharma', 'B+')}
            className={`cursor-pointer transition-all duration-300 border ${
              activeMemberId === 'self'
                ? 'border-teal-500 bg-teal-950/40 shadow-xl shadow-teal-950/40 ring-1 ring-teal-500'
                : 'border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full">
                PRIMARY HOLDER
              </span>
              {activeMemberId === 'self' && <Badge variant="active">ACTIVE</Badge>}
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-2">Rahul Sharma</h3>
            <p className="text-xs text-slate-400">Self • Blood Group: B+</p>
          </Card>

          {/* Family Members */}
          {familyList.map((mem) => {
            const isSelected = activeMemberId === mem.id;
            return (
              <Card
                key={mem.id}
                glass
                onClick={() => handleSwitchProfile(mem.id, mem.full_name, mem.blood_group)}
                className={`cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full">
                    {mem.relationship}
                  </span>
                  {isSelected && <Badge variant="managed">ACTIVE</Badge>}
                </div>
                <h3 className="text-lg font-bold text-slate-100 mt-2">{mem.full_name}</h3>
                <p className="text-xs text-slate-400">Blood Group: {mem.blood_group || 'O+'}</p>
                {mem.notes && <p className="text-[11px] text-slate-500 italic mt-2">"{mem.notes}"</p>}
              </Card>
            );
          })}
        </div>

        {/* Modal: Add Family Member */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Dependent Family Profile">
          <form onSubmit={handleAddMember} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                placeholder="e.g., Aarav Sharma"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Relationship</label>
                <select
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                >
                  <option value="Child">Child (Son / Daughter)</option>
                  <option value="Parent">Parent (Mother / Father)</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Dependent">Other Dependent</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Blood Group</label>
                <select
                  value={form.blood_group}
                  onChange={(e) => setForm({ ...form, blood_group: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Medical Notes & Pediatric Details</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Pediatric vaccinations up to date, lactose sensitivity..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 h-20 resize-none"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Create Dependent Passport
            </Button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
