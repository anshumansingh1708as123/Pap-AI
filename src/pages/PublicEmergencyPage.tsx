import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldAlert, Volume2, PhoneCall, HeartPulse, AlertTriangle, VolumeX, Phone } from 'lucide-react';
import { useEmergencyProfile } from '../hooks/useEmergencyProfile';
import { EmergencyCardView } from '../components/emergency/EmergencyCardView';
import { Button } from '../components/ui/Button';
import { speakText, stopSpeech } from '../lib/utils';

export const PublicEmergencyPage: React.FC = () => {
  const { publicToken } = useParams<{ publicToken: string }>();
  const token = publicToken || 'emg_rahul_sharma_7721';
  const { data, loading, error } = useEmergencyProfile(token);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSpeakSummary = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    if (!data) return;

    const severeAllergies = data.allergies.map((a) => `${a.allergen} causing ${a.reaction}`).join('. ');
    const activeMeds = data.active_medications.map((m) => `${m.name} ${m.dosage}`).join(', ');

    const textToSpeak = `
      Emergency Medical Passport for ${data.full_name}.
      Blood Group: ${data.blood_group || 'Unspecified'}.
      Emergency Contact: ${data.emergency_contact_name || 'Relative'} at ${data.emergency_contact_phone || 'Unspecified'}.
      ${severeAllergies ? `Severe Allergies: ${severeAllergies}.` : 'No severe allergies registered.'}
      ${activeMeds ? `Active Medications: ${activeMeds}.` : ''}
    `;

    setIsPlayingAudio(true);
    speakText(textToSpeak, () => setIsPlayingAudio(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <ShieldAlert className="w-12 h-12 text-rose-500 animate-pulse mx-auto" />
          <h2 className="text-xl font-bold">Verifying Emergency Token...</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">Loading permission-bounded health profile</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl border border-rose-300 dark:border-rose-800 shadow-xl">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold">Invalid Emergency Link</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">The public token could not be verified.</p>
          <Link to="/">
            <Button variant="primary" size="sm">Go to HEALINK Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const phoneToCall = data.emergency_contact_phone || '+91 98765 00000';
  const cleanPhone = phoneToCall.replace(/\s+/g, '');

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-slate-950 text-stone-900 dark:text-slate-100 p-4 sm:p-6 transition-colors duration-200 selection:bg-rose-500 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Prominent Direct Dial Banner for Emergency Contact */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 border-2 border-rose-500 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-rose-600 text-white shrink-0 shadow-lg">
              <PhoneCall className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black text-rose-300 tracking-wider block">
                DIRECT EMERGENCY CONTACT DIAL
              </span>
              <h2 className="text-lg font-extrabold text-white">
                Call {data.emergency_contact_name || 'Emergency Contact'} ({phoneToCall})
              </h2>
            </div>
          </div>

          <a
            href={`tel:${cleanPhone}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg shadow-rose-950/80 text-center transition-transform active:scale-95 shrink-0"
          >
            📞 CALL NOW ({phoneToCall})
          </a>
        </div>

        {/* Header Bar */}
        <header className="flex items-center justify-between pb-4 border-b border-rose-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white font-black shadow-lg shadow-rose-950/80">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">HEALINK</span>
              <span className="text-[10px] uppercase font-bold text-rose-400 block tracking-wider">
                PUBLIC EMERGENCY PROTOCOL
              </span>
            </div>
          </div>

          {/* Quick Audio Speech button */}
          <Button
            variant={isPlayingAudio ? 'danger' : 'primary'}
            size="sm"
            onClick={handleSpeakSummary}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 mr-1.5" /> : <Volume2 className="w-4 h-4 mr-1.5" />}
            <span>{isPlayingAudio ? 'Stop Speech' : '🔊 Speak Summary'}</span>
          </Button>
        </header>

        {/* Bounded Emergency Card */}
        <EmergencyCardView data={data} />

        {/* Footer info for paramedics */}
        <footer className="text-center text-[11px] text-slate-500 pt-6 border-t border-slate-900">
          <p>Verified Public Token: {token} • Data-minimized view generated by HEALINK Passport Engine</p>
        </footer>
      </div>
    </div>
  );
};
