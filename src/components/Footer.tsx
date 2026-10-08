import React from 'react';
import { Activity, ShieldCheck, Database, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-teal-600 flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white text-base">
                AI-Based Early Osteoarthritis Screening
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A computer vision prototype designed for college project demonstration.
              Evaluates functional knee kinematic patterns, coronal symmetry, and self-reported
              WOMAC/KOOS symptom indices to identify preliminary risk factors.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Camera video is processed locally in your browser and never uploaded.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Application Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('screening')}
                  className="hover:text-white transition-colors"
                >
                  Start Screening
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  Biomechanical Methods
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors"
                >
                  Project &amp; Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('disclaimer')}
                  className="hover:text-white transition-colors"
                >
                  Clinical Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Data Integrity & Security */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Data Integrity &amp; Retention
            </h4>
            <p className="text-xs text-slate-400 mb-2 leading-relaxed">
              Screening records are preserved in client storage as an immutable clinical audit trail.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-teal-400 font-medium">
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span>Permanent Records · Deletion Disabled</span>
            </div>
          </div>
        </div>

        {/* End of Web Mandatory Disclaimer */}
        <div className="pt-6 pb-2 border-t border-slate-800">
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 sm:p-4 text-center">
            <p className="text-amber-200 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>It's just an AI based  report care must be taken and consult a doctor</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AI-Based Early Osteoarthritis Screening System · College Engineering Prototype.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Not a Medical Device</span>
            <span aria-hidden="true">·</span>
            <span>Non-Diagnostic</span>
            <span aria-hidden="true">·</span>
            <span>Educational Use Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
