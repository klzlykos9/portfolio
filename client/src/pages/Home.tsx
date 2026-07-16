import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Github, Linkedin, Mail, ChevronDown,
  Brain, Zap, Cpu, BarChart3, Database,
  ArrowUpRight, Sparkles, MapPin, Globe,
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
  const typed = useTypewriter(
    ['AI Engineer', 'LLM Architect', 'Business Strategist', 'Systems Thinker', 'RAG Specialist'],
    70, 2300
  );

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
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 pt-28 pb-20 overflow-hidden">

        {/* Grid lines */}
        <div className="pointer-events-none absolute inset-0 hero-grid-lines opacity-60" aria-hidden />

        {/* Glow behind name — left-anchored */}
        <div
          className="pointer-events-none absolute"
          aria-hidden
          style={{
            top: '42%', left: '18%',
            transform: 'translate(-50%, -50%)',
            width: '740px', height: '460px',
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.11) 0%, rgba(99,102,241,0.07) 50%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Two-column: left content / right decorative */}
        <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px] gap-16 lg:gap-10 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col items-start text-left">

            {/* Status badges */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="flex flex-wrap gap-2.5 mb-9"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-black text-[10px] uppercase tracking-[0.2em] glow-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Available for AI Projects
              </div>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/10 text-slate-400 font-bold text-[10px] uppercase tracking-[0.15em]">
                <MapPin size={9} className="text-slate-500" />
                India · Open to Remote
                <Globe size={9} className="text-slate-500 ml-0.5" />
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5"
            >
              <h1
                className="font-black tracking-tighter leading-none text-white whitespace-nowrap"
                style={{ fontSize: 'clamp(2.6rem, 6.8vw, 6rem)' }}
              >
                ARPAN P.&nbsp;<span className="hero-shimmer-text">NAYAK</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-9 sm:h-11 flex items-center mb-7"
            >
              <span className="text-lg sm:text-xl font-bold tracking-wide"
                style={{ color: 'hsl(185,90%,62%)' }}>
                {typed}
                <span className="inline-block w-[2px] h-5 sm:h-6 ml-1 animate-pulse align-middle"
                  style={{ background: 'hsl(185,90%,62%)' }} />
              </span>
            </motion.div>

            {/* Thin accent line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.38, duration: 0.55 }}
              className="w-20 h-px mb-7"
              style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.6), transparent)' }}
            />

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-[520px] mb-9"
            >
              I build <span className="text-white font-semibold">production-grade AI systems</span> — not demos.
              LangGraph multi-agent architectures, RAG pipelines, and Six Sigma–driven process intelligence,
              bridging <span className="text-white font-semibold">cutting-edge AI</span> with real business outcomes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <button
                onClick={() => navigate('/projects')}
                className="group px-7 py-3.5 bg-cyan-500 text-white rounded-xl font-black text-sm transition-all hover:bg-cyan-400 hover:shadow-[0_0_50px_rgba(6,182,212,0.45)] flex items-center gap-2 active:scale-95"
              >
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="group px-7 py-3.5 border border-white/12 text-white rounded-xl font-black text-sm transition-all hover:bg-white/5 hover:border-white/25 flex items-center gap-2"
              >
                About Me
                <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 sm:gap-12 mb-10"
            >
              <StatItem value={20} label="Projects"   color="text-cyan-400" />
              <div className="w-px h-9 bg-white/8" />
              <StatItem value={10} label="AI Systems" color="text-violet-400" />
              <div className="w-px h-9 bg-white/8" />
              <StatItem value={5}  label="Certs" suffix="+" color="text-amber-400" />
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.68 }}
              className="flex gap-3"
            >
              {[
                { icon: Github,   href: 'https://github.com/arpanpnayak',          label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/arpanpnayak', label: 'LinkedIn' },
                { icon: Mail,     href: 'mailto:arpanpnayak@gmail.com',            label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="p-3.5 bg-slate-900/60 rounded-xl border border-white/8 text-slate-400 hover:text-white hover:border-cyan-500/40 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-200">
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — decorative card panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Glowing identity card */}
            <div className="relative rounded-2xl border border-white/8 bg-slate-950/70 backdrop-blur-xl p-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }} />
              <p className="text-[9px] font-black uppercase tracking-[0.32em] text-slate-600 mb-4">Identity</p>
              <div className="space-y-3">
                {[
                  { label: 'Role',       value: 'AI Engineer & Strategist', color: 'text-cyan-400' },
                  { label: 'Stack',      value: 'LangChain · FastAPI · React', color: 'text-violet-400' },
                  { label: 'Cert',       value: 'Six Sigma Black Belt', color: 'text-amber-400' },
                  { label: 'Degree',     value: 'MBA — Strategy', color: 'text-emerald-400' },
                  { label: 'Location',   value: 'India · Remote-first', color: 'text-slate-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold w-16 shrink-0 pt-0.5">{label}</span>
                    <span className={`text-sm font-semibold ${color} leading-snug`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: '20+', label: 'AI Projects',   bar: 'from-cyan-500 to-blue-600' },
                { num: '10+', label: 'Prod Systems',  bar: 'from-violet-500 to-purple-600' },
                { num: '5+',  label: 'Certificates',  bar: 'from-amber-500 to-orange-500' },
                { num: '2yr', label: 'AI Experience', bar: 'from-emerald-500 to-teal-500' },
              ].map(({ num, label, bar }) => (
                <div key={label} className="rounded-xl border border-white/6 bg-slate-950/60 p-4 flex flex-col gap-1.5">
                  <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${bar} mb-1`} />
                  <div className="text-xl font-black text-white">{num}</div>
                  <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-700 hover:text-slate-500 transition-colors"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold">Scroll</span>
          <ChevronDown size={13} />
        </motion.div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <div className="relative z-10 border-y border-white/6 bg-slate-950/70 backdrop-blur-sm overflow-hidden">
        <div className="py-3.5 flex">
          <div className="marquee-track flex items-center gap-0 shrink-0">
            {[...TECH, ...TECH].map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-6 shrink-0">
                <span className="w-1 h-1 rounded-full bg-cyan-500/50 shrink-0" />
                <span className="text-slate-500 text-[11px] font-black uppercase tracking-[0.18em] whitespace-nowrap hover:text-cyan-400 transition-colors">
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════ ABOUT / INFO ══════════════════ */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Profile</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* ── Two-column profile ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 mb-20">

            {/* Left: identity */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-500 mb-4">Who I Am</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.05] mb-6">
                AI Engineer &amp;<br />
                <span style={{
                  background: 'linear-gradient(90deg,#22d3ee,#818cf8)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Business Strategist
                </span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-lg">
                I'm <span className="text-white font-semibold">Arpan P. Nayak</span> — an AI engineer who bridges
                deep technical capability with business-level thinking. I build systems
                that don't just work in notebooks; they ship to production, scale under load,
                and drive measurable outcomes.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                Six Sigma Black Belt · MBA Strategy · LangGraph · RAG · FastAPI.
                Based in India, open to remote work and international collaborations.
              </p>

              {/* Horizontal fact pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  { label: '📍 India',              dim: false },
                  { label: '🌐 Open to Remote',     dim: false },
                  { label: '⚡ Available Now',       dim: false },
                  { label: '🎓 Six Sigma Black Belt', dim: true },
                  { label: '🤖 LLM Specialist',      dim: true },
                ].map(({ label, dim }) => (
                  <span key={label}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      dim
                        ? 'bg-white/3 border-white/8 text-slate-500 hover:text-slate-300 hover:border-white/15'
                        : 'bg-cyan-500/8 border-cyan-500/20 text-cyan-400'
                    }`}>
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: stats card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-px rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(6,182,212,0.18),rgba(139,92,246,0.12),transparent)', borderRadius: '1rem' }} />
              <div className="relative rounded-2xl border border-white/8 bg-slate-950/80 backdrop-blur-xl p-7 space-y-0">
                {[
                  { num: '20+', label: 'AI projects shipped',          color: 'text-cyan-400',   bar: 'bg-cyan-500' },
                  { num: '10+', label: 'Production AI systems built',  color: 'text-violet-400', bar: 'bg-violet-500' },
                  { num: '5+',  label: 'Certifications earned',        color: 'text-amber-400',  bar: 'bg-amber-500' },
                  { num: '2yrs',label: 'AI engineering experience',    color: 'text-emerald-400',bar: 'bg-emerald-500' },
                ].map(({ num, label, color, bar }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18 + i * 0.09 }}
                    className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                  >
                    <div className={`w-1 h-8 rounded-full ${bar} opacity-70 shrink-0`} />
                    <div>
                      <div className={`text-2xl font-black ${color} leading-none`}>{num}</div>
                      <div className="text-slate-500 text-xs mt-0.5 font-medium">{label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Capabilities grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-600 mb-3">What I Build</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              Core <span className="text-cyan-400">Capabilities</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className={`group relative rounded-2xl border border-white/6 bg-gradient-to-br ${cap.bg} backdrop-blur-sm overflow-hidden transition-all duration-300 ${cap.glow} ${cap.span}`}
              >
                {/* Animated left accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 group-hover:opacity-100 opacity-40 ${
                  cap.color.includes('cyan')    ? 'bg-cyan-500'    :
                  cap.color.includes('amber')   ? 'bg-amber-500'   :
                  cap.color.includes('violet')  ? 'bg-violet-500'  :
                  cap.color.includes('emerald') ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />

                <div className="p-6 sm:p-7 pl-8">
                  {/* Icon row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`inline-flex p-2.5 rounded-xl border ${cap.border} bg-white/4 group-hover:scale-110 transition-transform duration-300`}>
                      <cap.icon className={cap.color} size={cap.featured ? 22 : 18} />
                    </div>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest mt-1">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className={`font-black text-white tracking-tight mb-2 ${cap.featured ? 'text-lg sm:text-xl' : 'text-base sm:text-[17px]'}`}>
                    {cap.title}
                  </h3>
                  <p className={`text-slate-500 leading-relaxed mb-5 group-hover:text-slate-400 transition-colors ${cap.featured ? 'text-sm' : 'text-xs sm:text-[13px]'}`}>
                    {cap.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {cap.tags.map(tag => (
                      <span key={tag}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${cap.border} ${cap.color} bg-white/3`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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
        className="relative z-10 py-20 sm:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700 mb-10">Philosophy</p>
          <blockquote className="text-2xl sm:text-3xl lg:text-[2.6rem] font-black text-white tracking-tight leading-[1.2]">
            "I don't just build models —{' '}
            <span className="text-cyan-400">I engineer intelligent systems.</span>
            {' '}AI that is robust, scalable, and aligned with{' '}
            <span className="text-amber-400">real business goals.</span>"
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/15" />
            <span className="text-slate-600 text-[10px] font-bold tracking-[0.2em] uppercase">Arpan P. Nayak</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/15" />
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
