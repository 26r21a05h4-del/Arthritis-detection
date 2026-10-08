import React from 'react';
import { Activity, ShieldCheck, Eye, Cpu, Zap } from 'lucide-react';

export const TelemetrySkeletonHero: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto bg-slate-950/80 rounded-3xl border border-teal-500/30 p-6 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Cybernetic HUD Frame corners */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-teal-400" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-teal-400" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-teal-400" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-teal-400" />

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-teal-300 font-bold uppercase">OPTICAL KINEMATICS HUD</span>
        </div>
        <div className="text-slate-400">60 FPS · LOCAL INFERENCE</div>
      </div>

      {/* SVG Skeleton Wireframe with Telemetry Markers */}
      <div className="relative flex items-center justify-center py-2">
        <svg viewBox="0 0 300 360" className="w-full h-auto max-h-[300px] select-none">
          <defs>
            {/* Glow filter */}
            <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="scanbeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Plumb line */}
          <line x1="150" y1="10" x2="150" y2="350" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
          <line x1="20" y1="180" x2="280" y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />

          {/* Sweeping scanline rect */}
          <rect x="20" y="80" width="260" height="40" fill="url(#scanbeam)" opacity="0.6" />

          {/* SKELETON BONES */}
          {/* Head & Neck */}
          <circle cx="150" cy="45" r="16" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
          <line x1="150" y1="61" x2="150" y2="85" stroke="#94a3b8" strokeWidth="2" />

          {/* Shoulders */}
          <line x1="110" y1="85" x2="190" y2="85" stroke="#38bdf8" strokeWidth="3" />
          {/* Spine & Torso */}
          <line x1="150" y1="85" x2="150" y2="170" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="110" y1="85" x2="130" y2="170" stroke="#64748b" strokeWidth="1.5" />
          <line x1="190" y1="85" x2="170" y2="170" stroke="#64748b" strokeWidth="1.5" />

          {/* Pelvis */}
          <line x1="130" y1="170" x2="170" y2="170" stroke="#0284c7" strokeWidth="4" />

          {/* Left Leg: Hip (130, 170) -> Knee (125, 255) -> Ankle (122, 335) */}
          <line x1="130" y1="170" x2="125" y2="255" stroke="#10b981" strokeWidth="4" />
          <line x1="125" y1="255" x2="122" y2="335" stroke="#10b981" strokeWidth="4" />

          {/* Right Leg: Hip (170, 170) -> Knee (180, 250) -> Ankle (185, 335) */}
          <line x1="170" y1="170" x2="180" y2="250" stroke="#10b981" strokeWidth="4" />
          <line x1="180" y1="250" x2="185" y2="335" stroke="#10b981" strokeWidth="4" />

          {/* Arms */}
          <line x1="110" y1="85" x2="90" y2="150" stroke="#64748b" strokeWidth="2" />
          <line x1="90" y1="150" x2="80" y2="205" stroke="#64748b" strokeWidth="2" />
          <line x1="190" y1="85" x2="210" y2="150" stroke="#64748b" strokeWidth="2" />
          <line x1="210" y1="150" x2="220" y2="205" stroke="#64748b" strokeWidth="2" />

          {/* JOINTS / NODES (Glowing circles) */}
          <circle cx="110" cy="85" r="4.5" fill="#38bdf8" filter="url(#nodeGlow)" />
          <circle cx="190" cy="85" r="4.5" fill="#38bdf8" filter="url(#nodeGlow)" />
          <circle cx="130" cy="170" r="5" fill="#0284c7" filter="url(#nodeGlow)" />
          <circle cx="170" cy="170" r="5" fill="#0284c7" filter="url(#nodeGlow)" />

          {/* Knee Nodes prominently highlighted */}
          <circle cx="125" cy="255" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" filter="url(#nodeGlow)" />
          <circle cx="180" cy="250" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" filter="url(#nodeGlow)" />

          <circle cx="122" cy="335" r="4.5" fill="#0d9488" />
          <circle cx="185" cy="335" r="4.5" fill="#0d9488" />

          {/* Target Reticles around Knees */}
          <circle cx="125" cy="255" r="14" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.8" />
          <circle cx="180" cy="250" r="14" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.8" />

          {/* Angle Callout Badges */}
          <g transform="translate(30, 245)">
            <rect width="80" height="22" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
            <text x="40" y="15" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              L: 168.4°
            </text>
          </g>

          <g transform="translate(195, 240)">
            <rect width="80" height="22" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <text x="40" y="15" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              R: 151.2°
            </text>
          </g>
        </svg>

        {/* Floating Telemetry Stats Badge */}
        <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-[10px] space-y-1 backdrop-blur-xs font-mono">
          <div className="text-slate-400">SYMMETRY INDEX</div>
          <div className="text-sm font-bold text-teal-300">92.4%</div>
          <div className="text-[9px] text-emerald-400">✓ In-Range</div>
        </div>

        <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-[10px] space-y-1 backdrop-blur-xs font-mono">
          <div className="text-slate-400">CORONAL TILT</div>
          <div className="text-sm font-bold text-sky-300">1.4°</div>
          <div className="text-[9px] text-sky-400">✓ Upright Plumb</div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="mt-2 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400">
        <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-500 block">33 Keypoints</span>
          <span className="text-slate-200 font-semibold">Tracked</span>
        </div>
        <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-500 block">Kinematic Arc</span>
          <span className="text-teal-300 font-semibold">Sub-degree</span>
        </div>
        <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-500 block">Processing</span>
          <span className="text-emerald-400 font-semibold">Zero Server</span>
        </div>
      </div>
    </div>
  );
};
