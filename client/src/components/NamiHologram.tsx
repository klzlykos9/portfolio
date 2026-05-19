import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NamiHologramProps {
  onActivate?: () => void;
}

const NamiHologram: React.FC<NamiHologramProps> = ({ onActivate }) => {
  const [active, setActive] = useState(false);
  const [pulse, setPulse] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Listen for Nami chat open event
  useEffect(() => {
    const handleNamiOpen = () => {
      setActive(true);
      setPulse(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setPulse(false), 1800);
    };
    window.addEventListener('nami-open', handleNamiOpen);
    return () => {
      window.removeEventListener('nami-open', handleNamiOpen);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    setPulse(true);
    setActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPulse(false), 1800);
    window.dispatchEvent(new Event('nami-open'));
    onActivate?.();
  };

  return (
    <motion.div
      className="relative flex flex-col items-center gap-4 cursor-pointer select-none"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      title="Click to chat with Nami"
    >
      {/* Outer ambient glow — blooms on active */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{
          width:  active ? '240px' : '180px',
          height: active ? '240px' : '180px',
          opacity: active ? 0.18 : 0.08,
        }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          background: 'radial-gradient(circle, #22d3ee 0%, #6366f1 60%, transparent 100%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ── Hologram platform ──────────────────────────────────── */}
      <div className="relative" style={{ width: 160, height: 160 }}>

        {/* Ring 1 — horizontal */}
        <div
          className="absolute inset-0 rounded-full border pointer-events-none"
          style={{
            borderColor: active ? 'rgba(34,211,238,0.5)' : 'rgba(34,211,238,0.22)',
            boxShadow: active ? '0 0 12px rgba(34,211,238,0.35)' : '0 0 6px rgba(34,211,238,0.12)',
            animation: `holo-ring-1 ${active ? '4s' : '8s'} linear infinite`,
            transition: 'border-color 0.6s, box-shadow 0.6s',
          }}
        />

        {/* Ring 2 — tilted 50° */}
        <div
          className="absolute inset-2 rounded-full border pointer-events-none"
          style={{
            borderColor: active ? 'rgba(139,92,246,0.6)' : 'rgba(139,92,246,0.25)',
            boxShadow: active ? '0 0 10px rgba(139,92,246,0.4)' : '0 0 5px rgba(139,92,246,0.1)',
            animation: `holo-ring-2 ${active ? '5s' : '11s'} linear infinite`,
            transition: 'border-color 0.6s, box-shadow 0.6s',
          }}
        />

        {/* Ring 3 — tilted -40° */}
        <div
          className="absolute inset-4 rounded-full border pointer-events-none"
          style={{
            borderColor: active ? 'rgba(250,204,21,0.45)' : 'rgba(250,204,21,0.18)',
            boxShadow: active ? '0 0 10px rgba(250,204,21,0.3)' : '0 0 4px rgba(250,204,21,0.08)',
            animation: `holo-ring-3 ${active ? '6s' : '13s'} linear infinite reverse`,
            transition: 'border-color 0.6s, box-shadow 0.6s',
          }}
        />

        {/* Core orb */}
        <motion.div
          className="absolute inset-0 m-auto rounded-full flex items-center justify-center"
          style={{ width: 76, height: 76, top: '50%', left: '50%', marginTop: -38, marginLeft: -38 }}
          animate={{
            boxShadow: active
              ? ['0 0 30px rgba(34,211,238,0.6)', '0 0 50px rgba(34,211,238,0.8)', '0 0 30px rgba(34,211,238,0.6)']
              : ['0 0 18px rgba(34,211,238,0.3)', '0 0 28px rgba(34,211,238,0.45)', '0 0 18px rgba(34,211,238,0.3)'],
          }}
          transition={{ duration: active ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Orb fill */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: active
                ? 'radial-gradient(circle at 38% 32%, rgba(103,232,249,0.35) 0%, rgba(34,211,238,0.18) 40%, rgba(99,102,241,0.22) 75%, rgba(0,0,0,0.6) 100%)'
                : 'radial-gradient(circle at 38% 32%, rgba(103,232,249,0.2) 0%, rgba(34,211,238,0.1) 40%, rgba(99,102,241,0.15) 75%, rgba(0,0,0,0.7) 100%)',
              border: active ? '1px solid rgba(34,211,238,0.6)' : '1px solid rgba(34,211,238,0.35)',
              transition: 'background 0.6s, border 0.6s',
            }}
          />
          {/* Specular highlight */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 22, height: 14, top: 14, left: 14, background: 'radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 100%)' }}
          />

          {/* Inner scan line on pulse */}
          <AnimatePresence>
            {pulse && (
              <motion.div
                initial={{ top: '-4px', opacity: 0 }}
                animate={{ top: '110%', opacity: [0, 0.8, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeIn' }}
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.9), transparent)' }}
              />
            )}
          </AnimatePresence>

          {/* Centre dot */}
          <motion.div
            className="relative z-10 rounded-full"
            style={{ width: 8, height: 8, background: '#67e8f9', boxShadow: '0 0 10px rgba(103,232,249,0.9)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Orbiting dot 1 */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 8px rgba(34,211,238,0.8)', top: 2, left: '50%', marginLeft: -3 }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: active ? 3 : 7, repeat: Infinity, ease: 'linear' }}
          transformTemplate={({ rotate }) => `rotate(${rotate}) translateX(72px)`}
        />

        {/* Orbiting dot 2 */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 4, height: 4, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 6px rgba(167,139,250,0.8)', top: '50%', left: 2, marginTop: -2 }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: active ? 4 : 9, repeat: Infinity, ease: 'linear' }}
          transformTemplate={({ rotate }) => `rotate(${rotate}) translateX(62px)`}
        />

        {/* Orbiting dot 3 — amber */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 6px rgba(251,191,36,0.8)', bottom: 4, right: 4 }}
          animate={{ rotate: [120, 480] }}
          transition={{ duration: active ? 5 : 12, repeat: Infinity, ease: 'linear' }}
          transformTemplate={({ rotate }) => `rotate(${rotate}) translateX(55px)`}
        />

        {/* Data stream lines */}
        {[10, 65, 120].map((angle, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: 1,
              height: 20,
              top: '50%',
              left: '50%',
              marginLeft: -0.5,
              transformOrigin: '0 0',
              transform: `rotate(${angle}deg) translateY(-78px)`,
              background: `linear-gradient(to bottom, transparent, ${i === 1 ? 'rgba(139,92,246,0.5)' : 'rgba(34,211,238,0.4)'}, transparent)`,
              animation: `holo-data-stream 2s ease-in-out infinite ${i * 0.4}s`,
              opacity: active ? 0.8 : 0.3,
              transition: 'opacity 0.6s',
            }}
          />
        ))}
      </div>

      {/* ── Label ── */}
      <div className="flex flex-col items-center gap-1">
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/60" />
          <span
            className="text-[11px] font-black uppercase tracking-[0.3em]"
            style={{
              color: active ? '#67e8f9' : '#22d3ee',
              textShadow: active ? '0 0 12px rgba(34,211,238,0.8)' : '0 0 8px rgba(34,211,238,0.4)',
              transition: 'color 0.4s, text-shadow 0.4s',
            }}
          >
            NAMI
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/60" />
        </motion.div>

        <motion.p
          className="text-[9px] uppercase tracking-widest font-semibold"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ color: '#64748b' }}
        >
          {active ? '● AI Active' : 'Click to Chat'}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default NamiHologram;
