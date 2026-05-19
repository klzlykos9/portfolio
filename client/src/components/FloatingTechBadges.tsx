import React from 'react';
import { motion } from 'framer-motion';
import { SiPython, SiTensorflow, SiOpenai, SiDocker, SiFastapi, SiHuggingface } from 'react-icons/si';
import { Brain, Database, Cpu, Network } from 'lucide-react';

// All positions keep a clear ±340px horizontal buffer from center
// so they never overlap the main hero content
const badges = [
  // ── Left side ──────────────────────────────────────────────────────────
  { Icon: SiPython,      label: 'Python',      color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.4)',  top: '18%', left: '4%',   delay: 0.3, dur: 5.5 },
  { Icon: Brain,         label: 'LangChain',   color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.4)',  top: '36%', left: '2%',   delay: 0.9, dur: 6.3 },
  { Icon: Database,      label: 'FAISS',       color: '#facc15', bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.4)',  top: '55%', left: '3%',   delay: 1.5, dur: 5.1 },
  { Icon: Network,       label: 'LangGraph',   color: '#a855f7', bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.4)',  top: '72%', left: '5%',   delay: 2.1, dur: 6.8 },
  // ── Right side ─────────────────────────────────────────────────────────
  { Icon: SiTensorflow,  label: 'TensorFlow',  color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.4)',  top: '18%', right: '3%',  delay: 0.6, dur: 6.0 },
  { Icon: SiOpenai,      label: 'OpenAI',      color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.4)',  top: '36%', right: '2%',  delay: 1.2, dur: 5.7 },
  { Icon: SiDocker,      label: 'Docker',      color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  border: 'rgba(6,182,212,0.4)',   top: '55%', right: '3%',  delay: 1.8, dur: 7.0 },
  { Icon: SiFastapi,     label: 'FastAPI',     color: '#14b8a6', bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.4)',  top: '72%', right: '5%',  delay: 2.4, dur: 5.4 },
  { Icon: Cpu,           label: 'PyTorch',     color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',   top: '27%', right: '7%',  delay: 3.0, dur: 6.6 },
  { Icon: SiHuggingface, label: 'HuggingFace', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.4)',  top: '27%', left: '7%',   delay: 3.5, dur: 5.8 },
];

const FloatingTechBadges: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden hidden xl:block" style={{ zIndex: 5 }}>
    {badges.map((b) => {
      const { Icon, label, color, bg, border, top, left, right, delay, dur } = b;
      return (
        /* Static wrapper: handles absolute position */
        <div
          key={label}
          style={{ position: 'absolute', top, left, right }}
        >
          {/* Appear animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, type: 'spring', stiffness: 180, damping: 18 }}
          >
            {/* Float animation — only y, no transform conflict */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-sm select-none"
                style={{
                  background: bg,
                  borderColor: border,
                  boxShadow: `0 4px 20px ${bg}, 0 0 8px ${bg}`,
                }}
              >
                <Icon size={13} style={{ color, flexShrink: 0 }} />
                <span className="text-[10px] font-black text-white/75 whitespace-nowrap">{label}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
    })}
  </div>
);

export default FloatingTechBadges;
