import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { SectionPreview } from '../components/SectionPreview';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0f172a] artistic-mesh overflow-x-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <div className="relative z-10 min-h-[95vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto space-y-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/80 border border-primary/30 text-primary font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/5"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            AI Engineer & Strategist
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl sm:text-7xl lg:text-9xl font-black text-white leading-none tracking-tighter"
          >
            ARPAN P. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-indigo-500 animate-gradient-x">NAYAK</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-bold tracking-tight text-glow"
          >
            Architecting <span className="text-white">intelligent systems</span> that bridge the gap between cutting-edge AI technology 
            and strategic business transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6 justify-center items-center pt-8"
          >
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-5 bg-primary text-white rounded-full font-black text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] flex items-center gap-3 active:scale-95"
            >
              Initialize Exploration
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>

            <Link
              to="/projects"
              className="group px-10 py-5 border-2 border-white/10 text-white rounded-full font-black text-lg transition-all hover:bg-white/5 hover:border-primary/50 flex items-center gap-3"
            >
              System Protocols
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Preview Section */}
      <SectionPreview />
    </div>
  );
};

export default Home;