import { useEffect, useRef } from "react";

/**
 * Looping, explosive dark-grey dust plumes drawn on a canvas.
 * React port of the `<dust-canvas>` custom element from hero-dust.js.
 */
type Puff = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  grow: number;
  life: number;
  max: number;
  seed: number;
  tone: number;
  alpha: number;
};

export function DustCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    let w = 1;
    let h = 1;
    let t = 0;
    let nextBurst = 0;
    let raf = 0;
    const puffs: Puff[] = [];

    const size = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (cv.width === bw && cv.height === bh) return; // resizing clears the bitmap
      cv.width = bw;
      cv.height = bh;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = () => {
      // origin biased to the right half, where the hero figure sits
      const ox = w * (0.42 + Math.random() * 0.52);
      const oy = h * (0.25 + Math.random() * 0.6);
      const n = 9 + Math.floor(Math.random() * 7);
      const power = 0.6 + Math.random() * 0.9;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (0.25 + Math.random() * 1.5) * power;
        puffs.push({
          x: ox + Math.cos(a) * 12,
          y: oy + Math.sin(a) * 12,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp * 0.62 - 0.18,
          r: (26 + Math.random() * 70) * power,
          grow: 0.5 + Math.random() * 1.5,
          life: 0,
          max: 150 + Math.random() * 190,
          seed: Math.random() * 6.28,
          tone: 62 + Math.floor(Math.random() * 46),
          alpha: 0.12 + Math.random() * 0.2,
        });
      }
    };

    const loop = () => {
      t++;
      if (t > nextBurst) {
        burst();
        nextBurst = t + 40 + Math.random() * 110;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0b090b";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;
        if (p.life > p.max) {
          puffs.splice(i, 1);
          continue;
        }
        const k = p.life / p.max;
        p.x += p.vx + Math.sin(p.seed + p.life * 0.02) * 0.3;
        p.y += p.vy - k * 0.22;
        p.vx *= 0.975;
        p.vy *= 0.975;
        const rad = p.r * (0.3 + p.grow * k * 1.9);
        const fade = Math.sin(Math.min(1, k * 1.1) * Math.PI) * p.alpha;
        if (fade <= 0.001) continue;
        const g = ctx.createRadialGradient(p.x, p.y, rad * 0.08, p.x, p.y, rad);
        const tone = p.tone;
        g.addColorStop(0, `rgba(${tone},${tone},${tone + 4},${fade.toFixed(3)})`);
        g.addColorStop(0.5, `rgba(${tone - 22},${tone - 24},${tone - 20},${(fade * 0.5).toFixed(3)})`);
        g.addColorStop(1, "rgba(12,10,12,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(size);
    ro.observe(cv);
    size();

    // Respect reduced-motion: draw a single settled frame instead of looping.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      burst();
      for (let i = 0; i < 90; i++) {
        puffs.forEach((p) => p.life++);
      }
      loop();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
