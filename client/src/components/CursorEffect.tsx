import { useEffect, useRef } from 'react';

/**
 * Water-color aurora trail.
 *
 * How it works:
 *  1. Mouse positions are collected into a rolling buffer.
 *  2. Every animation frame a smooth Catmull-Rom spline is drawn through
 *     the buffer — no jagged straight lines.
 *  3. Each spline segment is rendered as three concentric strokes:
 *       • Wide diffuse fog   (water body spreading sideways)
 *       • Mid colour glow    (main colour vein with shadowBlur)
 *       • Thin bright core   (the leading edge)
 *  4. Perpendicular "feather" strokes fan out from each segment,
 *     simulating water dispersing to the sides.
 *  5. `destination-out` fade at 2.8 %/frame makes trails dissolve
 *     over ~2 seconds — exactly matching what water ink does.
 *  6. When the cursor stops, the remaining trail naturally diffuses
 *     and fades without any abrupt cutoff.
 */

// ── Types ─────────────────────────────────────────────────────────────────────
interface Pt { x: number; y: number; hue: number; t: number; }

// ── Constants ─────────────────────────────────────────────────────────────────
const TRAIL_LEN   = 28;    // points kept in the rolling buffer
const FADE_RATE   = 0.028; // alpha removed per frame (~2s lifetime)
const BASE_HUE    = 178;   // starting hue (teal-cyan)

// ── Catmull-Rom → cubic Bézier control points ─────────────────────────────────
// Converts four Catmull-Rom points into the two control points of a cubic Bézier
// between p1 and p2. This gives a smooth path with no kinks.
function cmrToBezier(
  p0: Pt, p1: Pt, p2: Pt, p3: Pt, tension = 0.5,
): [number, number, number, number] {
  return [
    p1.x + (p2.x - p0.x) / 6 * tension,
    p1.y + (p2.y - p0.y) / 6 * tension,
    p2.x - (p3.x - p1.x) / 6 * tension,
    p2.y - (p3.y - p1.y) / 6 * tension,
  ];
}

// ── Component ─────────────────────────────────────────────────────────────────
const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d', { alpha: true })!;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, { passive: true });

    // Rolling buffer of recent mouse positions
    const pts: Pt[] = [];
    let hue    = BASE_HUE;
    let lastX  = -1;
    let lastY  = -1;
    let raf    : number;

    // ── Mouse → push new point ─────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (lastX < 0) { lastX = x; lastY = y; }

      const dx    = x - lastX;
      const dy    = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed < 1) return; // ignore micro-jitter

      // Advance hue based on speed — fast = richer colour shift
      hue = (hue + speed * 0.45 + 0.5) % 360;

      pts.push({ x, y, hue, t: performance.now() });
      if (pts.length > TRAIL_LEN) pts.shift();

      lastX = x; lastY = y;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Draw a smooth water-flow stroke along pts ──────────────────────
    const drawTrail = () => {
      if (pts.length < 2) return;

      for (let i = 0; i < pts.length - 1; i++) {
        // Catmull-Rom needs 4 points; clamp at boundaries
        const p0 = pts[Math.max(i - 1, 0)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(i + 2, pts.length - 1)];

        const [cp1x, cp1y, cp2x, cp2y] = cmrToBezier(p0, p1, p2, p3);

        // Age-based opacity: newest segment = full, oldest = nearly gone
        const age    = (pts.length - 1 - i) / (pts.length - 1); // 0=newest 1=oldest
        const alphaScale = Math.pow(1 - age, 0.55); // eased so middle-age is still visible

        const h1 = p1.hue;
        const h2 = p2.hue;

        // Segment speed (used for width)
        const segSpd = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const fast   = Math.min(segSpd, 26);

        // ── Layer 1 · Wide water body (diffuses sideways) ───────────
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineCap  = 'round';
        ctx.lineJoin = 'round';
        const fogW    = fast * 3.2 + 22;
        const fogAlpha = alphaScale * 0.13;
        const fogGrad  = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        fogGrad.addColorStop(0, `hsla(${h1}, 80%, 60%, ${fogAlpha})`);
        fogGrad.addColorStop(1, `hsla(${h2}, 82%, 62%, ${fogAlpha})`);
        ctx.strokeStyle = fogGrad;
        ctx.lineWidth   = fogW;
        ctx.shadowBlur  = fogW * 0.7;
        ctx.shadowColor = `hsla(${h1}, 78%, 60%, 0.12)`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        ctx.stroke();
        ctx.restore();

        // ── Layer 2 · Mid colour vein ────────────────────────────────
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        const midW      = fast * 1.1 + 6;
        const midAlpha  = alphaScale * 0.44;
        const midGrad   = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        midGrad.addColorStop(0, `hsla(${h1}, 88%, 64%, ${midAlpha})`);
        midGrad.addColorStop(1, `hsla(${h2}, 90%, 66%, ${midAlpha})`);
        ctx.strokeStyle = midGrad;
        ctx.lineWidth   = midW;
        ctx.shadowBlur  = 30;
        ctx.shadowColor = `hsla(${h1}, 90%, 65%, ${alphaScale * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        ctx.stroke();
        ctx.restore();

        // ── Layer 3 · Bright luminous core ──────────────────────────
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        const coreW     = fast * 0.35 + 1.5;
        const coreAlpha = alphaScale * 0.68;
        const coreGrad  = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        coreGrad.addColorStop(0, `hsla(${h1}, 94%, 76%, ${coreAlpha})`);
        coreGrad.addColorStop(1, `hsla(${h2}, 96%, 78%, ${coreAlpha})`);
        ctx.strokeStyle = coreGrad;
        ctx.lineWidth   = coreW;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = `hsla(${h1}, 96%, 82%, ${alphaScale * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        ctx.stroke();
        ctx.restore();

        // ── Perpendicular feathers — water dispersing sideways ───────
        // Only draw on every other segment to keep it light
        if (i % 2 === 0 && segSpd > 4 && alphaScale > 0.25) {
          const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
          const mid   = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
          const fLen  = Math.min(segSpd * 1.8 + 10, 42);
          const fAlpha = alphaScale * 0.10;

          [-1, 1].forEach(side => {
            const fAngle = angle + side * (Math.PI / 2) * (0.6 + Math.random() * 0.3);
            const ex = mid.x + Math.cos(fAngle) * fLen;
            const ey = mid.y + Math.sin(fAngle) * fLen;

            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineCap  = 'round';
            const fGrad  = ctx.createLinearGradient(mid.x, mid.y, ex, ey);
            fGrad.addColorStop(0, `hsla(${h1}, 82%, 65%, ${fAlpha * 1.6})`);
            fGrad.addColorStop(1, `hsla(${h1}, 78%, 60%, 0)`);
            ctx.strokeStyle = fGrad;
            ctx.lineWidth   = Math.min(segSpd * 0.5 + 3, 10);
            ctx.shadowBlur  = 14;
            ctx.shadowColor = `hsla(${h1}, 82%, 65%, ${fAlpha})`;
            ctx.beginPath();
            ctx.moveTo(mid.x, mid.y);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.restore();
          });
        }
      }
    };

    // ── Animation loop ────────────────────────────────────────────────
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // destination-out fades existing alpha uniformly — this is what makes
      // the trail naturally dissolve like ink diffusing in still water.
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0, 0, 0, ${FADE_RATE})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Redraw the current smooth trail each frame.
      // Because the fade removed some alpha, older parts are already dimmer.
      // Drawing over them adds back fresh colour at the head of the path.
      drawTrail();
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
