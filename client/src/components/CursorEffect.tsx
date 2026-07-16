import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; decay: number;
  size: number; hue: number;
}

const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    let mouse    = { x: -999, y: -999, active: false };
    let trailer  = { x: -999, y: -999 };
    let vel      = { x: 0, y: 0 };
    let lastPos  = { x: -999, y: -999 };
    let hue      = 185; // starts cyan, cycles
    let particles: Particle[] = [];
    let raf: number;

    /* ── resize ───────────────────────────────────── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── hide native cursor ───────────────────────── */
    document.body.style.cursor = 'none';

    /* ── particle colours ─────────────────────────── */
    // mostly cyan/sky, sprinkle indigo + violet + amber
    const HUES = [185, 190, 200, 215, 260, 275, 185, 200, 185, 45];

    const spawn = (x: number, y: number, n: number, burst = false) => {
      for (let i = 0; i < n; i++) {
        const angle = burst
          ? (Math.PI * 2 * i) / n + Math.random() * 0.5
          : Math.random() * Math.PI * 2;
        const spd = burst
          ? Math.random() * 7 + 3
          : Math.random() * 2.2 + 0.5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd + (burst ? 0 : vel.x * 0.25),
          vy: Math.sin(angle) * spd + (burst ? 0 : vel.y * 0.25) - (burst ? 0 : 0.5),
          life:  1,
          decay: burst
            ? 0.011 + Math.random() * 0.009
            : 0.018 + Math.random() * 0.018,
          size: burst
            ? Math.random() * 5 + 2
            : Math.random() * 2.5 + 0.7,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
        });
      }
    };

    /* ── events ───────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      vel.x = e.clientX - lastPos.x;
      vel.y = e.clientY - lastPos.y;
      lastPos = { x: e.clientX, y: e.clientY };
      mouse   = { x: e.clientX, y: e.clientY, active: true };

      const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
      const n     = Math.min(Math.ceil(speed / 3) + 2, 9);
      spawn(e.clientX, e.clientY, n);
    };

    const onClick = (e: MouseEvent) => spawn(e.clientX, e.clientY, 44, true);

    window.addEventListener('mousemove',      onMove);
    window.addEventListener('click',          onClick);
    document.addEventListener('mouseleave',   () => { mouse.active = false; });
    document.addEventListener('mouseenter',   () => { mouse.active = true; });

    /* ── animation loop ───────────────────────────── */
    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* spring trailer */
      trailer.x += (mouse.x - trailer.x) * 0.13;
      trailer.y += (mouse.y - trailer.y) * 0.13;

      /* cycle hue slowly (cyan → indigo → violet → back) */
      hue = (hue + 0.25) % 360;

      /* ── particles ──────────────────────────────── */
      particles = particles.filter(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.04;   // soft gravity
        p.life -= p.decay;
        if (p.life <= 0) return false;

        const alpha = p.life * p.life;
        const r     = p.size * p.life;

        ctx.save();
        ctx.globalAlpha = alpha * 0.92;
        ctx.shadowBlur  = 14;
        ctx.shadowColor = `hsl(${p.hue}, 95%, 65%)`;
        ctx.fillStyle   = `hsl(${p.hue}, 95%, 70%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(r, 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      /* ── custom cursor ──────────────────────────── */
      if (mouse.active && mouse.x > 0) {
        const mx = mouse.x, my = mouse.y;
        const tx = trailer.x, ty = trailer.y;

        /* velocity-based deformation */
        const speed   = Math.sqrt(vel.x ** 2 + vel.y ** 2);
        const stretch = Math.min(speed * 0.45, 14);
        const angle   = Math.atan2(vel.y, vel.x);

        /* soft glow halo around ring */
        const grad = ctx.createRadialGradient(tx, ty, 0, tx, ty, 36);
        grad.addColorStop(0, `hsla(${hue}, 90%, 62%, 0.14)`);
        grad.addColorStop(1, `hsla(${hue}, 90%, 62%, 0)`);
        ctx.save();
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(tx, ty, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* outer ring — ellipse that stretches toward motion */
        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(angle);
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.ellipse(0, 0, 20 + stretch, Math.max(20 - stretch * 0.35, 8), 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsl(${hue}, 92%, 65%)`;
        ctx.lineWidth   = 1.6;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = `hsl(${hue}, 92%, 65%)`;
        ctx.stroke();
        ctx.restore();

        /* inner precision dot */
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.shadowBlur  = 22;
        ctx.shadowColor = `hsl(${hue}, 100%, 72%)`;
        ctx.fillStyle   = `hsl(${hue}, 100%, 78%)`;
        ctx.beginPath();
        ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* connecting thread (ring → dot) */
        const dx   = mx - tx, dy = my - ty;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 2) {
          ctx.save();
          ctx.globalAlpha = Math.min(dist / 55, 0.32);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `hsl(${hue}, 90%, 65%)`;
          ctx.lineWidth   = 0.9;
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click',     onClick);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
};

export default CursorEffect;
