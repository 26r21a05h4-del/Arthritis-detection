/**
 * Osteoarthritis Preliminary Screening Scoring Engine
 * Combines clinical symptom questionnaire (WOMAC/KOOS derived)
 * with computer-vision gait & knee movement metrics.
 */

import {
  SymptomResponses,
  MovementMetrics,
  RiskLevel,
  QualityRating,
  ScreeningResult,
  UserInfo,
} from '../types/screening';

export function rateMetric(score: number): QualityRating {
  if (score >= 78) return 'Good';
  if (score >= 50) return 'Moderate';
  return 'Reduced';
}

/**
 * Calculates weighted preliminary screening score (0 - 100)
 */
export function calculateScreeningScore(
  symptoms: SymptomResponses,
  metrics: MovementMetrics
): { totalScore: number; riskLevel: RiskLevel } {
  // 1. Symptom Component (Weight: 40%)
  let symptomRaw = 0;

  // Pain (0 to 28)
  if (symptoms.kneePain === 'mild') symptomRaw += 8;
  else if (symptoms.kneePain === 'moderate') symptomRaw += 18;
  else if (symptoms.kneePain === 'severe') symptomRaw += 28;

  // Stiffness (0 to 14)
  if (symptoms.kneeStiffness === 'sometimes') symptomRaw += 4;
  else if (symptoms.kneeStiffness === 'frequently') symptomRaw += 9;
  else if (symptoms.kneeStiffness === 'almost-always') symptomRaw += 14;

  // Walking Difficulty (0 to 16)
  if (symptoms.walkingDifficulty === 'sometimes') symptomRaw += 8;
  else if (symptoms.walkingDifficulty === 'frequently') symptomRaw += 16;

  // Stairs Difficulty (0 to 16)
  if (symptoms.stairDifficulty === 'mild') symptomRaw += 5;
  else if (symptoms.stairDifficulty === 'moderate') symptomRaw += 10;
  else if (symptoms.stairDifficulty === 'severe') symptomRaw += 16;

  // Morning Stiffness Duration (0 to 10)
  if (symptoms.morningStiffnessDuration === 'under-30-min') symptomRaw += 5;
  else if (symptoms.morningStiffnessDuration === 'over-30-min') symptomRaw += 10;

  // Crepitus (0 to 6)
  if (symptoms.jointCrepitus === 'yes') symptomRaw += 6;
  else if (symptoms.jointCrepitus === 'unsure') symptomRaw += 2;

  // Max raw symptom is ~90, normalize to 0-40 points
  const symptomContribution = Math.min(40, (symptomRaw / 90) * 40);

  // 2. Posture Component (Weight: 18%)
  // Lower postureScore means poorer posture -> more risk
  const postureRisk = (100 - metrics.postureScore) * 0.18;

  // 3. Walking Symmetry Component (Weight: 22%)
  // Reduced walking symmetry is a major hallmark of antalgic gait in knee OA
  const walkingRisk = (100 - metrics.walkingSymmetryScore) * 0.22;

  // 4. Knee Movement & Flexion Component (Weight: 20%)
  // Limited range of motion and unilateral asymmetry
  const kneeRisk = (100 - metrics.kneeMovementScore) * 0.20;

  const totalScore = Math.round(
    Math.min(100, Math.max(0, symptomContribution + postureRisk + walkingRisk + kneeRisk))
  );

  let riskLevel: RiskLevel = 'LOW RISK';
  if (totalScore >= 66) {
    riskLevel = 'HIGH RISK';
  } else if (totalScore >= 33) {
    riskLevel = 'MEDIUM RISK';
  } else {
    riskLevel = 'LOW RISK';
  }

  return { totalScore, riskLevel };
}

/**
 * Builds structured clinical explanations for the results dashboard
 */
