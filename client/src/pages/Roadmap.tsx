import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap, Briefcase, Award, Brain, Code2, Rocket,
  TrendingUp, Building2, BookOpen, Zap, Star, ChevronDown,
  ChevronUp, MapPin, Calendar, CheckCircle2, Sparkles,
  Database, Network, Bot, BarChart3, Users, Globe,
  FlaskConical, Cpu, ArrowRight,
} from 'lucide-react';
import Footer from '../components/Footer';

/* ─────────────────────────── TYPES ─────────────────────────── */

type Category = 'academic' | 'career' | 'certification' | 'ai-learning' | 'ai-project' | 'current';

interface Milestone {
  id: string;
  year: string;
  period: string;
  category: Category;
  icon: React.ElementType;
  title: string;
  org: string;
  location?: string;
  description: string;
  highlights: string[];
  skills: string[];
  badge?: string;
}

/* ─────────────────────────── PALETTE ─────────────────────────── */

const CAT_STYLE: Record<Category, {
  border: string; bg: string; text: string; dot: string;
  badge: string; label: string; iconBg: string; glow: string; line: string;
}> = {
  academic: {
    label: 'Academic', text: 'text-blue-400', border: 'border-blue-500/30',
    bg: 'from-blue-500/8 to-blue-600/4', dot: 'bg-blue-400',
    badge: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    iconBg: 'bg-blue-500/20 border-blue-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
    line: 'bg-blue-500/40',
  },
  career: {
    label: 'Career', text: 'text-amber-400', border: 'border-amber-500/30',
    bg: 'from-amber-500/8 to-amber-600/4', dot: 'bg-amber-400',
    badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    iconBg: 'bg-amber-500/20 border-amber-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]',
    line: 'bg-amber-500/40',
  },
  certification: {
    label: 'Certification', text: 'text-emerald-400', border: 'border-emerald-500/30',
    bg: 'from-emerald-500/8 to-emerald-600/4', dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    iconBg: 'bg-emerald-500/20 border-emerald-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]',
    line: 'bg-emerald-500/40',
  },
  'ai-learning': {
    label: 'AI Learning', text: 'text-violet-400', border: 'border-violet-500/30',
    bg: 'from-violet-500/8 to-violet-600/4', dot: 'bg-violet-400',
    badge: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
    iconBg: 'bg-violet-500/20 border-violet-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    line: 'bg-violet-500/40',
  },
  'ai-project': {
    label: 'AI Projects', text: 'text-cyan-400', border: 'border-cyan-500/30',
    bg: 'from-cyan-500/8 to-cyan-600/4', dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
    iconBg: 'bg-cyan-500/20 border-cyan-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]',
    line: 'bg-cyan-500/40',
  },
  current: {
    label: 'Present', text: 'text-rose-400', border: 'border-rose-500/30',
    bg: 'from-rose-500/8 to-rose-600/4', dot: 'bg-rose-400',
    badge: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
    iconBg: 'bg-rose-500/20 border-rose-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.18)]',
    line: 'bg-rose-500/40',
  },
};

/* ─────────────────────────── MILESTONES DATA ─────────────────────────── */

