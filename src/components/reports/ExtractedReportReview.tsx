import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, HelpCircle, Save, Plus } from 'lucide-react';
import { ExtractedReportResult } from '../../lib/gemini';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LocalMockDB } from '../../lib/demoData';

interface ExtractedReportReviewProps {
  extracted: ExtractedReportResult;
  onSavedToPassport?: () => void;
}

export const ExtractedReportReview: React.FC<ExtractedReportReviewProps> = ({
  extracted,
  onSavedToPassport,
}) => {
  const { showToast } = useNotification();
  const [isSaved, setIsSaved] = useState(false);

  const handleMergeToPassport = () => {
    // Save report entry to local DB
    LocalMockDB.addReport({
      title: extracted.title,
      category: extracted.category,
      report_date: new Date().toISOString().split('T')[0],
      summary: extracted.summary,
      extracted_data: {
        key_findings: extracted.key_findings,
        abnormal_biomarkers: extracted.abnormal_biomarkers,
        summary: extracted.summary,
        suggested_questions: extracted.suggested_questions,
      },
      flags: extracted.flags,
    });

    // Auto update vitals if blood sugar or blood pressure in biomarkers
    const glucoseBm = extracted.abnormal_biomarkers.find((b) => /glucose|hba1c/i.test(b.name));
    if (glucoseBm) {
      const val = parseInt(glucoseBm.value);
      if (!isNaN(val)) {
        LocalMockDB.addVital({
          blood_pressure_sys: 122,
          blood_pressure_dia: 82,
          heart_rate: 74,
          spo2: 98,
          blood_sugar: val,
          weight_kg: 74.5,
          height_cm: 178,
          notes: `Extracted from ${extracted.title}`,
        });
      }
    }

    setIsSaved(true);
    showToast('Saved to Central Health Passport', 'Biomarkers & Report added to your medical timeline.', 'success');
    if (onSavedToPassport) onSavedToPassport();
  };

  return (
    <Card glass={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="teal">{extracted.category}</Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">Clinical Report Analysis</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{extracted.title}</h2>
        </div>

        <Button
          variant={isSaved ? 'secondary' : 'primary'}
          onClick={handleMergeToPassport}
          disabled={isSaved}
        >
          {isSaved ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-1.5" />
              <span>Saved to Health Passport</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-1.5" />
              <span>Merge to Health Passport</span>
            </>
          )}
        </Button>
      </div>

      {/* Patient Friendly Summary */}
      <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 space-y-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">Plain Language Executive Summary</h4>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{extracted.summary}</p>
      </div>

      {/* Abnormal Biomarkers */}
      {extracted.abnormal_biomarkers.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Flagged / Abnormal Biomarkers ({extracted.abnormal_biomarkers.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {extracted.abnormal_biomarkers.map((bm, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-200">{bm.name}</span>
                  <Badge variant={bm.status === 'Critical' ? 'severe' : 'moderate'}>{bm.status}</Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-slate-900 dark:text-white">{bm.value}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Ref: {bm.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Findings */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Key Clinical Findings</h4>
        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {extracted.key_findings.map((finding, idx) => (
            <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Questions for Doctor */}
      {extracted.suggested_questions.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Suggested Questions for Your Next Doctor Visit</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {extracted.suggested_questions.map((q, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs text-indigo-900 dark:text-indigo-200">
                "{q}"
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
