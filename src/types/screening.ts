/**
 * Types and interfaces for AI-Based Early Osteoarthritis Screening System
 */

export type RiskLevel = 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK';

export type QualityRating = 'Good' | 'Moderate' | 'Reduced';

export interface UserInfo {
  id: string;
  name: string;
  age: number | string;
  gender: 'female' | 'male' | 'other' | 'prefer-not-to-say' | '';
  heightCm?: number | string;
  weightKg?: number | string;
  targetKnee: 'both' | 'left' | 'right' | 'unsure';
}

export interface SymptomResponses {
  kneePain: 'none' | 'mild' | 'moderate' | 'severe';
  kneeStiffness: 'never' | 'sometimes' | 'frequently' | 'almost-always';
  walkingDifficulty: 'none' | 'sometimes' | 'frequently';
  stairDifficulty: 'none' | 'mild' | 'moderate' | 'severe';
  morningStiffnessDuration: 'none' | 'under-30-min' | 'over-30-min';
  jointCrepitus: 'no' | 'yes' | 'unsure';
  previousInjury: 'no' | 'yes';
}

export interface LandmarkPoint {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  z?: number;
  visibility?: number;
}

export interface DetectedPose {
  // Keypoints required for OA movement analysis
  leftShoulder?: LandmarkPoint;
  rightShoulder?: LandmarkPoint;
  leftHip?: LandmarkPoint;
  rightHip?: LandmarkPoint;
  leftKnee?: LandmarkPoint;
  rightKnee?: LandmarkPoint;
  leftAnkle?: LandmarkPoint;
  rightAnkle?: LandmarkPoint;
  rawLandmarks?: LandmarkPoint[];
  isFullBodyVisible: boolean;
  leftKneeDetected: boolean;
  rightKneeDetected: boolean;
  confidence: number;
}

export interface JointAngles {
  leftKneeAngle: number; // degrees (180 = full extension, ~90 = flexion)
  rightKneeAngle: number;
  trunkTiltAngle: number; // degrees deviation from vertical
  pelvicTiltAngle: number; // degrees deviation from horizontal
  kneeDistanceRatio: number; // normalized knee distance vs ankle distance (varus/valgus proxy)
}

export type MovementTestStage = 'idle' | 'standing' | 'walking' | 'kneebend' | 'completed';

export interface MovementMetrics {
  // Standing Posture
  postureScore: number; // 0 - 100
  postureRating: QualityRating;
  trunkAlignmentDegrees: number;
  pelvicTiltDegrees: number;
  coronalSymmetryPct: number;

  // Walking & Gait Analysis
  walkingSymmetryScore: number; // 0 - 100
  walkingSymmetryRating: QualityRating;
  stepSymmetryRatio: number; // e.g. 0.94 (ideal is 1.0)
  gaitCadenceConsistency: number; // 0 - 100
  lateralTrunkSwayDeg: number;

  // Knee Movement & Range of Motion
  kneeMovementScore: number; // 0 - 100
  kneeMovementRating: QualityRating;
  leftKneeMinFlexionAngle: number; // e.g. 110 deg
  rightKneeMinFlexionAngle: number; // e.g. 118 deg
  kneeFlexionAsymmetryDeg: number; // |left - right|
  movementSmoothnessScore: number; // 0 - 100

  // Stability
  movementStabilityScore: number; // 0 - 100
  movementStabilityRating: QualityRating;
  swayVariance: number;

  // Accuracy & Data Integrity
  dataIntegrityPct?: number; // e.g. 98.6%
  validFramesCount?: number;
  cadenceStepsPerMin?: number;
  flexionRepetitionsCount?: number;
}

export interface ScreeningResult {
  id: string;
  timestamp: string;
  userInfo: UserInfo;
  symptoms: SymptomResponses;
  movementMetrics: MovementMetrics;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  isDemo: boolean;
  explanation: {
    summary: string;
    clinicalObservation: string;
    biomechanicalObservations: string[];
    recommendedActions: string[];
  };
}
