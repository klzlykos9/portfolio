import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const handleScrollDown = () => {
    const next = document.getElementById('section-preview') ?? document.querySelector('main section:nth-child(2)');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="w-full min-h-screen pt-16 sm:pt-20 flex items-center relative overflow-hidden"
    >
      {/* Animated background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 sm:w-72 h-64 sm:h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '20%', left: '-10%' }}
        />
        <motion.div
          className="absolute w-64 sm:w-72 h-64 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '20%', right: '-10%' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 w-full relative z-10">
        <motion.div
          className="flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <motion.span
              className="text-base sm:text-lg text-cyan-400 font-semibold flex items-center gap-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Welcome to my portfolio
            </motion.span>
          </motion.div>

          {/* Main heading — fluid responsive sizes */}
          <motion.h1
            variants={itemVariants}
            className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Arpan P.{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                Nayak
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full opacity-70" />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-5 sm:mb-6"
          >
            AI Engineer &amp; Business Strategist
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-300 py-4 sm:py-6 max-w-[700px] text-sm sm:text-base lg:text-lg leading-relaxed"
          >
            Building production-grade Generative AI systems that solve real business problems.
            Specializing in LangChain, LLM applications, and intelligent automation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-6 sm:mt-8"
          >
            <Link
              to="/projects"
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              to="/about"
              className="group px-7 sm:px-8 py-3.5 sm:py-4 border-2 border-cyan-500/50 rounded-full font-semibold text-white text-sm sm:text-base hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-4 sm:gap-6 mt-10 sm:mt-12">
            <motion.a
              href="https://github.com/arpanpnayak"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="p-3 bg-slate-800/50 rounded-full text-cyan-400 hover:bg-slate-700/50 transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/arpanpnayak"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="p-3 bg-slate-800/50 rounded-full text-cyan-400 hover:bg-slate-700/50 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth scroll button — fixed at bottom-centre */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group z-20 focus:outline-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown
          size={18}
          className="group-hover:scale-125 transition-transform"
        />
      </motion.button>
    </section>
  );
};

export default Hero;
