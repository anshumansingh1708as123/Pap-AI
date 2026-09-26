import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DocumentUploader } from '../components/reports/DocumentUploader';
import { ExtractedReportReview } from '../components/reports/ExtractedReportReview';
import { AskReportChat } from '../components/reports/AskReportChat';
import { ExtractedReportResult } from '../lib/gemini';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LocalMockDB } from '../lib/demoData';

export const ReportsPage: React.FC = () => {
  const [extractedData, setExtractedData] = useState<ExtractedReportResult | null>(null);
  const reports = LocalMockDB.getReports();

  return (
    <DashboardLayout showAIBanner>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Medical Reports & AI Document Extractor</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload blood tests, lab panels, or prescriptions for instant Gemini AI parsing
            </p>
          </div>
        </div>

        {/* AI Document Upload Section */}
        <DocumentUploader onExtracted={(res) => setExtractedData(res)} />

        {/* Extracted Review Component if uploaded */}
        {extractedData && (
          <div className="space-y-6 animate-fade-in">
            <ExtractedReportReview extracted={extractedData} />

            {/* Interactive Q&A Chat Component */}
            <AskReportChat reportContext={JSON.stringify(extractedData)} />
          </div>
        )}

        {/* Previously Saved Reports Library */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Saved Reports Library</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((rpt) => (
              <Card key={rpt.id} glass={false} hoverEffect className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                      {rpt.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{rpt.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Date: {rpt.report_date}</p>
                  </div>
                  <Link to={`/reports/${rpt.id}`}>
                    <Button variant="outline" size="sm">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>

                {rpt.summary && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60">
                    {rpt.summary}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
