import React from 'react';
import {
  Activity,
  Maximize2,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Scale,
  Camera,
} from 'lucide-react';
import { InteractiveGoniometer } from '../graphics/InteractiveGoniometer';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Biomechanical Methodology & Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How the Movement Screening System Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          An engineering breakdown of client-side pose estimation, joint vector trigonometry,
          and clinical risk synthesis.
        </p>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stage 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center font-bold text-teal-800 text-sm">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Client-Side Optical Capture</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The application requests access to the user device camera via the W3C MediaDevices API
            (<code>getUserMedia</code>). Video streams at up to 60 fps at 720p/1080p resolution.
            Critically, video frames never leave the client browser; all frame manipulation and
            landmark deduction occurs strictly inside the local web worker / GPU pipeline.
          </p>
        </div>

        {/* Stage 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center font-bold text-sky-800 text-sm">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Pose Estimation & Keypoints</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A lightweight convolutional neural network evaluates body landmarks. The algorithm
            extracts normalized coordinates $(x, y, z)$ for eight critical lower-extremity and torso
            landmarks: left/right shoulders, hips, knees, and ankles.
          </p>
        </div>

        {/* Stage 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-amber-800 text-sm">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Joint Motion Estimation</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At each video frame, the system observes movement across the hip, knee, and ankle
            positions to evaluate knee joint flexion, extension range, and bilateral symmetry.
          </p>
        </div>

        {/* Stage 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-emerald-800 text-sm">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Clinical Scoring Synthesis</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Kinematic data (coronal sway, step symmetry, minimum flexion angles) is merged with
            subject self-reports (WOMAC pain, stiffness, stair difficulty) using a calibrated 100-point
            composite risk engine to classify into Low, Medium, or High Risk.
          </p>
        </div>
      </div>

      {/* Motion Observation & Mobility Breakdown */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Biomechanical Movement Observation</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Knee Flexion &amp; Range of Motion Observation
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Understanding movement flexibility and joint angles through natural motion patterns:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="font-semibold text-white block mb-1">Full Extension (~180°)</span>
            <p className="text-slate-400 leading-relaxed">
              Straight leg standing position. The leg is upright and aligned during normal standing posture.
            </p>
          </div>
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="font-semibold text-white block mb-1">Functional Flexion (&gt;120°)</span>
            <p className="text-slate-400 leading-relaxed">
              Normal comfortable knee bend observed during daily activities like shallow squats and stairs.
            </p>
          </div>
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="font-semibold text-white block mb-1">Restricted Flexion (&lt;105°)</span>
            <p className="text-slate-400 leading-relaxed">
              Limited bending capability that may indicate joint stiffness, discomfort, or muscle guarding.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Goniometer Tool */}
      <InteractiveGoniometer />

      {/* 3 Structured Movement Tests Explained */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          The Three Screening Movement Protocols
        </h3>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm">Protocol 1: Standing Posture (5 Seconds)</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Subject stands naturally facing the camera. The system evaluates the coronal shoulder-to-pelvis
              tilt angle and baseline pelvic horizontal alignment. Chronic knee pain often prompts
              unconscious contralateral pelvic elevation or pelvic drop to unweight the symptomatic joint.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm">Protocol 2: Natural Walking & Gait (8 Seconds)</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Subject walks naturally. The algorithm computes step cadence consistency, peak knee flexion
              excursion during the swing phase, and lateral trunk lean (Trendelenburg sign). Marked
              asymmetry between the left and right limb indicates an antalgic gait pattern.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm">Protocol 3: Controlled Knee Flexion (6 Seconds)</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Subject performs a gentle, pain-free knee bend. The algorithm records maximum flexion
              amplitude and monitors for dynamic knee valgus/varus deviation or kinematic hesitation.
              Subjects are instructed to stop immediately if discomfort is experienced.
            </p>
          </div>
        </div>
      </div>

      {/* Limitations Box */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 sm:p-8 text-amber-900 space-y-3">
        <h3 className="font-bold text-base text-amber-950 flex items-center gap-2">
          <span>Technical & Environmental Limitations</span>
        </h3>
        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
          While computer vision provides rapid non-invasive kinematic estimates, it is subject to
          lighting conditions, baggy clothing obscuring joint boundaries, 2D planar projection artifacts,
          and camera perspective distortion. It is engineered strictly as an educational prototype
          and preliminary triaging aid, not an instrument for definitive diagnostic imaging.
        </p>
      </div>
    </div>
  );
};