const milestones: Milestone[] = [
  /* ── 1 — BSc ── */
  {
    id: 'bsc',
    year: '~2010',
    period: 'Undergraduate Years',
    category: 'academic',
    icon: GraduationCap,
    title: 'B.Sc. Mathematics (Hons)',
    org: 'University — Odisha, India',
    description:
      'Completed Bachelor of Science with Mathematics as Honours subject, Physics as major, and Chemistry as minor. Graduated First Class with Distinction — building a rigorous quantitative foundation.',
    highlights: [
      'First Class with Distinction',
      'Mathematics (Hons) · Physics · Chemistry',
      'Strong grounding in applied & pure mathematics',
    ],
    skills: ['Linear Algebra', 'Calculus', 'Probability', 'Statistics', 'Physics', 'Analytical Thinking'],
  },

  /* ── 2 — PGDCA ── */
  {
    id: 'pgdca',
    year: '2014',
    period: 'Early 2014',
    category: 'academic',
    icon: BookOpen,
    title: 'PGDCA — Post Graduate Diploma in Computer Applications',
    org: 'Institute of Computer Education, India',
    description:
      'Post-graduate computer science diploma bridging mathematics into computing. Gained foundational programming and business software skills that enabled the pivot into corporate roles.',
    highlights: [
      'Computer applications & programming fundamentals',
      'C# programming language',
      'Tally ERP for accounting & finance',
      'Microsoft Office Suite — professional productivity',
    ],
    skills: ['C#', 'Tally ERP', 'Microsoft Office', 'Computer Applications', 'Programming Fundamentals'],
  },

  /* ── 3 — Sachin Enterprises ── */
  {
    id: 'sachin',
    year: '2014',
    period: 'Jan 2014 – Apr 2014',
    category: 'career',
    icon: Building2,
    title: 'Accountant',
    org: 'Sachin Enterprises',
    location: 'Bhubaneswar, India',
    badge: '4 months',
    description:
      'First professional role applying PGDCA knowledge directly — managing financial records, billing operations, and accounts using Tally ERP in a real business environment.',
    highlights: [
      'Managed day-to-day financial records and ledgers',
      'Processed billing and invoicing using Tally ERP',
      'Applied PGDCA skills in a live commercial context',
    ],
    skills: ['Tally ERP', 'Financial Management', 'Accounting', 'Billing', 'Record Keeping'],
  },

  /* ── 4 — Shinux ── */
  {
    id: 'shinux',
    year: '2014',
    period: 'May 2014 – Mar 2015',
    category: 'career',
    icon: Users,
    title: 'Customer Service Representative',
    org: 'Shinux.com',
    location: 'Bhubaneswar, India',
    badge: '11 months',
    description:
      'Transitioned from finance into technology-adjacent sales — qualifying international leads, managing client portfolios, and optimising the sales funnel. First exposure to B2B commercial operations.',
    highlights: [
      'International lead qualification and pipeline management',
      'Client portfolio management and retention',
      'Sales process optimisation and CRM workflows',
      'Cross-functional collaboration with tech & operations teams',
    ],
    skills: ['Lead Qualification', 'Client Management', 'Sales Ops', 'CRM', 'B2B Communication'],
  },

  /* ── 5 — INSPiREEZ ── */
  {
    id: 'inspreez',
    year: '2015',
    period: 'Apr 2015 – Sep 2017',
    category: 'career',
    icon: TrendingUp,
    title: 'Sales Team Lead',
    org: 'THE INSPiREEZ IT SOLUTION',
    location: 'Bhubaneswar, India',
    badge: '2 yrs 6 mos',
    description:
      'Led international sales operations at a tech company — managing outbound VoIP campaigns targeting US/UK markets, providing remote technical troubleshooting, and growing a sales team. Developed leadership and cross-cultural communication at scale.',
    highlights: [
      'Led international outbound VoIP campaigns (US / UK markets)',
      'Remote technical troubleshooting for enterprise clients',
      'Team leadership — trained and mentored junior reps',
      'Drove revenue growth through structured sales processes',
      'First exposure to technology-sector operations at scale',
    ],
    skills: ['Team Leadership', 'International Sales', 'VoIP Operations', 'Remote Tech Support', 'Sales Strategy', 'B2B Enterprise'],
  },

  /* ── 6 — MBA ── */
  {
    id: 'mba',
    year: '~2018',
    period: '2018 – 2020',
    category: 'academic',
    icon: GraduationCap,
    title: 'MBA — International Business',
    org: 'Lovely Professional University',
    location: 'Punjab, India',
    description:
      'Pursued MBA to formalise business strategy and data-driven decision-making skills gained in the field. Specialised in international business, predictive analytics, and supply chain operations. Capstone research explored digital consumer behaviour.',
    highlights: [
      'Specialisation: International Business & Data-Driven Strategy',
      'Capstone: "Effect of online marketing in today\'s business environment"',
      'Research: "Consumer intention to adopt online pharmacies"',
      'Subjects: Supply Chain · Finance · Operations · Marketing Analytics',
    ],
    skills: ['International Business', 'Business Strategy', 'Supply Chain', 'Predictive Analytics', 'Marketing', 'Operations Management', 'Research'],
  },

  /* ── 7 — Python Cert ── */
  {
    id: 'python-cert',
    year: '2020',
    period: 'Post-MBA · 2020',
    category: 'certification',
    icon: Code2,
    title: 'Certified Python Business Analyst',
    org: 'Henry Harvin Education',
    description:
      'First formal step into data and programming post-MBA. Combined MBA business thinking with Python for data analytics — marking the strategic decision to pivot toward data and eventually AI.',
    highlights: [
      'Python programming for business analytics',
      'Data analysis workflows and reporting',
      'Bridging MBA strategy with data-driven tools',
      'Signal: the beginning of the tech pivot',
    ],
    skills: ['Python', 'Data Analytics', 'Business Analytics', 'Pandas', 'Excel Automation'],
  },

  /* ── 8 — Green Belt ── */
  {
    id: 'green-belt',
    year: '2021',
    period: '2021',
    category: 'certification',
    icon: Award,
    title: 'Lean Six Sigma Green Belt',
    org: 'Henry Harvin Education',
    description:
      'Earned Six Sigma Green Belt certification — applying DMAIC methodology to real business quality challenges. Strengthened process engineering and statistical thinking foundational to later AI systems work.',
    highlights: [
      'DMAIC methodology — Define · Measure · Analyse · Improve · Control',
      'Statistical analysis and root cause identification',
      'Quality management frameworks',
      'SOP creation and process documentation',
    ],
    skills: ['DMAIC', 'Six Sigma', 'Statistical Analysis', 'Root Cause Analysis', 'Quality Management', 'Process Optimisation', 'Minitab'],
  },

  /* ── 9 — Black Belt ── */
  {
    id: 'black-belt',
    year: '2022',
    period: 'Jul 2022 – Oct 2022',
    category: 'certification',
    icon: Star,
    title: 'Lean Six Sigma Black Belt + Industry Internships',
    org: 'Henry Harvin Education',
    description:
      'Advanced to Black Belt level — the highest Six Sigma practitioner tier. Combined with two back-to-back industry internships (Green Belt + Black Belt simulations) applying DMAIC at organisational scale and leading cross-functional improvement projects.',
    highlights: [
      'Green Belt Internship: Jul – Aug 2022 (DMAIC for process quality)',
      'Black Belt Internship: Sep – Oct 2022 (operational excellence leadership)',
      'Led end-to-end process optimisation projects',
      'Cross-functional team collaboration & change management',
      'Data-driven reports and action plans for sustained process gains',
    ],
    skills: ['Six Sigma Black Belt', 'DMAIC Advanced', 'Process Engineering', 'Change Management', 'Operational Excellence', 'Statistical Tools'],
  },

  /* ── 10 — AI Pivot ── */
  {
    id: 'ai-pivot',
    year: '2022',
    period: 'Late 2022 – 2023',
    category: 'ai-learning',
    icon: Brain,
    title: 'The AI Pivot — Machine Learning & Deep Learning',
    org: 'Self-Directed Learning',
    description:
      'Made the deliberate strategic decision to pivot full-time into AI — drawing on a unique blend of mathematics (BSc), business strategy (MBA), and process engineering (Six Sigma). Started with ML fundamentals, neural networks, and data science.',
    highlights: [
      'Machine Learning fundamentals: supervised, unsupervised, reinforcement',
      'Deep Learning: CNNs, RNNs, neural network architecture',
      'Python scientific stack: NumPy · Pandas · Scikit-learn',
      'TensorFlow & PyTorch for model building and training',
      'Computer Vision: OpenCV, image classification, YOLO',
      'NLP basics: tokenisation, embeddings, text pipelines',
    ],
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLP', 'NumPy', 'Pandas'],
  },

  /* ── 11 — GenAI ── */
  {
    id: 'genai',
    year: '2023',
    period: '2023 – Early 2024',
    category: 'ai-learning',
    icon: Sparkles,
    title: 'Generative AI — LangChain · RAG · LLMs',
    org: 'Deep Dive: GenAI Engineering',
    description:
      'Entered the Generative AI era — mastering the full LLM application stack. Built expertise in RAG architectures, vector databases, prompt engineering, and LangChain orchestration. First production AI projects shipped in this phase.',
    highlights: [
      'LangChain — chains, agents, tools, memory, callbacks',
      'RAG (Retrieval-Augmented Generation) from scratch to production',
      'Vector databases: FAISS, ChromaDB, Pinecone',
      'Prompt engineering and context window management',
      'Embeddings, semantic search, and chunking strategies',
      'OpenAI API integration and LLM orchestration',
      'FastAPI backends for AI services',
      'Streamlit for rapid AI prototyping',
    ],
    skills: ['LangChain', 'RAG', 'OpenAI API', 'FAISS', 'ChromaDB', 'Prompt Engineering', 'Embeddings', 'FastAPI', 'Streamlit', 'Vector Databases'],
  },

  /* ── 12 — LangGraph + Agents ── */
  {
    id: 'langgraph',
    year: '2024',
    period: '2024 – 2025',
    category: 'ai-learning',
    icon: Network,
    title: 'Advanced AI Engineering — LangGraph · Multi-Agent Systems',
    org: 'Production AI Systems',
    description:
      'Levelled up to advanced AI architecture — mastering stateful multi-agent systems with LangGraph, MCP protocol for tool orchestration, AI automation with n8n, and LangSmith for observability. Building production-grade systems, not demos.',
    highlights: [
      'LangGraph — stateful graphs, node routing, conditional edges, multi-agent workflows',
      'MCP (Model Context Protocol) — tool calling and agent-to-tool interfaces',
      'LangSmith — tracing, evaluation, and observability for LLM systems',
      'n8n — intelligent workflow automation and zero-touch pipelines',
      'Multi-modal AI: CLIP, image understanding, cross-modal retrieval',
      'Docker containerisation and cloud deployment of AI services',
      'PostgreSQL + vector extensions for hybrid search',
    ],
    skills: ['LangGraph', 'MCP', 'LangSmith', 'n8n', 'Multi-Agent', 'Docker', 'PostgreSQL', 'CLIP', 'Multimodal AI', 'MLOps'],
  },

  /* ── 13 — Projects ── */
  {
    id: 'projects',
    year: '2024',
    period: '2024 – 2025',
    category: 'ai-project',
    icon: Rocket,
    title: '20+ Production AI Systems Deployed',
    org: 'Independent AI Engineering',
    description:
      'Translated accumulated skills into a portfolio of real, deployed AI systems. Every project applies the full stack: LLM orchestration → RAG pipeline → backend API → automation. Business strategy knowledge from MBA shapes each system\'s design for real-world utility.',
    highlights: [
      'Medical AI — Symptom analysis and drug interaction intelligence systems',
      'RAG Chatbots — Multi-document AI assistants with semantic retrieval',
      'Computer Vision — Medical imaging and multi-modal analysis pipelines',
      'AI Automation — n8n workflow agents replacing manual business processes',
      'Sales Intelligence — Lead scoring and CRM-integrated AI copilots',
      'Knowledge Graphs — Entity extraction and intelligent document search',
      'LangGraph Agents — Stateful multi-step reasoning systems',
      'FastAPI AI Services — Scalable REST APIs for AI workloads',
    ],
    skills: ['System Architecture', 'RAG Pipelines', 'LangGraph Agents', 'FastAPI', 'n8n', 'Production Deployment', 'Technical Leadership'],
  },

  /* ── 14 — Forage ── */
  {
    id: 'forage',
    year: '2026',
    period: 'July 2026',
    category: 'certification',
    icon: FlaskConical,
    title: 'Industry Job Simulations — Deloitte & Tata Group',
    org: 'Forage Platform',
    description:
      'Completed two prestigious industry simulations on the Forage platform — one with Deloitte and one with Tata Group — validating forensic data analytics and GenAI-driven analytics capabilities against real enterprise standards.',
    highlights: [
      'Deloitte: Data Analytics Job Simulation — Forensic technology and data investigation workflows',
      'Tata Group: GenAI Powered Data Analytics Simulation — GenAI analytics pipeline and risk profiling',
      'Industry-validated analytical skills at Big 4 and Fortune 500 standard',
    ],
    skills: ['Forensic Data Analytics', 'GenAI Analytics', 'Risk Profiling', 'Data Investigation', 'Enterprise Analytics'],
    badge: 'Deloitte + Tata Group',
  },

  /* ── 15 — Now ── */
  {
    id: 'now',
    year: '2026',
    period: 'Present · 2026',
    category: 'current',
    icon: Zap,
    title: 'AI Engineer & Business Strategist — Full Stack',
    org: 'Open to Opportunities',
    description:
      'Today Arpan is a production-grade AI Engineer with an uncommon combination: mathematical rigour (BSc), strategic thinking (MBA), process engineering (Six Sigma Black Belt), and deep GenAI engineering (LangChain · LangGraph · RAG · Agents). The complete profile.',
    highlights: [
      '20+ AI systems shipped — from RAG chatbots to multi-agent orchestration',
      'Bridges business strategy with cutting-edge AI engineering',
      'Six Sigma Black Belt process thinking applied to AI system design',
      'MBA-level understanding of commercial and operational contexts',
      'Ready for AI Engineer · LLM Engineer · AI Product · AI Strategy roles',
    ],
    skills: ['LangChain', 'LangGraph', 'RAG', 'MCP', 'FastAPI', 'n8n', 'Six Sigma Black Belt', 'MBA Strategy', 'System Architecture', 'AI Leadership'],
  },
];

