import React from 'react';
import { motion } from 'framer-motion';

const CircuitDecor: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Top-left circuit SVG */}
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.5 }}
      className="absolute top-16 left-0 w-64 h-64 hidden lg:block"
      viewBox="0 0 200 200"
      fill="none"
    >
      <path d="M10 180 L10 60 L60 60 L60 30 L140 30 L140 10" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
      <path d="M10 140 L40 140 L40 100 L90 100 L90 70 L160 70" stroke="rgba(6,182,212,0.08)" strokeWidth="1" />
      <circle cx="60" cy="60" r="3" fill="rgba(6,182,212,0.3)" />
      <circle cx="40" cy="140" r="2" fill="rgba(6,182,212,0.25)" />
      <circle cx="140" cy="30" r="3" fill="rgba(6,182,212,0.3)" />
      <circle cx="90" cy="100" r="2" fill="rgba(6,182,212,0.2)" />
      <circle cx="10" cy="60" r="4" fill="rgba(6,182,212,0.15)" />
      <motion.circle
        cx="60" cy="60" r="2"
        fill="rgba(6,182,212,0.9)"
        animate={{ opacity: [0.9, 0.2, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.svg>

    {/* Bottom-right circuit SVG */}
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1.5 }}
      className="absolute bottom-16 right-0 w-64 h-64 hidden lg:block"
      viewBox="0 0 200 200"
      fill="none"
    >
      <path d="M190 20 L190 130 L140 130 L140 160 L60 160 L60 180" stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
      <path d="M190 60 L160 60 L160 110 L100 110 L100 140 L40 140" stroke="rgba(139,92,246,0.08)" strokeWidth="1" />
      <circle cx="140" cy="130" r="3" fill="rgba(139,92,246,0.3)" />
      <circle cx="160" cy="60" r="2" fill="rgba(139,92,246,0.25)" />
      <circle cx="60" cy="160" r="3" fill="rgba(139,92,246,0.3)" />
      <circle cx="100" cy="110" r="2" fill="rgba(139,92,246,0.2)" />
      <motion.circle
        cx="140" cy="130" r="2"
        fill="rgba(139,92,246,0.9)"
        animate={{ opacity: [0.9, 0.2, 0.9] }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 1 }}
      />
    </motion.svg>

    {/* Subtle hex grid overlay — very faint */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(6,182,212,0.04) 1px, transparent 0)
        `,
        backgroundSize: '48px 48px',
      }}
    />

    {/* Center glow rings */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5"
      style={{ width: 600, height: 600, marginLeft: -300, marginTop: -300 }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/5"
      style={{ width: 900, height: 900, marginLeft: -450, marginTop: -450 }}
      animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
  </div>
);

export default CircuitDecor;
