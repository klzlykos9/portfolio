import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Github, Linkedin, Mail, ChevronDown,
  Brain, Zap, Code2, Cpu, BarChart3, Database,
  ArrowUpRight, Sparkles, Terminal, Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 72, pause = 2300) {
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
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ── Counter ──────────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) return;
    let n = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); }
      else setCount(n);
    }, 16);
    return () => clearInterval(t);
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
      <div className={`text-2xl sm:text-3xl font-black ${color}`}>{count}{suffix}</div>
      <div className="text-[10px] text-slate-500 mt-0.5 font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

// ── Data ─────────────────────────────────────────────────────────────────────
const TECH = [
  'Python', 'LangChain', 'LangGraph', 'RAG', 'FastAPI', 'React', 'TypeScript',
  'LangSmith', 'FAISS', 'OpenAI API', 'n8n', 'Docker', 'PostgreSQL', 'TensorFlow',
  'PyTorch', 'ChromaDB', 'MCP', 'LLM Agents', 'Streamlit', 'Scikit-learn',
];

const TERMINAL_LINES = [
  { text: '> system.init()', c: 'text-cyan-400' },
  { text: '  → AI Engineer: ONLINE ✓', c: 'text-emerald-400' },
  { text: '  → Business Strategist: ONLINE ✓', c: 'text-emerald-400' },
  { text: '> portfolio.stats()', c: 'text-cyan-400' },
  { text: '  → Projects: 20+ deployed', c: 'text-slate-300' },
  { text: '  → AI Systems: 10+ built', c: 'text-slate-300' },
  { text: '> status.check()', c: 'text-cyan-400' },
  { text: '  → Available for opportunities', c: 'text-amber-400' },
  { text: '> stack.top()', c: 'text-cyan-400' },
  { text: '  → GenAI · RAG · LangGraph', c: 'text-slate-300' },
  { text: '  → Six Sigma · MBA · Strategy', c: 'text-slate-300' },
  { text: '_', c: 'text-cyan-400 animate-pulse' },
];

