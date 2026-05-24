import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit, Code2, Database, GitBranch, Cloud, ChevronDown,
  Map, Zap, CheckCircle2, Lock, FlaskConical, Cpu, Network,
  Bot, Layers, Rocket, BookOpen, BarChart3, Users, Globe
} from 'lucide-react';
import Footer from '../components/Footer';

/* ─────────────────────────── DATA ─────────────────────────── */

const prerequisites = [
  {
    id: 'prog', icon: Code2, color: 'cyan', label: 'Programming',
    topics: ['Python basics', 'Variables & Data types', 'Loops & Functions', 'OOP', 'Error handling', 'File handling', 'APIs & JSON'],
  },
  {
    id: 'math', icon: BrainCircuit, color: 'cyan', label: 'Mathematics',
    topics: ['Linear Algebra', 'Matrices & Vectors', 'Probability & Statistics', 'Mean / Variance / Std Dev', 'Calculus basics', 'Gradient concepts'],
  },
  {
    id: 'data', icon: Database, color: 'cyan', label: 'Data Handling',
    topics: ['NumPy & Pandas', 'Data cleaning', 'Data preprocessing', 'Data visualization', 'Exploratory Data Analysis'],
  },
  {
    id: 'db', icon: Database, color: 'cyan', label: 'Databases',
    topics: ['SQL basics', 'Joins & Aggregation', 'Database concepts'],
  },
  {
    id: 'tools', icon: GitBranch, color: 'cyan', label: 'Dev Tools',
    topics: ['Git & GitHub', 'VS Code', 'Jupyter Notebook'],
  },
  {
    id: 'deploy', icon: Cloud, color: 'cyan', label: 'Deployment Basics',
    topics: ['REST APIs', 'FastAPI', 'Docker basics', 'Cloud fundamentals', 'AWS basics'],
  },
];

