import { useEffect, useRef } from 'react';

// Color layers — each one becomes an unrecognisable organic shape
// after being pushed through feTurbulence feDisplacementMap at scale=340.
// No circles survive that much warp.
const LAYERS = [
  // [gradient, w, h, top, left] — intentionally oversized and off-centre
  {
    g: 'radial-gradient(ellipse 75% 60% at 28% 38%, rgba(0,210,255,0.55) 0%, transparent 68%)',
    w: '130%', h: '110%', top: '-8%',  left: '-18%',
    lx: 0.55, ly: 0.48, px: 0.32, py: 0.28, // Lissajous params
  },
  {
    g: 'radial-gradient(ellipse 80% 55% at 72% 30%, rgba(100,40,255,0.50) 0%, transparent 65%)',
    w: '120%', h: '105%', top: '-5%',  left: '-12%',
    lx: 0.38, ly: 0.62, px: 0.0,  py: 1.2,
  },
  {
    g: 'radial-gradient(ellipse 65% 70% at 60% 70%, rgba(220,30,160,0.42) 0%, transparent 62%)',
    w: '125%', h: '120%', top: '-12%', left: '-14%',
    lx: 0.72, ly: 0.40, px: 2.1,  py: 0.8,
  },
  {
    g: 'radial-gradient(ellipse 70% 55% at 22% 75%, rgba(0,200,180,0.40) 0%, transparent 65%)',
    w: '118%', h: '115%', top: '-10%', left: '-10%',
    lx: 0.44, ly: 0.75, px: 1.5,  py: 3.1,
  },
  {
    g: 'radial-gradient(ellipse 60% 65% at 80% 55%, rgba(30,90,255,0.38) 0%, transparent 60%)',
    w: '115%', h: '110%', top: '-8%',  left: '-8%',
    lx: 0.60, ly: 0.35, px: 0.9,  py: 2.0,
  },
  {
    g: 'radial-gradient(ellipse 85% 50% at 45% 20%, rgba(160,20,255,0.32) 0%, transparent 70%)',
    w: '140%', h: '100%', top: '-3%',  left: '-20%',
    lx: 0.28, ly: 0.58, px: 3.5,  py: 1.7,
  },
];

const AuroraBackground: React.FC = () => {
  const turbRef   = useRef<SVGFETurbulenceElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let t = 0;

    // Mouse spring
    const target  = { x: 0.5, y: 0.5 };
    const smooth  = { x: 0.5, y: 0.5 };
    const vel     = { x: 0,   y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.006;

      // Spring physics toward mouse
      const stiff = 5.5, damp = 0.78;
      vel.x += (target.x - smooth.x) * stiff * 0.016;
      vel.y += (target.y - smooth.y) * stiff * 0.016;
      vel.x *= damp; vel.y *= damp;
      smooth.x += vel.x; smooth.y += vel.y;

      // ── Breathe: slowly warp the turbulence baseFrequency ──────────
      // This makes organic shapes continuously morph even without mouse
      const turbEl = turbRef.current;
      if (turbEl) {
        const bfX = 0.0055 + Math.sin(t * 0.55) * 0.0022 + Math.cos(t * 0.21) * 0.0010;
        const bfY = 0.0042 + Math.cos(t * 0.40) * 0.0018 + Math.sin(t * 0.33) * 0.0008;
        turbEl.setAttribute('baseFrequency', `${bfX.toFixed(5)} ${bfY.toFixed(5)}`);
      }

      // ── Move each colour layer in independent Lissajous paths ──────
      // Because the layers drift through the displacement field, their
      // combined visible shape continuously curls, splits, and merges.
      LAYERS.forEach((cfg, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        const tx = Math.sin(t * cfg.lx + cfg.px) * 18 + Math.cos(t * cfg.ly * 0.7) * 10;
        const ty = Math.cos(t * cfg.ly + cfg.py) * 14 + Math.sin(t * cfg.lx * 0.6) * 9;
        el.style.transform = `translate(${tx}%, ${ty}%)`;
      });

      // ── Mouse layer — feels like disturbing fog ─────────────────────
      // A separate wide layer follows the spring-smoothed cursor.
      // After displacement it creates the "parting smoke" look.
      const mEl = mouseRef.current;
      if (mEl) {
        const mx = (smooth.x - 0.5) * 40;
        const my = (smooth.y - 0.5) * 30;
        mEl.style.transform = `translate(calc(-50% + ${mx}vw), calc(-50% + ${my}vh))`;
      }
    };

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: '#050810' }}
      aria-hidden
    >
      {/* ── SVG displacement filter definition ──────────────────────────────
          feTurbulence IS Perlin/fractal noise — no circles possible.
          feDisplacementMap at scale=340 completely destroys gradient edges
          turning every shape into smoke/watercolour. ─────────────────────── */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden
      >
        <defs>
          <filter
            id="vol-aur"
            x="-40%" y="-40%"
            width="180%" height="180%"
            colorInterpolationFilters="sRGB"
          >
            {/* Primary organic warp — high octaves for fine smoke tendrils */}
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.0055 0.0042"
              numOctaves="5"
              seed="7"
              result="primaryNoise"
            />
            {/* Secondary higher-frequency layer adds fine-grain detail */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.013"
              numOctaves="3"
              seed="12"
              result="secondaryNoise"
            />
            {/* Composite the two noise fields */}
            <feMerge result="combinedNoise">
              <feMergeNode in="primaryNoise" />
              <feMergeNode in="secondaryNoise" />
            </feMerge>
            {/* The displacement — scale=340 means gradients shift up to 340px
                in organic directions. Nothing circular survives this. */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="340"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Warped colour field ──────────────────────────────────────────────
          All gradient layers live inside this container.
          The CSS filter chain:
            url(#vol-aur)  — fractal displacement (no circles survive)
            blur(55px)     — diffuses sharp displacement edges → watercolour
          The extra blur makes displaced edges dissolve softly like smoke. ── */}
      <div
        className="absolute"
        style={{
          inset: '-15%',           // oversized so warp doesn't expose edges
          filter: 'url(#vol-aur) blur(55px)',
          willChange: 'transform',
          opacity: 0.92,
        }}
      >
        {LAYERS.map((cfg, i) => (
          <div
            key={i}
            ref={el => { layerRefs.current[i] = el; }}
            className="absolute"
            style={{
              width: cfg.w, height: cfg.h,
              top: cfg.top, left: cfg.left,
              background: cfg.g,
              willChange: 'transform',
            }}
          />
        ))}

        {/* ── Mouse-tracking aurora layer ─────────────────────────────── */}
        {/* Positioned absolutely at centre, then translated by spring mouse.
            After displacement it becomes an organic fog-parting shape. ─── */}
        <div
          ref={mouseRef}
          className="absolute"
          style={{
            width: '90vw', height: '70vh',
            top: '50%', left: '50%',
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(30,200,255,0.38) 0%, rgba(120,30,255,0.22) 50%, transparent 70%)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ── Animated grain — makes it feel cinematic ────────────────────── */}
      <div className="absolute inset-0 aurora-grain" />

      {/* ── Dark radial vignette ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 90% at 50% 50%, transparent 25%, rgba(5,8,16,0.5) 65%, rgba(4,6,12,0.88) 100%)',
        }}
      />

      {/* ── Top / bottom edge darkening ──────────────────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-36"
        style={{ background: 'linear-gradient(to bottom, rgba(5,8,16,0.75), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to top, rgba(4,6,12,0.85), transparent)' }} />
    </div>
  );
};

export default AuroraBackground;
