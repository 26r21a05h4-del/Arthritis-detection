import React, { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

interface GaitWaveformVisualizerProps {
  leftAngle: number;
  rightAngle: number;
  isTestActive: boolean;
  stageName?: string;
}

export const GaitWaveformVisualizer: React.FC<GaitWaveformVisualizerProps> = ({
  leftAngle,
  rightAngle,
  isTestActive,
  stageName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const historyRef = useRef<{ left: number; right: number }[]>([]);

  useEffect(() => {
    // Add current angles to history buffer (last 80 points)
    historyRef.current.push({ left: leftAngle, right: rightAngle });
    if (historyRef.current.length > 80) {
      historyRef.current.shift();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Grid lines (representing 180°, 140°, 100°)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    // 180 deg (top reference)
    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(width, 15);
    ctx.stroke();

    // 140 deg (middle reference)
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // 100 deg (bottom reference)
    ctx.beginPath();
    ctx.moveTo(0, height - 15);
    ctx.lineTo(width, height - 15);
    ctx.stroke();

    const data = historyRef.current;
    if (data.length < 2) return;

    const mapAngleToY = (deg: number) => {
      // 180° = near top (15px), 90° = near bottom (height - 15px)
      const clamped = Math.max(90, Math.min(180, deg));
      const normalized = (180 - clamped) / 90; // 0 for 180°, 1 for 90°
      return 15 + normalized * (height - 30);
    };

    const stepX = width / 80;

    // Draw Left Knee Curve (Teal #2dd4bf)
    ctx.beginPath();
    ctx.strokeStyle = '#2dd4bf';
    ctx.lineWidth = 2;
    data.forEach((pt, i) => {
      const x = i * stepX;
      const y = mapAngleToY(pt.left);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Right Knee Curve (Sky Blue #38bdf8)
    ctx.beginPath();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    data.forEach((pt, i) => {
      const x = i * stepX;
      const y = mapAngleToY(pt.right);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw current endpoint glowing dots
    const lastIdx = data.length - 1;
    const lastPt = data[lastIdx];
    const lastX = lastIdx * stepX;

    // Left dot
    ctx.beginPath();
    ctx.arc(lastX, mapAngleToY(lastPt.left), 3.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#2dd4bf';
    ctx.fill();

    // Right dot
    ctx.beginPath();
    ctx.arc(lastX, mapAngleToY(lastPt.right), 3.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();
  }, [leftAngle, rightAngle]);

  return (
    <div className="bg-slate-950/90 rounded-xl border border-slate-800 p-3 text-xs space-y-2 font-mono">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 text-teal-300 font-bold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>REAL-TIME KINEMATIC WAVEFORM</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-teal-400">
            <span className="w-2 h-0.5 bg-teal-400 inline-block" /> L Knee ({leftAngle}°)
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <span className="w-2 h-0.5 bg-sky-400 inline-block" /> R Knee ({rightAngle}°)
          </span>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-slate-800/80">
        <canvas
          ref={canvasRef}
          width={360}
          height={80}
          className="w-full h-20 block"
        />
        <div className="absolute top-1 left-2 text-[9px] text-slate-500">180° Ext</div>
        <div className="absolute bottom-1 left-2 text-[9px] text-slate-500">90° Flex</div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>Sampling: 60Hz · Temporal EMA Filter Active</span>
        <span className="text-emerald-400 font-semibold">
          {isTestActive ? '● RECORDING OSCILLATION' : '○ LIVE MONITOR'}
        </span>
      </div>
    </div>
  );
};
