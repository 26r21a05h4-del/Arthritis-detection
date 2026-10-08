import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertCircle, Info, Layers } from 'lucide-react';

export type KneeConditionState = 'healthy' | 'early_oa' | 'advanced_oa';

export const AnatomicalKneeGraphic: React.FC = () => {
  const [selectedState, setSelectedState] = useState<KneeConditionState>('early_oa');

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 text-white shadow-xl overflow-hidden relative">
      {/* Background glow and subtle grid */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

      {/* Header & Mode Selector */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Interactive Biomechanical Cross-Section</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Knee Joint Anatomy &amp; Cartilage Degradation
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Compare joint space preservation, articular cartilage cushioning, and subchondral bone changes.
          </p>
        </div>

        {/* State Toggle Buttons */}
        <div className="flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800 shrink-0 self-start md:self-center">
          <button
            onClick={() => setSelectedState('healthy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedState === 'healthy'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Healthy Joint
          </button>
          <button
            onClick={() => setSelectedState('early_oa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedState === 'early_oa'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Early OA
          </button>
          <button
            onClick={() => setSelectedState('advanced_oa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedState === 'advanced_oa'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Advanced OA
          </button>
        </div>
      </div>

      {/* Interactive Anatomy Illustration Area */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Graphic (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-6 flex flex-col items-center justify-center relative min-h-[340px]">
          <svg
            viewBox="0 0 400 320"
            className="w-full max-w-[380px] h-auto drop-shadow-2xl select-none"
          >
            <defs>
              {/* Bone Gradients */}
              <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Cartilage Gradients */}
              <linearGradient id="healthyCartilage" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <linearGradient id="earlyOaCartilage" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>

              <linearGradient id="advOaCartilage" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background alignment gridlines */}
            <line x1="200" y1="20" x2="200" y2="300" stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
            <line x1="50" y1="160" x2="350" y2="160" stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />

            {/* FEMUR (Thigh Bone) Upper */}
            <path
              d="M 160 20 L 160 80 C 160 110 120 120 120 145 C 120 155 140 158 170 158 C 190 158 195 152 200 152 C 205 152 210 158 230 158 C 260 158 280 155 280 145 C 280 120 240 110 240 80 L 240 20 Z"
              fill="url(#boneGrad)"
              stroke="#64748b"
              strokeWidth="2"
            />
            {/* Femur Condyle Highlights */}
            <ellipse cx="155" cy="148" rx="28" ry="10" fill="#94a3b8" opacity="0.4" />
            <ellipse cx="245" cy="148" rx="28" ry="10" fill="#94a3b8" opacity="0.4" />

            {/* FEMUR CARTILAGE LAYER */}
            {selectedState === 'healthy' && (
              <g>
                <path
                  d="M 124 148 Q 155 163 186 156 Q 193 154 200 154 Q 207 154 214 156 Q 245 163 276 148 Q 282 158 245 164 Q 200 162 155 164 Q 118 158 124 148 Z"
                  fill="url(#healthyCartilage)"
                  filter="url(#glowEffect)"
                />
              </g>
            )}

            {selectedState === 'early_oa' && (
              <g>
                {/* Thinning medial cartilage */}
                <path
                  d="M 125 150 Q 155 160 186 156 Q 200 154 214 156 Q 245 162 275 149 Q 278 154 245 158 Q 200 158 155 158 Q 122 154 125 150 Z"
                  fill="url(#earlyOaCartilage)"
                />
                {/* Cartilage Fissure indication */}
                <line x1="145" y1="154" x2="152" y2="162" stroke="#b45309" strokeWidth="2" />
                <line x1="160" y1="153" x2="164" y2="161" stroke="#b45309" strokeWidth="2" />
              </g>
            )}

            {selectedState === 'advanced_oa' && (
              <g>
                {/* Severely worn cartilage with bone-on-bone exposure */}
                <path
                  d="M 128 152 Q 140 156 160 155 Q 200 154 214 156 Q 245 161 272 150 Q 276 153 245 156 Q 200 156 160 155 Q 126 153 128 152 Z"
                  fill="url(#advOaCartilage)"
                />
                {/* Osteophyte bone spurs on margins */}
                <path d="M 118 145 Q 110 148 116 155 Z" fill="#cbd5e1" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M 282 145 Q 290 148 284 155 Z" fill="#cbd5e1" stroke="#ef4444" strokeWidth="1.5" />
              </g>
            )}

            {/* JOINT SPACE CLEARANCE GAP */}
            {/* TIBIAL PLATEAU & CARTILAGE */}
            {selectedState === 'healthy' && (
              <g>
                {/* Meniscus Cushions (Medial & Lateral) */}
                <path
                  d="M 120 167 C 130 166 175 168 175 174 C 150 176 130 175 120 167 Z"
                  fill="#0284c7"
                  opacity="0.9"
                />
                <path
                  d="M 280 167 C 270 166 225 168 225 174 C 250 176 270 175 280 167 Z"
                  fill="#0284c7"
                  opacity="0.9"
                />
                <rect x="122" y="172" width="156" height="5" rx="2.5" fill="url(#healthyCartilage)" />
              </g>
            )}

            {selectedState === 'early_oa' && (
              <g>
                {/* Frayed Meniscus */}
                <path
                  d="M 124 163 C 132 163 172 166 172 170 C 150 172 132 171 124 163 Z"
                  fill="#d97706"
                  opacity="0.8"
                />
                <path
                  d="M 276 164 C 268 164 228 166 228 171 C 250 173 268 172 276 164 Z"
                  fill="#d97706"
                  opacity="0.8"
                />
                <rect x="126" y="168" width="148" height="3" rx="1.5" fill="url(#earlyOaCartilage)" />
              </g>
            )}

            {selectedState === 'advanced_oa' && (
              <g>
                {/* Bone-on-bone contact / collapsed medial space */}
                <path
                  d="M 128 158 C 135 159 168 162 168 165 C 150 166 135 165 128 158 Z"
                  fill="#dc2626"
                  opacity="0.9"
                />
                <path
                  d="M 272 161 C 265 161 232 163 232 166 C 250 168 265 167 272 161 Z"
                  fill="#dc2626"
                  opacity="0.9"
                />
                {/* Subchondral sclerosis thickening line */}
                <path d="M 120 168 L 280 168" stroke="#fca5a5" strokeWidth="4" opacity="0.8" />
              </g>
            )}

            {/* TIBIA (Shin Bone) Lower */}
            <path
              d="M 115 174 C 115 169 135 167 170 168 C 190 169 195 174 200 174 C 205 174 210 169 230 168 C 265 167 285 169 285 174 C 285 188 240 198 235 220 L 235 300 L 165 300 L 165 220 C 160 198 115 188 115 174 Z"
              fill="url(#boneGrad)"
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* FIBULA (Lateral Lower Leg) */}
            <path
              d="M 95 195 C 105 190 115 200 115 210 L 115 300 L 95 300 Z"
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="1.5"
              opacity="0.85"
            />

            {/* PATELLA (Kneecap outline in lateral view offset) */}
            <circle cx="200" cy="120" r="18" fill="#e2e8f0" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3,2" opacity="0.6" />
            <text x="200" y="124" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">PATELLA</text>

            {/* Labels and Callout Markers */}
            <text x="75" y="60" fill="#94a3b8" fontSize="10" fontWeight="bold">FEMUR</text>
            <line x1="115" y1="60" x2="160" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />

            <text x="75" y="270" fill="#94a3b8" fontSize="10" fontWeight="bold">TIBIA</text>
            <line x1="110" y1="267" x2="165" y2="260" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />

            {/* Joint space dimension marker */}
            <g transform="translate(305, 148)">
              <line x1="0" y1="0" x2="0" y2={selectedState === 'healthy' ? 18 : selectedState === 'early_oa' ? 10 : 3} stroke="#38bdf8" strokeWidth="2" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
              <line
                x1="-5"
                y1={selectedState === 'healthy' ? 18 : selectedState === 'early_oa' ? 10 : 3}
                x2="5"
                y2={selectedState === 'healthy' ? 18 : selectedState === 'early_oa' ? 10 : 3}
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <text x="10" y="10" fill="#38bdf8" fontSize="9" fontWeight="bold">
                {selectedState === 'healthy' ? '5.2 mm' : selectedState === 'early_oa' ? '3.4 mm' : '0.8 mm'}
              </text>
            </g>
          </svg>

          {/* Current State Badge Indicator */}
          <div className="mt-2 flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Joint Space Clearance:</span>
            <span
              className={`font-bold ${
                selectedState === 'healthy'
                  ? 'text-emerald-400'
                  : selectedState === 'early_oa'
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {selectedState === 'healthy'
                ? 'Preserved (Normal Cartilage)'
                : selectedState === 'early_oa'
                ? 'Reduced (Early Surface Fissuring)'
                : 'Collapsed (Bone-on-Bone Wear)'}
            </span>
          </div>
        </div>

        {/* Clinical Explanations (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedState === 'healthy' && (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Normal Healthy Joint Mechanics</span>
              </div>
              <h4 className="text-lg font-bold text-white">Intact Articular Cushioning</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Smooth hyaline cartilage coats the femoral condyles and tibial plateau, providing a
                low-friction gliding surface. Shock absorption is evenly distributed across medial and
                lateral compartments without pain or joint guarding.
              </p>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Cartilage Thickness:</span>
                  <span className="font-semibold text-emerald-400">4.5 – 5.5 mm</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Walking Impact Absorption:</span>
                  <span className="font-semibold text-emerald-400">100% (Optimal)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Kinematic Guarding:</span>
                  <span className="font-semibold text-emerald-400">None detected</span>
                </div>
              </div>
            </div>
          )}

          {selectedState === 'early_oa' && (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Early Osteoarthritis (Target Screening Window)</span>
              </div>
              <h4 className="text-lg font-bold text-white">Micro-Fissuring &amp; Narrowing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cartilage matrix softens and develops superficial micro-fissures, most commonly in the
                medial compartment. Individuals often adapt subconsciously by reducing knee flexion
                during the walking swing phase to avoid loading the vulnerable zone.
              </p>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Cartilage Thickness:</span>
                  <span className="font-semibold text-amber-400">2.8 – 3.6 mm</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Observable Gait Signs:</span>
                  <span className="font-semibold text-amber-400">Stiff-knee cadence, mild sway</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Intervention Potential:</span>
                  <span className="font-semibold text-teal-400">High (Physiotherapy &amp; lifestyle)</span>
                </div>
              </div>
            </div>
          )}

          {selectedState === 'advanced_oa' && (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Moderate to Severe Structural Wear</span>
              </div>
              <h4 className="text-lg font-bold text-white">Complete Cartilage Loss &amp; Spurs</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Near-total loss of articular cartilage exposes subchondral bone. Reactive osteophytes
                (bone spurs) form along the articular margins, causing crepitus, severe flexion
                restriction (&lt;100°), and pronounced antalgic limping.
              </p>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Cartilage Thickness:</span>
                  <span className="font-semibold text-rose-400">&lt; 1.0 mm (Exposed bone)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Observable Gait Signs:</span>
                  <span className="font-semibold text-rose-400">Marked antalgic gait, trunk lean</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Clinical Path:</span>
                  <span className="font-semibold text-rose-400">Specialist orthopedic evaluation</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
