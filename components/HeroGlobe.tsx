"use client";

import { useEffect, useRef } from "react";

const NUM_POINTS = 1100;
const RADIUS = 205;
const SIZE = 520;

function fibonacciSphere(samples: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push([x, y, z]);
  }

  return points;
}

// Cheap value-noise so the dot mask reads as organic "landmass" clusters
// rather than uniform random speckle.
function seededMask(points: [number, number, number][]) {
  return points.map(([x, y, z]) => {
    const n =
      Math.sin(x * 6.1 + y * 3.7) * Math.cos(z * 5.3 + y * 2.1) +
      Math.sin((x + z) * 4.4) * 0.5;
    return n > 0.05;
  });
}

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotation = useRef({ x: 0.45, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    const points = fibonacciSphere(NUM_POINTS);
    const mask = seededMask(points);

    let raf: number;

    const project = (p: [number, number, number], rx: number, ry: number) => {
      const [x, y, z] = p;

      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return { x: x1, y: y1, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const cx = SIZE / 2;
      const cy = SIZE / 2;

      const projected = points.map((p, i) => {
        const { x, y, z } = project(p, rotation.current.x, rotation.current.y);
        return { x, y, z, i };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const { x, y, z, i } of projected) {
        if (!mask[i]) continue;

        const scale = (z + 1.5) / 2.5;
        const px = cx + x * RADIUS;
        const py = cy + y * RADIUS;
        const r = 0.5 + scale * 1.4;
        const alpha = 0.12 + scale * 0.7;

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(17,17,17,${alpha})`;
        ctx.fill();
      }

      // faint outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS + 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(17,17,17,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (!dragging.current) {
        rotation.current.y += 0.0016;
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    rotation.current.y += dx * 0.006;
    rotation.current.x += dy * 0.006;

    last.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="cursor-grab touch-none select-none active:cursor-grabbing"
      aria-label="Interactive globe, drag to rotate"
      role="img"
    />
  );
}
