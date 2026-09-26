import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingWizard } from './pages/OnboardingWizard';
import { DashboardPage } from './pages/DashboardPage';
import { HealthPassportPage } from './pages/HealthPassportPage';
import { ReportsPage } from './pages/ReportsPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { SimplifyReportPage } from './pages/SimplifyReportPage';
import { PrivacyHealthCenterPage } from './pages/PrivacyHealthCenterPage';
import { MedicationManagerPage } from './pages/MedicationManagerPage';
import { DoctorPrepPage } from './pages/DoctorPrepPage';
import { FamilyHubPage } from './pages/FamilyHubPage';
import { DailyCheckinPage } from './pages/DailyCheckinPage';
import { VaccinationTrackerPage } from './pages/VaccinationTrackerPage';
import { HospitalNavPage } from './pages/HospitalNavPage';
import { EmergencyScreenPage } from './pages/EmergencyScreenPage';
import { PublicEmergencyPage } from './pages/PublicEmergencyPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Public Landing & Auth Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/onboarding" element={<OnboardingWizard />} />

            {/* Public Emergency Token View (Accessible without login via QR code) */}
            <Route path="/emergency/:publicToken" element={<PublicEmergencyPage />} />

            {/* Application Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/passport" element={<HealthPassportPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/:id" element={<ReportDetailPage />} />
            <Route path="/simplify-report" element={<SimplifyReportPage />} />
            <Route path="/privacy" element={<PrivacyHealthCenterPage />} />
            <Route path="/medications" element={<MedicationManagerPage />} />
            <Route path="/doctor-prep" element={<DoctorPrepPage />} />
            <Route path="/family" element={<FamilyHubPage />} />
            <Route path="/daily-checkin" element={<DailyCheckinPage />} />
            <Route path="/vaccinations" element={<VaccinationTrackerPage />} />
            <Route path="/hospital-nav" element={<HospitalNavPage />} />
            <Route path="/emergency" element={<EmergencyScreenPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
