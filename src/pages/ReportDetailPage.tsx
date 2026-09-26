import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LocalMockDB } from '../lib/demoData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { AskReportChat } from '../components/reports/AskReportChat';

export const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reports = LocalMockDB.getReports();
  const report = reports.find((r) => r.id === id) || reports[0];

  return (
    <DashboardLayout showAIBanner>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/reports">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back to Reports</span>
            </Button>
          </Link>
          <Badge variant="teal">{report.category}</Badge>
        </div>

        <Card glass className="border border-teal-500/30 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h1 className="text-2xl font-black text-slate-100">{report.title}</h1>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Document Date: {report.report_date}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">Executive Summary</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{report.summary}</p>
          </div>

          {/* Biomarkers */}
          {report.extracted_data.abnormal_biomarkers && report.extracted_data.abnormal_biomarkers.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Extracted Biomarker Analysis</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {report.extracted_data.abnormal_biomarkers.map((bm, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/50 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-rose-200">{bm.name}</span>
                      <Badge variant={bm.status === 'High' ? 'severe' : 'moderate'}>{bm.status}</Badge>
                    </div>
                    <div className="text-lg font-bold text-white">{bm.value}</div>
                    <p className="text-[10px] text-slate-400">Ref: {bm.range}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Findings */}
          {report.extracted_data.key_findings && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Findings</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {report.extracted_data.key_findings.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* Q&A Chat Section */}
        <AskReportChat reportContext={JSON.stringify(report)} />
      </div>
    </DashboardLayout>
  );
};
