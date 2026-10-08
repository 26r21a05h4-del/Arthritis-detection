import React, { useEffect, useRef } from 'react';
import { DetectedPose, JointAngles } from '../types/screening';

interface PoseOverlayProps {
  pose: DetectedPose;
  angles: JointAngles;
  width: number;
  height: number;
  isTestActive: boolean;
}

export const PoseOverlay: React.FC<PoseOverlayProps> = ({
  pose,
  angles,
  width,
  height,
  isTestActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scanlineYRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Viewfinder HUD Corner Brackets
    const bracketSize = 24;
    const padding = 16;
    ctx.strokeStyle = isTestActive ? '#10b981' : '#0d9488';
    ctx.lineWidth = 2.5;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(padding, padding + bracketSize);
    ctx.lineTo(padding, padding);
    ctx.lineTo(padding + bracketSize, padding);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(width - padding - bracketSize, padding);
    ctx.lineTo(width - padding, padding);
    ctx.lineTo(width - padding, padding + bracketSize);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - bracketSize);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(padding + bracketSize, height - padding);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(width - padding - bracketSize, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(width - padding, height - padding - bracketSize);
    ctx.stroke();

    // 2. Ideal Posture Alignment Guide Box (Subtle centered bounding box)
    const boxW = width * 0.52;
    const boxH = height * 0.88;
    const boxX = (width - boxW) / 2;
    const boxY = height * 0.06;

    ctx.save();
    ctx.strokeStyle = pose.isFullBodyVisible ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(boxX, boxY, boxW, boxH);
    ctx.restore();

    // Accuracy Telemetry Tag in HUD Top Right
    ctx.save();
    const hudBadgeText = isTestActive ? '● KINEMATIC EMA FILTER: 60FPS' : '○ OPTICAL CALIBRATION STANDBY';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    const tagW = ctx.measureText(hudBadgeText).width + 16;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.beginPath();
    ctx.roundRect(width - padding - tagW, padding + 4, tagW, 20, 4);
    ctx.fill();

    ctx.fillStyle = isTestActive ? '#2dd4bf' : '#94a3b8';
    ctx.fillText(hudBadgeText, width - padding - tagW + 8, padding + 17);
    ctx.restore();

    // 3. Animated Laser Scanline Beam when Test is Active
    if (isTestActive) {
      scanlineYRef.current = (scanlineYRef.current + 3) % height;
      const sy = scanlineYRef.current;

      const grad = ctx.createLinearGradient(0, sy - 20, 0, sy + 20);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0)');
      grad.addColorStop(0.5, 'rgba(45, 212, 191, 0.35)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, sy - 20, width, 40);

      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();
    }

    // If no landmarks detected, stop here
    if (!pose.leftHip && !pose.rightHip) return;

    const toCanvasX = (normalizedX: number) => normalizedX * width;
    const toCanvasY = (normalizedY: number) => normalizedY * height;

    // 4. Draw Coronal Plumb Midline Guide
    if (pose.leftShoulder && pose.rightShoulder && pose.leftHip && pose.rightHip) {
      const midShoulderX = toCanvasX((pose.leftShoulder.x + pose.rightShoulder.x) / 2);
      const midHipX = toCanvasX((pose.leftHip.x + pose.rightHip.x) / 2);
      const topY = toCanvasY(Math.min(pose.leftShoulder.y, pose.rightShoulder.y)) - 25;
      const botY = height - 20;

      // Draw subtle plumb line
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(midShoulderX, topY);
      ctx.lineTo(midHipX, botY);
      ctx.stroke();
      ctx.restore();

      // Pelvic horizontal leveling line
      const lhx = toCanvasX(pose.leftHip.x);
      const lhy = toCanvasY(pose.leftHip.y);
      const rhx = toCanvasX(pose.rightHip.x);
      const rhy = toCanvasY(pose.rightHip.y);

      ctx.save();
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lhx, lhy);
      ctx.lineTo(rhx, rhy);
      ctx.stroke();
      ctx.restore();
    }

    // Draw connection lines with high-contrast glowing style
    const drawBone = (
      p1?: { x: number; y: number },
      p2?: { x: number; y: number },
      color = '#14b8a6',
      lineWidth = 4,
      glowColor = 'rgba(20, 184, 166, 0.4)'
    ) => {
      if (!p1 || !p2) return;
      const x1 = toCanvasX(p1.x);
      const y1 = toCanvasY(p1.y);
      const x2 = toCanvasX(p2.x);
      const y2 = toCanvasY(p2.y);

      // Glow halo
      ctx.save();
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = lineWidth + 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Core bone line
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    // Draw joint point
    const drawJoint = (
      p?: { x: number; y: number; visibility?: number },
      coreColor = '#0d9488',
      radius = 6,
      ringColor = '#ffffff'
    ) => {
      if (!p) return;
      const cx = toCanvasX(p.x);
      const cy = toCanvasY(p.y);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 3, 0, 2 * Math.PI);
      ctx.fillStyle = ringColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fillStyle = coreColor;
      ctx.fill();
      ctx.restore();
    };

    // 5. Draw Skeleton Segments
    if (pose.leftShoulder && pose.rightShoulder) {
      drawBone(pose.leftShoulder, pose.rightShoulder, '#38bdf8', 3, 'rgba(56, 189, 248, 0.3)');
    }
    if (pose.leftShoulder && pose.leftHip) {
      drawBone(pose.leftShoulder, pose.leftHip, '#94a3b8', 2.5, 'rgba(148, 163, 184, 0.2)');
    }
    if (pose.rightShoulder && pose.rightHip) {
      drawBone(pose.rightShoulder, pose.rightHip, '#94a3b8', 2.5, 'rgba(148, 163, 184, 0.2)');
    }

    const legColor = isTestActive ? '#10b981' : '#14b8a6';
    const legGlow = isTestActive ? 'rgba(16, 185, 129, 0.45)' : 'rgba(20, 184, 166, 0.35)';

    // Left Thigh & Shank
    drawBone(pose.leftHip, pose.leftKnee, legColor, 5, legGlow);
    drawBone(pose.leftKnee, pose.leftAnkle, legColor, 5, legGlow);

    // Right Thigh & Shank
    drawBone(pose.rightHip, pose.rightKnee, legColor, 5, legGlow);
    drawBone(pose.rightKnee, pose.rightAnkle, legColor, 5, legGlow);

    // Keypoint Nodes
    drawJoint(pose.leftShoulder, '#38bdf8', 4.5);
    drawJoint(pose.rightShoulder, '#38bdf8', 4.5);
    drawJoint(pose.leftHip, '#0ea5e9', 5.5);
    drawJoint(pose.rightHip, '#0ea5e9', 5.5);
    drawJoint(pose.leftAnkle, '#0f766e', 4.5);
    drawJoint(pose.rightAnkle, '#0f766e', 4.5);

    // 6. Draw High-Precision Circular Goniometer Reticles on Knees
    const drawKneeGoniometerHUD = (
      knee?: { x: number; y: number },
      angle = 180,
      label = 'L KNEE',
      alignLeft = true
    ) => {
      if (!knee) return;
      const kx = toCanvasX(knee.x);
      const ky = toCanvasY(knee.y);

      const isNormal = angle >= 125;
      const isMild = angle >= 105 && angle < 125;
      const mainColor = isNormal ? '#10b981' : isMild ? '#f59e0b' : '#ef4444';

      // Concentric targeting rings
      ctx.save();
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(kx, ky, 18, 0, 2 * Math.PI);
      ctx.stroke();

      // Angle sweep arc
      const sweepRad = ((180 - angle) * Math.PI) / 180;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(kx, ky, 22, -Math.PI / 2, -Math.PI / 2 + sweepRad);
      ctx.stroke();

      // Center crosshair
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(kx - 6, ky);
      ctx.lineTo(kx + 6, ky);
      ctx.moveTo(kx, ky - 6);
      ctx.lineTo(kx, ky + 6);
      ctx.stroke();

      // Solid Joint Core
      ctx.beginPath();
      ctx.arc(kx, ky, 6, 0, 2 * Math.PI);
      ctx.fillStyle = mainColor;
      ctx.fill();

      // Readout Badge
      const text = `${label} ${angle}°`;
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      const textMetrics = ctx.measureText(text);
      const badgeW = textMetrics.width + 14;
      const badgeH = 24;
      const badgeX = alignLeft ? kx - badgeW - 16 : kx + 16;
      const badgeY = ky - badgeH / 2;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
      ctx.fill();

      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, badgeX + 7, badgeY + badgeH / 2);
      ctx.restore();
    };

    drawKneeGoniometerHUD(pose.leftKnee, angles.leftKneeAngle, 'L KNEE', true);
    drawKneeGoniometerHUD(pose.rightKnee, angles.rightKneeAngle, 'R KNEE', false);
  }, [pose, angles, width, height, isTestActive]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full object-cover"
    />
  );
};
