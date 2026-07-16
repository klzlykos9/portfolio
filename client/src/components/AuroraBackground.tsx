import { useEffect, useRef } from 'react';

// ── Blob configuration ────────────────────────────────────────────────────────
// Each blob has a base position (% of viewport), orbit radius, speed, size,
// and a starting hue. Hues drift slowly so colors continuously interpolate.
const BLOBS = [
  { cx: 20, cy: 22, rx: 160, ry: 100, period: 26, phase: 0.0,  hue0: 200, size: 820,  alpha: 0.28 }, // cyan-blue
  { cx: 80, cy: 18, rx: 120, ry: 140, period: 33, phase: 1.1,  hue0: 265, size: 700,  alpha: 0.22 }, // violet
  { cx: 72, cy: 72, rx: 140, ry: 100, period: 29, phase: 2.3,  hue0: 310, size: 650,  alpha: 0.20 }, // pink
  { cx: 15, cy: 68, rx: 100, ry: 130, period: 38, phase: 3.8,  hue0: 175, size: 600,  alpha: 0.18 }, // teal
  { cx: 50, cy: 45, rx: 180, ry: 130, period: 44, phase: 0.7,  hue0: 230, size: 900,  alpha: 0.14 }, // indigo (large, slow)
  { cx: 85, cy: 52, rx: 110, ry: 90,  period: 21, phase: 5.1,  hue0: 185, size: 480,  alpha: 0.22 }, // cyan
  { cx: 35, cy: 80, rx: 130, ry: 80,  period: 31, phase: 4.2,  hue0: 340, size: 560,  alpha: 0.17 }, // rose
];

// Mouse-tracking blob (springs toward cursor)
const MOUSE_BLOB = { size: 700, hue0: 210, alpha: 0.26 };

interface BlobState {
  x: number; y: number; hue: number;
}

const AuroraBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const mouseBlobRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  // Spring state for mouse blob
  const mouse  = useRef({ x: 0.5, y: 0.5 }); // normalised 0–1
  const spring = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });

  // Per-blob state (current x, y, hue) — mutated in rAF, never triggers render
  const states = useRef<BlobState[]>(
    BLOBS.map(b => ({ x: b.cx, y: b.cy, hue: b.hue0 }))
  );
  const mouseHue = useRef(MOUSE_BLOB.hue0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let last = performance.now();

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05); // seconds, capped
      last = now;
      const t  = now / 1000;

      // ── Animate each blob ──────────────────────────────────────
      BLOBS.forEach((cfg, i) => {
        const el = blobRefs.current[i];
        if (!el) return;

        const angle = (t / cfg.period) * Math.PI * 2 + cfg.phase;
        const nx    = cfg.cx + Math.cos(angle)              * cfg.rx / window.innerWidth  * 100;
        const ny    = cfg.cy + Math.sin(angle * 1.37 + 0.4) * cfg.ry / window.innerHeight * 100;

        // hue drifts: 8°/s → full spectrum cycle ≈ 45 s
        const hue = (cfg.hue0 + t * 8) % 360;
        const h2  = (hue + 40)  % 360;

        el.style.transform = `translate3d(${nx - 50}vw, ${ny - 50}vh, 0)`;
        el.style.background = `radial-gradient(circle at 40% 40%,
          hsla(${hue}, 90%, 65%, ${cfg.alpha}) 0%,
          hsla(${h2},  80%, 58%, ${cfg.alpha * 0.55}) 40%,
          transparent 72%)`;
      });

      // ── Mouse blob spring physics ──────────────────────────────
      const sp = spring.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const stiffness = 4.5;
      const damping   = 0.72;
      sp.vx += (mx - sp.x) * stiffness * dt;
      sp.vy += (my - sp.y) * stiffness * dt;
      sp.vx *= damping;
      sp.vy *= damping;
      sp.x  += sp.vx * dt * 60;
      sp.y  += sp.vy * dt * 60;

      mouseHue.current = (mouseHue.current + dt * 12) % 360;
      const mh  = mouseHue.current;
      const mh2 = (mh + 50) % 360;

      const mb = mouseBlobRef.current;
      if (mb) {
        mb.style.transform = `translate3d(calc(${sp.x * 100}vw - 50%), calc(${sp.y * 100}vh - 50%), 0)`;
        mb.style.background = `radial-gradient(circle at 35% 35%,
          hsla(${mh},  95%, 68%, ${MOUSE_BLOB.alpha}) 0%,
          hsla(${mh2}, 85%, 60%, ${MOUSE_BLOB.alpha * 0.5}) 40%,
          transparent 70%)`;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* ── Deep base gradient ── */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #050d1a 0%, #060a14 55%, #03060e 100%)' }} />

      {/* ── Floating aurora blobs ── */}
      {BLOBS.map((cfg, i) => (
        <div
          key={i}
          ref={el => { blobRefs.current[i] = el; }}
          className="absolute top-1/2 left-1/2 rounded-full will-change-transform"
          style={{
            width:  `${cfg.size}px`,
            height: `${cfg.size}px`,
            mixBlendMode: 'screen',
            filter: `blur(${i === 4 ? 220 : 180}px)`,
            opacity: 1,
          }}
        />
      ))}

      {/* ── Mouse-tracking blob ── */}
      <div
        ref={mouseBlobRef}
        className="absolute rounded-full will-change-transform"
        style={{
          top: 0, left: 0,
          width:  `${MOUSE_BLOB.size}px`,
          height: `${MOUSE_BLOB.size}px`,
          mixBlendMode: 'screen',
          filter: 'blur(160px)',
          opacity: 1,
        }}
      />

      {/* ── Animated grain overlay ── */}
      <div className="absolute inset-0 aurora-grain" />

      {/* ── Dark vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 50%,
              transparent 30%,
              rgba(3,6,14,0.45) 70%,
              rgba(3,6,14,0.85) 100%)
          `,
        }}
      />

      {/* ── Top & bottom edge fade ── */}
      <div className="absolute inset-x-0 top-0 h-40"
        style={{ background: 'linear-gradient(to bottom, rgba(6,10,20,0.7), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to top, rgba(3,6,14,0.8), transparent)' }} />
    </div>
  );
};

export default AuroraBackground;
