import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Cpu, Zap, Brain, Code2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import AIHudEffect from '../components/AIHudEffect';
import FloatingTechBadges from '../components/FloatingTechBadges';
import CircuitDecor from '../components/CircuitDecor';
import { SectionPreview } from '../components/SectionPreview';

// ─── Typewriter hook ────────────────────────────────────────────────────────
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

// ─── Counter hook ───────────────────────────────────────────────────────────
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
      <div className={`text-2xl sm:text-4xl font-black ${color}`}>
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">{label}</div>
    </motion.div>
  );
};

const whatIBuild = [
  {
    icon: Brain,
    title: 'LLM Applications',
    desc: 'LangChain, LangGraph, RAG pipelines, autonomous agents',
    color: 'from-cyan-500/15 to-blue-600/15',
    border: 'border-cyan-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]',
    iconColor: 'text-cyan-400',
    dot: 'bg-cyan-400',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    desc: 'n8n workflows, intelligent pipelines, task orchestration',
    color: 'from-amber-500/15 to-orange-500/15',
    border: 'border-amber-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]',
    iconColor: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  {
    icon: Code2,
    title: 'AI Backends',
    desc: 'FastAPI microservices, vector DBs, scalable REST APIs',
    color: 'from-emerald-500/15 to-teal-500/15',
    border: 'border-emerald-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    iconColor: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  {
    icon: Cpu,
    title: 'Vision & Multimodal',
    desc: 'Computer vision, CLIP, image + text fusion AI systems',
    color: 'from-purple-500/15 to-pink-500/15',
    border: 'border-purple-500/20',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    iconColor: 'text-purple-400',
    dot: 'bg-purple-400',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const typed = useTypewriter([
    'AI Engineer',
    'Business Strategist',
    'LLM Architect',
    'Systems Thinker',
    'Problem Solver',
  ], 75, 2200);

  const scrollDown = () => {
    const el = document.getElementById('section-preview');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080e1a] overflow-x-hidden">

      {/* ── Layer 0: Canvas neural network ── */}
      <ParticleBackground />

      {/* ── Layer 1: Circuit decoration + grid ── */}
      <CircuitDecor />

      {/* ── Hero ── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-16">

        {/* HUD overlay (scan line + panels) */}
        <AIHudEffect />

        {/* Floating tech badges */}
        <FloatingTechBadges />

        {/* Deep glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[480px] h-[480px] bg-blue-600/6 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-amber-500/4 rounded-full blur-[60px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-5xl mx-auto space-y-6 sm:space-y-8 relative z-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900/80 border border-primary/30 text-primary font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg glow-pulse"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            Available for AI Projects
          </motion.div>

          {/* Main heading */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9 }}
              className="text-[2.4rem] leading-none xs:text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter"
            >
              <span className="text-white">ARPAN P. </span>
              <span style={{
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backgroundImage: 'linear-gradient(90deg, #facc15, #fbbf24, #f59e0b, #facc15)',
                backgroundSize: '200% auto',
                animation: 'shimmer 2.5s linear infinite',
                filter: 'drop-shadow(0 0 28px rgba(251,191,36,0.65))'
              }}>NAYAK</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 h-10 sm:h-12 flex items-center justify-center"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                {typed}
                <span className="inline-block w-0.5 h-6 sm:h-8 bg-primary ml-1 animate-pulse align-middle" />
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Architecting <span className="text-white font-semibold">intelligent systems</span> that bridge cutting-edge AI technology and strategic business transformation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button
              onClick={scrollDown}
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl font-black text-base transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] flex items-center justify-center gap-3 active:scale-95"
            >
              Explore Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="group w-full sm:w-auto px-8 py-4 border-2 border-white/15 text-white rounded-2xl font-black text-base transition-all hover:bg-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] flex items-center justify-center gap-2"
            >
              View Projects
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-white/8 max-w-md mx-auto w-full"
          >
            <StatItem value={20} label="Projects Built" color="text-cyan-400" />
            <StatItem value={10} label="AI Systems" color="text-purple-400" />
            <StatItem value={5} label="Certifications" suffix="+" color="text-amber-400" />
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex justify-center gap-5 pt-4"
          >
            {[
              { icon: Github, href: 'https://github.com/arpanpnayak', label: 'GitHub', hover: 'hover:text-white hover:border-white/40' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/arpanpnayak', label: 'LinkedIn', hover: 'hover:text-blue-400 hover:border-blue-400/40' },
              { icon: Mail, href: 'mailto:arpanpnayak@gmail.com', label: 'Email', hover: 'hover:text-primary hover:border-primary/40' },
            ].map(({ icon: Icon, href, label, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`group relative p-4 bg-slate-900/60 rounded-2xl border border-white/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-slate-400 ${hover}`}
              >
                <Icon size={22} className="relative z-10" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <ChevronDown size={18} className="group-hover:scale-125 transition-transform" />
        </motion.button>
      </div>

      {/* ── Section Shortcuts ── */}
      <div id="section-preview">
        <SectionPreview />
      </div>

      {/* ── What I Build ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-20 px-4 sm:px-8"
      >
        {/* Section glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/30 to-slate-900/10 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-5">
              <Sparkles size={11} /> Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              What I <span className="text-cyan-400">Build</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Production-grade AI systems, not just prototypes
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatIBuild.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} backdrop-blur-sm group cursor-default transition-all duration-300 ${item.glow} overflow-hidden`}
              >
                {/* Inner glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />

                {/* Dot indicator */}
                <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${item.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                  <item.icon className={item.iconColor} size={22} />
                </div>
                <h3 className="text-white font-black text-sm mb-1.5 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>

                {/* Bottom highlight line */}
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${item.color.replace('/15', '')}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
