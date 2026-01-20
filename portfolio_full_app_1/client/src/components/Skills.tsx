import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  BarChart3, 
  Settings, 
  Briefcase, 
  Code2, 
  BrainCircuit,
  Database,
  Globe,
  LineChart,
  Boxes
} from 'lucide-react';

interface Skill {
  name: string;
  icon?: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'AI & Data Science',
      icon: <BrainCircuit />,
      color: 'from-cyan-500 to-blue-600',
      skills: [
        'Machine Learning', 'Deep Learning', 'Reinforcement Learning',
        'Natural Language Processing', 'Computer Vision', 'LangChain',
        'LangGraph', 'LangSmith', 'TensorFlow', 'PyTorch',
        'Scikit-learn', 'MLOps', 'Hugging Face'
      ]
    },
    {
      title: 'Business & Strategy',
      icon: <BarChart3 />,
      color: 'from-blue-500 to-indigo-600',
      skills: [
        'Six Sigma', 'Lean Methodology', 'Quality Assurance',
        'Supply Chain', 'International Business', 'Finance & Operations',
        'Logistics Management', 'Financial Analysis'
      ]
    },
    {
      title: 'Tech Stack',
      icon: <Code2 />,
      color: 'from-purple-500 to-pink-600',
      skills: [
        'Python', 'React', 'Node.js', 'TypeScript',
        'JavaScript', 'SQL', 'MongoDB', 'PostgreSQL',
        'Tailwind CSS', 'FastAPI', 'Flask'
      ]
    },
    {
      title: 'Analytics & Tools',
      icon: <LineChart />,
      color: 'from-emerald-500 to-teal-600',
      skills: [
        'Power BI', 'R Studio', 'SPSS', 'Minitab',
        'Excel', 'n8n', 'Aron', 'Git'
      ]
    }
  ];

  return (
    <section id="skills" className="w-full min-h-screen py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Title */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Professional <span className="text-cyan-400">Expertise</span>
          </motion.h2>
          <div className="w-20 h-1 bg-cyan-500 rounded-full" />
          <p className="mt-6 text-gray-400 max-w-2xl">
            A comprehensive blend of technical prowess and business strategic thinking, 
            focused on delivering high-impact AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg shadow-cyan-500/10`}>
                  {React.cloneElement(category.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-cyan-400 rounded-full text-sm border border-slate-700 hover:border-cyan-500/50 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
