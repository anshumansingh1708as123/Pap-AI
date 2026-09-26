import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Camera, Upload, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [tokenInput, setTokenInput] = useState('emg_rahul_sharma_7721');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    setIsScanning(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access warning:', err);
      setCameraError('Camera access unavailable. You can enter or paste token directly.');
      setIsScanning(false);
    }
  };

  const handleInspectToken = (tokenToInspect?: string) => {
    const targetToken = (tokenToInspect || tokenInput || 'emg_rahul_sharma_7721')
      .trim()
      .replace(/^.*\/emergency\//, ''); // Clean URL if full link pasted

    onClose();
    navigate(`/emergency/${targetToken}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Emergency QR Code & Badge Scanner">
      <div className="space-y-5">
        <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 text-xs text-teal-800 dark:text-teal-200 flex items-center gap-2.5">
          <QrCode className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <span>
            Scan a paramedic physical QR badge or paste an emergency token code to view permission-bounded health details.
          </span>
        </div>

        {/* Camera Scanner Container */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          {isScanning ? (
            <div className="relative w-full h-48 bg-black rounded-xl overflow-hidden flex items-center justify-center border-2 border-teal-500">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-teal-400/80 rounded-xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-2 bg-teal-600/90 text-white font-bold text-[10px] px-3 py-0.5 rounded-full">
                ALIGN QR CODE IN FRAME
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950/60 space-y-3">
              <Camera className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto" />
              <p className="text-xs text-slate-600 dark:text-slate-300">Live Camera Stream for Physical Badges</p>
              <Button variant="outline" size="sm" onClick={startCamera}>
                <span>Activate Camera Scanner</span>
              </Button>
            </div>
          )}

          {cameraError && <p className="text-xs text-amber-600 dark:text-amber-400">{cameraError}</p>}
        </div>

        {/* Manual Token / URL Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            Or Paste Emergency URL / Public Token ID:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="e.g. emg_rahul_sharma_7721 or https://healink.app/emergency/..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-teal-700 dark:text-teal-400 focus:outline-none focus:border-teal-500"
            />
            <Button variant="primary" size="sm" onClick={() => handleInspectToken()}>
              <span>Inspect</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
