import React from 'react';
import { motion } from 'framer-motion';
import { SiPython, SiTensorflow, SiOpenai, SiDocker, SiFastapi, SiHuggingface } from 'react-icons/si';
import { Brain, Network, Database, Cpu, Zap, GitBranch } from 'lucide-react';

// Featured (LangChain + LangGraph) shown first & highlighted
const featured = [
  {
    Icon: Brain,
    label: 'LangChain',
    sublabel: 'LLM Framework',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.5)',
    glow: 'rgba(139,92,246,0.3)',
  },
  {
    Icon: Network,
    label: 'LangGraph',
    sublabel: 'Agent Graphs',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.5)',
    glow: 'rgba(168,85,247,0.3)',
  },
];

const others = [
  { Icon: SiPython,      label: 'Python',      color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.35)' },
  { Icon: SiOpenai,      label: 'OpenAI',      color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.35)' },
  { Icon: SiTensorflow,  label: 'TensorFlow',  color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.35)' },
  { Icon: Database,      label: 'FAISS',       color: '#facc15', bg: 'rgba(250,204,21,0.1)',  border: 'rgba(250,204,21,0.35)' },
  { Icon: SiFastapi,     label: 'FastAPI',     color: '#14b8a6', bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.35)' },
  { Icon: Cpu,           label: 'PyTorch',     color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.35)' },
  { Icon: SiDocker,      label: 'Docker',      color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.35)' },
  { Icon: SiHuggingface, label: 'HuggingFace', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.35)' },
  { Icon: Zap,           label: 'n8n / RAG',   color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.35)' },
  { Icon: GitBranch,     label: 'LangGraph',   color: '#c084fc', bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.35)' },
];

const MobileTechBadges: React.FC = () => (
  <div className="w-full">
    {/* Featured row — LangChain & LangGraph */}
    <div className="flex justify-center gap-3 mb-3">
      {featured.map((b) => (
        <motion.div
          key={b.label}
          whileHover={{ y: -3, scale: 1.04 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border backdrop-blur-sm"
          style={{
            background: b.bg,
            borderColor: b.border,
            boxShadow: `0 0 18px ${b.glow}, 0 4px 16px rgba(0,0,0,0.3)`,
          }}
        >
          <div
            className="p-1.5 rounded-lg"
            style={{ background: `${b.color}22`, border: `1px solid ${b.border}` }}
          >
            <b.Icon size={14} style={{ color: b.color }} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white leading-none">{b.label}</div>
            <div className="text-[9px] font-medium leading-none mt-0.5" style={{ color: b.color }}>{b.sublabel}</div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Scrollable others row */}
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-2 justify-center flex-wrap">
      {others.slice(0, 8).map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 + i * 0.07, duration: 0.3 }}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold text-white/70 whitespace-nowrap"
          style={{ background: b.bg, borderColor: b.border }}
        >
          <b.Icon size={11} style={{ color: b.color }} />
          {b.label}
        </motion.div>
      ))}
    </div>
  </div>
);

export default MobileTechBadges;
