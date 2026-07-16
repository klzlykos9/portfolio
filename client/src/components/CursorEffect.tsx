import { useEffect, useRef } from 'react';

/**
 * Smoke-aurora disruption trail — clean, fast, subtle.
 *
 * Two-canvas architecture for performance:
 *   smokeCanvas — draws puffs → CSS blur(12px) softens them into organic smoke.
 *                 GPU handles the blur during compositing. Zero ctx.filter calls.
 *   coreCanvas  — draws a thin bright streak only at the fresh cursor head.
 *                 No blur, sharp, adds the aurora "leading edge" feel.
 *
 * Disruption: puffs emit with a lateral kick perpendicular to cursor direction,
 * as if the cursor is a hand sweeping through fog. They then drift upward and
 * outward — the classic "parted smoke" look.
 *
 * Fade: lifespan 50–75 frames (~0.8–1.25 s). Canvas clears each frame.
 * Cursor stops → no new puffs → everything gone within ~1 s. Zero residue.
 *
 * Kept subtle so it NEVER fights with text. mix-blend-mode:screen means
 * light/white elements are mathematically unaffected; only dark areas glow.
 */

interface Puff {
  x: number; y: number;
  vx: number; vy: number;
  r: number; maxR: number;
  alpha: number; peakAlpha: number;
  hue: number;
  age: number; lifespan: number;
  side: -1 | 1; // which side of cursor this puff sits on
}

const MAX_PUFFS = 45;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

const CursorEffect: React.FC = () => {
  const smokeRef = useRef<HTMLCanvasElement>(null);
  const coreRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const smoke = smokeRef.current!;
    const core  = coreRef.current!;
    const sctx  = smoke.getContext('2d', { alpha: true })!;
    const cctx  = core.getContext('2d',  { alpha: true })!;

    const setSize = () => {
      smoke.width  = core.width  = window.innerWidth;
      smoke.height = core.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize, { passive: true });

    const puffs: Puff[] = [];
    let hue    = 180;
    let lastX  = -1;
    let lastY  = -1;
    let lastVX = 0;
    let lastVY = -1; // default: upward
    let raf    : number;

    // ── Emit ─────────────────────────────────────────────────────────
    const emit = (x: number, y: number, dx: number, dy: number, speed: number) => {
      if (puffs.length >= MAX_PUFFS) return;

      // Perpendicular to cursor direction (for disruption spread)
      const len  = speed || 1;
      const px   =  dy / len; // perpendicular unit vector
      const py   = -dx / len;

      const count = Math.min(Math.floor(speed * 0.28 + 2.5), 5);

      for (let k = 0; k < count; k++) {
        if (puffs.length >= MAX_PUFFS) break;

        const side = (k % 2 === 0 ? 1 : -1) as -1 | 1;
        const spread = rand(6, 18) * side;

        // Spawn slightly to the side of the cursor (disruption offset)
        const ox = px * spread + rand(-4, 4);
        const oy = py * spread + rand(-4, 4);

        // Velocity: lateral kick (disruption) + gentle upward drift
        const lateralStr = rand(0.15, 0.40) * side;
        const vx = px * lateralStr + rand(-0.10, 0.10);
        const vy = rand(-0.45, -0.15); // upward drift

        const maxR     = rand(18, 36) + speed * 1.2;
        const lifespan = Math.floor(rand(50, 75));
        const peakAlpha = rand(0.11, 0.19);

        puffs.push({
          x: x + ox, y: y + oy,
          vx, vy,
          r: rand(4, 8), maxR,
          alpha: 0, peakAlpha,
          hue: (hue + rand(-20, 20) + 360) % 360,
          age: 0, lifespan,
          side,
        });
      }
    };

    // ── Mouse ────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (lastX < 0) { lastX = x; lastY = y; return; }

      const dx    = x - lastX;
      const dy    = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed < 1.5) { lastX = x; lastY = y; return; }

      lastVX = dx; lastVY = dy;

      // Hue shift — full palette sweep over ~700 px of travel
      hue = (hue + speed * 0.28 + 0.3) % 360;

      emit(x, y, dx, dy, speed);
      lastX = x; lastY = y;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Render loop ───────────────────────────────────────────────────
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Update
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.age++;
        p.x  += p.vx;
        p.y  += p.vy;
        // Lateral velocity decays — puffs curve back toward vertical
        p.vx *= 0.96;

        // Grow toward maxR (fast initially, slows)
        p.r += (p.maxR - p.r) * 0.055;

        // Alpha envelope
        const t = p.age / p.lifespan;
        p.alpha =
          t < 0.18 ? p.peakAlpha * (t / 0.18) :
          t < 0.48 ? p.peakAlpha :
          p.peakAlpha * (1 - (t - 0.48) / 0.52);

        if (p.age >= p.lifespan) puffs.splice(i, 1);
      }

      // ── Smoke canvas (will be blurred by CSS) ─────────────────────
      sctx.clearRect(0, 0, smoke.width, smoke.height);
      sctx.globalCompositeOperation = 'screen';

      for (const p of puffs) {
        const g = sctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0,   `hsla(${p.hue}, 85%, 68%, ${p.alpha})`);
        g.addColorStop(0.5, `hsla(${p.hue}, 80%, 58%, ${p.alpha * 0.55})`);
        g.addColorStop(1,   `hsla(${p.hue}, 75%, 50%, 0)`);
        sctx.beginPath();
        sctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        sctx.fillStyle = g;
        sctx.fill();
      }

      // ── Core canvas (sharp, bright, only fresh puffs) ─────────────
      cctx.clearRect(0, 0, core.width, core.height);
      cctx.globalCompositeOperation = 'screen';

      for (const p of puffs) {
        const t = p.age / p.lifespan;
        if (t > 0.35) continue; // only very fresh puffs

        const cr    = p.r * 0.22;
        const alpha = p.alpha * 0.45 * (1 - t / 0.35);
        const g     = cctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, cr);
        g.addColorStop(0, `hsla(${p.hue}, 95%, 90%, ${alpha})`);
        g.addColorStop(1, `hsla(${p.hue}, 90%, 75%, 0)`);
        cctx.beginPath();
        cctx.arc(p.x, p.y, cr, 0, Math.PI * 2);
        cctx.fillStyle = g;
        cctx.fill();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    setSize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      {/* Smoke — CSS blur turns tight puffs into organic clouds. GPU-only, zero cost. */}
      <canvas
        ref={smokeRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          mixBlendMode: 'screen',
          filter: 'blur(12px)',
        }}
      />
      {/* Core — sharp bright edge at fresh puff positions */}
      <canvas
        ref={coreRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 11,
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};

export default CursorEffect;
