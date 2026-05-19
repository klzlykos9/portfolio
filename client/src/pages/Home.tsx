import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Cpu, Zap, Brain, Code2, Sparkles, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import AIHudEffect from '../components/AIHudEffect';
import FloatingTechBadges from '../components/FloatingTechBadges';
import CircuitDecor from '../components/CircuitDecor';
import NeuralNetworkIcon from '../components/NeuralNetworkIcon';
import MobileTechBadges from '../components/MobileTechBadges';
import { SectionPreview } from '../components/SectionPreview';

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ─── Counter hook ────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return { count, setStarted };
}

const StatItem = ({ value, label, suffix = '+', color = 'text-cyan-400' }: {
  value: number; label: string; suffix?: string; color?: string;
}) => {
  const { count, setStarted } = useCounter(value);
  return (
    <motion.div
      whileInView={() => { setStarted(true); return {}; }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`text-xl sm:text-3xl font-black ${color}`}>{count}{suffix}</div>
      <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">{label}</div>
    </motion.div>
  );
};

const whatIBuild = [
  {
    icon: Brain,
    title: 'LLM Applications',
    desc: 'LangChain · LangGraph · RAG · Agents',
    color: 'from-cyan-500/15 to-blue-600/15',
    border: 'border-cyan-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]',
    iconColor: 'text-cyan-400',
    dot: 'bg-cyan-400',
    tags: ['LangChain', 'LangGraph'],
    tagColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    desc: 'n8n workflows · intelligent pipelines',
    color: 'from-amber-500/15 to-orange-500/15',
    border: 'border-amber-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]',
    iconColor: 'text-amber-400',
    dot: 'bg-amber-400',
    tags: ['n8n', 'RAG'],
    tagColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Code2,
    title: 'AI Backends',
    desc: 'FastAPI · vector DBs · REST APIs',
    color: 'from-emerald-500/15 to-teal-500/15',
    border: 'border-emerald-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    iconColor: 'text-emerald-400',
    dot: 'bg-emerald-400',
    tags: ['FastAPI', 'FAISS'],
    tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Cpu,
    title: 'Vision & Multimodal',
    desc: 'Computer vision · CLIP · image+text AI',
    color: 'from-purple-500/15 to-pink-500/15',
    border: 'border-purple-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    iconColor: 'text-purple-400',
    dot: 'bg-purple-400',
    tags: ['CLIP', 'PyTorch'],
    tagColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const typed = useTypewriter(
    ['AI Engineer', 'Business Strategist', 'LLM Architect', 'Systems Thinker', 'Problem Solver'],
    75, 2200
  );

  const scrollDown = () => {
    document.getElementById('section-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#080e1a] overflow-x-hidden">

      {/* ── Backgrounds ── */}
      <ParticleBackground />
      <CircuitDecor />

      {/* ── Hero ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-16 pb-20">

        <AIHudEffect />
        <FloatingTechBadges />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/6 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-20 flex flex-col items-center gap-4 sm:gap-5">

          {/* ── Neural network logo + availability badge ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="flex flex-col items-center gap-2.5"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-xl bg-cyan-500/20 scale-110" />
              <div className="relative p-3 rounded-2xl bg-slate-900/70 border border-cyan-500/25 backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <NeuralNetworkIcon size={1.1} />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-primary/30 text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] glow-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for AI Projects
            </div>
          </motion.div>

          {/* ── Name + Typewriter ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h1 className="text-[2.2rem] leading-none sm:text-6xl lg:text-7xl font-black tracking-tighter">
              <span className="text-white">ARPAN P. </span>
              <span style={{
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backgroundImage: 'linear-gradient(90deg,#facc15,#fbbf24,#f59e0b,#facc15)',
                backgroundSize: '200% auto',
                animation: 'shimmer 2.5s linear infinite',
                filter: 'drop-shadow(0 0 24px rgba(251,191,36,0.6))',
              }}>NAYAK</span>
            </h1>
            <div className="mt-3 h-9 sm:h-11 flex items-center justify-center">
              <span className="text-lg sm:text-2xl font-bold text-primary">
                {typed}
                <span className="inline-block w-0.5 h-5 sm:h-7 bg-primary ml-0.5 animate-pulse align-middle" />
              </span>
            </div>
          </motion.div>

          {/* ── Description ── */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed px-2"
          >
            Architecting <span className="text-white font-semibold">intelligent systems</span> that bridge cutting-edge AI and strategic business transformation.
          </motion.p>

          {/* ── Tech badges — LangChain/LangGraph featured + all tools ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-lg"
          >
            <MobileTechBadges />
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto"
          >
            <button
              onClick={scrollDown}
              className="group w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl font-black text-sm transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] flex items-center justify-center gap-2 active:scale-95"
            >
              Explore Portfolio
              <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="group w-full sm:w-auto px-7 py-3.5 border-2 border-white/15 text-white rounded-2xl font-black text-sm transition-all hover:bg-white/5 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.12)] flex items-center justify-center gap-2"
            >
              View Projects
            </button>
          </motion.div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.45 }}
            className="grid grid-cols-3 gap-8 sm:gap-14 pt-4 border-t border-white/8 max-w-xs sm:max-w-sm mx-auto w-full"
          >
            <StatItem value={20} label="Projects Built" color="text-cyan-400" />
            <StatItem value={10} label="AI Systems" color="text-purple-400" />
            <StatItem value={5} label="Certifications" suffix="+" color="text-amber-400" />
          </motion.div>

          {/* ── Social Icons ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.72, duration: 0.4 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Github,   href: 'https://github.com/arpanpnayak',            label: 'GitHub',   hover: 'hover:text-white hover:border-white/40' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/arpanpnayak',   label: 'LinkedIn', hover: 'hover:text-blue-400 hover:border-blue-400/40' },
              { icon: Mail,     href: 'mailto:arpanpnayak@gmail.com',              label: 'Email',    hover: 'hover:text-primary hover:border-primary/40' },
            ].map(({ icon: Icon, href, label, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`p-3.5 bg-slate-900/60 rounded-xl border border-white/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] text-slate-400 ${hover}`}
              >
                <Icon size={19} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollDown}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group z-20"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll down"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold">Scroll</span>
          <ChevronDown size={16} className="group-hover:scale-125 transition-transform" />
        </motion.button>
      </section>

      {/* ── Section Shortcuts ── */}
      <div id="section-preview">
        <SectionPreview />
      </div>

      {/* ── What I Build ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-16 sm:py-20 px-4 sm:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/30 to-slate-900/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles size={11} /> Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
              What I <span className="text-cyan-400">Build</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Production-grade AI systems, not just prototypes
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatIBuild.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative p-5 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} backdrop-blur-sm group cursor-default transition-all duration-300 ${item.glow} overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 50% 0%,rgba(255,255,255,0.03),transparent 70%)' }} />

                <div className={`absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full ${item.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className="p-2.5 rounded-xl bg-white/5 w-fit mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  <item.icon className={item.iconColor} size={20} />
                </div>
                <h3 className="text-white font-black text-sm mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-3 group-hover:text-slate-300 transition-colors">{item.desc}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className={`text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${item.color.replace('/15', '')}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
