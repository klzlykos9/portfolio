import { useEffect, useRef } from 'react';

/**
 * CursorEffect — flowing aurora trail that follows cursor movement.
 *
 * Technique:
 *  • Transparent canvas, mix-blend-mode:screen → colors add to the dark page
 *  • Each frame: destination-out fade (removes ~3.5% alpha) → trails decay naturally
 *  • On mouse move: draw a 3-layer stroke from prev→current position
 *      Layer 1  wide soft fog     (large lineWidth, very low opacity)
 *      Layer 2  mid colour glow   (medium width, shadowBlur for diffusion)
 *      Layer 3  bright core line  (thin, high opacity, tight glow)
 *  • Hue advances along the path so colour flows continuously
 *  • Width scales with cursor speed → fast = wide energetic sweep, slow = delicate thread
 *  • NO circles, NO blobs — only the literal path of cursor movement
 */

// Aurora colour palette order (hue degrees)
// Cycles: teal → cyan → blue → violet → indigo → back
const BASE_HUE = 175; // starting hue

const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d', { alpha: true })!;

    let lastX  = -999;
    let lastY  = -999;
    let hue    = BASE_HUE;
    let raf    : number;

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      // Preserve what's already drawn by saving to an image first
      const img = canvas.toDataURL();
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Restore previous content (best-effort — size change will still clear)
      const tmp = new Image();
      tmp.src = img;
      tmp.onload = () => ctx.drawImage(tmp, 0, 0);
    };
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', resize, { passive: true });

    // ── Draw a single aurora segment from (x1,y1) → (x2,y2) ─────────────
    const drawSegment = (x1: number, y1: number, x2: number, y2: number, speed: number) => {
      // Speed-based sizing — clamped so it never goes crazy
      const fast  = Math.min(speed, 28);
      const fogW  = Math.max(fast * 2.8 + 18, 18);
      const midW  = Math.max(fast * 1.1 + 6,   6);
      const coreW = Math.max(fast * 0.4 + 1.5,  1.5);

      const h1 = hue;
      const h2 = (hue + 22) % 360;

      // ── Layer 1: wide fog ────────────────────────────────────────────
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';

      const fogGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      fogGrad.addColorStop(0, `hsla(${h1}, 78%, 58%, 0.10)`);
      fogGrad.addColorStop(1, `hsla(${h2}, 80%, 60%, 0.10)`);
      ctx.strokeStyle = fogGrad;
      ctx.lineWidth   = fogW;
      ctx.shadowBlur  = 0;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();

      // ── Layer 2: mid colour glow ─────────────────────────────────────
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.lineWidth   = midW;
      ctx.shadowBlur  = 28;
      ctx.shadowColor = `hsla(${h1}, 88%, 62%, 0.80)`;

      const midGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      midGrad.addColorStop(0, `hsla(${h1}, 86%, 62%, 0.42)`);
      midGrad.addColorStop(1, `hsla(${h2}, 88%, 64%, 0.42)`);
      ctx.strokeStyle = midGrad;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();

      // ── Layer 3: bright core ─────────────────────────────────────────
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.lineWidth   = coreW;
      ctx.shadowBlur  = 10;
      ctx.shadowColor = `hsla(${h1}, 95%, 80%, 1.0)`;

      const coreGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      coreGrad.addColorStop(0, `hsla(${h1}, 92%, 72%, 0.70)`);
      coreGrad.addColorStop(1, `hsla(${h2}, 94%, 74%, 0.70)`);
      ctx.strokeStyle = coreGrad;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    // ── Mouse handler ─────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (lastX === -999) { lastX = x; lastY = y; return; }

      const dx    = x - lastX;
      const dy    = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed < 0.5) { lastX = x; lastY = y; return; } // ignore tiny jitter

      // Advance hue — faster movement = quicker colour shift
      hue = (hue + speed * 0.55 + 0.6) % 360;

      drawSegment(lastX, lastY, x, y, speed);

      lastX = x;
      lastY = y;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Animation loop — only job is fading old trails ────────────────────
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // destination-out removes alpha from drawn pixels.
      // At 3.5%/frame @ 60 fps: after 1s alpha ≈ (0.965)^60 ≈ 0.115 → nice 1-2s lifespan
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
      style={{
        zIndex: 9998,
        mixBlendMode: 'screen',  // adds colour to the dark background
      }}
    />
  );
};

export default CursorEffect;
