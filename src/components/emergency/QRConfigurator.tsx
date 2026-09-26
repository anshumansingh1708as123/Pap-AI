import React, { useState, useEffect, useCallback } from 'react';
import { QrCode, Download, Copy, Check, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateEmergencyQRDataUrl, getPublicEmergencyUrl } from '../../lib/qr';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const QRConfigurator: React.FC = () => {
  const { profile, updateProfileState } = useAuth();
  const { showToast } = useNotification();

  const token = profile?.public_emergency_token || 'emg_rahul_sharma_7721';
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

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
    const url = await generateEmergencyQRDataUrl(token);
    setQrDataUrl(url);
  }, [token]);

  useEffect(() => {
    renderQR();
  }, [renderQR]);

  const handleToggle = (key: keyof typeof visibility) => {
    const updated = { ...visibility, [key]: !visibility[key] };
    setVisibility(updated);
    updateProfileState({ emergency_visibility_config: updated });
    showToast('Emergency QR Visibility Updated', 'Changes applied to public emergency token.', 'success');
  };

  const handleCopyLink = () => {
    const publicUrl = getPublicEmergencyUrl(token);
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    showToast('Emergency Link Copied', publicUrl, 'info');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `HEALINK_Emergency_QR_${profile?.full_name?.replace(/\s+/g, '_') || 'Passport'}.png`;
    a.click();
    showToast('QR Code Saved', 'Downloaded PNG image of your emergency QR.', 'success');
  };

  return (
    <Card glass className="border border-teal-500/30">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="p-3 rounded-2xl bg-teal-950 border border-teal-800 text-teal-300">
          <QrCode className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">Emergency QR & Privacy Bounding</h3>
          <p className="text-xs text-slate-400">
            Control exactly what data paramedics see when scanning your physical QR badge.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: QR Canvas Preview */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-teal-500/40 relative">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Emergency Health QR Code" className="w-48 h-48 rounded-lg" />
            ) : (
              <div className="w-48 h-48 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-xs">
                Generating QR...
              </div>
            )}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
              SCAN IN EMERGENCY
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-xs font-semibold text-slate-300">Public Token ID</p>
            <p className="text-xs font-mono text-teal-400 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800/40">
              {token}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full pt-2">
            <Button variant="outline" size="sm" onClick={handleDownloadQR} className="flex-1">
              <Download className="w-4 h-4 mr-1" />
              <span>Save PNG</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCopyLink} className="flex-1">
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </Button>
          </div>
        </div>

        {/* Right: Visibility Toggles */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
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
                    ? 'bg-slate-900 border-teal-500/40 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{item.label}</h4>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
                <div className="p-1.5 rounded-lg text-slate-300">
                  {isVisible ? <Eye className="w-4 h-4 text-teal-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
