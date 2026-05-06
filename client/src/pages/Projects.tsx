import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Code2 } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const categories = ['All', 'AI/ML', 'Computer Vision', 'Web Development', 'Blockchain', 'Data Science'];

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      project.tech.some(tech => {
        switch (selectedCategory) {
          case 'AI/ML': return ['Python', 'LangChain', 'OpenAI', 'TensorFlow', 'PyTorch'].includes(tech);
          case 'Computer Vision': return ['OpenCV', 'Face Recognition', 'Computer Vision'].includes(tech);
          case 'Web Development': return ['React', 'Flask', 'Node.js', 'JavaScript'].includes(tech);
          case 'Blockchain': return ['Blockchain', 'Cryptography'].includes(tech);
          case 'Data Science': return ['Scikit-learn', 'Pandas', 'Data Analysis'].includes(tech);
          default: return true;
        }
      });

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
              <Code2 size={12} /> Portfolio Work
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6" />
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              A showcase of cutting-edge AI, machine learning, and software development projects.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search projects…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 bg-slate-900/70 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
              />
            </div>
          </motion.div>

          {/* Category pills — scrollable on mobile */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all duration-300 shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-slate-900/60 text-slate-400 border border-white/8 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-slate-400 text-base">No projects found matching your criteria.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="mt-4 px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-all"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
