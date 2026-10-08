import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Activity } from 'lucide-react';

interface AnalysisProgressModalProps {
  onFinished: () => void;
}

export const AnalysisProgressModal: React.FC<AnalysisProgressModalProps> = ({ onFinished }) => {
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  const steps = [
    'Processing standing posture & coronal alignment',
    'Analyzing knee joint angle vectors & flexion excursion',
    'Comparing bilateral left/right step symmetry & trunk sway',
    'Correlating self-reported WOMAC/KOOS clinical symptoms',
    'Synthesizing kinematic stability & generating preliminary screening result',
  ];

  useEffect(() => {
    const intervals = [500, 1100, 1700, 2300, 2900];
    const timers = intervals.map((delay, index) =>
      setTimeout(() => {
        setCompletedSteps(index + 1);
        if (index === intervals.length - 1) {
          setTimeout(onFinished, 600);
        }
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Analyzing Movement Data…</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Processing computer vision landmarks and biomechanical metrics
            </p>
          </div>
        </div>

        {/* Step Progress Checklist */}
        <div className="space-y-3.5 mb-6">
          {steps.map((text, idx) => {
            const isDone = completedSteps > idx;
            const isCurrent = completedSteps === idx;

            return (
              <div
                key={text}
                className={`flex items-center gap-3 text-xs sm:text-sm transition-all duration-300 ${
                  isDone
                    ? 'text-slate-900 font-medium'
                    : isCurrent
                    ? 'text-teal-700 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-teal-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span>{text}</span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${(completedSteps / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
