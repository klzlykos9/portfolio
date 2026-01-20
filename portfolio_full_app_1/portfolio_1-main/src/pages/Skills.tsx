import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Briefcase, Zap, TrendingUp, Target } from 'lucide-react';
import Footer from '../components/Footer';

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ai');

  const skillCategories = {
    ai: {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'Generative AI', level: 95 },
        { name: 'LLM Applications', level: 95 },
        { name: 'LangChain & LangGraph', level: 92 },
        { name: 'Neural Networks', level: 90 },
        { name: 'Deep Learning', level: 88 },
        { name: 'Machine Learning', level: 92 },
        { name: 'Computer Vision', level: 85 },
        { name: 'NLP & Text Processing', level: 90 },
        { name: 'RAG Systems', level: 93 },
        { name: 'AI Agents', level: 94 },
      ],
    },
    technical: {
      title: 'Technical Stack',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'TypeScript', level: 88 },
        { name: 'JavaScript', level: 87 },
        { name: 'TensorFlow', level: 85 },
        { name: 'PyTorch', level: 88 },
        { name: 'React', level: 86 },
        { name: 'Node.js', level: 84 },
        { name: 'FastAPI', level: 86 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'Docker & Cloud', level: 80 },
      ],
    },
    business: {
      title: 'Business & Strategy',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'Business Strategy', level: 92 },
        { name: 'Process Optimization', level: 90 },
        { name: 'Lean Six Sigma', level: 93 },
        { name: 'Data Analysis', level: 88 },
        { name: 'Project Management', level: 85 },
        { name: 'Supply Chain', level: 80 },
        { name: 'Quality Assurance', level: 87 },
        { name: 'Decision Intelligence', level: 89 },
        { name: 'Financial Analysis', level: 82 },
        { name: 'Strategic Planning', level: 91 },
      ],
    },
  };

  const expertise = [
    {
      icon: Zap,
      title: 'Production-Grade AI Systems',
      description: 'Building scalable Generative AI applications that work in real-world business environments',
    },
    {
      icon: Brain,
      title: 'Intelligent Automation',
      description: 'Creating AI agents and automation pipelines that solve complex business problems',
    },
    {
      icon: TrendingUp,
      title: 'Data Intelligence',
      description: 'Extracting insights and building decision support systems with advanced analytics',
    },
    {
      icon: Target,
      title: 'AI Strategy & Design',
      description: 'Architecting AI solutions with business impact at the core of design',
    },
  ];

  const activeCategory = skillCategories[selectedCategory as keyof typeof skillCategories];
  const ActiveIcon = activeCategory.icon;

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Skills & Expertise
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive skill set spanning AI engineering, data science, and business strategy
            </p>
          </motion.div>

          {/* Core Expertise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex items-start">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Skills Section */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <ActiveIcon className="w-8 h-8 text-cyan-400 mr-3" />
                {activeCategory.title}
              </h2>

              {/* Category Selection */}
              <div className="flex gap-4 mb-12 flex-wrap">
                {Object.entries(skillCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                        selectedCategory === key
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-cyan-500/30`
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {category.title}
                    </motion.button>
                  );
                })}
              </div>

              {/* Skills Grid with Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activeCategory.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden border border-gray-600/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                        className={`h-full bg-gradient-to-r ${activeCategory.color} rounded-full shadow-lg`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Core Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Core Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'LangChain',
                'LangGraph',
                'LangSmith',
                'MCP',
                'OpenAI',
                'TensorFlow',
                'PyTorch',
                'FastAPI',
                'React',
                'TypeScript',
                'PostgreSQL',
                'Docker',
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg text-center"
                >
                  <p className="text-cyan-300 font-semibold text-sm">{tech}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Skills;
