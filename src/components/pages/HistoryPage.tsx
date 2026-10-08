import React from 'react';
import { ScreeningResult } from '../../types/screening';
import { AuthorizedUser } from '../../types/auth';
import {
  History,
  Download,
  Eye,
  Sparkles,
  ShieldCheck,
  HardDrive,
  Lock,
  UserCheck,
  Building2,
  Database,
  ArrowRight,
} from 'lucide-react';

interface HistoryPageProps {
  history: ScreeningResult[];
  authUser: AuthorizedUser | null;
  onOpenLogin: () => void;
  onSelectResult: (result: ScreeningResult) => void;
  onStartNewScreening: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  authUser,
  onOpenLogin,
  onSelectResult,
  onStartNewScreening,
}) => {
  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `oa_screening_records_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getRiskBadge = (level: string) => {
    if (level === 'LOW RISK') {
      return (
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
          🟢 Low Risk
        </span>
      );
    }
    if (level === 'MEDIUM RISK') {
      return (
        <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
          🟡 Medium Risk
        </span>
      );
    }
    return (
      <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded">
        🔴 High Risk
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-teal-700" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Clinical Screening Records
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Permanent repository of kinematic movement data and clinical symptom assessments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit JSON</span>
            </button>
          )}

          {!authUser && (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Authorised Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Authorised Personnel Banner */}
      {authUser ? (
        <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
              {authUser.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{authUser.name}</span>
                <span className="text-[10px] font-bold text-teal-800 bg-white border border-teal-300 px-1.5 py-0.2 rounded">
                  {authUser.role}
                </span>
              </div>
              <p className="text-slate-600 mt-0.5">
                {authUser.institution} · Accredited License ID: <span className="font-mono font-medium">{authUser.licenseOrId}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-teal-800 font-semibold shrink-0">
            <UserCheck className="w-4 h-4" />
            <span>Authorised Evaluator Verified</span>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Evaluator Credential Note:</span>
              <p className="text-slate-600 mt-0.5">
                Screening records are preserved in audit mode. Log in with your authorised evaluator
                credentials to access full diagnostic cross-referencing and clinical investigator notes.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenLogin}
            className="text-xs font-semibold text-teal-800 hover:text-teal-900 underline underline-offset-2 shrink-0"
          >
            Authenticate Credentials &rarr;
          </button>
        </div>
      )}

      {/* Permanent Retention Notification Banner */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 text-xs text-slate-600">
        <Database className="w-4 h-4 text-teal-700 shrink-0" />
        <span>
          <strong className="text-slate-800">Permanent Record Policy:</strong> Deletion of screening
          entries is permanently disabled to ensure data integrity, prevent unauthorized tampering,
          and maintain continuous longitudinal tracking for clinical evaluation.
        </span>
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <HardDrive className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Screening Records Saved Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Perform a movement screening or try one of the demonstration scenarios to view stored
            kinematic logs.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartNewScreening}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition"
            >
              <span>Begin First Screening</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* History Table / Cards */
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-200">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      {getRiskBadge(item.riskLevel)}
                      <span className="font-mono text-xs text-slate-500">{item.id}</span>
                      {item.isDemo && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
                          Demo
                        </span>
                      )}
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Permanent
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 pt-0.5">
                      {item.userInfo.name || 'Anonymous Participant'} · Age {item.userInfo.age}
                    </div>
                    <p className="text-xs text-slate-500">
                      Recorded on {new Date(item.timestamp).toLocaleDateString()} at{' '}
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ·
                      Score: {item.riskScore}/100 · Pain: {item.symptoms.kneePain} · Focus: {item.userInfo.targetKnee}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectResult(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Analysis</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>
              All data entries are stored locally on your device in compliance with ethical prototype
              guidelines and cannot be deleted.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
