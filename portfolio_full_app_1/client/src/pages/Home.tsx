import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <ParticleBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-cyan-400 font-mono tracking-widest uppercase"
          >
            AI Engineer & Strategist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-9xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight"
          >
            Arpan P. Nayak
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Architecting intelligent systems that bridge the gap between cutting-edge AI technology 
            and strategic business transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              to="/projects"
              className="group px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 hover:bg-cyan-400 flex items-center gap-2"
            >
              Explore Projects
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/experience"
              className="group px-8 py-4 border border-white/20 text-white rounded-full font-bold transition-all hover:bg-white/10 hover:border-white flex items-center gap-2"
            >
              View Experience
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center space-x-8 pt-12"
          >
            <a href="https://github.com/klzlykos9" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arpanpnayak" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:arpanpnayak@gmail.com" className="text-gray-500 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
