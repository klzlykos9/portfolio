import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, BarChart3, Code2, LineChart, Zap, Target, TrendingUp } from 'lucide-react';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

const categories = [
  {
    title: 'AI & Data Science',
    icon: BrainCircuit,
    color: 'from-cyan-500 to-blue-600',
    bg: 'from-cyan-500/10 to-blue-600/10',
    border: 'border-cyan-500/25',
    skills: ['Generative AI', 'LLM Applications', 'LangChain & LangGraph', 'Machine Learning', 'Deep Learning', 'Reinforcement Learning', 'Natural Language Processing', 'Computer Vision', 'RAG Systems', 'AI Agents', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'MLOps'],
  },
  {
    title: 'Business & Strategy',
    icon: BarChart3,
    color: 'from-blue-500 to-indigo-600',
    bg: 'from-blue-500/10 to-indigo-600/10',
    border: 'border-blue-500/25',
    skills: ['Business Strategy', 'Process Optimization', 'Six Sigma', 'Lean Methodology', 'Quality Assurance', 'Supply Chain', 'International Business', 'Finance & Operations', 'Decision Intelligence'],
  },
  {
    title: 'Technical Stack',
    icon: Code2,
    color: 'from-purple-500 to-pink-600',
    bg: 'from-purple-500/10 to-pink-600/10',
    border: 'border-purple-500/25',
    skills: ['Python', 'React', 'Node.js', 'TypeScript', 'JavaScript', 'SQL', 'FastAPI', 'Flask', 'PostgreSQL', 'MongoDB', 'Docker', 'Tailwind CSS'],
  },
  {
    title: 'Analytics & Tools',
    icon: LineChart,
    color: 'from-emerald-500 to-teal-600',
    bg: 'from-emerald-500/10 to-teal-600/10',
    border: 'border-emerald-500/25',
    skills: ['Power BI', 'R Studio', 'SPSS', 'Minitab', 'Excel', 'n8n', 'Git', 'LangSmith', 'Argo Workflows'],
  },
];

const expertise = [
  { icon: Zap, title: 'Production-Grade AI', desc: 'Architecting scalable systems that bridge research and real-world deployment.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: BrainCircuit, title: 'Intelligent Automation', desc: 'Designing autonomous agents and complex workflow orchestrations.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: TrendingUp, title: 'Data Intelligence', desc: 'Converting raw information into strategic insights through predictive modeling.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Target, title: 'Strategic AI Design', desc: 'Aligning technical AI implementations with high-level business objectives.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const Skills: React.FC = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Title */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
              <Zap size={12} /> Technical Expertise
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Expertise</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6" />
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              A synergistic fusion of advanced AI engineering, robust data science, and strategic business leadership.
            </p>
          </motion.div>

          {/* Expertise Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-24">
            {expertise.map((item, i) => (
              <motion.div
                key={i}
                custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/60 border border-white/10 hover:border-white/20 transition-all duration-400 backdrop-blur-sm"
              >
                <div className={`inline-flex p-3.5 rounded-2xl ${item.bg} mb-5 group-hover:scale-110 transition-transform duration-400 ${item.color}`}>
                  <item.icon size={26} />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Category tabs */}
          <div className="mb-8">
            <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all duration-300 shrink-0 ${
                    selected === i
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-xl scale-105`
                      : 'bg-slate-800/80 text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <cat.icon size={16} />
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Skills panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className={`p-6 sm:p-10 rounded-3xl bg-gradient-to-br ${categories[selected].bg} border ${categories[selected].border} relative overflow-hidden backdrop-blur-sm`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                {React.createElement(categories[selected].icon, { size: 200 })}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 relative z-10">
                {categories[selected].skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="flex items-center gap-2.5 p-3 sm:p-4 bg-slate-900/80 rounded-xl sm:rounded-2xl border border-white/10 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] shrink-0" />
                    <span className="text-white font-semibold text-xs sm:text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Skills;
