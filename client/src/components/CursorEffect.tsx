import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;       // 0→1 (starts at 1, decays to 0)
  decay: number;      // how fast it fades
  size: number;
  hue: number;        // 185=cyan  200=sky  260=violet  45=amber
}

const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse   = useRef({ x: -999, y: -999, active: false });
  const trailer = useRef({ x: -999, y: -999 });
  const pool    = useRef<Particle[]>([]);
  const raf     = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    /* ── resize ─────────────────────────── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── hide native cursor ─────────────── */
    document.body.style.cursor = 'none';

    /* ── helpers ────────────────────────── */
    const HUES = [185, 200, 200, 260, 185, 45]; // mostly cyan/sky, sprinkle violet + amber

    const spawn = (x: number, y: number, n: number, burst = false) => {
      for (let i = 0; i < n; i++) {
        const angle = burst
          ? (Math.PI * 2 * i) / n + Math.random() * 0.4
          : Math.random() * Math.PI * 2;
        const speed = burst
          ? Math.random() * 5 + 2
          : Math.random() * 1.8 + 0.4;
        pool.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0 : 0.6),
          life: 1,
          decay: burst
            ? 0.016 + Math.random() * 0.012
            : 0.022 + Math.random() * 0.018,
          size: burst
            ? Math.random() * 3.5 + 1.5
            : Math.random() * 2 + 0.8,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
        });
      }
    };

    /* ── event handlers ─────────────────── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true };
      spawn(e.clientX, e.clientY, 4);
    };
    const onClick = (e: MouseEvent) => {
      spawn(e.clientX, e.clientY, 28, true);
    };
    const onLeave = () => { mouse.current.active = false; };
    const onEnter = () => { mouse.current.active = true; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click',     onClick);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    /* ── animation loop ─────────────────── */
    const animate = () => {
      raf.current = requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* spring-lag trailer */
      trailer.current.x += (mouse.current.x - trailer.current.x) * 0.1;
      trailer.current.y += (mouse.current.y - trailer.current.y) * 0.1;

      /* particles */
      pool.current = pool.current.filter(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vy += 0.03;      // soft gravity
        p.life -= p.decay;
        if (p.life <= 0) return false;

        const alpha = p.life * p.life;
        const r     = p.size * p.life;

        ctx.save();
        ctx.globalAlpha    = alpha * 0.85;
        ctx.shadowBlur     = 10;
        ctx.shadowColor    = `hsl(${p.hue}, 90%, 65%)`;
        ctx.fillStyle      = `hsl(${p.hue}, 90%, 68%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(r, 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      /* custom cursor — only when inside viewport */
      if (mouse.current.active && mouse.current.x > 0) {
        const mx = mouse.current.x;
        const my = mouse.current.y;
        const tx = trailer.current.x;
        const ty = trailer.current.y;

        /* --- outer lagging ring --- */
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(tx, ty, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.7)';
        ctx.lineWidth   = 1.2;
        ctx.stroke();
        ctx.restore();

        /* --- inner dot --- */
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.shadowBlur  = 14;
        ctx.shadowColor = '#22d3ee';
        ctx.fillStyle   = '#22d3ee';
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* --- connecting thread (trailer → dot) --- */
        const dx   = mx - tx;
        const dy   = my - ty;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 2) {
          ctx.save();
          ctx.globalAlpha = Math.min(dist / 60, 0.25);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = '#22d3ee';
          ctx.lineWidth   = 0.7;
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize',      resize);
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('click',       onClick);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
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
