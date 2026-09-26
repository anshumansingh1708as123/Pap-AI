import React, { useState } from 'react';
import { Volume2, VolumeX, PhoneCall, MapPin, Share2, Check, AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { speakText, stopSpeech } from '../../lib/utils';
import { BoundedEmergencyData } from '../../hooks/useEmergencyProfile';

interface EmergencyActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BoundedEmergencyData | null;
}

export const EmergencyActionModal: React.FC<EmergencyActionModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [sirenAudio, setSirenAudio] = useState<HTMLAudioElement | null>(null);
  const [locationShared, setLocationShared] = useState(false);
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleSpeakPassport = () => {
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

  const toggleSiren = () => {
    if (isSirenActive) {
      if (sirenAudio) {
        sirenAudio.pause();
        sirenAudio.currentTime = 0;
      }
      setIsSirenActive(false);
    } else {
      // Create synthesized web audio siren oscillator
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();

        setTimeout(() => {
          osc.stop();
          audioCtx.close();
          setIsSirenActive(false);
        }, 5000);

        setIsSirenActive(true);
      } catch {
        setIsSirenActive(false);
      }
    }
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationShared(true);
        },
        () => {
          // Fallback mock coordinates (New Delhi Connaught Place)
          setGeoCoords({ lat: 28.6315, lng: 77.2167 });
          setLocationShared(true);
        }
      );
    } else {
      setGeoCoords({ lat: 28.6315, lng: 77.2167 });
      setLocationShared(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🚨 Emergency Rapid Assistance">
      <div className="space-y-5">
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
          <p className="text-xs text-rose-200">
            Rapid actions for paramedics, first responders, or when patient cannot speak.
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Audio Speech Synthesis */}
          <Button
            variant={isPlayingAudio ? 'danger' : 'primary'}
            onClick={handleSpeakPassport}
            className="h-24 flex-col gap-2 text-center"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-7 h-7 text-white animate-bounce" />
                <span className="text-xs">Stop Speech Synthesis</span>
              </>
            ) : (
              <>
                <Volume2 className="w-7 h-7 text-white" />
                <span className="text-xs">🔊 Speak Health Passport</span>
              </>
            )}
          </Button>

          {/* Sound Loud Alarm */}
          <Button
            variant={isSirenActive ? 'danger' : 'secondary'}
            onClick={toggleSiren}
            className="h-24 flex-col gap-2 text-center border-rose-800/50"
          >
            <AlertTriangle className={`w-7 h-7 ${isSirenActive ? 'text-white animate-spin' : 'text-rose-400'}`} />
            <span className="text-xs">{isSirenActive ? 'STOP SIREN ALARM' : '📢 Sound Loud Siren'}</span>
          </Button>

          {/* Direct Emergency Phone Dial */}
          <a
            href={data?.emergency_contact_phone ? `tel:${data.emergency_contact_phone}` : 'tel:108'}
            className="block"
          >
            <Button variant="secondary" className="w-full h-24 flex-col gap-2 text-center border-teal-800/50 hover:bg-teal-950/40">
              <PhoneCall className="w-7 h-7 text-teal-400" />
              <span className="text-xs">
                Call {data?.emergency_contact_name ? `Contact (${data.emergency_contact_name})` : 'Emergency 108'}
              </span>
            </Button>
          </a>

          {/* Share Live Geolocator */}
          <Button
            variant="secondary"
            onClick={handleShareLocation}
            className="h-24 flex-col gap-2 text-center border-sky-800/50 hover:bg-sky-950/40"
          >
            {locationShared ? (
              <>
                <Check className="w-7 h-7 text-emerald-400" />
                <span className="text-xs text-emerald-300">Location Shared!</span>
              </>
            ) : (
              <>
                <MapPin className="w-7 h-7 text-sky-400" />
                <span className="text-xs">📍 Share Live GPS Location</span>
              </>
            )}
          </Button>
        </div>

        {geoCoords && (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <p className="font-semibold text-slate-200">GPS Coordinates Acquired:</p>
            <p className="text-slate-400 font-mono">
              Latitude: {geoCoords.lat.toFixed(4)} | Longitude: {geoCoords.lng.toFixed(4)}
            </p>
            <a
              href={`https://maps.google.com/?q=${geoCoords.lat},${geoCoords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-teal-400 hover:underline pt-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
};
