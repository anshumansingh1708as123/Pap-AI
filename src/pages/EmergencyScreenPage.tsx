import React, { useState } from 'react';
import { ShieldAlert, QrCode, Phone, Volume2, AlertTriangle, Share2 } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useEmergencyProfile } from '../hooks/useEmergencyProfile';
import { useAuth } from '../context/AuthContext';
import { EmergencyCardView } from '../components/emergency/EmergencyCardView';
import { EmergencyActionModal } from '../components/emergency/EmergencyActionModal';
import { QRConfigurator } from '../components/emergency/QRConfigurator';
import { Button } from '../components/ui/Button';

export const EmergencyScreenPage: React.FC = () => {
  const { profile } = useAuth();
  const token = profile?.public_emergency_token || 'emg_rahul_sharma_7721';
  const { data, loading } = useEmergencyProfile(token);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-950/80 animate-pulse">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">EMERGENCY SOS MODE</h1>
              <p className="text-xs text-rose-200">
                High-priority emergency card for paramedics and first responders
              </p>
            </div>
          </div>

          <Button variant="emergency" size="md" onClick={() => setIsActionModalOpen(true)}>
            <AlertTriangle className="w-5 h-5 mr-1.5" />
            <span>TRIGGER RAPID ASSIST MODAL</span>
          </Button>
        </div>

        {/* Emergency Card View */}
        {data && <EmergencyCardView data={data} />}

        {/* QR Configurator */}
        <QRConfigurator />

        {/* Action Modal */}
        <EmergencyActionModal
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          data={data}
        />
      </div>
    </DashboardLayout>
  );
};
