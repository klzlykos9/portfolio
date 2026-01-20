import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  type: 'fire' | 'smoke';
}

const AIAgent: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [isBreathing, setIsBreathing] = useState(false);
  const [targetPos, setTargetPos] = useState<Position>({
    x: window.innerWidth - 150,
    y: window.innerHeight - 200
  });
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          setTargetPos({
            x: Math.random() * (window.innerWidth - 200) + 100,
            y: Math.random() * (window.innerHeight - 300) + 150,
          });
          return prev;
        }

        const speed = 2.5;
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed,
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [targetPos]);

  // Particle animation loop
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles((prev) => {
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // gravity
            life: p.life - 0.02,
            vx: p.vx * 0.98, // air resistance
          }))
          .filter((p) => p.life > 0);
      });
    }, 20);

    return () => clearInterval(particleInterval);
  }, []);

  const createFireBreath = (dragonX: number, dragonY: number) => {
    const newParticles: Particle[] = [];

    // Fire particles
    for (let i = 0; i < 20; i++) {
      const angle = (Math.random() - 0.5) * Math.PI / 2;
      const speed = 3 + Math.random() * 4;

      newParticles.push({
        id: particleIdRef.current++,
        x: dragonX + 80,
        y: dragonY + 20,
        vx: Math.cos(angle) * speed + 2,
        vy: Math.sin(angle) * speed - 1,
        life: 1,
        type: 'fire',
      });
    }

    // Smoke particles
    for (let i = 0; i < 15; i++) {
      const angle = (Math.random() - 0.5) * Math.PI / 2;
      const speed = 2 + Math.random() * 3;

      newParticles.push({
        id: particleIdRef.current++,
        x: dragonX + 80,
        y: dragonY + 20,
        vx: Math.cos(angle) * speed + 1,
        vy: Math.sin(angle) * speed - 0.5,
        life: 0.8,
        type: 'smoke',
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleDragonClick = () => {
    setIsBreathing(true);
    createFireBreath(position.x, position.y);

    setTimeout(() => {
      setIsBreathing(false);
    }, 600);
  };

  return (
    <div className="fixed pointer-events-none z-40 w-full h-full">
      {/* Particle Effects */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: particle.life,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: Math.max(0, particle.life - 0.3),
            scale: particle.type === 'fire' ? [1, 0.8, 0] : [1, 1.5, 0],
          }}
          transition={{ duration: 0.02 }}
          style={{
            width: particle.type === 'fire' ? '8px' : '12px',
            height: particle.type === 'fire' ? '8px' : '12px',
            background:
              particle.type === 'fire'
                ? `radial-gradient(circle, rgba(255, 200, 0, 1), rgba(255, 100, 0, 0.8))`
                : `radial-gradient(circle, rgba(150, 150, 150, 0.6), rgba(100, 100, 100, 0))`,
            borderRadius: '50%',
            boxShadow:
              particle.type === 'fire'
                ? '0 0 10px rgba(255, 150, 0, 0.8)'
                : '0 0 8px rgba(150, 150, 150, 0.5)',
          }}
        />
      ))}

      {/* Dragon */}
      <motion.div
        className="fixed pointer-events-auto cursor-pointer"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{ type: 'linear', duration: 0 }}
        style={{ width: 160, height: 140 }}
        onClick={handleDragonClick}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isBreathing ? [1, 1.08, 1] : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Lightning Aura */}
          <motion.div
            className="absolute inset-0 rounded-full blur-lg"
            animate={{
              boxShadow: isBreathing
                ? [
                    '0 0 20px rgba(100, 200, 255, 0.4)',
                    '0 0 40px rgba(100, 200, 255, 0.7)',
                    '0 0 20px rgba(100, 200, 255, 0.4)',
                  ]
                : '0 0 20px rgba(100, 200, 255, 0.3)',
            }}
            transition={{ duration: isBreathing ? 0.4 : 0.3 }}
          />

          {/* Dragon SVG */}
          <svg
            viewBox="0 0 160 140"
            className="w-full h-full filter drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(100, 200, 255, 0.6))',
            }}
          >
            {/* Main Dragon Body */}
            <defs>
              <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00d9ff', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#0099ff', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0066ff', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="lightningGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Body */}
            <ellipse
              cx="60"
              cy="70"
              rx="45"
              ry="38"
              fill="url(#dragonGrad)"
              filter="url(#lightningGlow)"
            />

            {/* Neck */}
            <path
              d="M 90 50 Q 100 45 110 40 Q 115 38 120 42"
              stroke="url(#dragonGrad)"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
              filter="url(#lightningGlow)"
            />

            {/* Head */}
            <ellipse cx="125" cy="35" rx="20" ry="18" fill="url(#dragonGrad)" filter="url(#lightningGlow)" />

            {/* Snout */}
            <ellipse cx="142" cy="35" rx="15" ry="12" fill="url(#dragonGrad)" filter="url(#lightningGlow)" />

            {/* Horn */}
            <path
              d="M 125 20 L 128 5"
              stroke="#00ffff"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#lightningGlow)"
            />

            {/* Eyes */}
            <motion.circle
              cx="120"
              cy="30"
              r="4"
              fill="#ffff00"
              animate={{
                opacity: isBreathing ? [1, 0.5, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Nostril */}
            <circle cx="140" cy="32" r="2" fill="#ffff00" />
            <circle cx="140" cy="38" r="2" fill="#ffff00" />

            {/* Wings */}
            <motion.g
              animate={{
                y: isBreathing ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Left Wing */}
              <path
                d="M 40 70 Q 15 50 5 70 Q 15 85 40 80"
                fill="url(#dragonGrad)"
                opacity="0.8"
                filter="url(#lightningGlow)"
              />

              {/* Right Wing */}
              <path
                d="M 80 70 Q 105 50 115 70 Q 105 85 80 80"
                fill="url(#dragonGrad)"
                opacity="0.8"
                filter="url(#lightningGlow)"
              />
            </motion.g>

            {/* Tail */}
            <motion.path
              d="M 20 80 Q 5 85 10 105 Q 20 110 25 95"
              stroke="url(#dragonGrad)"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: isBreathing
                  ? 'M 20 80 Q 5 90 0 110 Q 15 120 25 95'
                  : 'M 20 80 Q 5 85 10 105 Q 20 110 25 95',
              }}
              transition={{ duration: 0.4 }}
              filter="url(#lightningGlow)"
            />

            {/* Spikes on Back */}
            {[30, 50, 70].map((cx, i) => (
              <motion.path
                key={i}
                d={`M ${cx} 35 L ${cx - 3} 18`}
                stroke="#00ffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                  opacity: isBreathing ? [0.6, 1, 0.6] : 0.7,
                }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              />
            ))}

            {/* Lightning Effects on Fire Breath */}
            {isBreathing && (
              <>
                <motion.line
                  x1="142"
                  y1="30"
                  x2="170"
                  y2="25"
                  stroke="#ffff00"
                  strokeWidth="2"
                  opacity="0.8"
                  animate={{
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                />
                <motion.line
                  x1="142"
                  y1="40"
                  x2="170"
                  y2="45"
                  stroke="#ffff00"
                  strokeWidth="2"
                  opacity="0.8"
                  animate={{
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                />
              </>
            )}
          </svg>

          {/* Glow Pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{
              boxShadow: [
                '0 0 10px rgba(100, 200, 255, 0.3)',
                '0 0 25px rgba(100, 200, 255, 0.5)',
                '0 0 10px rgba(100, 200, 255, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Hover Tooltip */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 border border-cyan-400 rounded-lg text-xs text-cyan-300 whitespace-nowrap pointer-events-auto"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            Click for fire breath!
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIAgent;
