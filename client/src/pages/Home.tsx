import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Cpu, Zap, Brain, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
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

const StatItem = ({ value, label, suffix = '+' }: { value: number; label: string; suffix?: string }) => {
  const { count, setStarted } = useCounter(value);
  return (
    <motion.div
      whileInView={() => { setStarted(true); return {}; }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-2xl sm:text-4xl font-black text-white">
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{label}</div>
    </motion.div>
  );
};

const floatingTech = [
  { icon: Brain, label: 'LangChain', color: 'from-cyan-500 to-blue-600', delay: 0 },
  { icon: Cpu, label: 'AI Agents', color: 'from-purple-500 to-pink-600', delay: 0.3 },
  { icon: Zap, label: 'RAG Systems', color: 'from-amber-500 to-orange-600', delay: 0.6 },
  { icon: Code2, label: 'FastAPI', color: 'from-emerald-500 to-teal-600', delay: 0.9 },
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
      <ParticleBackground />

      {/* ── Hero ── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-16">

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-5xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900/80 border border-primary/30 text-primary font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            Available for AI Projects
          </motion.div>

          {/* Main heading — mobile-safe responsive sizes */}
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

            {/* Typewriter subtitle */}
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
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl font-black text-base transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3 active:scale-95"
            >
              Explore Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="group w-full sm:w-auto px-8 py-4 border-2 border-white/15 text-white rounded-2xl font-black text-base transition-all hover:bg-white/5 hover:border-primary/50 flex items-center justify-center gap-2"
            >
              View Projects
            </button>
          </motion.div>

          {/* Floating tech pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-3 pt-6"
          >
            {floatingTech.map((tech) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + tech.delay }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white text-xs font-bold shadow-lg backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <tech.icon size={13} className="text-cyan-300" />
                {tech.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-white/8 max-w-md mx-auto w-full"
          >
            <StatItem value={20} label="Projects Built" />
            <StatItem value={10} label="AI Systems" />
            <StatItem value={5} label="Certifications" suffix="+" />
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center gap-5 pt-4"
          >
            {[
              { icon: Github, href: 'https://github.com/arpanpnayak', label: 'GitHub', hover: 'hover:text-white' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/arpanpnayak', label: 'LinkedIn', hover: 'hover:text-blue-400' },
              { icon: Mail, href: 'mailto:arpanpnayak@gmail.com', label: 'Email', hover: 'hover:text-primary' },
            ].map(({ icon: Icon, href, label, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`group relative p-4 bg-slate-900/60 rounded-2xl border border-white/8 transition-all duration-400 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] text-slate-400 ${hover}`}
              >
                <Icon size={22} className="relative z-10" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator — clickable + visible */}
        <motion.button
          onClick={scrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
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

      {/* ── What I Build Strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-16 px-4 sm:px-8 bg-gradient-to-b from-slate-900/20 to-slate-900/40"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              What I <span className="text-primary">Build</span>
            </h2>
            <p className="text-slate-300 text-sm">Production-grade AI systems, not just prototypes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Brain, title: 'LLM Applications', desc: 'LangChain, LangGraph, RAG, Agents', color: 'from-cyan-500/20 to-blue-600/20', border: 'border-cyan-500/20' },
              { icon: Zap, title: 'AI Automation', desc: 'n8n workflows, intelligent pipelines', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/20' },
              { icon: Code2, title: 'AI Backends', desc: 'FastAPI microservices, scalable APIs', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20' },
              { icon: Cpu, title: 'Vision & Multimodal', desc: 'Computer vision, CLIP, image + text AI', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} backdrop-blur-sm group cursor-default transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]`}
              >
                <div className="p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="text-white" size={22} />
                </div>
                <h3 className="text-white font-black text-sm mb-1.5">{item.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
