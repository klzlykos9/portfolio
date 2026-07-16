import { useEffect, useRef } from 'react';

/**
 * Smoke-aurora cursor trail.
 *
 * Technique — canvas particle system:
 *   • Each mouse-move emits a cluster of soft smoke puffs.
 *   • Every puff is a blurred radial gradient that expands, drifts slightly,
 *     fades in, then fades out — exactly like real smoke rising.
 *   • Drawing is: clear → blur pass (all puffs) → sharp pass (bright cores).
 *   • When the cursor stops, no new puffs are created and existing ones
 *     finish their lifecycle (~1.8 s) then vanish completely.
 *   • mix-blend-mode: screen so colours add on the dark background.
 */

// ── Particle definition ───────────────────────────────────────────────────────
interface Puff {
  x: number; y: number;
  vx: number; vy: number;    // drift velocity
  r: number;                 // current radius
  maxR: number;              // final radius (grows toward this)
  alpha: number;             // current opacity (0‥1)
  peakAlpha: number;         // maximum opacity it reaches
  hue: number;               // HSL hue
  saturation: number;
  age: number;
  lifespan: number;          // total frames this puff lives
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const rand  = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ── Component ─────────────────────────────────────────────────────────────────
const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d', { alpha: true })!;

    // Off-screen canvas: draw blurred smoke here, then composite to main
    const off    = document.createElement('canvas');
    const octx   = off.getContext('2d', { alpha: true })!;

    const resize = () => {
      canvas.width = off.width  = window.innerWidth;
      canvas.height = off.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const puffs: Puff[] = [];
    let hue   = 178;   // start: teal-cyan
    let lastX = -1;
    let lastY = -1;
    let raf   : number;

    // ── Emit a cluster of smoke puffs at (x, y) ──────────────────────
    const emit = (x: number, y: number, speed: number) => {
      // How many puffs per event — proportional to speed but capped
      const count = Math.floor(clamp(speed * 0.55 + 3, 3, 9));

      for (let k = 0; k < count; k++) {
        // Scatter position slightly around cursor
        const px = x + rand(-10, 10);
        const py = y + rand(-8,  8);

        // Drift: mostly upward with gentle horizontal wander
        const vx = rand(-0.25, 0.25);
        const vy = rand(-0.55, -0.15);    // negative = upward

        // Size — faster cursor = bigger puffs
        const maxR = clamp(speed * 2.8 + rand(22, 38), 18, 110);

        // Lifespan in frames (~90–130 = 1.5–2.2 s at 60 fps)
        const lifespan = Math.floor(rand(90, 130));

        // Peak opacity — keep it gentle so multiple puffs stack without blowing out
        const peakAlpha = rand(0.18, 0.30);

        // Hue wanders slightly per puff around the current hue
        const puffHue = (hue + rand(-18, 18) + 360) % 360;

        puffs.push({
          x: px, y: py, vx, vy,
          r: rand(6, 12),
          maxR,
          alpha: 0,
          peakAlpha,
          hue: puffHue,
          saturation: rand(70, 90),
          age: 0,
          lifespan,
        });
      }
    };

    // ── Mouse handler ─────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (lastX < 0) { lastX = x; lastY = y; return; }

      const dx    = x - lastX;
      const dy    = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed < 1.5) { lastX = x; lastY = y; return; }

      // Advance hue — full palette cycles over ~600 px of travel
      hue = (hue + speed * 0.35 + 0.4) % 360;

      emit(x, y, speed);
      lastX = x; lastY = y;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Per-frame update and render ───────────────────────────────────
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // 1. Update all puffs
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;

        // Grow toward maxR with easing (fast at first, slows down)
        p.r += (p.maxR - p.r) * 0.045;

        // Alpha envelope: fade in (first 15%), sustain, fade out (last 50%)
        const t = p.age / p.lifespan;
        if (t < 0.15) {
          p.alpha = p.peakAlpha * (t / 0.15);
        } else if (t < 0.50) {
          p.alpha = p.peakAlpha;
        } else {
          p.alpha = p.peakAlpha * (1 - (t - 0.50) / 0.50);
        }

        if (p.age >= p.lifespan) puffs.splice(i, 1);
      }

      // 2. Clear both canvases
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      octx.clearRect(0, 0, off.width, off.height);

      // 3. Draw all puffs to the off-screen canvas
      //    Use screen compositing so puffs of different colours mix beautifully
      octx.globalCompositeOperation = 'screen';

      for (const p of puffs) {
        const grd = octx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        // Centre: more opaque and slightly lighter
        grd.addColorStop(0,    `hsla(${p.hue}, ${p.saturation}%, 72%, ${p.alpha})`);
        // Mid: the main colour body
        grd.addColorStop(0.35, `hsla(${p.hue}, ${p.saturation}%, 62%, ${p.alpha * 0.75})`);
        // Outer: fully transparent edge — no hard edge → pure smoke feel
        grd.addColorStop(1,    `hsla(${p.hue}, ${p.saturation}%, 55%, 0)`);

        octx.beginPath();
        octx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        octx.fillStyle = grd;
        octx.fill();
      }

      // 4. Composite the off-screen canvas onto the main canvas with a blur.
      //    The blur is what turns the individual gradient circles into
      //    truly organic smoke — edges dissolve into each other.
      ctx.save();
      ctx.filter = 'blur(14px)';
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(off, 0, 0);
      ctx.filter = 'none';
      ctx.restore();

      // 5. Second pass: draw a crisp, bright core on top WITHOUT blur
      //    Only for the youngest, freshest puffs (first 40% of life).
      //    This gives the aurora "bright leading edge" feel.
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const p of puffs) {
        const t = p.age / p.lifespan;
        if (t > 0.40) continue;    // only fresh puffs get a core

        const coreR = p.r * 0.28;
        const coreA = p.alpha * 0.55 * (1 - t / 0.40);

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, coreR);
        grd.addColorStop(0, `hsla(${p.hue}, 95%, 88%, ${coreA})`);
        grd.addColorStop(1, `hsla(${p.hue}, 90%, 75%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
      ctx.restore();
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998, mixBlendMode: 'screen' }}
    />
  );
};

export default CursorEffect;
