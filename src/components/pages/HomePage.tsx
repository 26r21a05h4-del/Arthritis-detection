import React, { useState } from 'react';
import {
  Camera,
  Activity,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Sliders,
  Layers,
  Compass,
} from 'lucide-react';
import { DEMO_PRESETS } from '../../utils/demoData';
import { TelemetrySkeletonHero } from '../graphics/TelemetrySkeletonHero';
import { AnatomicalKneeGraphic } from '../graphics/AnatomicalKneeGraphic';
import { InteractiveGoniometer } from '../graphics/InteractiveGoniometer';

interface HomePageProps {
  onStartScreening: () => void;
  onViewHowItWorks: () => void;
  onLaunchDemoPreset: (presetId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartScreening,
  onViewHowItWorks,
  onLaunchDemoPreset,
}) => {
  const [activeStudioTab, setActiveStudioTab] = useState<'anatomy' | 'goniometer'>('anatomy');

  return (
    <div className="space-y-16 py-4 sm:py-8">
      {/* Visual High-Tech Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-teal-950 via-slate-900 to-slate-950 text-white px-6 py-12 sm:px-10 sm:py-16 shadow-2xl border border-teal-500/20">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-xs font-semibold text-teal-300">
              <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>Real-Time Computer Vision &amp; Kinematic Biomechanics</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              AI-Powered Early Osteoarthritis Screening
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
              Analyze movement patterns, posture and knee motion using computer vision to obtain a
              preliminary osteoarthritis risk assessment.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartScreening}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all transform active:scale-98"
              >
                <span>START SCREENING</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewHowItWorks}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition"
              >
                <span>HOW IT WORKS</span>
              </button>
            </div>

            {/* Quick Metrics Pills */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg text-xs font-mono">
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px]">INFERENCE</span>
                <span className="text-teal-300 font-bold">Client-Side GPU</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px]">ANALYSIS</span>
                <span className="text-emerald-400 font-bold">WOMAC + Motion</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px]">PRIVACY</span>
                <span className="text-sky-300 font-bold">Zero Upload</span>
              </div>
            </div>
          </div>

          {/* Right Visual Graphic (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <TelemetrySkeletonHero />
          </div>
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Screening Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            How Vision-Based Screening Operates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Non-invasive motion telemetry capturing functional gait and joint kinematics directly
            via your standard device camera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 mb-5 group-hover:scale-105 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Camera-Based Analysis</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Uses the device camera to observe movement. No wearable hardware, sensors, or
                attachments required. All video is processed client-side.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-teal-800">
              <span>Real-time getUserMedia API</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-700 mb-5 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Movement Analysis</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Examines posture, knee movement and movement symmetry. Tracks bilateral joint
                vectors (Hip–Knee–Ankle) and computes flexion degrees.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-sky-800">
              <span>Pose estimation &amp; joint tracking</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 mb-5 group-hover:scale-105 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Preliminary Risk Assessment</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Produces a low, medium or high risk indication by combining biomechanical metrics
                with self-reported WOMAC/KOOS clinical symptoms.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-800">
              <span>Transparent scoring matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Biomechanical Kinematics Studio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Interactive Biomechanics Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Explore Joint Mechanics &amp; Kinematic Measurement
            </h2>
          </div>

          {/* Segmented Control Switcher */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveStudioTab('anatomy')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeStudioTab === 'anatomy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-700" />
              <span>Anatomical Cross-Section</span>
            </button>
            <button
              onClick={() => setActiveStudioTab('goniometer')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeStudioTab === 'goniometer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-teal-700" />
              <span>Knee Goniometer Tool</span>
            </button>
          </div>
        </div>

        {activeStudioTab === 'anatomy' ? (
          <AnatomicalKneeGraphic />
        ) : (
          <InteractiveGoniometer />
        )}
      </section>

      {/* College Project Demo Simulation Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-amber-50 via-slate-50 to-teal-50 rounded-2xl border border-amber-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100/80 text-amber-900 font-semibold text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Presentation Demo Mode</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Test the Scoring System with Calibrated Presets
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                For presentations, evaluations, or devices without a webcam, explore verified
                pre-calculated scenarios representing different clinical presentations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_PRESETS.map((preset) => (
              <div
                key={preset.id}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        preset.expectedRisk === 'LOW RISK'
                          ? 'bg-emerald-100 text-emerald-800'
                          : preset.expectedRisk === 'MEDIUM RISK'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {preset.expectedRisk}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{preset.id}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{preset.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100">
                  <button
                    onClick={() => onLaunchDemoPreset(preset.id)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
                  >
                    <span>Launch Scenario</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
