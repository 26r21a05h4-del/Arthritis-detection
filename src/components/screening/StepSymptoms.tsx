import React from 'react';
import { SymptomResponses } from '../../types/screening';
import { ArrowLeft, ArrowRight, AlertTriangle, Stethoscope } from 'lucide-react';

interface StepSymptomsProps {
  symptoms: SymptomResponses;
  onChange: (updated: SymptomResponses) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepSymptoms: React.FC<StepSymptomsProps> = ({
  symptoms,
  onChange,
  onNext,
  onBack,
}) => {
  const hasSeverePain = symptoms.kneePain === 'severe';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8">
      <div className="mb-6 border-b border-slate-100 pb-5">
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
          Step 2 of 3 · Clinical Symptoms
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
          Symptom Questionnaire
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Based on established clinical assessment criteria (WOMAC & KOOS) for early knee
          osteoarthritis indicators.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Knee Pain */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">
            1. How would you rate your knee pain during movement or load-bearing?
          </label>
          <p className="text-xs text-slate-500 mb-2.5">
            Consider the past 7 days while walking or bending.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'none', label: 'No Pain', desc: 'Comfortable' },
              { id: 'mild', label: 'Mild', desc: 'Noticeable ache' },
              { id: 'moderate', label: 'Moderate', desc: 'Limits activity' },
              { id: 'severe', label: 'Severe', desc: 'Intense / Debilitating' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...symptoms,
                    kneePain: opt.id as SymptomResponses['kneePain'],
                  })
                }
                className={`p-3 text-left rounded-lg border transition ${
                  symptoms.kneePain === opt.id
                    ? 'border-teal-700 bg-teal-50/80 ring-1 ring-teal-700'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-xs text-slate-900">{opt.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Severe Pain Safety Warning */}
        {hasSeverePain && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3 text-rose-900">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-rose-950">Safety Precaution Notice</p>
              <p className="mt-1 text-rose-800">
                You reported severe pain. Please stop the movement test and consider consulting a
                healthcare professional immediately. You should not perform strenuous knee bends or
                walking tests if it causes acute distress.
              </p>
            </div>
          </div>
        )}

        {/* Knee Stiffness */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">
            2. Do you experience stiffness in your knee after rest or upon waking?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'never', label: 'Never' },
              { id: 'sometimes', label: 'Sometimes' },
              { id: 'frequently', label: 'Frequently' },
              { id: 'almost-always', label: 'Almost Always' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...symptoms,
                    kneeStiffness: opt.id as SymptomResponses['kneeStiffness'],
                  })
                }
                className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-center transition ${
                  symptoms.kneeStiffness === opt.id
                    ? 'border-teal-700 bg-teal-50 text-teal-950 font-semibold ring-1 ring-teal-700'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Walking Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">
            3. Do you experience difficulty or limping while walking?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'none', label: 'No Difficulty' },
              { id: 'sometimes', label: 'Sometimes' },
              { id: 'frequently', label: 'Frequently' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...symptoms,
                    walkingDifficulty: opt.id as SymptomResponses['walkingDifficulty'],
                  })
                }
                className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-center transition ${
                  symptoms.walkingDifficulty === opt.id
                    ? 'border-teal-700 bg-teal-50 text-teal-950 font-semibold ring-1 ring-teal-700'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Using Stairs */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">
            4. Difficulty navigating stairs (ascending or descending)?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'none', label: 'No difficulty' },
              { id: 'mild', label: 'Mild difficulty' },
              { id: 'moderate', label: 'Moderate' },
              { id: 'severe', label: 'Severe difficulty' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...symptoms,
                    stairDifficulty: opt.id as SymptomResponses['stairDifficulty'],
                  })
                }
                className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-center transition ${
                  symptoms.stairDifficulty === opt.id
                    ? 'border-teal-700 bg-teal-50 text-teal-950 font-semibold ring-1 ring-teal-700'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Morning Stiffness Duration & Crepitus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Morning Stiffness Duration
            </label>
            <select
              value={symptoms.morningStiffnessDuration}
              onChange={(e) =>
                onChange({
                  ...symptoms,
                  morningStiffnessDuration: e.target
                    .value as SymptomResponses['morningStiffnessDuration'],
                })
              }
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600"
            >
              <option value="none">No morning stiffness</option>
              <option value="under-30-min">Under 30 minutes (Classic OA marker)</option>
              <option value="over-30-min">Over 30 minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Joint Crepitus (Crackling / Grinding)
            </label>
            <select
              value={symptoms.jointCrepitus}
              onChange={(e) =>
                onChange({
                  ...symptoms,
                  jointCrepitus: e.target.value as SymptomResponses['jointCrepitus'],
                })
              }
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600"
            >
              <option value="no">No audible crackling</option>
              <option value="yes">Yes, grinding or clicking felt</option>
              <option value="unsure">Unsure / Occasional</option>
            </select>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors"
          >
            <span>Proceed to Camera Movement Screening</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
