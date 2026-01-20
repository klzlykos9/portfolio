import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Code2, 
  BrainCircuit,
  LineChart,
  ChevronRight,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: 'AI & Data Science',
      icon: <BrainCircuit />,
      color: 'from-cyan-500 to-blue-600',
      skills: [
        'Generative AI', 'LLM Applications', 'LangChain & LangGraph',
        'Machine Learning', 'Deep Learning', 'Reinforcement Learning',
        'Natural Language Processing', 'Computer Vision', 'RAG Systems',
        'AI Agents', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'MLOps'
      ]
    },
    {
      title: 'Business & Strategy',
      icon: <BarChart3 />,
      color: 'from-blue-500 to-indigo-600',
      skills: [
        'Business Strategy', 'Process Optimization', 'Six Sigma',
        'Lean Methodology', 'Quality Assurance', 'Supply Chain',
        'International Business', 'Finance & Operations', 'Decision Intelligence'
      ]
    },
    {
      title: 'Technical Stack',
      icon: <Code2 />,
      color: 'from-purple-500 to-pink-600',
      skills: [
        'Python', 'React', 'Node.js', 'TypeScript',
        'JavaScript', 'SQL', 'FastAPI', 'Flask',
        'PostgreSQL', 'MongoDB', 'Docker', 'Tailwind CSS'
      ]
    },
    {
      title: 'Analytics & Tools',
      icon: <LineChart />,
      color: 'from-emerald-500 to-teal-600',
      skills: [
        'Power BI', 'R Studio', 'SPSS', 'Minitab',
        'Excel', 'n8n', 'Git', 'LangSmith', 'Aron'
      ]
    }
  ];

  const expertise = [
    {
      icon: Zap,
      title: 'Production-Grade AI',
      description: 'Architecting scalable systems that bridge the gap between research and real-world deployment.'
    },
    {
      icon: BrainCircuit,
      title: 'Intelligent Automation',
      description: 'Designing autonomous agents and complex workflow orchestrations for business transformation.'
    },
    {
      icon: TrendingUp,
      title: 'Data Intelligence',
      description: 'Converting raw information into strategic insights through advanced predictive modeling.'
    },
    {
      icon: Target,
      title: 'Strategic AI Design',
      description: 'Aligning technical AI implementations with high-level business objectives and KPIs.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-slate-950">
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-bold text-white mb-6"
            >
              Professional <span className="text-cyan-400">Expertise</span>
            </motion.h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-8" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A synergistic fusion of advanced AI engineering, robust data science, and 
              strategic business leadership.
            </p>
          </div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Skills Categories */}
          <div className="space-y-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                    selectedCategory === index
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-xl shadow-cyan-500/20 scale-105`
                      : 'bg-slate-900/50 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.icon}
                  {cat.title}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/30 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                {React.cloneElement(categories[selectedCategory].icon as React.ReactElement, { size: 240 })}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
                {categories[selectedCategory].skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-2xl border border-white/5 hover:border-cyan-500/20 hover:bg-slate-800/60 transition-all cursor-default"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <span className="text-gray-200 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
