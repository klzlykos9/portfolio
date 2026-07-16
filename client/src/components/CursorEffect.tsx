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

    let mouse     = { x: -999, y: -999, active: false };
    let aura      = { x: -999, y: -999 }; // lags behind mouse
    let vel       = { x: 0, y: 0 };
    let lastPos   = { x: -999, y: -999 };
    let hue       = 185;
    let isHover   = false;   // true when over a button/link
    let hoverSize = 0;       // animated hover ring size
    let particles: Particle[] = [];
    let raf: number;

    /* ── resize ── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Keep native cursor visible — we only add effects on top

    const HUES = [185, 190, 200, 215, 260, 280, 185, 200, 185, 45];

    const spawn = (x: number, y: number, n: number, burst = false) => {
      for (let i = 0; i < n; i++) {
        const angle = burst
          ? (Math.PI * 2 * i) / n + Math.random() * 0.55
          : Math.random() * Math.PI * 2;
        const spd = burst
          ? Math.random() * 8 + 4
          : Math.random() * 2.8 + 0.6;
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd + (burst ? 0 : vel.x * 0.3),
          vy: Math.sin(angle) * spd + (burst ? 0 : vel.y * 0.3) - (burst ? 0 : 0.4),
          life:  1,
          decay: burst ? 0.010 + Math.random() * 0.008 : 0.016 + Math.random() * 0.016,
          size:  burst ? Math.random() * 5.5 + 2.5 : Math.random() * 3 + 0.8,
          hue:   HUES[Math.floor(Math.random() * HUES.length)],
        });
      }
    };

    /* ── detect hovering over interactive elements ── */
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('button, a, [role="button"], input, textarea, select, [data-hover]');
      isHover = !!el;
    };

    const onMove = (e: MouseEvent) => {
      vel.x   = e.clientX - lastPos.x;
      vel.y   = e.clientY - lastPos.y;
      lastPos = { x: e.clientX, y: e.clientY };
      mouse   = { x: e.clientX, y: e.clientY, active: true };

      const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
      // spawn more particles the faster we move
      const n = isHover
        ? Math.min(Math.ceil(speed / 2) + 4, 12)
        : Math.min(Math.ceil(speed / 3) + 2, 8);
      if (speed > 1) spawn(e.clientX, e.clientY, n);
    };

    const onClick = (e: MouseEvent) => spawn(e.clientX, e.clientY, 50, true);

    window.addEventListener('mousemove',    onMove);
    window.addEventListener('click',        onClick);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseleave', () => { mouse.active = false; });
    document.addEventListener('mouseenter', () => { mouse.active = true; });

    /* ── animation loop ── */
    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spring aura toward mouse (slower = more lag = more visible trail)
      aura.x += (mouse.x - aura.x) * 0.09;
      aura.y += (mouse.y - aura.y) * 0.09;

      // slowly cycle hue
      hue = (hue + 0.3) % 360;

      // hover ring size animates in/out
      const targetSize = isHover ? 44 : 0;
      hoverSize += (targetSize - hoverSize) * 0.12;

      if (mouse.active && mouse.x > 0) {
        const mx = mouse.x, my = mouse.y;
        const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);

        /* ── 1. Soft aura blob (trailing) ── */
        const auraRadius = isHover ? 80 : 55;
        const auraAlpha  = isHover ? 0.22 : 0.15;
        const auraGrad   = ctx.createRadialGradient(aura.x, aura.y, 0, aura.x, aura.y, auraRadius);
        const auraHue    = isHover ? (hue + 60) % 360 : hue;
        auraGrad.addColorStop(0, `hsla(${auraHue}, 90%, 62%, ${auraAlpha})`);
        auraGrad.addColorStop(0.5, `hsla(${auraHue}, 85%, 58%, ${auraAlpha * 0.4})`);
        auraGrad.addColorStop(1, `hsla(${auraHue}, 80%, 55%, 0)`);
        ctx.save();
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(aura.x, aura.y, auraRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* ── 2. Comet streak when moving fast ── */
        if (speed > 6) {
          const len = Math.min(speed * 1.8, 60);
          const angle = Math.atan2(vel.y, vel.x);
          const tx = mx - Math.cos(angle) * len;
          const ty = my - Math.sin(angle) * len;
          const streakGrad = ctx.createLinearGradient(tx, ty, mx, my);
          streakGrad.addColorStop(0, `hsla(${hue}, 90%, 65%, 0)`);
          streakGrad.addColorStop(1, `hsla(${hue}, 95%, 70%, 0.55)`);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = streakGrad;
          ctx.lineWidth = Math.min(speed * 0.3, 5);
          ctx.lineCap = 'round';
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsl(${hue}, 90%, 65%)`;
          ctx.stroke();
          ctx.restore();
        }

        /* ── 3. Hover expand ring (around cursor, not aura) ── */
        if (hoverSize > 1) {
          ctx.save();
          ctx.globalAlpha = (hoverSize / 44) * 0.6;
          ctx.beginPath();
          ctx.arc(mx, my, hoverSize, 0, Math.PI * 2);
          ctx.strokeStyle = `hsl(${(hue + 60) % 360}, 90%, 68%)`;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 16;
          ctx.shadowColor = `hsl(${(hue + 60) % 360}, 90%, 68%)`;
          ctx.stroke();
          ctx.restore();

          // inner fill on hover
          ctx.save();
          ctx.globalAlpha = (hoverSize / 44) * 0.06;
          ctx.fillStyle = `hsl(${(hue + 60) % 360}, 90%, 68%)`;
          ctx.beginPath();
          ctx.arc(mx, my, hoverSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        /* ── 4. Small sharp dot right at cursor tip ── */
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.shadowBlur  = 18;
        ctx.shadowColor = `hsl(${hue}, 100%, 72%)`;
        ctx.fillStyle   = `hsl(${hue}, 100%, 80%)`;
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* ── 5. Particles ── */
      particles = particles.filter(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.035;
        p.life -= p.decay;
        if (p.life <= 0) return false;

        const alpha = p.life * p.life;
        const r     = p.size * p.life;
        ctx.save();
        ctx.globalAlpha = alpha * 0.88;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = `hsl(${p.hue}, 95%, 65%)`;
        ctx.fillStyle   = `hsl(${p.hue}, 95%, 70%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(r, 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click',     onClick);
      document.removeEventListener('mouseover',  onOver);
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
