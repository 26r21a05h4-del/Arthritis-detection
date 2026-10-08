import React from 'react';
import { ShieldAlert, AlertTriangle, PhoneCall, Stethoscope, CheckCircle2 } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 sm:py-10">
      {/* Title */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Safety &amp; Regulatory Notice
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Medical &amp; Academic Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Please read this essential clinical safety and legal disclosure before using this tool.
        </p>
      </div>

      {/* Primary Mandatory Statement Box */}
      <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-amber-900 font-bold text-base">
          <ShieldAlert className="w-6 h-6 text-amber-700" />
          <h2>Non-Diagnostic Educational Prototype</h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
          “This application is an AI-assisted preliminary screening tool developed for educational
          and demonstration purposes. It does not diagnose osteoarthritis or any other medical
          condition. Camera-based movement analysis can be affected by lighting, camera position,
          clothing, occlusion and other factors. The results should not replace evaluation by a
          qualified healthcare professional.”
        </p>
      </div>

      {/* Urgent Medical Situations Red Flag Box */}
      <div className="bg-rose-50 rounded-2xl border border-rose-200 p-6 sm:p-8 space-y-4 text-rose-950">
        <div className="flex items-center gap-3 font-bold text-base text-rose-900">
          <AlertTriangle className="w-6 h-6 text-rose-600" />
          <h2>When to Seek Urgent Medical Care</h2>
        </div>
        <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
          If you experience severe pain, sudden swelling, inability to walk, acute traumatic injury,
          inability to bear weight, visible joint deformity, fever accompanied by joint warmth, or
          other urgent symptoms, seek appropriate emergency medical care immediately rather than
          relying on this screening tool.
        </p>
      </div>

      {/* Diagnostic Boundaries */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base">What Constitutes a Definitive Diagnosis?</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          A definitive medical diagnosis of knee osteoarthritis requires comprehensive clinical
          examination by a licensed physician (such as an orthopedic surgeon, physiatrist, or
          rheumatologist) alongside diagnostic medical imaging:
        </p>
        <ul className="space-y-2 text-xs text-slate-700 pt-1">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Weight-Bearing Radiography (X-Ray):</strong> To measure joint space narrowing,
              subchondral sclerosis, osteophyte formation, and assign Kellgren-Lawrence grading.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Magnetic Resonance Imaging (MRI):</strong> When indicated, to evaluate
              articular cartilage thinning, meniscus tears, and bone marrow lesions.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Comprehensive Physical Exam:</strong> Palpation, range of motion goniometry,
              ligament stability testing, and differential diagnosis to exclude inflammatory
              arthropathies, bursitis, or tendonitis.
            </span>
          </li>
        </ul>
      </div>

      {/* Academic Use Only */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
        This software is provided "as is" for college project presentation and technical
        demonstration. The developers assume no liability for decisions made based on this software.
      </div>
    </div>
  );
};