/* ─────────────────────────── MILESTONE NODE ─────────────────────────── */

interface NodeProps {
  m: Milestone;
  index: number;
  isLeft: boolean;
}

const MilestoneNode: React.FC<NodeProps> = ({ m, index, isLeft }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const S = CAT_STYLE[m.category];
  const Icon = m.icon;

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-start gap-0 ${isLeft ? 'flex-row-reverse' : 'flex-row'} lg:flex`}
    >
      {/* ── Side content (desktop: alternating) ── */}
      <div className={`hidden lg:flex w-[calc(50%-28px)] ${isLeft ? 'justify-start pl-6' : 'justify-end pr-6'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col items-end gap-1 pt-2"
          style={{ alignItems: isLeft ? 'flex-start' : 'flex-end' }}
        >
          <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${S.badge}`}>
            {S.label}
          </span>
          {m.badge && (
            <span className="text-[10px] text-slate-500 font-bold bg-slate-900/60 border border-white/8 px-2 py-0.5 rounded-full">
              {m.badge}
            </span>
          )}
          <div className={`flex items-center gap-1.5 text-[11px] text-slate-500`}>
            <Calendar size={10} />
            <span>{m.period}</span>
          </div>
          {m.location && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <MapPin size={10} />
              <span>{m.location}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Center spine (desktop) / left accent (mobile) ── */}
      <div className="relative flex flex-col items-center z-10">
        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className={`relative z-20 flex items-center justify-center w-14 h-14 rounded-2xl border-2 shadow-lg ${S.border} ${S.iconBg} shrink-0`}
        >
          <Icon size={22} className={S.text} />
          {m.category === 'current' && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 border-2 border-[#080e1a] animate-ping" />
          )}
          {m.category === 'current' && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 border-2 border-[#080e1a]" />
          )}
        </motion.div>

        {/* Connector line segment (not after last) */}
        {index < milestones.length - 1 && (
          <div className="w-0.5 flex-1 min-h-[40px] bg-gradient-to-b from-white/10 to-white/5" />
        )}
      </div>

      {/* ── Card ── */}
      <div className={`flex-1 lg:w-[calc(50%-28px)] ${isLeft ? 'lg:justify-end lg:pr-6' : 'lg:pl-6'} pl-4 lg:pl-0`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`relative bg-gradient-to-br ${S.bg} border ${S.border} rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${S.glow} group mb-4`}
        >
          {/* Mobile-only meta strip */}
          <div className="lg:hidden flex items-center gap-2 px-4 pt-3 pb-0 flex-wrap">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${S.badge}`}>{S.label}</span>
            <span className="text-[10px] text-slate-600">·</span>
            <span className="text-[10px] text-slate-500 font-bold">{m.period}</span>
            {m.badge && <span className={`text-[10px] font-black ${S.text}`}>· {m.badge}</span>}
          </div>

          {/* Card header */}
          <button
            className="w-full text-left px-5 pt-4 pb-4 flex items-start gap-4"
            onClick={() => setOpen(!open)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`font-black text-white text-sm sm:text-base leading-tight mb-0.5 group-hover:${S.text} transition-colors`}>
                    {m.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] sm:text-xs font-semibold">{m.org}</p>
                </div>
                <div className={`shrink-0 mt-0.5 p-1.5 rounded-lg ${S.iconBg} border ${S.border} transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                  <ChevronDown size={13} className={S.text} />
                </div>
              </div>

              {/* Skills preview */}
              <div className="flex flex-wrap gap-1 mt-3">
                {m.skills.slice(0, 4).map(s => (
                  <span key={s} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${S.border} ${S.text} bg-white/3`}>
                    {s}
                  </span>
                ))}
                {m.skills.length > 4 && (
                  <span className="text-[10px] font-bold text-slate-600 px-2 py-0.5">
                    +{m.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Expandable detail */}
          <motion.div
            initial={false}
            animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 border-t ${S.border}`}>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-4 mb-4">
                {m.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-col gap-2 mb-4">
                {m.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} className={`${S.text} shrink-0 mt-0.5`} />
                    <span className="text-slate-300 text-xs leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>

              {/* All skills */}
              <div>
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2">Skills Gained</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.skills.map(s => (
                    <span key={s} className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${S.border} ${S.text} bg-white/3`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom accent glow line */}
          <div className={`absolute bottom-0 left-0 h-[2px] w-full opacity-40 bg-gradient-to-r ${S.text.replace('text-', 'from-').replace('-400', '-500')} to-transparent`} />
        </motion.div>
      </div>
    </div>
  );
};

