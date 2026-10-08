import React, { useState } from 'react';
import { ScreeningResult } from '../../types/screening';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Printer,
  RotateCcw,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { PrintableReport } from '../PrintableReport';
import { AuthorizedUser } from '../../types/auth';

interface StepResultsProps {
  result: ScreeningResult;
  authUser?: AuthorizedUser | null;
  onRetake: () => void;
  onViewHowItWorks: () => void;
}

export const StepResults: React.FC<StepResultsProps> = ({
  result,
  authUser,
  onRetake,
  onViewHowItWorks,
}) => {
  const [showPrintModal, setShowPrintModal] = useState(false);

  const getRiskStyle = (level: string) => {
    switch (level) {
      case 'LOW RISK':
        return {
          icon: CheckCircle2,
          badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-300',
          dotColor: 'bg-emerald-500',
          textColor: 'text-emerald-900',
          borderColor: 'border-emerald-200',
          bgLight: 'bg-emerald-50/50',
          symbol: '🟢',
        };
      case 'MEDIUM RISK':
        return {
          icon: AlertTriangle,
          badgeColor: 'text-amber-800 bg-amber-50 border-amber-300',
          dotColor: 'bg-amber-500',
          textColor: 'text-amber-900',
          borderColor: 'border-amber-200',
          bgLight: 'bg-amber-50/50',
          symbol: '🟡',
        };
      case 'HIGH RISK':
      default:
        return {
          icon: AlertOctagon,
          badgeColor: 'text-rose-800 bg-rose-50 border-rose-300',
          dotColor: 'bg-rose-500',
          textColor: 'text-rose-900',
          borderColor: 'border-rose-200',
          bgLight: 'bg-rose-50/50',
          symbol: '🔴',
        };
    }
  };

  const riskStyle = getRiskStyle(result.riskLevel);
  const IconComponent = riskStyle.icon;

  const getRatingBadgeClass = (rating: string) => {
    switch (rating) {
      case 'Good':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'Moderate':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Reduced':
      default:
        return 'text-rose-800 bg-rose-50 border-rose-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Demo watermark banner if running in demo mode */}
      {result.isDemo && (
        <div className="bg-amber-100/80 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span className="font-semibold">
              DEMO DATA — NOT REAL MEDICAL SCREENING (Sample Simulation)
            </span>
          </div>
          <span className="text-amber-800 font-mono text-[11px]">{result.id}</span>
        </div>
      )}

      {/* Primary Risk Dashboard Card */}
      <div
        className={`bg-white rounded-2xl border ${riskStyle.borderColor} shadow-xs p-6 sm:p-8 relative overflow-hidden`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Preliminary Screening Result
              </span>
              <span className="text-xs text-slate-400 font-mono">· {result.id}</span>
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {riskStyle.symbol} {result.riskLevel}
              </span>
            </div>
          </div>

          {/* Risk Score Pill & Print */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                Composite Index
              </span>
              <span className="text-xl font-bold font-mono text-slate-900">
                {result.riskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </span>
            </div>

            <button
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs transition"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Responsible Cautious Summary */}
        <div className={`p-4 rounded-xl border ${riskStyle.badgeColor} mb-6`}>
          <div className="flex items-start gap-3">
            <IconComponent className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <p className="font-semibold text-slate-900">Screening Indication Summary</p>
              <p className="mt-1 text-slate-800">{result.explanation.summary}</p>
            </div>
          </div>
        </div>

        {/* Visual Risk Spectrum Indicator Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Low Risk (0–32%)</span>
            <span>Medium Risk (33–65%)</span>
            <span>High Risk (66–100%)</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex relative">
            <div className="w-[33%] bg-emerald-400 h-full opacity-60" />
            <div className="w-[33%] bg-amber-400 h-full opacity-60" />
            <div className="w-[34%] bg-rose-400 h-full opacity-60" />

            {/* Position Marker */}
            <div
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md transform -translate-x-1/2 transition-all duration-700"
              style={{ left: `${Math.max(4, Math.min(96, result.riskScore))}%` }}
              title={`Score: ${result.riskScore}%`}
            />
          </div>
        </div>

        {/* Detailed Movement Analysis Cards */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Movement Analysis Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Walking Symmetry */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">Walking Symmetry</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getRatingBadgeClass(
                    result.movementMetrics.walkingSymmetryRating
                  )}`}
                >
                  {result.movementMetrics.walkingSymmetryRating}
                </span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">
                {result.movementMetrics.coronalSymmetryPct}%{' '}
                <span className="text-xs text-slate-500 font-normal">symmetry</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Sway: {result.movementMetrics.lateralTrunkSwayDeg}°
              </p>
            </div>

            {/* Knee Movement Symmetry */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">Knee Symmetry</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getRatingBadgeClass(
                    result.movementMetrics.kneeMovementRating
                  )}`}
                >
                  {result.movementMetrics.kneeMovementRating}
                </span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">
                {result.movementMetrics.kneeFlexionAsymmetryDeg}°{' '}
                <span className="text-xs text-slate-500 font-normal">disparity</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                L: {result.movementMetrics.leftKneeMinFlexionAngle}° · R:{' '}
                {result.movementMetrics.rightKneeMinFlexionAngle}°
              </p>
            </div>

            {/* Posture Alignment */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">Posture Alignment</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getRatingBadgeClass(
                    result.movementMetrics.postureRating
                  )}`}
                >
                  {result.movementMetrics.postureRating}
                </span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">
                {result.movementMetrics.trunkAlignmentDegrees}°{' '}
                <span className="text-xs text-slate-500 font-normal">tilt</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Pelvis: {result.movementMetrics.pelvicTiltDegrees}°
              </p>
            </div>

            {/* Movement Stability */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">Movement Stability</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getRatingBadgeClass(
                    result.movementMetrics.movementStabilityRating
                  )}`}
                >
                  {result.movementMetrics.movementStabilityRating}
                </span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 mt-1">
                {result.movementMetrics.movementStabilityScore}{' '}
                <span className="text-xs text-slate-500 font-normal">index</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Smoothness: {result.movementMetrics.movementSmoothnessScore}%
              </p>
            </div>
          </div>

          {/* Precision & Data Quality Telemetry Strip */}
          <div className="mt-4 p-3.5 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-teal-300 text-[11px] uppercase">
                  MEASUREMENT ACCURACY TELEMETRY
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                <span>
                  Optical Integrity:{' '}
                  <strong className="text-emerald-400">
                    {result.movementMetrics.dataIntegrityPct ?? 99.1}%
                  </strong>
                </span>
                <span>·</span>
                <span>
                  Filtering: <strong className="text-teal-300">EMA 2-Stage (60Hz)</strong>
                </span>
                {result.movementMetrics.cadenceStepsPerMin && (
                  <>
                    <span>·</span>
                    <span>
                      Cadence:{' '}
                      <strong className="text-sky-300">
                        {result.movementMetrics.cadenceStepsPerMin} steps/min
                      </strong>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Self-Reported Symptoms Summary Panel */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Self-Reported Symptoms Information
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Knee Pain:</span>
              <span className="font-semibold text-slate-900 capitalize">
                {result.symptoms.kneePain}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Knee Stiffness:</span>
              <span className="font-semibold text-slate-900 capitalize">
                {result.symptoms.kneeStiffness}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Walking Difficulty:</span>
              <span className="font-semibold text-slate-900 capitalize">
                {result.symptoms.walkingDifficulty}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Stair Difficulty:</span>
              <span className="font-semibold text-slate-900 capitalize">
                {result.symptoms.stairDifficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Considerations & Educational Next Steps
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {result.explanation.recommendedActions.map((action, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-teal-600 font-bold shrink-0">·</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prominent Medical Disclaimer */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Important Medical Disclaimer</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 font-semibold text-xs">
            "It's just an AI based report care must be taken and consult a doctor"
          </div>
          <p className="leading-relaxed">
            This application is an AI-assisted preliminary screening tool developed for educational
            and demonstration purposes. It does not diagnose osteoarthritis or any other medical
            condition. Camera-based movement analysis can be affected by lighting, camera position,
            clothing, occlusion and other factors. The results should not replace evaluation by a
            qualified healthcare professional.
          </p>
          <p className="font-medium text-slate-800">
            If you experience severe pain, sudden swelling, inability to walk, injury, or other
            urgent symptoms, seek appropriate medical care rather than relying on this screening
            tool.
          </p>
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Screening</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onViewHowItWorks}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <span>Learn How the Analysis Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowPrintModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Printable Medical Summary</span>
          </button>
        </div>
      </div>

      {/* Modal for Printable Report */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
            <PrintableReport
              result={result}
              authUser={authUser}
              onClose={() => setShowPrintModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
