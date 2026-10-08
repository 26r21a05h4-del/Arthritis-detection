# AI-Based Early Osteoarthritis Screening System

A real-time computer vision and biomechanical kinematics screening platform for early knee osteoarthritis (OA) risk stratification. The application uses client-side pose estimation, vector joint mathematics (goniometry), and validated clinical symptom indices (WOMAC / KOOS) to assess movement abnormalities, gait asymmetry, and knee flexion range of motion.

> **Important Regulatory Notice:**  
> *"It's just an AI based report care must be taken and consult a doctor"*

---

## Features

- **Client-Side Computer Vision**: Real-time 33-keypoint body tracking powered by Google MediaPipe Tasks Vision running in-browser via WebAssembly / WebGL. Video frames never leave the device.
- **Biomechanical Goniometry Engine**: Pure vector dot product math computing instantaneous bilateral knee flexion angles ($90^\circ$ to $180^\circ$), coronal trunk plumb tilt, and pelvic level tilt.
- **3-Phase Screening Protocol**:
  1. *Coronal Posture Alignment (5s)*
  2. *Natural Walking & Gait Cadence Symmetry (8s)*
  3. *Active Knee Flexion & Squat Excursion (6s)*
- **Clinical Synthesis Matrix**: Fuses self-reported pain, morning stiffness duration, and crepitus with kinematic measurements into a 100-point composite risk index.
- **Interactive Kinematics Studio**:
  - Interactive anatomical cross-section showing hyaline cartilage thinning and subchondral bone spurring.
  - Interactive knee angle goniometer simulator.
- **Permanent Audit Trail**: Regulatory-compliant immutable records retention with deletion permanently disabled.
- **Authorised Evaluator Access**: Institutional login for healthcare practitioners and academic evaluators.
- **Printable Clinical Summary Report**: Formatted for review with orthopedic specialists.

---

## Tech Stack

- **Frontend**: React 19, TypeScript 5, Vite 8, Tailwind CSS v4
- **Computer Vision**: `@mediapipe/tasks-vision` (PoseLandmarker Lite float16 GPU)
- **Icons**: `lucide-react`
- **Backend Architecture**: Designed with a client-side execution model (zero cloud video upload) with optional Express API proxy routes.

---

## Project Structure

```text
├── index.html                   # HTML entry point with meta tags & fonts
├── package.json                 # Project dependencies and npm scripts
├── vite.config.ts               # Vite bundler configuration
├── tsconfig.json                # TypeScript compiler configuration
├── .gitignore                   # Git ignore patterns
├── .env.example                 # Environment variables template
├── public/                      # Static public assets
│   └── favicon.svg              # App icon
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── App.tsx                  # Root router and state orchestrator
    ├── index.css                # Global Tailwind CSS imports
    ├── types/                   # TypeScript interfaces (screening, auth)
    ├── utils/                   # Math, vision, scoring, auth, and storage
    └── components/              # Modular UI components, HUD overlay, and pages
```

---

## License

Apache-2.0