/* ─────────────────────────── LEGEND ─────────────────────────── */

const Legend = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-wrap justify-center gap-3 mb-16"
  >
    {(Object.entries(CAT_STYLE) as [Category, typeof CAT_STYLE[Category]][]).map(([key, S]) => (
      <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${S.border} bg-white/3`}>
        <div className={`w-2 h-2 rounded-full ${S.dot}`} />
        <span className={`text-[10px] font-black uppercase tracking-widest ${S.text}`}>{S.label}</span>
      </div>
    ))}
  </motion.div>
);

/* ─────────────────────────── STATS BAR ─────────────────────────── */

const stats = [
  { label: 'Years of Journey', value: '14+', color: 'text-blue-400' },
  { label: 'Career Roles', value: '3', color: 'text-amber-400' },
  { label: 'Certifications', value: '5+', color: 'text-emerald-400' },
  { label: 'AI Systems Built', value: '20+', color: 'text-cyan-400' },
  { label: 'Degrees', value: '2', color: 'text-violet-400' },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

const Roadmap: React.FC = () => (
  <div className="min-h-screen bg-[#080e1a] pt-16 overflow-x-hidden">

    {/* Ambient glows */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/4 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-500/4 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-500/4 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/4 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Personal Journey
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
          My <span className="text-cyan-400">Roadmap</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-4">
          From Mathematics undergraduate to AI Engineer — a 14-year journey across academia, commercial leadership,
          process engineering, and cutting-edge generative AI systems.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto" />
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-14"
      >
        {stats.map((s, i) => (
          <div key={i} className="text-center p-3 rounded-2xl bg-slate-900/50 border border-white/6 backdrop-blur-sm">
            <div className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-bold uppercase tracking-wider leading-tight">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Legend ── */}
      <Legend />

      {/* ── Timeline ── */}
      <div className="relative">

        {/* Desktop: center vertical spine line */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-violet-500/15 via-cyan-500/15 to-rose-500/20 z-0" />

        {/* Year markers overlay (desktop) */}
        <div className="hidden lg:block">
          {milestones.map((m, i) => (
            <div
              key={m.id + '-year'}
              className="absolute left-1/2 -translate-x-1/2 z-20"
              style={{ top: `${(i / milestones.length) * 100}%` }}
            >
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${CAT_STYLE[m.category].border} ${CAT_STYLE[m.category].badge} whitespace-nowrap translate-y-7`}>
                {m.year}
              </div>
            </div>
          ))}
        </div>

        {/* Milestone nodes */}
        <div className="flex flex-col gap-0">
          {milestones.map((m, i) => (
            <MilestoneNode
              key={m.id}
              m={m}
              index={i}
              isLeft={i % 2 === 1}
            />
          ))}
        </div>

        {/* End cap */}
        <div className="flex justify-center mt-2 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-0.5 h-8 bg-gradient-to-b from-rose-500/30 to-transparent" />
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-br from-rose-500/15 to-violet-500/10 border border-rose-500/30 text-center backdrop-blur-sm shadow-lg shadow-rose-500/10">
              <div className="flex items-center gap-2 justify-center mb-1">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-rose-300 text-xs font-black uppercase tracking-widest">You Are Here</span>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              </div>
              <p className="text-white font-black text-sm">AI Engineer · The Journey Continues</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Building what's next · 2026</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-cyan-500/8 via-blue-600/5 to-violet-500/8 border border-white/8 text-center backdrop-blur-sm"
      >
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black mb-3">Every milestone above led here</p>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
          BSc Maths → MBA → Six Sigma →{' '}
          <span className="text-cyan-400">AI Engineer</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
          A rare combination of analytical rigour, strategic thinking, and engineering depth.
          Explore the projects, skills, and experience that define this journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {[
            { label: 'View Projects', href: '/projects' },
            { label: 'Skills Stack', href: '/skills' },
            { label: 'Experience', href: '/experience' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="group px-6 py-2.5 rounded-xl border border-white/12 text-white text-sm font-black hover:bg-white/6 hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
              {link.label}
              <ArrowRight size={13} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </motion.div>

    </div>

    <Footer />
  </div>
);

export default Roadmap;
