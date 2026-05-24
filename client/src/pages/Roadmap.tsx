import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, X, ChevronDown, ChevronUp, Map, Zap, CheckCircle2, Circle, Lock } from 'lucide-react';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

type NodeStatus = 'done' | 'active' | 'upcoming';

interface RoadmapNode {
  id: string;
  label: string;
  status: NodeStatus;
  description: string;
  topics: string[];
  resources?: string[];
}

interface RoadmapSection {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  glow: string;
  border: string;
  bg: string;
  icon: React.ElementType;
  nodes: RoadmapNode[];
}

const sections: RoadmapSection[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    subtitle: 'Core knowledge every AI engineer must master',
    color: 'from-cyan-400 to-teal-500',
    glow: 'shadow-cyan-500/30',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-500/8',
    icon: BrainCircuit,
    nodes: [
      {
        id: 'math',
        label: 'Mathematics',
        status: 'done',
        description: 'The mathematical backbone of all AI and ML algorithms.',
        topics: ['Linear Algebra', 'Calculus & Optimization', 'Probability Theory', 'Statistics & Inference', 'Information Theory'],
        resources: ['3Blue1Brown (Linear Algebra)', 'Khan Academy (Calculus)', 'Think Stats'],
      },
      {
        id: 'python',
        label: 'Python & Ecosystem',
        status: 'done',
        description: 'Python is the lingua franca of AI engineering.',
        topics: ['Python Fundamentals', 'NumPy & Pandas', 'Matplotlib & Seaborn', 'Scikit-learn', 'Jupyter Notebooks'],
        resources: ['Python Docs', 'Kaggle Learn', 'Fast.ai'],
      },
      {
        id: 'dsa',
        label: 'Data Structures & Algorithms',
        status: 'done',
        description: 'Efficient computation underpins scalable AI systems.',
        topics: ['Arrays, Trees & Graphs', 'Sorting & Searching', 'Dynamic Programming', 'Big-O Complexity', 'Hash Maps'],
        resources: ['LeetCode', 'CS50', 'CLRS Book'],
      },
      {
        id: 'databases',
        label: 'Databases & SQL',
        status: 'done',
        description: 'Data storage and retrieval form the backbone of AI pipelines.',
        topics: ['SQL Fundamentals', 'PostgreSQL', 'NoSQL (MongoDB)', 'Vector Databases', 'Data Modeling'],
        resources: ['PostgreSQL Docs', 'Mode SQL Tutorial'],
      },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Classical algorithms and model development',
    color: 'from-blue-400 to-indigo-500',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/8',
    icon: Zap,
    nodes: [
      {
        id: 'supervised',
        label: 'Supervised Learning',
        status: 'done',
        description: 'Learning from labeled data to predict outcomes.',
        topics: ['Linear & Logistic Regression', 'Decision Trees', 'Random Forests', 'SVM', 'Gradient Boosting (XGBoost)'],
        resources: ['Scikit-learn Docs', 'Hands-On ML (Geron)', 'fast.ai Course'],
      },
      {
        id: 'unsupervised',
        label: 'Unsupervised Learning',
        status: 'done',
        description: 'Finding hidden patterns in unlabeled data.',
        topics: ['K-Means Clustering', 'Hierarchical Clustering', 'PCA & Dimensionality Reduction', 'Autoencoders', 'Anomaly Detection'],
        resources: ['Sklearn Cluster Guide', 'Deep Learning Book (Goodfellow)'],
      },
      {
        id: 'evaluation',
        label: 'Model Evaluation & Tuning',
        status: 'done',
        description: 'Measuring and improving model performance rigorously.',
        topics: ['Train/Val/Test Splits', 'Cross-Validation', 'Precision, Recall, F1', 'Hyperparameter Tuning', 'Bias-Variance Tradeoff'],
        resources: ['Scikit-learn Model Selection', 'Optuna Docs'],
      },
      {
        id: 'feature',
        label: 'Feature Engineering',
        status: 'done',
        description: 'Crafting meaningful inputs to elevate model quality.',
        topics: ['Feature Selection', 'Encoding Categoricals', 'Normalization & Scaling', 'Missing Value Imputation', 'Feature Stores'],
        resources: ['Feature Engineering for ML (Zheng)', 'Kaggle Tutorials'],
      },
    ],
  },
  {
    id: 'deep_learning',
    title: 'Deep Learning',
    subtitle: 'Neural architectures that power modern AI',
    color: 'from-purple-400 to-violet-600',
    glow: 'shadow-purple-500/30',
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/8',
    icon: BrainCircuit,
    nodes: [
      {
        id: 'nn_basics',
        label: 'Neural Network Fundamentals',
        status: 'done',
        description: 'The building blocks of deep learning architectures.',
        topics: ['Perceptrons & MLPs', 'Backpropagation', 'Activation Functions', 'Loss Functions', 'Optimizers (SGD, Adam)'],
        resources: ['Neural Networks & Deep Learning (Nielsen)', 'PyTorch Beginner Guide'],
      },
      {
        id: 'cnn',
        label: 'Convolutional Neural Networks',
        status: 'done',
        description: 'Specialized architectures for spatial data like images.',
        topics: ['Convolutions & Pooling', 'ResNet, VGG, EfficientNet', 'Transfer Learning', 'Data Augmentation', 'Object Detection (YOLO)'],
        resources: ['CS231n (Stanford)', 'Fast.ai Vision'],
      },
      {
        id: 'rnn',
        label: 'Recurrent Networks & LSTMs',
        status: 'done',
        description: 'Architectures for sequential and time-series data.',
        topics: ['RNN Architecture', 'LSTM & GRU', 'Sequence-to-Sequence', 'Time Series Forecasting', 'Attention Mechanisms'],
        resources: ['CS224n (Stanford)', 'Andrej Karpathy Blog'],
      },
      {
        id: 'transformers',
        label: 'Transformers',
        status: 'done',
        description: 'The dominant architecture powering modern AI breakthroughs.',
        topics: ['Self-Attention', 'Multi-Head Attention', 'Positional Encoding', 'BERT & GPT Families', 'Vision Transformers (ViT)'],
        resources: ['Attention Is All You Need (Paper)', 'The Illustrated Transformer'],
      },
    ],
  },
  {
    id: 'llm',
    title: 'LLMs & Generative AI',
    subtitle: 'Large language models and generation systems',
    color: 'from-emerald-400 to-green-500',
    glow: 'shadow-emerald-500/30',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/8',
    icon: Zap,
    nodes: [
      {
        id: 'llm_basics',
        label: 'Large Language Models',
        status: 'done',
        description: 'Understanding and leveraging the most capable AI systems.',
        topics: ['Pre-training & Fine-tuning', 'GPT-4, Claude, Gemini, Llama', 'Tokenization', 'Context Windows', 'Hallucination & Alignment'],
        resources: ['OpenAI Cookbook', 'LLM Course (Hugging Face)', 'LLMOps'],
      },
      {
        id: 'prompt',
        label: 'Prompt Engineering',
        status: 'done',
        description: 'The art and science of communicating effectively with LLMs.',
        topics: ['Zero-shot & Few-shot', 'Chain-of-Thought', 'ReAct Prompting', 'Prompt Templates', 'Adversarial Prompting'],
        resources: ['Prompt Engineering Guide', 'OpenAI Best Practices'],
      },
      {
        id: 'rag',
        label: 'RAG Systems',
        status: 'done',
        description: 'Retrieval-Augmented Generation for grounded, factual AI.',
        topics: ['Document Chunking', 'Embedding Models', 'Vector Search (FAISS, Pinecone)', 'Hybrid Retrieval', 'Reranking'],
        resources: ['LangChain RAG Docs', 'LlamaIndex', 'RAG Survey Paper'],
      },
      {
        id: 'finetuning',
        label: 'Fine-tuning & Alignment',
        status: 'active',
        description: 'Adapting LLMs for specialized domains and behaviors.',
        topics: ['LoRA & QLoRA', 'Instruction Tuning', 'RLHF', 'DPO (Direct Preference Optimization)', 'PEFT Techniques'],
        resources: ['Hugging Face PEFT', 'TRL Library', 'Axolotl'],
      },
    ],
  },
  {
    id: 'agents',
    title: 'AI Agents & Orchestration',
    subtitle: 'Autonomous systems that plan, reason, and act',
    color: 'from-orange-400 to-red-500',
    glow: 'shadow-orange-500/30',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/8',
    icon: BrainCircuit,
    nodes: [
      {
        id: 'agent_basics',
        label: 'Agent Fundamentals',
        status: 'done',
        description: 'Core concepts behind autonomous AI agents.',
        topics: ['Tool Use & Function Calling', 'Memory Systems (Short/Long-term)', 'Planning & Reasoning', 'ReAct Framework', 'Reflection & Self-Critique'],
        resources: ['LangChain Agents Docs', 'LLM Powered Autonomous Agents (Lilian Weng)'],
      },
      {
        id: 'langchain',
        label: 'LangChain & LangGraph',
        status: 'done',
        description: 'Building production-grade agent pipelines.',
        topics: ['Chains & Runnables', 'LangGraph State Machines', 'Tool Integrations', 'Streaming', 'LangSmith Observability'],
        resources: ['LangChain Docs', 'LangGraph Tutorial', 'LangSmith Docs'],
      },
      {
        id: 'multi_agent',
        label: 'Multi-Agent Systems',
        status: 'active',
        description: 'Coordinating teams of specialized AI agents.',
        topics: ['Agent Communication Protocols', 'CrewAI & AutoGen', 'Orchestrator-Worker Patterns', 'Agent Evaluation', 'Human-in-the-Loop'],
        resources: ['CrewAI Docs', 'AutoGen Research Paper', 'Swarm (OpenAI)'],
      },
      {
        id: 'n8n_automation',
        label: 'Workflow Automation',
        status: 'done',
        description: 'Low-code orchestration of AI and business workflows.',
        topics: ['n8n Workflows', 'Zapier & Make', 'API Integrations', 'Trigger-based Automation', 'Webhook Orchestration'],
        resources: ['n8n Docs', 'n8n AI Templates'],
      },
    ],
  },
  {
    id: 'mlops',
    title: 'MLOps & Deployment',
    subtitle: 'Taking AI from prototype to production',
    color: 'from-pink-400 to-rose-500',
    glow: 'shadow-pink-500/30',
    border: 'border-pink-500/40',
    bg: 'bg-pink-500/8',
    icon: Zap,
    nodes: [
      {
        id: 'serving',
        label: 'Model Serving',
        status: 'done',
        description: 'Deploying and serving ML models at scale.',
        topics: ['FastAPI & Flask APIs', 'Dockerization', 'BentoML', 'TorchServe', 'Batch vs. Real-time Inference'],
        resources: ['FastAPI Docs', 'BentoML Docs', 'Hugging Face Inference'],
      },
      {
        id: 'monitoring',
        label: 'Monitoring & Observability',
        status: 'active',
        description: 'Keeping AI systems healthy and accountable in production.',
        topics: ['Data Drift Detection', 'Model Performance Tracking', 'LangSmith Tracing', 'Prometheus & Grafana', 'Alerting'],
        resources: ['Evidently AI', 'Arize AI', 'LangSmith'],
      },
      {
        id: 'cloud',
        label: 'Cloud & Infrastructure',
        status: 'active',
        description: 'Scalable cloud-native AI infrastructure.',
        topics: ['AWS / GCP / Azure AI Services', 'Kubernetes for ML', 'Argo Workflows', 'GPU Cloud (Lambda, Vast.ai)', 'Serverless AI'],
        resources: ['AWS SageMaker Docs', 'GCP Vertex AI', 'Argo Workflows Docs'],
      },
      {
        id: 'cicd',
        label: 'CI/CD for ML',
        status: 'upcoming',
        description: 'Automating ML pipeline testing, versioning, and delivery.',
        topics: ['MLflow Experiment Tracking', 'DVC (Data Version Control)', 'GitHub Actions for ML', 'Model Registry', 'A/B Testing Models'],
        resources: ['MLflow Docs', 'DVC.org', 'CML (Continuous ML)'],
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced & Frontier AI',
    subtitle: 'Cutting-edge research and emerging paradigms',
    color: 'from-amber-400 to-yellow-500',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/8',
    icon: BrainCircuit,
    nodes: [
      {
        id: 'multimodal',
        label: 'Multimodal AI',
        status: 'active',
        description: 'AI systems that understand and generate across modalities.',
        topics: ['Vision-Language Models (GPT-4V, LLaVA)', 'Image Generation (Stable Diffusion, DALL·E)', 'Audio AI (Whisper, ElevenLabs)', 'Video Generation', 'CLIP & Contrastive Learning'],
        resources: ['OpenAI Vision Guide', 'Hugging Face Diffusers', 'Stability AI Docs'],
      },
      {
        id: 'rl',
        label: 'Reinforcement Learning',
        status: 'upcoming',
        description: 'Training agents through reward-driven trial and error.',
        topics: ['Markov Decision Processes', 'Q-Learning & DQN', 'Policy Gradient Methods', 'PPO & TRPO', 'RLHF for LLMs'],
        resources: ['Spinning Up (OpenAI)', 'RL Course (Hugging Face)', 'Sutton & Barto Book'],
      },
      {
        id: 'safety',
        label: 'AI Safety & Ethics',
        status: 'upcoming',
        description: 'Ensuring AI systems are safe, fair, and aligned with human values.',
        topics: ['Alignment Research', 'Interpretability & Explainability', 'Bias & Fairness', 'Red Teaming', 'Responsible AI Practices'],
        resources: ['AI Safety Fundamentals', 'Anthropic Safety Research', 'PAIR Guidebook'],
      },
      {
        id: 'research',
        label: 'Research Frontier',
        status: 'upcoming',
        description: 'State-of-the-art AI research shaping the 2026 landscape.',
        topics: ['Mixture of Experts (MoE)', 'State Space Models (Mamba)', 'Long Context Architectures', 'AI Reasoning (o1-style)', 'Neuromorphic Computing'],
        resources: ['ArXiv Papers', 'Papers With Code', 'Hugging Face Daily Papers'],
      },
    ],
  },
];

const statusConfig = {
  done: {
    icon: CheckCircle2,
    label: 'Completed',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  active: {
    icon: Zap,
    label: 'In Progress',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  upcoming: {
    icon: Lock,
    label: 'Upcoming',
    color: 'text-slate-500',
    bg: 'bg-slate-800/60',
    border: 'border-slate-700/60',
    dot: 'bg-slate-600',
    glow: '',
  },
};

interface NodeCardProps {
  node: RoadmapNode;
  sectionColor: string;
  sectionBorder: string;
  index: number;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, sectionColor, sectionBorder, index }) => {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[node.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className={`relative rounded-2xl border ${status.border} ${status.bg} overflow-hidden transition-all duration-300 ${
        node.status !== 'upcoming' ? `shadow-lg ${status.glow}` : ''
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 sm:p-5 flex items-start gap-3 group"
      >
        {/* Status dot with pulse */}
        <div className="mt-0.5 shrink-0 relative">
          <div className={`w-3 h-3 rounded-full ${status.dot} ${node.status === 'active' ? 'animate-pulse' : ''}`} />
          {node.status === 'active' && (
            <div className={`absolute inset-0 w-3 h-3 rounded-full ${status.dot} opacity-40 animate-ping`} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`font-black text-sm sm:text-base ${node.status === 'upcoming' ? 'text-slate-500' : 'text-white'}`}>
              {node.label}
            </h4>
            <div className="flex items-center gap-2 shrink-0">
              <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status.color} ${status.bg} border ${status.border}`}>
                <StatusIcon size={10} />
                {status.label}
              </div>
              {expanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </div>
          </div>
          <p className={`text-xs mt-1 leading-relaxed ${node.status === 'upcoming' ? 'text-slate-600' : 'text-slate-400'}`}>
            {node.description}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/5">
              <div className="flex flex-wrap gap-2 mt-3">
                {node.topics.map((topic, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      node.status === 'upcoming'
                        ? 'bg-slate-800/80 border-slate-700/50 text-slate-500'
                        : `bg-slate-900/80 border-white/10 text-slate-200`
                    }`}
                  >
                    <div className={`w-1 h-1 rounded-full shrink-0 ${
                      node.status === 'upcoming' ? 'bg-slate-600' :
                      node.status === 'active' ? 'bg-cyan-400' : 'bg-emerald-400'
                    }`} />
                    {topic}
                  </span>
                ))}
              </div>
              {node.resources && node.resources.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Resources</p>
                  <div className="flex flex-wrap gap-1.5">
                    {node.resources.map((res, i) => (
                      <span key={i} className="text-xs text-slate-400 bg-slate-800/60 border border-slate-700/60 rounded-lg px-2.5 py-1">
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Roadmap: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<NodeStatus | 'all'>('all');

  const totalNodes = sections.flatMap(s => s.nodes).length;
  const doneNodes = sections.flatMap(s => s.nodes).filter(n => n.status === 'done').length;
  const activeNodes = sections.flatMap(s => s.nodes).filter(n => n.status === 'active').length;
  const progress = Math.round((doneNodes / totalNodes) * 100);

  const filteredSections = sections.map(section => ({
    ...section,
    nodes: filterStatus === 'all' ? section.nodes : section.nodes.filter(n => n.status === filterStatus),
  })).filter(section => section.nodes.length > 0);

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/4 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-blue-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
            <Map size={12} /> AI Learning Roadmap 2026
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
            AI Engineer <span className="text-cyan-400">Roadmap</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6" />
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            A structured path from fundamentals to frontier AI — the complete learning roadmap for AI engineering in 2026.
          </p>
        </motion.div>

        {/* Progress dashboard */}
        <motion.div
          custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="grid grid-cols-3 gap-3 sm:gap-6 mb-10"
        >
          {[
            { label: 'Completed', value: doneNodes, total: totalNodes, color: 'text-emerald-400', bar: 'bg-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
            { label: 'In Progress', value: activeNodes, total: totalNodes, color: 'text-cyan-400', bar: 'bg-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25' },
            { label: 'Overall Progress', value: `${progress}%`, isPercent: true, color: 'text-blue-400', bar: 'bg-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25', pct: progress },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl ${stat.bg} border ${stat.border} p-4 sm:p-6`}>
              <div className={`text-2xl sm:text-4xl font-black ${stat.color} mb-1`}>
                {stat.isPercent ? stat.value : stat.value}
              </div>
              {!stat.isPercent && (
                <div className="text-xs text-slate-500 mb-2">of {totalNodes} topics</div>
              )}
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
              {!stat.isPercent ? (
                <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((stat.value as number) / totalNodes) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className={`h-full ${stat.bar} rounded-full`}
                  />
                </div>
              ) : (
                <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className={`h-full ${stat.bar} rounded-full`}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {[
            { key: 'all', label: 'All Topics', color: 'bg-slate-700 text-white border-slate-600' },
            { key: 'done', label: 'Completed', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
            { key: 'active', label: 'In Progress', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
            { key: 'upcoming', label: 'Upcoming', color: 'bg-slate-800 text-slate-400 border-slate-700/60' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key as NodeStatus | 'all')}
              className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                filterStatus === tab.key
                  ? tab.color + ' scale-105 shadow-lg'
                  : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Roadmap sections */}
        <div className="space-y-6 sm:space-y-8">
          {filteredSections.map((section, si) => {
            const SectionIcon = section.icon;
            const isOpen = activeSection === null || activeSection === section.id;

            return (
              <motion.div
                key={section.id}
                custom={si}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                className={`rounded-3xl border ${section.border} ${section.bg} overflow-hidden backdrop-blur-sm`}
              >
                {/* Section header */}
                <button
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  className="w-full text-left px-5 sm:px-8 py-5 sm:py-6 flex items-center gap-4 group"
                >
                  {/* Section number / connector line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg ${section.glow} group-hover:scale-110 transition-transform duration-300`}>
                      <SectionIcon size={18} className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg sm:text-2xl font-black text-white">{section.title}</h2>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${section.color} text-white`}>
                        {section.nodes.length} topics
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{section.subtitle}</p>
                  </div>

                  <div className={`text-slate-400 transition-transform duration-300 ${activeSection === section.id ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Connector from header to nodes */}
                <AnimatePresence>
                  {(activeSection === null || activeSection === section.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 relative">
                        {/* Vertical connector line */}
                        <div className="absolute left-[2.6rem] sm:left-[3.3rem] top-0 bottom-6 w-px bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8 sm:pl-12">
                          {section.nodes.map((node, ni) => (
                            <div key={node.id} className="relative">
                              {/* Horizontal connector branch */}
                              <div className="absolute -left-8 sm:-left-12 top-5 w-6 sm:w-10 h-px bg-white/10" />
                              <div className="absolute -left-2 top-4 w-2 h-2 rounded-full bg-white/10 border border-white/20" />
                              <NodeCard
                                node={node}
                                sectionColor={section.color}
                                sectionBorder={section.border}
                                index={ni}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          custom={8} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-3xl bg-slate-800/40 border border-white/8 backdrop-blur-sm"
        >
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Legend</p>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {[
              { status: 'done' as NodeStatus, label: 'Topics mastered and applied in real projects' },
              { status: 'active' as NodeStatus, label: 'Currently learning and building with' },
              { status: 'upcoming' as NodeStatus, label: 'Planned for future exploration' },
            ].map(({ status, label }) => {
              const cfg = statusConfig[status];
              const Icon = cfg.icon;
              return (
                <div key={status} className="flex items-center gap-2.5">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                    <Icon size={12} className={cfg.color} />
                    <span className={`text-xs font-black ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <span className="text-xs text-slate-500 hidden sm:inline">{label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={9} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-8 text-center"
        >
          <p className="text-slate-500 text-sm">
            This roadmap is continuously updated as Arpan progresses through his AI engineering journey.
            <br className="hidden sm:block" />
            Inspired by{' '}
            <a
              href="https://roadmap.sh/r/ai-roadmap-for-2026---final-draft"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              roadmap.sh AI Roadmap 2026
            </a>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Roadmap;
