import React, { useEffect, useRef } from 'react';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  color: [number, number, number];
  type: 'neuron' | 'data' | 'spark';
}

interface Pulse {
  fromIdx: number; toIdx: number;
  progress: number;
  speed: number;
  color: [number, number, number];
}

const COLORS: [number, number, number][] = [
  [6, 182, 212],
  [139, 92, 246],
  [251, 191, 36],
  [16, 185, 129],
];

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    const nodeCount = Math.min(90, Math.floor(window.innerWidth / 18));

    for (let i = 0; i < nodeCount; i++) {
      const typeRoll = Math.random();
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: typeRoll < 0.15 ? Math.random() * 3 + 2.5
             : typeRoll < 0.55 ? Math.random() * 1.8 + 1.2
             : Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: typeRoll < 0.15 ? 'neuron' : typeRoll < 0.55 ? 'data' : 'spark',
      });
    }

    const spawnPulse = () => {
      const from = Math.floor(Math.random() * nodes.length);
      const candidates: number[] = [];
      nodes.forEach((n, i) => {
        if (i === from) return;
        const dx = nodes[from].x - n.x;
        const dy = nodes[from].y - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < 150) candidates.push(i);
      });
      if (!candidates.length) return;
      const to = candidates[Math.floor(Math.random() * candidates.length)];
      pulses.push({
        fromIdx: from, toIdx: to,
        progress: 0,
        speed: 0.008 + Math.random() * 0.014,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      if (frameCount % 18 === 0 && pulses.length < 25) spawnPulse();

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;
        n.pulsePhase += 0.025;
      });

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = 0.12 * (1 - dist / 150);
            const [r, g, bl] = a.color;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }
        const from = nodes[p.fromIdx], to = nodes[p.toIdx];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;
        const [r, g, bl] = p.color;
        const trail = ctx.createRadialGradient(px, py, 0, px, py, 5);
        trail.addColorStop(0, `rgba(${r},${g},${bl},0.9)`);
        trail.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = trail;
        ctx.fill();
      }

      nodes.forEach(n => {
        const pulseFactor = 1 + 0.3 * Math.sin(n.pulsePhase);
        const r = n.size * pulseFactor;
        const [cr, cg, cb] = n.color;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${n.opacity})`);
        grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${n.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${n.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.45 }}
    />
  );
};

export default ParticleBackground;