const tracks = [
  {
    id: 'ml',
    title: 'ML Engineer',
    subtitle: 'Machine Learning Engineer Path',
    desc: 'Focus on predictive systems, model building, training, deployment, and MLOps.',
    color: 'blue',
    colorClass: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/40',
      badge: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
      line: 'bg-blue-500/40',
      glow: 'shadow-blue-500/20',
      gradient: 'from-blue-400 to-indigo-500',
      dot: 'bg-blue-400',
      nodeBg: 'bg-blue-500/8',
      nodeBorder: 'border-blue-500/25',
      hoverBorder: 'hover:border-blue-400/50',
      activeNode: 'bg-blue-500/20 border-blue-400/60',
    },
    icon: BarChart3,
    phases: [
      {
        id: 'ml-1', phase: 1, title: 'ML Fundamentals', icon: Layers,
        topics: ['Supervised learning', 'Unsupervised learning', 'Classification & Regression', 'Clustering', 'Feature engineering', 'Data preprocessing', 'Evaluation metrics'],
      },
      {
        id: 'ml-2', phase: 2, title: 'ML Algorithms', icon: BrainCircuit,
        topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'KNN & SVM', 'Ensemble learning'],
      },
      {
        id: 'ml-3', phase: 3, title: 'Deep Learning', icon: Network,
        topics: ['Neural Networks', 'Backpropagation', 'Activation functions', 'CNN', 'RNN', 'Transfer learning'],
      },
      {
        id: 'ml-4', phase: 4, title: 'MLOps', icon: Rocket,
        topics: ['Model deployment', 'Model monitoring', 'ML pipelines', 'CI/CD for ML', 'ML lifecycle management'],
      },
      {
        id: 'ml-5', phase: 5, title: 'Projects', icon: FlaskConical,
        topics: ['House price prediction', 'Recommendation system', 'Fraud detection', 'Customer churn prediction', 'Image classifier'],
        isProject: true,
      },
    ],
    outcomes: ['ML pipelines', 'Model deployment', 'Production systems'],
  },
  {
    id: 'llm',
    title: 'LLM Engineer',
    subtitle: 'LLM Engineer Path',
    desc: 'Focus on building language AI systems and generative AI applications.',
    color: 'purple',
    colorClass: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/40',
      badge: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
      line: 'bg-purple-500/40',
      glow: 'shadow-purple-500/20',
      gradient: 'from-purple-400 to-violet-600',
      dot: 'bg-purple-400',
      nodeBg: 'bg-purple-500/8',
      nodeBorder: 'border-purple-500/25',
      hoverBorder: 'hover:border-purple-400/50',
      activeNode: 'bg-purple-500/20 border-purple-400/60',
    },
    icon: Bot,
    phases: [
      {
        id: 'llm-1', phase: 1, title: 'NLP Fundamentals', icon: BookOpen,
        topics: ['Text preprocessing', 'Tokenization', 'Embeddings', 'Word vectors', 'Attention concepts'],
      },
      {
        id: 'llm-2', phase: 2, title: 'Transformers', icon: Network,
        topics: ['Encoder & Decoder', 'Self-attention', 'Positional encoding', 'Token generation'],
      },
      {
        id: 'llm-3', phase: 3, title: 'LLM Development', icon: BrainCircuit,
        topics: ['Prompt engineering', 'Context windows', 'Hallucination concepts', 'Fine-tuning', 'LoRA & QLoRA'],
      },
      {
        id: 'llm-4', phase: 4, title: 'RAG Systems', icon: Database,
        topics: ['Embeddings', 'Vector databases', 'Retrieval systems', 'Chunking strategies', 'Semantic search'],
      },
      {
        id: 'llm-5', phase: 5, title: 'AI Agents', icon: Cpu,
        topics: ['Tool calling', 'Multi-agent workflows', 'Agent memory', 'Planning systems'],
      },
      {
        id: 'llm-6', phase: 6, title: 'Projects', icon: FlaskConical,
        topics: ['Chat with PDF', 'AI assistant', 'Knowledge chatbot', 'Document search system', 'AI agent workflow'],
        isProject: true,
      },
    ],
    outcomes: ['Production LLM systems', 'RAG pipelines', 'AI assistants'],
  },
  {
    id: 'ai',
    title: 'AI Engineer',
    subtitle: 'AI Engineer Path',
    desc: 'Build complete AI products combining ML, LLMs, APIs, cloud, and deployment.',
    color: 'emerald',
    colorClass: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
      line: 'bg-emerald-500/40',
      glow: 'shadow-emerald-500/20',
      gradient: 'from-emerald-400 to-green-500',
      dot: 'bg-emerald-400',
      nodeBg: 'bg-emerald-500/8',
      nodeBorder: 'border-emerald-500/25',
      hoverBorder: 'hover:border-emerald-400/50',
      activeNode: 'bg-emerald-500/20 border-emerald-400/60',
    },
    icon: Globe,
    phases: [
      {
        id: 'ai-1', phase: 1, title: 'AI Foundations', icon: Layers,
        topics: ['ML basics', 'Deep learning basics', 'NLP basics', 'Computer vision basics'],
      },
      {
        id: 'ai-2', phase: 2, title: 'System Building', icon: Code2,
        topics: ['API integration', 'Backend services', 'Databases', 'Event-driven systems'],
      },
      {
        id: 'ai-3', phase: 3, title: 'AI Infrastructure', icon: Cloud,
        topics: ['Docker & Kubernetes', 'AWS & Cloud deployment', 'Monitoring & observability'],
      },
      {
        id: 'ai-4', phase: 4, title: 'Advanced AI', icon: BrainCircuit,
        topics: ['Agents', 'Multimodal AI', 'Computer vision', 'Voice AI', 'Automation systems'],
      },
      {
        id: 'ai-5', phase: 5, title: 'Projects', icon: FlaskConical,
        topics: ['AI customer support system', 'AI voice assistant', 'AI workflow automation', 'Recommendation engine', 'End-to-end AI SaaS app'],
        isProject: true,
      },
    ],
    outcomes: ['Production AI applications', 'Full AI systems', 'Scalable deployment'],
  },
];

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

interface PrereqNodeProps {
  item: typeof prerequisites[0];
  index: number;
}

