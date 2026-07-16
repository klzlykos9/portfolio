import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const IntroScreen: React.FC<Props> = ({ onComplete }) => {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    // Simulate cinematic load — fast start, brief stutter mid-way, burst to end
    const schedule: { target: number; delay: number }[] = [
      { target: 18,  delay: 80  },
      { target: 35,  delay: 180 },
      { target: 52,  delay: 320 },
      { target: 63,  delay: 500 },
      { target: 71,  delay: 700 },
      { target: 79,  delay: 900 },
      { target: 86,  delay: 1100 },
      { target: 92,  delay: 1350 },
      { target: 97,  delay: 1600 },
      { target: 100, delay: 1900 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    schedule.forEach(({ target, delay }) => {
      const t = setTimeout(() => setPct(target), delay);
      timers.push(t);
    });

    // After 100%, pause briefly then exit
    const exitTimer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setExiting(true);
        setTimeout(onComplete, 700);
      }
    }, 2400);
    timers.push(exitTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] bg-[#030508] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 intro-grid-bg pointer-events-none opacity-20" />

          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Corner markers */}
          {[
            'top-8 left-8',
            'top-8 right-8 rotate-90',
            'bottom-8 right-8 rotate-180',
            'bottom-8 left-8 -rotate-90',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`absolute ${cls} w-6 h-6 pointer-events-none`}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-cyan-500/40" />
              <div className="absolute top-0 left-0 w-px h-full bg-cyan-500/40" />
            </motion.div>
          ))}

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10"
          >
            {/* Tag line */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-slate-600 text-[10px] sm:text-[11px] uppercase font-bold mb-6 tracking-[0.4em]"
            >
              Portfolio · 2026
            </motion.p>

            {/* Name */}
            <h1 className="font-black tracking-tighter text-white leading-none"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 7.5rem)' }}>
              ARPAN P.{' '}
              <span className="intro-name-glow">NAYAK</span>
            </h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-4 text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-[0.35em]"
            >
              AI Engineer &nbsp;·&nbsp; Business Strategist
            </motion.p>
          </motion.div>

          {/* Progress area — pinned to bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 sm:bottom-14 left-0 right-0 px-10 sm:px-20 lg:px-32 max-w-3xl mx-auto"
          >
            {/* Labels */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-700 text-[10px] font-mono uppercase tracking-[0.25em]">
                Initializing
              </span>
              <motion.span
                className="text-cyan-400 font-black text-sm sm:text-base tabular-nums font-mono"
                key={pct}
              >
                {String(pct).padStart(3, '0')}%
              </motion.span>
            </div>

            {/* Progress track */}
            <div className="h-px bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-400 to-violet-500"
                style={{ width: `${pct}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              {/* Shimmer */}
              <div className="absolute inset-0 intro-shimmer pointer-events-none" />
            </div>

            {/* Footer text */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-slate-800 text-[9px] font-mono uppercase tracking-widest">
                ARPAN.PORTFOLIO © 2026
              </span>
              <span className="text-slate-800 text-[9px] font-mono uppercase tracking-widest">
                {pct < 100 ? 'LOADING...' : 'READY'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
