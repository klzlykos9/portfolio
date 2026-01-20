import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { SectionPreview } from '../components/SectionPreview';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-xs sm:text-sm uppercase tracking-widest"
          >
            <MousePointer2 size={16} />
            AI Engineer & Strategist
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] text-balance"
          >
            Arpan P. <span className="text-primary">Nayak</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Architecting intelligent systems that bridge the gap between cutting-edge AI technology 
            and strategic business transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center items-center pt-4"
          >
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-slate-900 text-white rounded-full font-bold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/projects"
              className="group px-8 py-4 border-2 border-slate-200 text-slate-600 rounded-full font-bold transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center gap-2"
            >
              View Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-6 pt-8"
          >
            <a href="https://github.com/arpanpnayak" target="_blank" rel="noreferrer" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arpanpnayak" target="_blank" rel="noreferrer" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <Linkedin size={24} />
            </a>
            <a href="mailto:arpanpnayak@gmail.com" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Preview Section */}
      <SectionPreview />

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-10 left-10 hidden lg:flex flex-col items-center gap-4 z-20"
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 [writing-mode:vertical-lr]">Scroll Down</span>
      </motion.div>
    </div>
  );
};

export default Home;
  );
};

export default Home;