const PrereqNode: React.FC<PrereqNodeProps> = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left rounded-2xl border transition-all duration-300 group ${
          open
            ? 'bg-cyan-500/15 border-cyan-400/60 shadow-lg shadow-cyan-500/10'
            : 'bg-slate-800/60 border-slate-700/60 hover:border-cyan-500/40 hover:bg-slate-800/80'
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
            open ? 'bg-cyan-500/30 text-cyan-300' : 'bg-slate-700/80 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400'
          }`}>
            <Icon size={16} />
          </div>
          <span className={`font-black text-sm transition-colors ${open ? 'text-cyan-300' : 'text-slate-200'}`}>
            {item.label}
          </span>
          <ChevronDown size={14} className={`ml-auto text-slate-500 transition-transform duration-300 ${open ? 'rotate-180 text-cyan-400' : ''}`} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-0 flex flex-wrap gap-1.5">
                {item.topics.map((t, i) => (
                  <span key={i} className="text-[11px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 rounded-lg px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

interface PhaseNodeProps {
  phase: typeof tracks[0]['phases'][0];
  colorClass: typeof tracks[0]['colorClass'];
  index: number;
  isLast: boolean;
}

const PhaseNode: React.FC<PhaseNodeProps> = ({ phase, colorClass, index, isLast }) => {
  const [open, setOpen] = useState(false);
  const Icon = phase.icon;

  return (
    <div className="relative flex flex-col items-center">
      {/* Vertical connector line coming into this node */}
      <div className={`w-px h-6 ${colorClass.line} flex-shrink-0`} />

      {/* Node dot connector */}
      <div className={`w-3 h-3 rounded-full border-2 ${colorClass.dot} border-slate-900 flex-shrink-0 z-10 relative ${
        phase.isProject ? 'ring-2 ring-offset-1 ring-offset-slate-900' : ''
      } ${phase.isProject ? `ring-${colorClass.dot.split('-')[1]}-400/50` : ''}`} />

      {/* Connector line below dot */}
      <div className={`w-px h-4 ${colorClass.line} flex-shrink-0`} />

      {/* Node card */}
      <div className="w-full">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full text-left rounded-2xl border transition-all duration-300 group ${
            open
              ? `${colorClass.activeNode} shadow-lg ${colorClass.glow}`
              : `bg-slate-800/60 ${colorClass.nodeBorder} ${colorClass.hoverBorder} hover:bg-slate-800/80`
          }`}
        >
          <div className="flex items-center gap-3 p-3.5">
            {/* Phase badge */}
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 border transition-all duration-300 ${
              open ? `${colorClass.bg} ${colorClass.text} ${colorClass.border}` : 'bg-slate-700/80 text-slate-400 border-slate-600/60'
            }`}>
              {phase.phase}
            </div>

            <div className="flex-1 min-w-0">
              <div className={`font-black text-xs sm:text-sm leading-tight transition-colors ${
                open ? colorClass.text : 'text-slate-200'
              }`}>
                {phase.title}
              </div>
              {phase.isProject && (
                <div className="text-[10px] text-slate-500 mt-0.5">Capstone Projects</div>
              )}
            </div>

            <Icon size={14} className={`shrink-0 transition-colors ${open ? colorClass.text : 'text-slate-500'}`} />
            <ChevronDown size={12} className={`shrink-0 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-3.5 pb-4 flex flex-col gap-1.5">
                  <div className={`h-px ${colorClass.line} mb-1`} />
                  {phase.topics.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full shrink-0 ${colorClass.dot}`} />
                      <span className="text-[11px] text-slate-300">{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Bottom connector if not last */}
      {!isLast && (
        <div className={`w-px h-3 ${colorClass.line} flex-shrink-0`} />
      )}
    </div>
  );
};

/* ─────────────────────────── PAGE ─────────────────────────── */

const Roadmap: React.FC = () => {
  const [expandAll, setExpandAll] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16 overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-500/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-emerald-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
            <Map size={12} /> KLZ Journey
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
            AI Engineer <span className="text-cyan-400">Roadmap</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6" />
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            A structured path from prerequisites to specialization — choose your track and progress through each phase.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 1 — PREREQUISITES                       */}
        {/* ═══════════════════════════════════════════════ */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-0"
        >
          {/* Prerequisites header node */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl mx-auto">
              <div className="rounded-3xl border border-cyan-500/40 bg-cyan-500/8 p-6 sm:p-8 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <BookOpen size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-1">
                      Section 1 · Start Here
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">Foundations Before Specialization</h2>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  Mandatory concepts and tools required before choosing ML Engineer, LLM Engineer, or AI Engineer tracks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {prerequisites.map((item, i) => (
                    <PrereqNode key={item.id} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Branch connector: line down ── */}
            <div className="flex flex-col items-center my-1">
              <div className="w-px h-8 bg-gradient-to-b from-cyan-500/60 to-slate-600/40" />
              <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-lg shadow-cyan-500/50" />
              <div className="w-px h-4 bg-slate-600/40" />
            </div>

            {/* ── "Choose your path" label ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-0"
            >
              <div className="h-px w-16 sm:w-32 bg-gradient-to-l from-slate-600/60 to-transparent" />
              <div className="px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-400 text-xs font-black uppercase tracking-widest whitespace-nowrap">
                Choose Your Specialization
              </div>
              <div className="h-px w-16 sm:w-32 bg-gradient-to-r from-slate-600/60 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Horizontal branch lines into 3 tracks ── */}
        <div className="flex justify-center mb-0">
          <div className="w-full max-w-6xl relative">
            {/* The horizontal bar */}
            <div className="flex items-start justify-between px-[16.5%] sm:px-[16%] lg:px-[16.5%]">
              <div className="flex flex-col items-center">
                <div className="w-px h-5 bg-blue-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-slate-900" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-5 bg-purple-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-slate-900" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-5 bg-emerald-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
            </div>
            {/* The horizontal line connecting all three */}
            <div className="absolute top-0 left-[16.5%] sm:left-[16%] lg:left-[16.5%] right-[16.5%] sm:right-[16%] lg:right-[16.5%] h-px bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-emerald-500/40" />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTIONS 2, 3, 4 — THREE CAREER TRACKS          */}
        {/* ═══════════════════════════════════════════════ */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mt-1">
          {tracks.map((track, ti) => {
            const TrackIcon = track.icon;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ti * 0.12, duration: 0.5 }}
                className="flex flex-col"
              >
                {/* Track header card */}
                <div className={`rounded-3xl border ${track.colorClass.border} ${track.colorClass.bg} p-5 sm:p-6 backdrop-blur-sm shadow-lg ${track.colorClass.glow} mb-0`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${track.colorClass.gradient} flex items-center justify-center shadow-lg`}>
                      <TrackIcon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border mb-1 ${track.colorClass.badge}`}>
                        Section {ti + 2}
                      </div>
                      <h2 className={`text-lg font-black ${track.colorClass.text}`}>{track.title}</h2>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{track.desc}</p>
                  {/* Outcome pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {track.outcomes.map((o, i) => (
                      <span key={i} className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${track.colorClass.badge}`}>
                        {o}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Phase nodes — vertical graph */}
                <div className="flex flex-col items-center px-3 pt-0">
                  {track.phases.map((phase, pi) => (
                    <div key={phase.id} className="w-full">
                      <PhaseNode
                        phase={phase}
                        colorClass={track.colorClass}
                        index={pi}
                        isLast={pi === track.phases.length - 1}
                      />
                    </div>
                  ))}

                  {/* Terminal node — outcome */}
                  <div className={`w-px h-5 ${track.colorClass.line}`} />
                  <div className={`w-full rounded-2xl border ${track.colorClass.border} ${track.colorClass.bg} p-3 text-center`}>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${track.colorClass.text} mb-0.5`}>
                      Job Ready
                    </div>
                    <div className="text-white font-black text-sm">{track.title}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Legend ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { color: 'border-blue-500/40 bg-blue-500/8', dot: 'bg-blue-400', label: 'ML Engineer', desc: 'Predictive systems & model deployment' },
            { color: 'border-purple-500/40 bg-purple-500/8', dot: 'bg-purple-400', label: 'LLM Engineer', desc: 'Language AI & generative applications' },
            { color: 'border-emerald-500/40 bg-emerald-500/8', dot: 'bg-emerald-400', label: 'AI Engineer', desc: 'Complete AI products at scale' },
          ].map((item, i) => (
            <div key={i} className={`rounded-2xl border ${item.color} p-4 flex items-center gap-3`}>
              <div className={`w-3 h-3 rounded-full ${item.dot} shrink-0`} />
              <div>
                <div className="text-white font-black text-sm">{item.label}</div>
                <div className="text-slate-500 text-xs">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      <Footer />
    </div>
  );
};

export default Roadmap;
