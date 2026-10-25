"use client";

import { useEffect, useRef } from "react";

/**
 * The brain from the video: a black sphere with a lime icosahedron turning
 * inside it, a real one, projected from its twelve corners every frame.
 *
 * The lines are written straight onto the SVG, not through React, so a frame
 * costs thirty attribute writes and no render. It turns only while on screen,
 * faster while the brain is reading, and stands still for a reader who asked
 * for less motion.
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const VERTICES: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
// Two corners two units apart share an edge: thirty of them.
const EDGES: [number, number][] = VERTICES.flatMap((a, i) =>
  VERTICES.flatMap((b, j) =>
    j > i && Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 2.01 ? [[i, j] as [number, number]] : [],
  ),
);
const RADIUS = Math.hypot(1, PHI);
const SCALE = 30 / RADIUS;

export function BrainOrb({ thinking, className }: { thinking: boolean; className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const target = useRef(1);

  useEffect(() => {
    target.current = thinking ? 3.4 : 1;
  }, [thinking]);

  useEffect(() => {
    const node = svg.current;
    if (!node) return;
    const lines = [...node.querySelectorAll("line")];
    const dots = [...node.querySelectorAll("circle")];
    let angle = 0.7;
    let speed = 1;
    let last = 0;
    let frame = 0;

    const draw = () => {
      const tilt = 0.42 + Math.sin(angle * 0.6) * 0.14;
      const cy = Math.cos(angle), sy = Math.sin(angle), cx = Math.cos(tilt), sx = Math.sin(tilt);
      const points = VERTICES.map(([x, y, z]) => {
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        return [50 + x1 * SCALE, 50 + (y * cx - z1 * sx) * SCALE, y * sx + z1 * cx];
      });
      // Nearer edges read brighter, the far side of the shape recedes.
      const depth = (z: number) => 0.18 + 0.82 * ((z + RADIUS) / (2 * RADIUS));
      EDGES.forEach(([a, b], i) => {
        const line = lines[i];
        line.setAttribute("x1", points[a][0].toFixed(2));
        line.setAttribute("y1", points[a][1].toFixed(2));
        line.setAttribute("x2", points[b][0].toFixed(2));
        line.setAttribute("y2", points[b][1].toFixed(2));
        line.style.opacity = depth((points[a][2] + points[b][2]) / 2).toFixed(2);
      });
      points.forEach(([x, y, z], i) => {
        dots[i].setAttribute("cx", x.toFixed(2));
        dots[i].setAttribute("cy", y.toFixed(2));
        dots[i].style.opacity = depth(z).toFixed(2);
      });
    };
    draw();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = (now: number) => {
      const dt = last ? Math.min(50, now - last) : 16;
      last = now;
      speed += (target.current - speed) * 0.04;
      angle += dt * 0.00042 * speed;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        data-thinking={thinking ? "" : undefined}
        className="brain-glow absolute -inset-[34%] rounded-full bg-[radial-gradient(circle,rgba(226,249,59,0.62)_0%,rgba(226,249,59,0.2)_38%,transparent_68%)]"
      />
      <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_34%_28%,#3a3a3d_0%,#121214_46%,#050505_78%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_22px_44px_-18px_rgba(14,14,15,0.65)] ring-1 ring-black/40">
        <svg ref={svg} viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {EDGES.map(([a, b]) => (
            <line key={`${a}-${b}`} stroke="#e2f93b" strokeWidth="0.9" strokeLinecap="round" />
          ))}
          {VERTICES.map((_, i) => (
            <circle key={i} r="1.7" fill="#e2f93b" />
          ))}
        </svg>
      </div>
    </div>
  );
}
