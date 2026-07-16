import { useEffect, useRef } from 'react';

/*
  Architecture:
  ─────────────
  Each aurora "band" is a full-screen SVG <rect> rendered through a filter that:
    1. feTurbulence  → raw fractal noise field (the ONLY shape source — no circles)
    2. feColorMatrix → maps noise channels to a specific hue + wispy alpha mask
    3. feGaussianBlur → dissolves edges into soft smoke

  Multiple bands (cyan, violet, rose, teal) are stacked with mix-blend-mode:screen.
  Because turbulence noise is the *only* shape input, circles are mathematically
  impossible — the shapes are always irregular fractal wisps.

  Animation:
  ─────────────
  JS slowly oscillates each band's baseFrequency (breathing) and applies
  independent CSS transforms in Lissajous patterns (drifting through the noise
  field exposes different organic shapes each moment).

  Mouse:
  ─────────────
  Spring-smoothed cursor position offsets each band's transform by a small
  amount — the different offsets per band cause them to shift relative to each
  other, creating the "fog-parting" effect without any glowing circles.

  Palette is intentionally desaturated and kept at low opacity for comfortable viewing.
*/

// ── Band configs ─────────────────────────────────────────────────────────────
//   freq:    baseFrequency [x, y]  — controls spatial scale of tendrils
//   octaves: numOctaves            — more = finer detail
//   seed:    unique per band
//   matrix:  feColorMatrix values that map noise → (R,G,B,A)
//            rows: [outR, outG, outB, outA] each has 5 weights [inR, inG, inB, inA, bias]
//            Alpha row uses noise channel * gain + bias to create wispy threshold mask
//   opacity: per-band CSS opacity (kept low for subtlety)
//   lx/ly:   Lissajous frequency for the slow drift animation
//   phase:   initial phase offset so bands drift out of sync
//   blur:    feGaussianBlur stdDeviation
const BANDS = [
  {
    // Teal-cyan — soft northern lights blue-green
    id: 'aurora-band-0',
    freq: [0.0045, 0.0030],
    octaves: 5,
    seed: 3,
    blur: 14,
    opacity: 0.48,
    lx: 0.34, ly: 0.52, phase: 0.0,
    // Use R channel: maps to soft teal (R=0, G=0.78, B=0.88), alpha threshold
    matrix: `
      0    0 0 0 0.00
      0.78 0 0 0 0.00
      0.88 0 0 0 0.00
      2.8  0 0 0 -0.75`,
  },
  {
    // Blue-violet — deep indigo
    id: 'aurora-band-1',
    freq: [0.0038, 0.0055],
    octaves: 5,
    seed: 9,
    blur: 16,
    opacity: 0.42,
    lx: 0.48, ly: 0.31, phase: 1.4,
    // Use G channel: maps to violet (R=0.38, G=0.10, B=0.82)
    matrix: `
      0 0.38 0 0 0.00
      0 0.10 0 0 0.00
      0 0.82 0 0 0.00
      0 2.6  0 0 -0.70`,
  },
  {
    // Muted rose — very soft, low intensity
    id: 'aurora-band-2',
    freq: [0.0060, 0.0040],
    octaves: 4,
    seed: 17,
    blur: 18,
    opacity: 0.32,
    lx: 0.22, ly: 0.68, phase: 2.8,
    // Use B channel: maps to muted pink (R=0.72, G=0.18, B=0.48)
    matrix: `
      0 0 0.72 0 0.00
      0 0 0.18 0 0.00
      0 0 0.48 0 0.00
      0 0 2.4  0 -0.72`,
  },
  {
    // Deep teal-green — subtle bottom layer
    id: 'aurora-band-3',
    freq: [0.0032, 0.0042],
    octaves: 6,
    seed: 24,
    blur: 20,
    opacity: 0.36,
    lx: 0.58, ly: 0.40, phase: 4.2,
    // Use R channel: deep teal (R=0.05, G=0.68, B=0.62)
    matrix: `
      0.05 0 0 0 0.00
      0.68 0 0 0 0.00
      0.62 0 0 0 0.00
      3.0  0 0 0 -0.80`,
  },
  {
    // Soft periwinkle accent — large slow layer
    id: 'aurora-band-4',
    freq: [0.0025, 0.0020],
    octaves: 4,
    seed: 31,
    blur: 25,
    opacity: 0.28,
    lx: 0.18, ly: 0.44, phase: 3.5,
    // Use G+B: periwinkle (R=0.28, G=0.35, B=0.75)
    matrix: `
      0 0.28 0.0  0 0.00
      0 0.35 0.0  0 0.00
      0 0.0  0.75 0 0.00
      0 1.8  1.2  0 -0.75`,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const AuroraBackground: React.FC = () => {
  // Refs to each band's <feTurbulence> and <svg> wrapper
  const turbRefs = useRef<(SVGFETurbulenceElement | null)[]>([]);
  const svgRefs  = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    let raf: number;
    let t = 0;

    // Mouse spring
    const tgt = { x: 0.5, y: 0.5 };
    const pos = { x: 0.5, y: 0.5 };
    const spd = { x: 0.0, y: 0.0 };

    const onMove = (e: MouseEvent) => {
      tgt.x = e.clientX / window.innerWidth;
      tgt.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const W = window.innerWidth;
    const H = window.innerHeight;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.007;

      // Spring-smooth mouse (light spring, gentle follow)
      spd.x += (tgt.x - pos.x) * 0.08;
      spd.y += (tgt.y - pos.y) * 0.08;
      spd.x *= 0.75; spd.y *= 0.75;
      pos.x += spd.x; pos.y += spd.y;

      BANDS.forEach((cfg, i) => {
        const turbEl = turbRefs.current[i];
        const svgEl  = svgRefs.current[i];
        if (!turbEl || !svgEl) return;

        // Breathe: oscillate baseFrequency with two independent sinusoids
        // so the noise pattern continuously morphs without repeating quickly
        const bx = cfg.freq[0] * (1 + 0.28 * Math.sin(t * cfg.lx + cfg.phase));
        const by = cfg.freq[1] * (1 + 0.22 * Math.cos(t * cfg.ly + cfg.phase + 0.9));
        turbEl.setAttribute('baseFrequency', `${bx.toFixed(5)} ${by.toFixed(5)}`);

        // Drift the SVG through the noise field (Lissajous path)
        // Each band drifts at its own rate so they continuously cross each other
        const dx = Math.sin(t * cfg.lx + cfg.phase)        * 6
                 + Math.cos(t * cfg.ly * 0.7 + cfg.phase)  * 3;
        const dy = Math.cos(t * cfg.ly + cfg.phase + 1.0)  * 5
                 + Math.sin(t * cfg.lx * 0.6 + cfg.phase)  * 2.5;

        // Mouse offsets: each band shifts by a slightly different amount
        // so they don't all move identically — creates parallax smoke feel
        const mScale = 8 + i * 3;  // 8 → 20 % of viewport
        const mx = (pos.x - 0.5) * mScale;
        const my = (pos.y - 0.5) * mScale;

        svgEl.style.transform = `translate(${(dx + mx).toFixed(2)}%, ${(dy + my).toFixed(2)}%)`;
      });
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: '#04070f' }}
      aria-hidden
    >
      {/* ── Aurora bands ─────────────────────────────────────────────────────
          Each SVG covers the screen plus 30% overflow so drifting never
          exposes a blank edge. They're intentionally oversized. ─────────── */}
      {BANDS.map((cfg, i) => (
        <svg
          key={cfg.id}
          ref={el => { svgRefs.current[i] = el; }}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top:    '-15%',
            left:   '-15%',
            width:  '130%',
            height: '130%',
            opacity: cfg.opacity,
            mixBlendMode: 'screen',
            overflow: 'visible',
            willChange: 'transform',
          }}
        >
          <defs>
            <filter
              id={cfg.id}
              x="-20%" y="-20%"
              width="140%" height="140%"
              colorInterpolationFilters="sRGB"
            >
              {/* Primary noise — this IS the shape source (no circles possible) */}
              <feTurbulence
                ref={el => { turbRefs.current[i] = el; }}
                type="turbulence"
                baseFrequency={`${cfg.freq[0]} ${cfg.freq[1]}`}
                numOctaves={cfg.octaves}
                seed={cfg.seed}
                result="noise"
              />
              {/* Map noise channels → target hue + wispy alpha threshold */}
              <feColorMatrix
                type="matrix"
                values={cfg.matrix}
                in="noise"
                result="colored"
              />
              {/* Dissolve edges — turns hard thresholds into soft smoke wisps */}
              <feGaussianBlur
                in="colored"
                stdDeviation={cfg.blur}
                result="blurred"
              />
            </filter>
          </defs>

          {/* The rect is just a canvas for the filter — its fill is irrelevant */}
          <rect
            width="100%"
            height="100%"
            fill="#ffffff"
            filter={`url(#${cfg.id})`}
          />
        </svg>
      ))}

      {/* ── Animated grain — cinematic texture ──────────────────────────── */}
      <div className="absolute inset-0 aurora-grain" style={{ opacity: 0.6 }} />

      {/* ── Radial vignette — pulls focus to centre, darkens edges ──────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 95% 85% at 48% 46%, transparent 20%, rgba(4,7,15,0.5) 62%, rgba(3,5,11,0.88) 100%)',
        }}
      />

      {/* ── Top edge darkening ──────────────────────────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-32"
        style={{ background: 'linear-gradient(to bottom, rgba(4,7,15,0.82), transparent)' }} />

      {/* ── Bottom edge darkening ───────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to top, rgba(3,5,11,0.90), transparent)' }} />
    </div>
  );
};

export default AuroraBackground;
