import React from 'react';
import { ScreeningResult } from '../types/screening';
import { AuthorizedUser } from '../types/auth';
import { Activity, ShieldAlert, CheckCircle2, AlertTriangle, AlertCircle, UserCheck } from 'lucide-react';

interface PrintableReportProps {
  result: ScreeningResult;
  authUser?: AuthorizedUser | null;
  onClose?: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ result, authUser, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const getRiskColor = (level: string) => {
    if (level === 'LOW RISK') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (level === 'MEDIUM RISK') return 'text-amber-800 bg-amber-50 border-amber-200';
    return 'text-rose-800 bg-rose-50 border-rose-200';
  };

  return (
    <div className="bg-white text-slate-900 max-w-4xl mx-auto p-6 sm:p-10 border border-slate-200 rounded-xl shadow-xs print:border-none print:shadow-none print:p-0">
      {/* Non-print action buttons */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 print:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Screening Summary Report</h2>
          <p className="text-xs text-slate-500">
            Formatted for physical printing or saving as a PDF document.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition"
          >
            Print / Save to PDF
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Header Document */}
      <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-teal-700" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
              AI-Based Osteoarthritis Screening Report
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Preliminary Kinematic Movement Analysis & Clinical Symptom Assessment
          </p>
        </div>

        <div className="text-right text-xs text-slate-600 font-mono">
          <div><span className="font-semibold text-slate-800">ID:</span> {result.id}</div>
          <div><span className="font-semibold text-slate-800">Date:</span> {new Date(result.timestamp).toLocaleDateString()}</div>
          <div><span className="font-semibold text-slate-800">Time:</span> {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>

      {/* Participant Info Table */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-6 text-xs">
        <h3 className="font-bold text-slate-800 uppercase tracking-wider mb-2 text-[11px]">
          Participant Demographics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-slate-500 block">Name / ID:</span>
            <span className="font-semibold text-slate-800">{result.userInfo.name || result.userInfo.id}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Age:</span>
            <span className="font-semibold text-slate-800">{result.userInfo.age} years</span>
          </div>
          <div>
            <span className="text-slate-500 block">Gender:</span>
            <span className="font-semibold text-slate-800 capitalize">{result.userInfo.gender || 'Not specified'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Focus Joint:</span>
            <span className="font-semibold text-slate-800 capitalize">{result.userInfo.targetKnee}</span>
          </div>
        </div>
      </div>

      {/* Risk Result Banner */}
      <div className={`p-5 rounded-xl border mb-6 ${getRiskColor(result.riskLevel)}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block opacity-80">
              Preliminary Screening Result
            </span>
            <div className="text-2xl font-extrabold tracking-tight mt-0.5">
              {result.riskLevel === 'LOW RISK' && '🟢 '}
              {result.riskLevel === 'MEDIUM RISK' && '🟡 '}
              {result.riskLevel === 'HIGH RISK' && '🔴 '}
              {result.riskLevel}
            </div>
          </div>
          <div className="text-right sm:text-right font-mono">
            <span className="text-xs opacity-75 block">Screening Index Score</span>
            <span className="text-2xl font-bold">{result.riskScore} / 100</span>
          </div>
        </div>
        <p className="mt-2.5 text-xs sm:text-sm font-medium leading-relaxed opacity-90 border-t border-current/20 pt-2.5">
          {result.explanation.summary}
        </p>
      </div>

      {/* Movement Observations Table */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
          1. Computer Vision Kinematic Analysis
        </h3>
        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-3">Movement Parameter</th>
                <th className="py-2.5 px-3">Observed Value</th>
                <th className="py-2.5 px-3">Screening Rating</th>
                <th className="py-2.5 px-3">Clinical Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="py-2.5 px-3 font-medium">Walking & Gait Symmetry</td>
                <td className="py-2.5 px-3 font-mono">{result.movementMetrics.coronalSymmetryPct}% index</td>
                <td className="py-2.5 px-3 font-semibold">{result.movementMetrics.walkingSymmetryRating}</td>
                <td className="py-2.5 px-3 text-slate-500">Normal gait SI &gt; 85%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">Knee Joint Flexion (L / R)</td>
                <td className="py-2.5 px-3 font-mono">
                  L: {result.movementMetrics.leftKneeMinFlexionAngle}° / R: {result.movementMetrics.rightKneeMinFlexionAngle}°
                </td>
                <td className="py-2.5 px-3 font-semibold">{result.movementMetrics.kneeMovementRating}</td>
                <td className="py-2.5 px-3 text-slate-500">Disparity &lt; 10° normal</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">Standing Coronal Posture</td>
                <td className="py-2.5 px-3 font-mono">{result.movementMetrics.trunkAlignmentDegrees}° trunk tilt</td>
                <td className="py-2.5 px-3 font-semibold">{result.movementMetrics.postureRating}</td>
                <td className="py-2.5 px-3 text-slate-500">Vertical offset &lt; 3°</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">Lateral Trunk Sway (Gait)</td>
                <td className="py-2.5 px-3 font-mono">{result.movementMetrics.lateralTrunkSwayDeg}° sway</td>
                <td className="py-2.5 px-3 font-semibold">{result.movementMetrics.movementStabilityRating}</td>
                <td className="py-2.5 px-3 text-slate-500">Excess indicates antalgic lean</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reported Symptoms Table */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
          2. Clinical Symptom Assessment (WOMAC / KOOS)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Knee Pain:</span>
            <span className="font-semibold text-slate-900 capitalize">{result.symptoms.kneePain}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Knee Stiffness:</span>
            <span className="font-semibold text-slate-900 capitalize">{result.symptoms.kneeStiffness}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Walking Difficulty:</span>
            <span className="font-semibold text-slate-900 capitalize">{result.symptoms.walkingDifficulty}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Stair Navigation:</span>
            <span className="font-semibold text-slate-900 capitalize">{result.symptoms.stairDifficulty}</span>
          </div>
        </div>
      </div>

      {/* Recommended Non-Diagnostic Actions */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
          3. Next Steps & Educational Guidance
        </h3>
        <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
          {result.explanation.recommendedActions.map((action, i) => (
            <li key={i}>{action}</li>
          ))}
        </ul>
      </div>

      {/* Attending Evaluator Verification Section */}
      {authUser ? (
        <div className="mb-6 p-4 rounded-xl border border-teal-200 bg-teal-50/50 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
              Authorised Evaluator Attestation
            </span>
            <div className="font-bold text-slate-900 mt-0.5">
              {authUser.name} · {authUser.role}
            </div>
            <div className="text-slate-600">
              {authUser.institution} · Credential ID: <span className="font-mono">{authUser.licenseOrId}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded">
              <UserCheck className="w-3.5 h-3.5" />
              Verified Review
            </span>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              Ref: {result.id}-AUDIT
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-lg border border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Evaluator Sign-Off: Not authenticated. Preliminary participant self-screening run.</span>
          <span className="font-mono text-[10px]">UNATTESTED</span>
        </div>
      )}

      {/* Mandatory Medical Disclaimer */}
      <div className="p-4 bg-slate-100 rounded-lg border border-slate-300 text-[11px] text-slate-600 leading-relaxed">
        <p className="font-bold text-slate-900 uppercase tracking-wide mb-1">
          Mandatory Medical & Academic Disclaimer:
        </p>
        <p className="font-semibold text-slate-800 mb-1">
          "It's just an AI based report care must be taken and consult a doctor"
        </p>
        <p>
          This application is an AI-assisted preliminary screening tool developed for educational and
          demonstration purposes. It does not diagnose osteoarthritis or any other medical condition.
          Camera-based movement analysis can be affected by lighting, camera position, clothing,
          occlusion and other factors. The results should not replace evaluation by a qualified
          healthcare professional. If you experience severe pain, sudden swelling, inability to walk,
          injury, or other urgent symptoms, seek appropriate medical care rather than relying on this
          screening tool.
        </p>
      </div>

      {/* Verification footer */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
        <span>KneeKinematics AI Screening System · College Engineering Prototype</span>
        <span>Processed Locally in Browser · Not a Diagnostic Device</span>
      </div>
    </div>
  );
};
