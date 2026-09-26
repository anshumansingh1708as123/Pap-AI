import React, { useState } from 'react';
import { FileText, Upload, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DocumentUploader } from '../components/reports/DocumentUploader';
import { ExtractedReportReview } from '../components/reports/ExtractedReportReview';
import { ExtractedReportResult } from '../lib/gemini';

export const SimplifyReportPage: React.FC = () => {
  const [extractedData, setExtractedData] = useState<ExtractedReportResult | null>(null);

  return (
    <DashboardLayout showAIBanner>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI REPORT SIMPLIFIER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Understand Your Medical Reports</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Upload blood reports, prescriptions, or discharge summaries for a plain-language explanation without medical jargon.
          </p>
        </div>

        <DocumentUploader onExtracted={(res) => setExtractedData(res)} />

        {extractedData && (
          <div className="space-y-6 pt-4 animate-fade-in">
            <ExtractedReportReview extracted={extractedData} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