export function generateExplanations(
  riskLevel: RiskLevel,
  symptoms: SymptomResponses,
  metrics: MovementMetrics
) {
  let summary = '';
  let clinicalObservation = '';
  const biomechanicalObservations: string[] = [];
  const recommendedActions: string[] = [];

  // Posture biomechanical summary
  if (metrics.postureRating === 'Good') {
    biomechanicalObservations.push(
      `Standing coronal alignment is well-preserved (trunk tilt: ${metrics.trunkAlignmentDegrees}°, pelvic tilt: ${metrics.pelvicTiltDegrees}°).`
    );
  } else if (metrics.postureRating === 'Moderate') {
    biomechanicalObservations.push(
      `Mild pelvic/trunk inclination noticed (${metrics.pelvicTiltDegrees}° pelvic tilt), suggesting slight antalgic offloading or muscular imbalance.`
    );
  } else {
    biomechanicalObservations.push(
      `Noticeable coronal deviation or lateral shift detected (${metrics.trunkAlignmentDegrees}° trunk tilt), which frequently correlates with unilateral knee pain compensation.`
    );
  }

  // Gait biomechanical summary
  if (metrics.walkingSymmetryRating === 'Good') {
    biomechanicalObservations.push(
      `Gait analysis revealed steady bilateral cadence and balanced step progression (${metrics.coronalSymmetryPct}% bilateral symmetry).`
    );
  } else if (metrics.walkingSymmetryRating === 'Moderate') {
    biomechanicalObservations.push(
      `Slight discrepancy in bilateral step dynamics or knee trajectory observed during forward movement (${metrics.coronalSymmetryPct}% symmetry index).`
    );
  } else {
    biomechanicalObservations.push(
      `Pronounced walking asymmetry detected (${metrics.coronalSymmetryPct}% symmetry index) with elevated lateral trunk sway (${metrics.lateralTrunkSwayDeg}°), typical of pain-avoidant antalgic gait.`
    );
  }

  // Knee flexion summary
  if (metrics.kneeMovementRating === 'Good') {
    biomechanicalObservations.push(
      `Knee joint excursion during flexion reached functional range (L: ${metrics.leftKneeMinFlexionAngle}°, R: ${metrics.rightKneeMinFlexionAngle}°) with minimal difference (${metrics.kneeFlexionAsymmetryDeg}°).`
    );
  } else {
    biomechanicalObservations.push(
      `Inter-limb knee flexion disparity of ${metrics.kneeFlexionAsymmetryDeg}° observed (L: ${metrics.leftKneeMinFlexionAngle}°, R: ${metrics.rightKneeMinFlexionAngle}°), reflecting potential restricted extension/flexion or guarding.`
    );
  }

  // Risk categorization texts
  if (riskLevel === 'LOW RISK') {
    summary =
      'Your responses and observed movement patterns did not show strong indicators requiring immediate concern in this preliminary screening. This does not rule out osteoarthritis or other conditions.';
    clinicalObservation =
      'No substantial gait asymmetry, joint angle restrictions, or severe pain markers were captured during this screening session. Movement cadence and bilateral posture appear symmetric.';
    recommendedActions.push(
      'Maintain regular low-impact physical activity (swimming, cycling, walking) to support joint cartilage health and quadriceps strength.'
    );
    recommendedActions.push(
      'Perform periodic screenings if new stiffness or joint discomfort appears, particularly after sustained rest or intense activity.'
    );
    recommendedActions.push(
      'Continue healthy lifestyle practices and maintain an ergonomic workstation setup.'
    );
  } else if (riskLevel === 'MEDIUM RISK') {
    summary =
      'Some movement or symptom indicators were identified during this preliminary screening. Consider discussing persistent symptoms with a qualified healthcare professional.';
    clinicalObservation =
      'Mild-to-moderate markers—such as localized joint stiffness, stair discomfort, or noticeable gait/flexion asymmetry—were documented during movement analysis.';
    recommendedActions.push(
      'Schedule a routine evaluation with a primary care physician, physiotherapist, or rheumatologist to discuss persistent knee discomfort.'
    );
    recommendedActions.push(
      'Focus on gentle quadriceps and hamstring strengthening exercises under professional guidance to relieve knee joint stress.'
    );
    recommendedActions.push(
      'Avoid high-impact jumping or prolonged unassisted kneeling until a clinical assessment is performed.'
    );
  } else {
    summary =
      'Several indicators were identified during this preliminary screening. Consider stopping the test if movement causes pain and seek professional medical evaluation.';
    clinicalObservation =
      'Multiple elevated markers were observed, including self-reported pain/stiffness, functional walking constraints, and evident kinematic asymmetries or restricted knee flexion in computer vision tracking.';
    recommendedActions.push(
      'Seek formal medical consultation with an orthopedic specialist or rheumatologist for physical examination and diagnostic radiography (X-ray / MRI).'
    );
    recommendedActions.push(
      'Discontinue any repetitive high-load physical movements that exacerbate joint pain or swelling.'
    );
    recommendedActions.push(
      'If you develop sudden joint swelling, acute inability to bear weight, warmth, or severe nocturnal pain, consult urgent medical care immediately.'
    );
  }

  return {
    summary,
    clinicalObservation,
    biomechanicalObservations,
    recommendedActions,
  };
}

/**
 * Builds the complete result object
 */
export function buildScreeningResult(
  userInfo: UserInfo,
  symptoms: SymptomResponses,
  metrics: MovementMetrics,
  isDemo = false
): ScreeningResult {
  const { totalScore, riskLevel } = calculateScreeningScore(symptoms, metrics);
  const explanations = generateExplanations(riskLevel, symptoms, metrics);

  return {
    id: userInfo.id || `SCN-${Date.now().toString(36).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    userInfo,
    symptoms,
    movementMetrics: metrics,
    riskLevel,
    riskScore: totalScore,
    isDemo,
    explanation: explanations,
  };
}
