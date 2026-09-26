import React, { useState } from 'react';
import { ShieldCheck, Plus, UserCheck, AlertOctagon, Activity, Heart, Save } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useHealthPassport } from '../hooks/useHealthPassport';
import { PassportCompletionMeter } from '../components/passport/PassportCompletionMeter';
import { AllergyCard } from '../components/passport/AllergyCard';
import { ConditionCard } from '../components/passport/ConditionCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { calculatePassportCompletion } from '../lib/utils';
import { useNotification } from '../context/NotificationContext';
import { useMedications } from '../hooks/useMedications';

export const HealthPassportPage: React.FC = () => {
  const { profile, updateProfileState } = useAuth();
  const { allergies, conditions, vitals, addAllergy, deleteAllergy, addCondition, deleteCondition, addVital } = useHealthPassport();
  const { medications } = useMedications();
  const { showToast } = useNotification();

  const [isBioEditing, setIsBioEditing] = useState(false);
  const [bioForm, setBioForm] = useState({
    full_name: profile?.full_name || 'Rahul Sharma',
    dob: profile?.dob || '1992-08-14',
    blood_group: profile?.blood_group || 'B+',
    phone: profile?.phone || '+91 98765 43210',
    emergency_contact_name: profile?.emergency_contact_name || 'Ananya Sharma',
    emergency_contact_phone: profile?.emergency_contact_phone || '+91 98765 00000',
    primary_physician: profile?.primary_physician || 'Dr. Vikram Seth',
    insurance_provider: profile?.insurance_provider || 'Star Health Plan',
    insurance_policy_no: profile?.insurance_policy_no || 'SH-8874-9021',
    organ_donor: profile?.organ_donor ?? true,
  });

  // Modal States
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [allergyForm, setAllergyForm] = useState<{ allergen: string; severity: 'Severe' | 'Moderate' | 'Mild'; reaction: string; notes: string }>({
    allergen: '',
    severity: 'Severe',
    reaction: '',
    notes: '',
  });

  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);
  const [conditionForm, setConditionForm] = useState<{ condition_name: string; diagnosed_date: string; status: 'Active' | 'Managed' | 'In Remission' | 'Resolved'; severity: 'Severe' | 'Moderate' | 'Mild'; notes: string }>({
    condition_name: '',
    diagnosed_date: '',
    status: 'Active',
    severity: 'Moderate',
    notes: '',
  });

  const [isVitalModalOpen, setIsVitalModalOpen] = useState(false);
  const [vitalForm, setVitalForm] = useState({
    blood_pressure_sys: 120,
    blood_pressure_dia: 80,
    heart_rate: 72,
    spo2: 98,
    blood_sugar: 110,
    weight_kg: 74.5,
    height_cm: 178,
  });

  const completionMetrics = calculatePassportCompletion(profile, allergies, conditions, medications, vitals);

  const handleSaveBio = () => {
    updateProfileState(bioForm);
    setIsBioEditing(false);
    showToast('Passport Bio Saved', 'Your central health profile has been updated.', 'success');
  };

  const handleAddAllergySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allergyForm.allergen || !allergyForm.reaction) return;
    addAllergy(allergyForm);
    setIsAllergyModalOpen(false);
    setAllergyForm({ allergen: '', severity: 'Severe', reaction: '', notes: '' });
    showToast('Allergy Added', 'New allergy registered in Health Passport.', 'success');
  };

  const handleAddConditionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conditionForm.condition_name) return;
    addCondition(conditionForm);
    setIsConditionModalOpen(false);
    setConditionForm({ condition_name: '', diagnosed_date: '', status: 'Active', severity: 'Moderate', notes: '' });
    showToast('Condition Added', 'Medical condition updated.', 'success');
  };

  const handleAddVitalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVital(vitalForm);
    setIsVitalModalOpen(false);
    showToast('Vitals Logged', 'New vital measurements recorded.', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <h1 className="text-2xl font-extrabold text-slate-100">Central Health Passport</h1>
            </div>
            <p className="text-xs text-slate-400">Universal single source of health truth</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAllergyModalOpen(true)}>
              <Plus className="w-4 h-4 mr-1" />
              <span>Add Allergy</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsConditionModalOpen(true)}>
              <Plus className="w-4 h-4 mr-1" />
              <span>Add Condition</span>
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsVitalModalOpen(true)}>
              <Activity className="w-4 h-4 mr-1" />
              <span>Log Vitals</span>
            </Button>
          </div>
        </div>

        <PassportCompletionMeter metrics={completionMetrics} />

        {/* Profile Bio Section */}
        <Card glass className="border border-teal-500/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-teal-400" />
              <h3 className="text-base font-bold text-slate-100">Passport Holder Bio & Insurance</h3>
            </div>
            <Button
              variant={isBioEditing ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => (isBioEditing ? handleSaveBio() : setIsBioEditing(true))}
            >
              {isBioEditing ? <Save className="w-4 h-4 mr-1" /> : null}
              <span>{isBioEditing ? 'Save Bio' : 'Edit Profile'}</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Full Legal Name</label>
              {isBioEditing ? (
                <input
                  type="text"
                  value={bioForm.full_name}
                  onChange={(e) => setBioForm({ ...bioForm, full_name: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                />
              ) : (
                <p className="font-bold text-slate-100">{profile?.full_name}</p>
              )}
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Blood Group</label>
              {isBioEditing ? (
                <select
                  value={bioForm.blood_group}
                  onChange={(e) => setBioForm({ ...bioForm, blood_group: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="font-bold text-teal-400">{profile?.blood_group}</p>
              )}
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Emergency Contact Phone</label>
              {isBioEditing ? (
                <input
                  type="text"
                  value={bioForm.emergency_contact_phone}
                  onChange={(e) => setBioForm({ ...bioForm, emergency_contact_phone: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                />
              ) : (
                <p className="font-mono text-slate-200">{profile?.emergency_contact_phone}</p>
              )}
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Primary Care Physician</label>
              {isBioEditing ? (
                <input
                  type="text"
                  value={bioForm.primary_physician}
                  onChange={(e) => setBioForm({ ...bioForm, primary_physician: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                />
              ) : (
                <p className="text-slate-200">{profile?.primary_physician}</p>
              )}
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Insurance Provider & Policy</label>
              {isBioEditing ? (
                <input
                  type="text"
                  value={bioForm.insurance_provider}
                  onChange={(e) => setBioForm({ ...bioForm, insurance_provider: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                />
              ) : (
                <p className="text-slate-200">{profile?.insurance_provider} ({profile?.insurance_policy_no})</p>
              )}
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Organ Donor Status</label>
              <p className="font-semibold text-emerald-400">
                {profile?.organ_donor ? 'Registered Donor' : 'Not Registered'}
              </p>
            </div>
          </div>
        </Card>

        {/* Allergies & Conditions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-400" />
                <span>Allergies ({allergies.length})</span>
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setIsAllergyModalOpen(true)}>
                + Add Allergy
              </Button>
            </div>
            <div className="space-y-3">
              {allergies.map((a) => (
                <AllergyCard key={a.id} allergy={a} onDelete={deleteAllergy} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                <span>Chronic Conditions ({conditions.length})</span>
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setIsConditionModalOpen(true)}>
                + Add Condition
              </Button>
            </div>
            <div className="space-y-3">
              {conditions.map((c) => (
                <ConditionCard key={c.id} condition={c} onDelete={deleteCondition} />
              ))}
            </div>
          </div>
        </div>

        {/* Modal: Add Allergy */}
        <Modal isOpen={isAllergyModalOpen} onClose={() => setIsAllergyModalOpen(false)} title="Add Flagged Allergy">
          <form onSubmit={handleAddAllergySubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Allergen Name</label>
              <input
                type="text"
                value={allergyForm.allergen}
                onChange={(e) => setAllergyForm({ ...allergyForm, allergen: e.target.value })}
                placeholder="e.g., Penicillin, Peanuts, Latex"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Severity Level</label>
              <select
                value={allergyForm.severity}
                onChange={(e) => setAllergyForm({ ...allergyForm, severity: e.target.value as 'Severe' | 'Moderate' | 'Mild' })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
              >
                <option value="Severe">Severe (Anaphylaxis Risk)</option>
                <option value="Moderate">Moderate (Hives, Throat Swelling)</option>
                <option value="Mild">Mild (Rhinitis, Rash)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Reaction Symptoms</label>
              <input
                type="text"
                value={allergyForm.reaction}
                onChange={(e) => setAllergyForm({ ...allergyForm, reaction: e.target.value })}
                placeholder="e.g. Facial swelling, hives, difficulty breathing"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Special Clinical Notes</label>
              <textarea
                value={allergyForm.notes}
                onChange={(e) => setAllergyForm({ ...allergyForm, notes: e.target.value })}
                placeholder="Carry EpiPen, strict avoidance..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 h-20 resize-none"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Save Allergy to Passport
            </Button>
          </form>
        </Modal>

        {/* Modal: Add Condition */}
        <Modal isOpen={isConditionModalOpen} onClose={() => setIsConditionModalOpen(false)} title="Add Chronic Condition">
          <form onSubmit={handleAddConditionSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Condition Name</label>
              <input
                type="text"
                value={conditionForm.condition_name}
                onChange={(e) => setConditionForm({ ...conditionForm, condition_name: e.target.value })}
                placeholder="e.g. Type 2 Diabetes, Hypertension"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Diagnosed Date</label>
                <input
                  type="date"
                  value={conditionForm.diagnosed_date}
                  onChange={(e) => setConditionForm({ ...conditionForm, diagnosed_date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Status</label>
                <select
                  value={conditionForm.status}
                  onChange={(e) => setConditionForm({ ...conditionForm, status: e.target.value as 'Active' | 'Managed' | 'In Remission' | 'Resolved' })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                >
                  <option value="Active">Active</option>
                  <option value="Managed">Managed</option>
                  <option value="In Remission">In Remission</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Save Condition to Passport
            </Button>
          </form>
        </Modal>

        {/* Modal: Log Vitals */}
        <Modal isOpen={isVitalModalOpen} onClose={() => setIsVitalModalOpen(false)} title="Log Current Vitals">
          <form onSubmit={handleAddVitalSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={vitalForm.blood_pressure_sys}
                  onChange={(e) => setVitalForm({ ...vitalForm, blood_pressure_sys: parseInt(e.target.value) || 120 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Diastolic BP (mmHg)</label>
                <input
                  type="number"
                  value={vitalForm.blood_pressure_dia}
                  onChange={(e) => setVitalForm({ ...vitalForm, blood_pressure_dia: parseInt(e.target.value) || 80 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Blood Sugar (mg/dL)</label>
                <input
                  type="number"
                  value={vitalForm.blood_sugar}
                  onChange={(e) => setVitalForm({ ...vitalForm, blood_sugar: parseInt(e.target.value) || 110 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={vitalForm.heart_rate}
                  onChange={(e) => setVitalForm({ ...vitalForm, heart_rate: parseInt(e.target.value) || 74 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Record Measurements
            </Button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
