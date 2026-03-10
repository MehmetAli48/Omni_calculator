'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

interface GraphingViewportProps {
  data: {
    points: Point[];
    expression: string;
  } | null;
}

const GraphingViewport: React.FC<GraphingViewportProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);

    for (let x = 0; x <= width; x += width / 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += height / 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.setLineDash([]);

    // Draw Axis
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    
    // Y-Axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // X-Axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (data && data.points.length > 0) {
      const scaleX = (width - padding * 2) / 20; // range is -10 to 10
      const scaleY = (height - padding * 2) / 20;

      ctx.strokeStyle = '#ccff00'; // Cyber Lime
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ccff00';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      data.points.forEach((p, i) => {
        const canvasX = width / 2 + p.x * scaleX;
        const canvasY = height / 2 - p.y * scaleY;

        if (i === 0) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      });
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow
    }
  }, [data]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!data) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;
    
    // Map canvas coords back to math coords
    const mathX = ((x - width / 2) / (width - 40)) * 20;
    const mathY = ((height / 2 - y) / (height - 40)) * 20;

    setHoverCoords({ x: mathX, y: mathY });
  };

  return (
    <div className="relative w-full aspect-video bg-black border border-white/10 overflow-hidden font-mono group">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(204,255,0,0.03)_1px,transparent_1px)] bg-[length:20px_20px]" />

      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverCoords(null)}
        className="w-full h-full cursor-crosshair"
      />

      {/* Tactical Tooltip */}
      {hoverCoords && (
        <div 
          className="absolute top-2 right-2 bg-black/80 border border-primary/30 text-[10px] p-1 text-primary animate-pulse"
        >
          X: {hoverCoords.x.toFixed(2)}<br />
          Y: {hoverCoords.y.toFixed(2)}
        </div>
      )}

      {/* Info Overlay */}
      <div className="absolute bottom-2 left-2 flex flex-col gap-1 pointer-events-none">
        <div className="text-[10px] text-primary/70">
          STATUS: {data ? 'ACTIVE' : 'IDLE'}
        </div>
        <div className="text-xs text-primary font-bold">
          EXPR: {data?.expression || 'N/A'}
        </div>
      </div>

      {/* CRT Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default GraphingViewport;
