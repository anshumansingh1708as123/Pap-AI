import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

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
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Landing & Auth Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Public Emergency Token View (Accessible without login via QR code) */}
              <Route path="/emergency/:publicToken" element={<PublicEmergencyPage />} />

              {/* Protected Application Dashboard Routes */}
              <Route path="/onboarding" element={<ProtectedRoute><OnboardingWizard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/passport" element={<ProtectedRoute><HealthPassportPage /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
              <Route path="/reports/:id" element={<ProtectedRoute><ReportDetailPage /></ProtectedRoute>} />
              <Route path="/simplify-report" element={<ProtectedRoute><SimplifyReportPage /></ProtectedRoute>} />
              <Route path="/privacy" element={<ProtectedRoute><PrivacyHealthCenterPage /></ProtectedRoute>} />
              <Route path="/medications" element={<ProtectedRoute><MedicationManagerPage /></ProtectedRoute>} />
              <Route path="/doctor-prep" element={<ProtectedRoute><DoctorPrepPage /></ProtectedRoute>} />
              <Route path="/family" element={<ProtectedRoute><FamilyHubPage /></ProtectedRoute>} />
              <Route path="/daily-checkin" element={<ProtectedRoute><DailyCheckinPage /></ProtectedRoute>} />
              <Route path="/vaccinations" element={<ProtectedRoute><VaccinationTrackerPage /></ProtectedRoute>} />
              <Route path="/hospital-nav" element={<ProtectedRoute><HospitalNavPage /></ProtectedRoute>} />
              <Route path="/emergency" element={<ProtectedRoute><EmergencyScreenPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
