import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'NEURAL SYNC', value: '98.6%' },
  { label: 'AI LOAD', value: '47ms' },
  { label: 'ACCURACY', value: '99.1%' },
  { label: 'UPTIME', value: '99.9%' },
];

const BracketCorner = ({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const size = 28;
  const stroke = 2;
  const color = '#06b6d4';
  const isRight = pos === 'tr' || pos === 'br';
  const isBottom = pos === 'bl' || pos === 'br';
  return (
    <svg
      width={size} height={size}
      style={{
        position: 'absolute',
        top: isBottom ? undefined : 0,
        bottom: isBottom ? 0 : undefined,
        left: isRight ? undefined : 0,
        right: isRight ? 0 : undefined,
        opacity: 0.75,
      }}
    >
      {pos === 'tl' && <>
        <line x1={0} y1={size} x2={0} y2={0} stroke={color} strokeWidth={stroke} />
        <line x1={0} y1={0} x2={size} y2={0} stroke={color} strokeWidth={stroke} />
      </>}
      {pos === 'tr' && <>
        <line x1={size} y1={size} x2={size} y2={0} stroke={color} strokeWidth={stroke} />
        <line x1={size} y1={0} x2={0} y2={0} stroke={color} strokeWidth={stroke} />
      </>}
      {pos === 'bl' && <>
        <line x1={0} y1={0} x2={0} y2={size} stroke={color} strokeWidth={stroke} />
        <line x1={0} y1={size} x2={size} y2={size} stroke={color} strokeWidth={stroke} />
      </>}
      {pos === 'br' && <>
        <line x1={size} y1={0} x2={size} y2={size} stroke={color} strokeWidth={stroke} />
        <line x1={size} y1={size} x2={0} y2={size} stroke={color} strokeWidth={stroke} />
      </>}
    </svg>
  );
};

const AIHudEffect: React.FC = () => {
  const [tick, setTick] = useState(0);
  const [vals, setVals] = useState(metrics.map(m => m.value));

  useEffect(() => {
    const t = setInterval(() => {
      setTick(p => p + 1);
      setVals(metrics.map((m, i) => {
        if (i === 1) return `${(Math.random() * 30 + 30).toFixed(0)}ms`;
        if (i === 2) return `${(98.5 + Math.random() * 1.2).toFixed(1)}%`;
        return m.value;
      }));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">

      {/* Top-left HUD panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute top-20 left-4 sm:left-8 hidden sm:block"
      >
        <div className="relative p-4 border border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm rounded-lg"
          style={{ boxShadow: '0 0 20px rgba(6,182,212,0.08)' }}>
          <BracketCorner pos="tl" />
          <BracketCorner pos="tr" />
          <BracketCorner pos="bl" />
          <BracketCorner pos="br" />
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-cyan-400 font-black uppercase tracking-[0.2em]">SYS ONLINE</span>
          </div>
          <div className="space-y-1.5">
            {metrics.slice(0, 2).map((m, i) => (
              <div key={m.label} className="flex items-center justify-between gap-8">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest">{m.label}</span>
                <span className="text-[9px] text-cyan-300 font-black font-mono tabular-nums">{vals[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Top-right HUD panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute top-20 right-4 sm:right-8 hidden sm:block"
      >
        <div className="relative p-4 border border-purple-500/20 bg-slate-900/50 backdrop-blur-sm rounded-lg"
          style={{ boxShadow: '0 0 20px rgba(139,92,246,0.08)' }}>
          <BracketCorner pos="tl" />
          <BracketCorner pos="tr" />
          <BracketCorner pos="bl" />
          <BracketCorner pos="br" />
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[9px] text-purple-400 font-black uppercase tracking-[0.2em]">AI ACTIVE</span>
          </div>
          <div className="space-y-1.5">
            {metrics.slice(2).map((m, i) => (
              <div key={m.label} className="flex items-center justify-between gap-8">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest">{m.label}</span>
                <span className="text-[9px] text-purple-300 font-black font-mono tabular-nums">{vals[i + 2]}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="scan-line" />
      </div>

      {/* Bottom data ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-20 left-0 right-0 flex justify-center hidden sm:flex"
      >
        <div className="flex items-center gap-4 px-5 py-1.5 bg-slate-900/40 border border-white/5 rounded-full backdrop-blur-sm">
          {['LANGCHAIN', 'RAG', 'FAISS', 'TRANSFORMERS', 'LANGRAPH', 'FASTAPI'].map((t, i) => (
            <span key={t} className="flex items-center gap-4">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{t}</span>
              {i < 5 && <span className="w-px h-2 bg-white/10" />}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Side vertical lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: 'easeOut' }}
        className="absolute left-3 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden lg:block origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.7, duration: 1.2, ease: 'easeOut' }}
        className="absolute right-3 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent hidden lg:block origin-top"
      />

    </div>
  );
};

export default AIHudEffect;
