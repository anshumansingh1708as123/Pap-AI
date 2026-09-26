import React, { useState } from 'react';
import { Upload, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { extractReportWithAI, ExtractedReportResult } from '../../lib/gemini';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface DocumentUploaderProps {
  onExtracted: (result: ExtractedReportResult) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onExtracted }) => {
  const { showToast } = useNotification();
  const [pastedText, setPastedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const sampleReportText = `
    MAX SUPER SPECIALITY HOSPITAL - NEW DELHI
    PATHOLOGY & METABOLIC LABORATORY REPORT
    PATIENT: Rahul Sharma | AGE: 32 YRS | GENDER: Male | REF BY: Dr. Vikram Seth
    
    TEST NAME                  RESULT      UNIT       REFERENCE RANGE       STATUS
    --------------------------------------------------------------------------------
    HbA1c (Glycated Hb)         6.4         %          4.0 - 5.6 (Normal)    HIGH
    Fasting Plasma Glucose      112         mg/dL      70 - 99               HIGH
    Serum Triglycerides         168         mg/dL      < 150                 HIGH
    Total Cholesterol           195         mg/dL      < 200                 NORMAL
    HDL Cholesterol             46          mg/dL      > 40                  NORMAL
    Serum Creatinine            0.9         mg/dL      0.6 - 1.2             NORMAL
    eGFR                        92          mL/min     > 90                  NORMAL
    
    IMPRESSION & NOTES:
    Glycemic control shows marked improvement (HbA1c down to 6.4%). Continue Metformin 500mg BD.
    Mild hypertriglyceridemia noted. Dietary modification recommended.
  `;

  const handleProcessText = async (text: string) => {
    if (!text.trim()) {
      showToast('Empty Document', 'Please paste or upload document content first.', 'warning');
      return;
    }

    setIsProcessing(true);
    try {
      const extracted = await extractReportWithAI(text);
      onExtracted(extracted);
      showToast('Report Analyzed by Gemini AI', 'Extracted biomarkers and clinical summary.', 'success');
    } catch (err) {
      console.error('AI extraction failed:', err);
      showToast('Extraction Error', 'Could not process report text.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoadSample = () => {
    setPastedText(sampleReportText);
    handleProcessText(sampleReportText);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = (event.target?.result as string) || sampleReportText;
        setPastedText(content);
        handleProcessText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card glass={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Medical Document Analyzer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Upload prescriptions, blood tests, or discharge summaries for clinical analysis into your Health Passport.
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={handleLoadSample} disabled={isProcessing}>
          <FileText className="w-4 h-4 mr-1 text-teal-600 dark:text-teal-400" />
          <span>Load Sample Report</span>
        </Button>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const file = e.dataTransfer.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const content = (event.target?.result as string) || sampleReportText;
              setPastedText(content);
              handleProcessText(content);
            };
            reader.readAsText(file);
          }
        }}
        className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all duration-300 ${
          dragActive
            ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40'
            : 'border-slate-200 dark:border-slate-700 hover:border-teal-500/50 bg-slate-50 dark:bg-slate-950/60'
        }`}
      >
        <Upload className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-3" />
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Drag & Drop Medical Report File Here</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports PDF, TXT, or scanned report text</p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} accept=".txt,.pdf,.csv" />
            <span className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-800 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-500/30 inline-block transition-colors">
              Browse Local File
            </span>
          </label>
        </div>
      </div>

      {/* Textarea Paste Fallback */}
      <div className="mt-4 space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>Or Paste Medical Text Below:</span>
          <span className="text-[10px] text-slate-500">Clinical Parser Engine</span>
        </label>
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Paste lab report contents, prescription notes, or clinical summary text..."
          className="w-full h-32 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-teal-600 font-mono resize-none"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="primary"
          onClick={() => handleProcessText(pastedText)}
          isLoading={isProcessing}
          disabled={!pastedText.trim()}
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          <span>Extract & Analyze Report</span>
        </Button>
      </div>
    </Card>
  );
};
