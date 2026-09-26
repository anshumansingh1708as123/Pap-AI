import React, { useState, useEffect, useCallback } from 'react';
import { QrCode, Download, Copy, Check, Eye, EyeOff, ShieldCheck, Scan, PhoneCall, Globe, Contact } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateEmergencyQRDataUrl, getPublicEmergencyUrl, QRTargetType } from '../../lib/qr';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QRScannerModal } from './QRScannerModal';

export const QRConfigurator: React.FC = () => {
  const { profile, updateProfileState } = useAuth();
  const { showToast } = useNotification();

  const token = profile?.public_emergency_token || 'emg_rahul_sharma_7721';
  const emergencyPhone = profile?.emergency_contact_phone || '+91 98765 00000';
  const emergencyName = profile?.emergency_contact_name || 'Ananya Sharma';

  const [qrTarget, setQrTarget] = useState<QRTargetType>('direct_phone');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const [visibility, setVisibility] = useState(
    profile?.emergency_visibility_config || {
      show_blood_group: true,
      show_allergies: true,
      show_emergency_contacts: true,
      show_active_medications: true,
      show_chronic_conditions: true,
      show_insurance: false,
    }
  );

  const renderQR = useCallback(async () => {
    const url = await generateEmergencyQRDataUrl(
      token,
      qrTarget,
      emergencyPhone,
      emergencyName,
      profile?.full_name
    );
    setQrDataUrl(url);
  }, [token, qrTarget, emergencyPhone, emergencyName, profile?.full_name]);

  useEffect(() => {
    renderQR();
  }, [renderQR]);

  const handleToggle = async (key: keyof typeof visibility) => {
    const updated = { ...visibility, [key]: !visibility[key] };
    setVisibility(updated);
    await updateProfileState({ emergency_visibility_config: updated });
    showToast('Emergency QR Visibility Updated', 'Changes applied to public emergency token.', 'success');
  };

  const handleCopyLink = () => {
    const linkToCopy = qrTarget === 'direct_phone' ? `tel:${emergencyPhone.replace(/\s+/g, '')}` : getPublicEmergencyUrl(token);
    navigator.clipboard.writeText(linkToCopy);
    setCopiedLink(true);
    showToast('Link Copied', linkToCopy, 'info');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `HEALINK_Emergency_QR_${qrTarget}_${profile?.full_name?.replace(/\s+/g, '_') || 'Passport'}.png`;
    a.click();
    showToast('QR Code Saved', 'Downloaded PNG image of emergency QR.', 'success');
  };

  return (
    <>
      <Card glass={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Emergency QR & Target Action Configurator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Choose what action happens when a paramedic scans your physical QR badge.
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={() => setIsScannerOpen(true)}>
            <Scan className="w-4 h-4 mr-1.5 text-teal-600 dark:text-teal-400" />
            <span>Scan Emergency QR</span>
          </Button>
        </div>

        {/* Target Action Mode Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
            QR Scan Action Mode:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setQrTarget('direct_phone')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                qrTarget === 'direct_phone'
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-slate-900 dark:text-white shadow-md ring-1 ring-rose-500'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                <PhoneCall className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Direct Phone Call (tel:)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Scanning opens phone dialer immediately to call {emergencyName} ({emergencyPhone})
              </p>
            </button>

            <button
              type="button"
              onClick={() => setQrTarget('web_passport')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                qrTarget === 'web_passport'
                  ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-slate-900 dark:text-white shadow-md ring-1 ring-teal-500'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Web Health Passport</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Scanning opens web app showing allergies, active medications, and blood group
              </p>
            </button>

            <button
              type="button"
              onClick={() => setQrTarget('vcard_contact')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                qrTarget === 'vcard_contact'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-slate-900 dark:text-white shadow-md ring-1 ring-indigo-500'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                <Contact className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Save Contact (vCard)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Scanning prompts first responder to save Emergency Contact to address book
              </p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-3 border-t border-slate-200 dark:border-slate-800">
          {/* Left: QR Canvas Preview */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-rose-500/40 relative">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Emergency Health QR Code" className="w-48 h-48 rounded-lg" />
              ) : (
                <div className="w-48 h-48 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-xs">
                  Generating QR...
                </div>
              )}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                {qrTarget === 'direct_phone' ? 'SCAN TO CALL CONTACT' : qrTarget === 'vcard_contact' ? 'SCAN TO SAVE CONTACT' : 'SCAN IN EMERGENCY'}
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {qrTarget === 'direct_phone' ? `Emergency Dial Target: ${emergencyPhone}` : `Public Token ID: ${token}`}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full pt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadQR} className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                <span>Save PNG</span>
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCopyLink} className="flex-1">
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Target'}</span>
              </Button>
            </div>
          </div>

          {/* Right: Visibility Toggles */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Permission-Bounded Data Slice</span>
            </div>

            {[
              { key: 'show_blood_group', label: 'Blood Group (B+)', desc: 'Crucial for emergency transfusions' },
              { key: 'show_emergency_contacts', label: 'Emergency Contact Phone', desc: 'Allows first responders to notify family' },
              { key: 'show_allergies', label: 'Severe Allergies List', desc: 'Prevents fatal drug reactions (Penicillin)' },
              { key: 'show_active_medications', label: 'Active Medications', desc: 'Alerts paramedics to ongoing treatments' },
              { key: 'show_chronic_conditions', label: 'Chronic Conditions', desc: 'Includes T2 Diabetes, Hypertension' },
              { key: 'show_insurance', label: 'Insurance Provider & Policy', desc: 'Private financial details' },
            ].map((item) => {
              const isVisible = visibility[item.key as keyof typeof visibility];
              return (
                <div
                  key={item.key}
                  onClick={() => handleToggle(item.key as keyof typeof visibility)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isVisible
                      ? 'bg-white dark:bg-slate-900 border-teal-500/40 text-slate-800 dark:text-slate-200 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold">{item.label}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <div className="p-1.5 rounded-lg text-slate-400">
                    {isVisible ? <Eye className="w-4 h-4 text-teal-600 dark:text-teal-400" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <QRScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </>
  );
};
