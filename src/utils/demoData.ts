/**
 * Preset Demo Scenarios for College Project Presentations and Testing
 * Provides transparent, scientifically calibrated sample cases.
 */

import { ScreeningResult } from '../types/screening';
import { buildScreeningResult } from './scoringEngine';

export interface DemoPreset {
  id: string;
  name: string;
  description: string;
  expectedRisk: 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK';
  result: ScreeningResult;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'demo-low-risk',
    name: 'Case A: Asymptomatic Healthy Control',
    description: 'Young adult / athlete with symmetric joint kinematics and no reported knee symptoms.',
    expectedRisk: 'LOW RISK',
    result: buildScreeningResult(
      {
        id: 'DEMO-HEALTHY-01',
        name: 'Jordan Miller (Demo)',
        age: 26,
        gender: 'female',
        heightCm: 168,
        weightKg: 62,
        targetKnee: 'both',
      },
      {
        kneePain: 'none',
        kneeStiffness: 'never',
        walkingDifficulty: 'none',
        stairDifficulty: 'none',
        morningStiffnessDuration: 'none',
        jointCrepitus: 'no',
        previousInjury: 'no',
      },
      {
        postureScore: 92,
        postureRating: 'Good',
        trunkAlignmentDegrees: 1.2,
        pelvicTiltDegrees: 1.1,
        coronalSymmetryPct: 96,

        walkingSymmetryScore: 94,
        walkingSymmetryRating: 'Good',
        stepSymmetryRatio: 0.98,
        gaitCadenceConsistency: 92,
        lateralTrunkSwayDeg: 2.1,

        kneeMovementScore: 95,
        kneeMovementRating: 'Good',
        leftKneeMinFlexionAngle: 122,
        rightKneeMinFlexionAngle: 124,
        kneeFlexionAsymmetryDeg: 2,
        movementSmoothnessScore: 94,

        movementStabilityScore: 91,
        movementStabilityRating: 'Good',
        swayVariance: 0.04,
      },
      true
    ),
  },
  {
    id: 'demo-medium-risk',
    name: 'Case B: Early Stage Unilateral Knee OA Indicators',
    description: 'Middle-aged individual experiencing intermittent right knee stiffness, mild stair discomfort, and slight antalgic offloading.',
    expectedRisk: 'MEDIUM RISK',
    result: buildScreeningResult(
      {
        id: 'DEMO-EARLY-OA-02',
        name: 'Robert Vance (Demo)',
        age: 54,
        gender: 'male',
        heightCm: 176,
        weightKg: 82,
        targetKnee: 'right',
      },
      {
        kneePain: 'mild',
        kneeStiffness: 'sometimes',
        walkingDifficulty: 'sometimes',
        stairDifficulty: 'mild',
        morningStiffnessDuration: 'under-30-min',
        jointCrepitus: 'yes',
        previousInjury: 'yes',
      },
      {
        postureScore: 68,
        postureRating: 'Moderate',
        trunkAlignmentDegrees: 3.8,
        pelvicTiltDegrees: 2.9,
        coronalSymmetryPct: 79,

        walkingSymmetryScore: 66,
        walkingSymmetryRating: 'Moderate',
        stepSymmetryRatio: 0.84,
        gaitCadenceConsistency: 72,
        lateralTrunkSwayDeg: 4.8,

        kneeMovementScore: 64,
        kneeMovementRating: 'Moderate',
        leftKneeMinFlexionAngle: 126,
        rightKneeMinFlexionAngle: 108,
        kneeFlexionAsymmetryDeg: 18,
        movementSmoothnessScore: 70,

        movementStabilityScore: 71,
        movementStabilityRating: 'Moderate',
        swayVariance: 0.12,
      },
      true
    ),
  },
  {
    id: 'demo-high-risk',
    name: 'Case C: Moderate-to-Advanced Movement Abnormality',
    description: 'Senior with persistent bilateral knee pain, restricted flexion, marked antalgic limp, and significant functional limitation.',
    expectedRisk: 'HIGH RISK',
    result: buildScreeningResult(
      {
        id: 'DEMO-ADV-OA-03',
        name: 'Elena Rostova (Demo)',
        age: 67,
        gender: 'female',
        heightCm: 160,
        weightKg: 78,
        targetKnee: 'both',
      },
      {
        kneePain: 'moderate',
        kneeStiffness: 'frequently',
        walkingDifficulty: 'frequently',
        stairDifficulty: 'severe',
        morningStiffnessDuration: 'over-30-min',
        jointCrepitus: 'yes',
        previousInjury: 'no',
      },
      {
        postureScore: 42,
        postureRating: 'Reduced',
        trunkAlignmentDegrees: 6.2,
        pelvicTiltDegrees: 5.4,
        coronalSymmetryPct: 58,

        walkingSymmetryScore: 40,
        walkingSymmetryRating: 'Reduced',
        stepSymmetryRatio: 0.69,
        gaitCadenceConsistency: 46,
        lateralTrunkSwayDeg: 8.5,

        kneeMovementScore: 38,
        kneeMovementRating: 'Reduced',
        leftKneeMinFlexionAngle: 98,
        rightKneeMinFlexionAngle: 86,
        kneeFlexionAsymmetryDeg: 12,
        movementSmoothnessScore: 44,

        movementStabilityScore: 45,
        movementStabilityRating: 'Reduced',
        swayVariance: 0.28,
      },
      true
    ),
  },
];
