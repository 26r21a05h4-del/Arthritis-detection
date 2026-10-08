import React, { useState } from 'react';
import { Compass, RotateCw, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export const InteractiveGoniometer: React.FC = () => {
  const [angle, setAngle] = useState<number>(140);

  // Calculation for SVG articulator rotation:
  // Hip is fixed at (160, 40)
  // Knee joint center is fixed at (160, 160)
  // Shin articulates from (160, 160) towards ankle
  // Angle: 180 deg = straight down to (160, 270)
  // When knee bends (e.g. angle becomes 120 deg), tibia rotates by (180 - angle) deg
  const bendDegrees = 180 - angle;
  const rad = (bendDegrees * Math.PI) / 180;
  const shinLength = 110;
  const ankleX = 160 - Math.sin(rad) * shinLength;
  const ankleY = 160 + Math.cos(rad) * shinLength;

  const getAngleCategory = (deg: number) => {
    if (deg >= 125) {
      return {
        label: 'Functional Flexion Range',
        desc: 'Comfortable knee excursion without significant mechanical constraint.',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        icon: CheckCircle2,
      };
    }
    if (deg >= 105) {
      return {
        label: 'Moderate Flexion Restriction',
        desc: 'Subtle mechanical resistance or discomfort typical in early stage OA.',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        icon: AlertTriangle,
      };
    }
    return {
      label: 'Marked Stiffness / Restricted ROM',
      desc: 'Severely limited flexion often seen in active flare-ups or structural OA.',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      icon: AlertCircle,
    };
  };

  const status = getAngleCategory(angle);
  const StatusIcon = status.icon;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 text-white shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Biomechanical Goniometer</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Live Knee Joint Angle Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Drag the slider to visualize joint angles during flexion and observe clinical categories.
          </p>
        </div>

        {/* Live Angle Display Card */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl">
          <span className="text-xs text-slate-400 uppercase font-semibold">Simulated ROM:</span>
          <span className="text-2xl font-black font-mono text-teal-300">{angle}°</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Interactive SVG Goniometer (6 cols) */}
        <div className="md:col-span-6 bg-slate-950/70 rounded-2xl border border-slate-800/80 p-6 flex flex-col items-center justify-center relative">
          <svg viewBox="0 0 320 300" className="w-full max-w-[280px] h-auto select-none">
            <defs>
              <linearGradient id="thighGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <linearGradient id="shinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>

            {/* Protractor grid background */}
            <circle cx="160" cy="160" r="80" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            <circle cx="160" cy="160" r="50" fill="none" stroke="#1e293b" strokeWidth="1" />

            {/* Angle Sweep Arc */}
            <path
              d={`M 160 210 A 50 50 0 0 1 ${160 - Math.sin(rad) * 50} ${160 + Math.cos(rad) * 50}`}
              fill="none"
              stroke={angle >= 125 ? '#10b981' : angle >= 105 ? '#f59e0b' : '#ef4444'}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Thigh (Femur vector: Hip -> Knee) */}
            <line x1="160" y1="40" x2="160" y2="160" stroke="url(#thighGrad)" strokeWidth="10" strokeLinecap="round" />

            {/* Shin (Tibia vector: Knee -> Ankle) */}
            <line x1="160" y1="160" x2={ankleX} y2={ankleY} stroke="url(#shinGrad)" strokeWidth="10" strokeLinecap="round" />

            {/* Hip Joint Node */}
            <circle cx="160" cy="40" r="8" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
            <text x="175" y="44" fill="#94a3b8" fontSize="10" fontWeight="bold">HIP</text>

            {/* Knee Joint Center Goniometer Dial */}
            <circle cx="160" cy="160" r="14" fill="#0f172a" stroke="#2dd4bf" strokeWidth="3" />
            <circle cx="160" cy="160" r="5" fill="#2dd4bf" />
            <text x="182" y="164" fill="#2dd4bf" fontSize="11" fontWeight="bold">KNEE ({angle}°)</text>

            {/* Ankle Joint Node */}
            <circle cx={ankleX} cy={ankleY} r="8" fill="#14b8a6" stroke="#ffffff" strokeWidth="2" />
            <text x={ankleX - 35} y={ankleY + 5} fill="#94a3b8" fontSize="10" fontWeight="bold">ANKLE</text>
          </svg>

          {/* Slider Control */}
          <div className="w-full mt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Deep Flexion (90°)</span>
              <span>Straight (180°)</span>
            </div>
            <input
              type="range"
              min="90"
              max="180"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-teal-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Clinical Interpretation Context (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${status.bgColor}`}>
            <StatusIcon className="w-4 h-4 shrink-0" />
            <span>{status.label}</span>
          </div>

          <h4 className="text-xl font-bold text-white tracking-tight">
            Kinematic Significance of {angle}° Flexion
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed">
            {status.desc}
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="font-semibold text-white block mb-0.5">Stair Ascent/Descent:</span>
              <span className="text-slate-400">
                Requires approx. 90°–105° of flexion. Individuals with OA often experience peak pain during this range due to elevated patellofemoral compressive force.
              </span>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="font-semibold text-white block mb-0.5">Walking Stance &amp; Swing:</span>
              <span className="text-slate-400">
                Requires approx. 60°–70° knee flexion swing clearance. A stiff-knee gait pattern restricts this motion to unweight the joint.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
