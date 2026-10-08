import React from 'react';
import { UserInfo } from '../../types/screening';
import { User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface StepUserInfoProps {
  userInfo: UserInfo;
  onChange: (updated: UserInfo) => void;
  onNext: () => void;
  onUseDemo: () => void;
}

export const StepUserInfo: React.FC<StepUserInfoProps> = ({
  userInfo,
  onChange,
  onNext,
  onUseDemo,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8">
      <div className="mb-6 border-b border-slate-100 pb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Step 1 of 3 · Subject Profile
          </span>
          <button
            type="button"
            onClick={onUseDemo}
            className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded transition-colors font-medium border border-amber-200"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load Sample Profile
          </button>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Participant Information
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Provide basic demographic context for biomechanical calibration. Only non-identifying
          information is required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name / ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Name or Anonymous ID <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => onChange({ ...userInfo, name: e.target.value })}
              placeholder="e.g. Participant 01 or John D."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Age <span className="text-teal-700">*</span>
            </label>
            <input
              type="number"
              min="12"
              max="110"
              required
              value={userInfo.age}
              onChange={(e) => onChange({ ...userInfo, age: e.target.value })}
              placeholder="e.g. 52"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Gender <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <select
              value={userInfo.gender}
              onChange={(e) =>
                onChange({
                  ...userInfo,
                  gender: e.target.value as UserInfo['gender'],
                })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Height (cm) <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="number"
              min="100"
              max="230"
              value={userInfo.heightCm || ''}
              onChange={(e) => onChange({ ...userInfo, heightCm: e.target.value })}
              placeholder="e.g. 172"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Weight (kg) <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="number"
              min="30"
              max="250"
              value={userInfo.weightKg || ''}
              onChange={(e) => onChange({ ...userInfo, weightKg: e.target.value })}
              placeholder="e.g. 74"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Knee Focus Area */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Suspected or Symptomatic Joint Focus
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'both', label: 'Both Knees' },
              { id: 'left', label: 'Left Knee' },
              { id: 'right', label: 'Right Knee' },
              { id: 'unsure', label: 'Routine Screening' },
            ].map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() =>
                  onChange({
                    ...userInfo,
                    targetKnee: option.id as UserInfo['targetKnee'],
                  })
                }
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                  userInfo.targetKnee === option.id
                    ? 'border-teal-700 bg-teal-50 text-teal-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>
            Data is stored only in your local browser storage. No identifying health information is
            transmitted to any external database.
          </span>
        </div>

        {/* Submit */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors"
          >
            <span>Continue to Symptom Questionnaire</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