const capabilities = [
  {
    icon: Brain,
    title: 'Generative AI & LLMs',
    desc: 'Production RAG pipelines, LangChain / LangGraph agent systems, multi-step reasoning, retrieval-augmented generation, and LLM orchestration at scale.',
    tags: ['LangChain', 'LangGraph', 'RAG', 'Agents', 'LangSmith', 'MCP'],
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    glow: 'hover:shadow-[0_0_60px_rgba(6,182,212,0.18)]',
    bg: 'from-cyan-500/10 via-blue-600/5 to-transparent',
    featured: true,
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    desc: 'Intelligent n8n pipelines, zero-touch operations, and automated business workflows.',
    tags: ['n8n', 'Automation', 'Pipelines'],
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.14)]',
    bg: 'from-amber-500/8 to-transparent',
    featured: false,
    span: '',
  },
  {
    icon: BarChart3,
    title: 'Business Strategy',
    desc: 'Six Sigma Black Belt · process optimization · decision intelligence, MBA-level strategic thinking applied to AI.',
    tags: ['Six Sigma', 'DMAIC', 'MBA'],
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.14)]',
    bg: 'from-violet-500/8 to-transparent',
    featured: false,
    span: '',
  },
  {
    icon: Cpu,
    title: 'Computer Vision',
    desc: 'OpenCV · CLIP · YOLO · multimodal AI and medical imaging systems.',
    tags: ['PyTorch', 'CLIP', 'OpenCV'],
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.14)]',
    bg: 'from-emerald-500/8 to-transparent',
    featured: false,
    span: '',
  },
  {
    icon: Database,
    title: 'AI Backends',
    desc: 'FastAPI · vector databases · scalable REST APIs built for production AI workloads.',
    tags: ['FastAPI', 'FAISS', 'PostgreSQL'],
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.14)]',
    bg: 'from-blue-500/8 to-transparent',
    featured: false,
    span: '',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [terminalStep, setTerminalStep] = useState(0);
  const typed = useTypewriter(
    ['AI Engineer', 'LLM Architect', 'Business Strategist', 'Systems Thinker', 'RAG Specialist'],
    70, 2300
  );

  // Reveal terminal lines one by one
  useEffect(() => {
    if (terminalStep >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setTerminalStep(s => s + 1), 280);
    return () => clearTimeout(t);
  }, [terminalStep]);

  return (
    <div className="relative bg-[#060a14] overflow-x-hidden">

      {/* ── Aurora ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="noise-layer" />
      </div>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 lg:px-16 pt-20 pb-16">

        {/* Giant watermark name — sits behind content */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden select-none z-0" aria-hidden>
          <div
            className="font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(7rem, 22vw, 24rem)',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.055) 0%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              marginBottom: '-3rem',
              userSelect: 'none',
            }}
          >
            NAYAK
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

            {/* ── Left ── */}
            <div className="flex flex-col gap-7">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-black text-[10px] uppercase tracking-[0.22em] w-fit glow-pulse"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Available for AI Projects
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.75 }}
              >
                <h1
                  className="font-black tracking-tighter leading-[0.92] text-white"
                  style={{ fontSize: 'clamp(3rem, 8.5vw, 6.5rem)' }}
                >
                  ARPAN P.
                  <br />
                  <span className="hero-shimmer-text">NAYAK</span>
                </h1>
                <div className="mt-4 h-9 sm:h-11 flex items-center">
                  <span className="text-lg sm:text-2xl font-bold text-cyan-400">
                    {typed}
                    <span className="inline-block w-0.5 h-5 sm:h-7 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg"
              >
                I build <span className="text-white font-semibold">production-grade AI systems</span> — not demos, not prototypes.
                Real, scalable, deployed systems. From LangGraph multi-agent architectures to RAG pipelines —
                bridging <span className="text-white font-semibold">cutting-edge AI</span> with business outcomes.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => navigate('/projects')}
                  className="group px-7 py-3.5 bg-cyan-500 text-white rounded-xl font-black text-sm transition-all hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] flex items-center gap-2 active:scale-95"
                >
                  View Projects
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="group px-7 py-3.5 border border-white/12 text-white rounded-xl font-black text-sm transition-all hover:bg-white/5 hover:border-white/25 flex items-center gap-2"
                >
                  About Me
                  <ArrowUpRight size={15} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.52 }}
                className="flex items-center gap-8 pt-5 border-t border-white/6"
              >
                <StatItem value={20} label="Projects" color="text-cyan-400" />
                <div className="w-px h-10 bg-white/8" />
                <StatItem value={10} label="AI Systems" color="text-violet-400" />
                <div className="w-px h-10 bg-white/8" />
                <StatItem value={5} label="Certs" suffix="+" color="text-amber-400" />
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62 }}
                className="flex gap-3"
              >
                {[
                  { icon: Github,   href: 'https://github.com/arpanpnayak',          label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/arpanpnayak', label: 'LinkedIn' },
                  { icon: Mail,     href: 'mailto:arpanpnayak@gmail.com',            label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="p-3.5 bg-slate-900/60 rounded-xl border border-white/8 text-slate-400 hover:text-white hover:border-white/20 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-200">
                    <Icon size={18} />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Terminal ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Glow halo */}
                <div className="absolute -inset-6 bg-cyan-500/6 rounded-3xl blur-3xl pointer-events-none" />
                <div className="absolute -inset-2 bg-blue-600/4 rounded-3xl blur-2xl pointer-events-none" />

                {/* Window */}
                <div className="relative bg-slate-950/85 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8 bg-black/30">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2">
                      <Terminal size={11} className="text-slate-600" />
                      <span className="text-slate-600 text-[11px] font-mono">arpan@ai-engineer ~ portfolio</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 font-mono text-sm space-y-1.5 min-h-[300px] bg-black/10">
                    {TERMINAL_LINES.slice(0, terminalStep).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.18 }}
                        className={line.c}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                  </div>

                  {/* Status bar */}
                  <div className="px-5 py-2.5 border-t border-white/6 bg-black/30 flex items-center gap-2.5">
                    <Activity size={11} className="text-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-[10px] font-mono font-black tracking-widest">SYSTEM ONLINE</span>
                    <span className="ml-auto text-slate-700 text-[10px] font-mono">v2.0.26</span>
                  </div>
                </div>

                {/* Floating chips */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 -right-5 px-3.5 py-2.5 bg-violet-900/60 border border-violet-500/40 rounded-xl backdrop-blur-md shadow-lg"
                >
                  <p className="text-violet-200 text-xs font-black">LangGraph</p>
                  <p className="text-violet-400/60 text-[10px] font-mono">Multi-Agent</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                  className="absolute -bottom-5 -left-5 px-3.5 py-2.5 bg-cyan-900/60 border border-cyan-500/40 rounded-xl backdrop-blur-md shadow-lg"
                >
                  <p className="text-cyan-200 text-xs font-black">RAG Pipeline</p>
                  <p className="text-cyan-400/60 text-[10px] font-mono">Production</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute top-1/2 -right-8 px-3 py-2 bg-amber-900/50 border border-amber-500/30 rounded-xl backdrop-blur-md shadow-lg"
                >
                  <p className="text-amber-200 text-xs font-black">Six Sigma</p>
                  <p className="text-amber-400/60 text-[10px] font-mono">Black Belt</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-700 hover:text-slate-500 transition-colors cursor-default"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Scroll</span>
            <ChevronDown size={13} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <div className="relative z-10 border-y border-white/6 bg-slate-950/70 backdrop-blur-sm overflow-hidden">
        <div className="py-4 flex">
          <div className="marquee-track flex items-center gap-0 shrink-0">
            {[...TECH, ...TECH].map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-6 shrink-0">
                <span className="w-1 h-1 rounded-full bg-cyan-500/50 shrink-0" />
                <span className="text-slate-500 text-[11px] font-black uppercase tracking-[0.18em] whitespace-nowrap hover:text-cyan-400 transition-colors cursor-default">
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════ BENTO GRID ══════════════════ */}
      <section className="relative z-10 py-24 sm:py-32 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={10} /> Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-2">
              What I <span className="text-cyan-400">Build</span>
            </h2>
            <p className="text-slate-500 text-sm">Production-grade systems. No demos, no fluff.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -7, scale: 1.01 }}
                className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${cap.bg} border ${cap.border} backdrop-blur-sm group cursor-default transition-all duration-300 ${cap.glow} overflow-hidden ${cap.span}`}
              >
                {/* Dot grid texture */}
                <div className="absolute inset-0 dot-grid-pattern opacity-[0.025] pointer-events-none" />

                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/8 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <cap.icon className={cap.color} size={cap.featured ? 26 : 20} />
                </div>

                <h3 className={`font-black text-white mb-2.5 ${cap.featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
                  {cap.title}
                </h3>
                <p className={`text-slate-400 leading-relaxed mb-5 group-hover:text-slate-300 transition-colors ${cap.featured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                  {cap.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cap.tags.map(tag => (
                    <span key={tag} className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${cap.border} ${cap.color} bg-white/3`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom glow bar */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600 rounded-b-3xl"
                     style={{ background: `linear-gradient(90deg, var(--tw-gradient-from, transparent), transparent)` }} />
                <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl bg-gradient-to-r ${cap.color.includes('cyan') ? 'from-cyan-500' : cap.color.includes('amber') ? 'from-amber-500' : cap.color.includes('violet') ? 'from-violet-500' : cap.color.includes('emerald') ? 'from-emerald-500' : 'from-blue-500'} to-transparent`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PHILOSOPHY ══════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-20 sm:py-24 px-4 sm:px-8 lg:px-16 border-y border-white/6 bg-slate-950/50 backdrop-blur-sm"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.35em] font-black mb-8">Philosophy</p>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.25]">
            "I don't just build models —{' '}
            <span className="text-cyan-400">I engineer intelligent systems.</span>
            {' '}My focus: AI that is robust, scalable, and aligned with{' '}
            <span className="text-amber-400">real business goals.</span>"
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/10" />
            <span className="text-slate-500 text-xs font-bold tracking-widest uppercase">Arpan P. Nayak · AI Engineer & Business Strategist</span>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </motion.section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="relative z-10 py-28 sm:py-36 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 sm:p-16 rounded-3xl overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/8 to-violet-600/10 border border-white/10 rounded-3xl" />
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to Opportunities
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                Ready to build something{' '}
                <span className="text-cyan-400">that actually works?</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
                Whether you need a production RAG system, an AI automation pipeline, or a strategic AI roadmap — I'm the engineer who sees the full picture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="group px-8 py-4 bg-cyan-500 text-white rounded-xl font-black text-sm hover:bg-cyan-400 hover:shadow-[0_0_50px_rgba(6,182,212,0.45)] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Let's Connect
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="px-8 py-4 border border-white/12 text-white rounded-xl font-black text-sm hover:bg-white/5 hover:border-white/22 transition-all"
                >
                  Browse Projects
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
