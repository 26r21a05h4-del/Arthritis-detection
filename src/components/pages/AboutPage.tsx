import React from 'react';
import {
  GraduationCap,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          College Project Documentation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About the Screening System
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Theme: Healthcare Technology &amp; Artificial Intelligence
        </p>
      </div>

      {/* Project Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Project Purpose &amp; Academic Scope</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          AI-Based Early Osteoarthritis Screening System
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          This prototype was engineered as an educational demonstration of how modern computer
          vision and web-based neural networks can make functional motion analysis accessible to any
          user equipped with a standard mobile camera or laptop webcam.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Rather than requiring expensive specialized laboratory marker suites (e.g., Vicon /
          Qualisys) or wearable inertial measurement units (IMUs), this web system runs lightweight
          optical pose estimation directly inside the client’s browser runtime to evaluate key
          biomechanical deviations associated with knee osteoarthritis.
        </p>

        {/* 6 Core Competencies Listed in Prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-semibold text-xs text-slate-900">1. Camera-Based Analysis</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Client-side optical tracking via browser media APIs without sensor attachments.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-semibold text-xs text-slate-900">2. Posture Alignment</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Quantifies coronal spinal tilt, pelvic inclination, and bilateral load symmetry.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-semibold text-xs text-slate-900">3. Knee Movement Analysis</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Examines dynamic flexion excursion, cadence consistency, and lateral trunk sway.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-semibold text-xs text-slate-900">4. Joint-Angle Estimation</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Computer vision estimation of knee joint flexion angles (Hip–Knee–Ankle).
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-semibold text-xs text-slate-900">5. Symptom Questionnaire</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Structured WOMAC / KOOS derived questions on pain, stiffness, and stair difficulty.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-semibold text-xs text-slate-900">6. Preliminary Risk Classification</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Calibrated synthesis categorizing into LOW, MEDIUM, or HIGH RISK with next-step guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
