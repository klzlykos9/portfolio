import { useEffect, useRef } from 'react';

interface InkDrop {
  x: number;
  y: number;
  hue: number;
  born: number;      // ms timestamp
  maxR: number;      // max radius it will expand to
  life: number;      // 0→1→0 arc over duration
  duration: number;  // ms
  alpha: number;     // peak opacity
}

interface Ripple {
  x: number; y: number;
  hue: number;
  born: number;
  duration: number;
  maxR: number;
}

const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    let mouse     = { x: -999, y: -999, active: false };
    let lastPos   = { x: -999, y: -999 };
    let vel       = { x: 0, y: 0 };
    let hue       = 185;

    // Energy: accumulates from movement, slowly decays
    // Controls global CSS hue-rotate + saturate on the page
    let energy    = 0;   // 0 – 100
    let totalDist = 0;   // running total to gate ripple spawning

    const drops:   InkDrop[]  = [];
    const ripples: Ripple[]   = [];
    let raf: number;
    const root = document.documentElement;

    /* ── resize ── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── spawn ink drop at cursor ── */
    const spawnDrop = (x: number, y: number, speed: number) => {
      const now = performance.now();
      drops.push({
        x, y,
        hue: hue,
        born: now,
        maxR: 60 + speed * 4 + Math.random() * 60,
        life: 0,
        duration: 1200 + Math.random() * 800,
        alpha: Math.min(0.28 + speed * 0.012, 0.55),
      });
    };

    /* ── spawn outward ripple ring ── */
    const spawnRipple = (x: number, y: number) => {
      ripples.push({
        x, y,
        hue: (hue + Math.random() * 60 - 30 + 360) % 360,
        born: performance.now(),
        duration: 1600 + Math.random() * 800,
        maxR: 100 + Math.random() * 120,
      });
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      vel.x = dx; vel.y = dy;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastPos = { x: e.clientX, y: e.clientY };
      mouse   = { x: e.clientX, y: e.clientY, active: true };

      // cycle hue with movement
      hue = (hue + speed * 0.35) % 360;

      // build up energy (capped at 100)
      energy = Math.min(energy + speed * 0.9, 100);

      // spawn ink drops along the path
      if (speed > 2) {
        spawnDrop(e.clientX, e.clientY, speed);
      }

      // spawn ripple every ~80px of travel
      totalDist += speed;
      if (totalDist > 80) {
        totalDist = 0;
        spawnRipple(e.clientX, e.clientY);
      }
    };

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 4; i++) spawnRipple(e.clientX, e.clientY);
      for (let i = 0; i < 3; i++) spawnDrop(e.clientX, e.clientY, 18);
      energy = Math.min(energy + 25, 100);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    document.addEventListener('mouseleave', () => { mouse.active = false; });
    document.addEventListener('mouseenter', () => { mouse.active = true; });

    /* ── animation loop ── */
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Decay energy
      energy = Math.max(energy - 0.55, 0);

      // Apply global page disruption via CSS filter
      // At energy=0: no filter. At energy=100: heavy hue-rotate + saturation boost
      const rotate = (energy / 100) * 62;                   // 0→62 deg hue-rotate
      const sat    = 1 + (energy / 100) * 1.4;              // 1→2.4× saturation
      const bright = 1 + (energy / 100) * 0.18;             // slight brightness
      root.style.filter = energy > 1
        ? `hue-rotate(${rotate.toFixed(1)}deg) saturate(${sat.toFixed(2)}) brightness(${bright.toFixed(2)})`
        : '';

      /* ── 1. Ink drops (paint blobs expanding like dye in water) ── */
      for (let i = drops.length - 1; i >= 0; i--) {
        const d   = drops[i];
        const age = (now - d.born) / d.duration;
        if (age >= 1) { drops.splice(i, 1); continue; }

        // radius: fast expand then slow
        const r   = d.maxR * (1 - Math.pow(1 - age, 2.2));
        // alpha: peak at ~30% of life, fade out after
        const a   = d.alpha * Math.sin(Math.PI * Math.min(age * 3, 1)) * (1 - age * 0.7);

        const h1  = d.hue;
        const h2  = (d.hue + 40) % 360;
        const h3  = (d.hue + 80) % 360;

        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r);
        grd.addColorStop(0,    `hsla(${h1}, 100%, 70%, ${(a * 0.9).toFixed(3)})`);
        grd.addColorStop(0.35, `hsla(${h2}, 95%,  65%, ${(a * 0.65).toFixed(3)})`);
        grd.addColorStop(0.7,  `hsla(${h3}, 90%,  60%, ${(a * 0.3).toFixed(3)})`);
        grd.addColorStop(1,    `hsla(${h3}, 85%,  55%, 0)`);

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* ── 2. Ripple rings (water disturbance rings expanding outward) ── */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp  = ripples[i];
        const age = (now - rp.born) / rp.duration;
        if (age >= 1) { ripples.splice(i, 1); continue; }

        const r = rp.maxR * Math.pow(age, 0.6);
        const a = (1 - age) * 0.55;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${rp.hue}, 95%, 68%, ${a.toFixed(3)})`;
        ctx.lineWidth   = (1 - age) * 3 + 0.5;
        ctx.shadowBlur  = 18;
        ctx.shadowColor = `hsla(${rp.hue}, 90%, 65%, ${(a * 0.6).toFixed(3)})`;
        ctx.stroke();
        ctx.restore();
      }

      /* ── 3. Small bright cursor dot (always at exact mouse position) ── */
      if (mouse.active && mouse.x > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.shadowBlur  = 24;
        ctx.shadowColor = `hsla(${hue}, 100%, 75%, 0.9)`;
        ctx.fillStyle   = `hsla(${hue}, 100%, 85%, 0.9)`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      root.style.filter = '';
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click',     onClick);
      document.removeEventListener('mouseleave', () => { mouse.active = false; });
      document.removeEventListener('mouseenter', () => { mouse.active = true; });
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
