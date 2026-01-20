import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-cyan-400 font-medium"
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight"
          >
            Arpan P. Nayak
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-gray-300 leading-tight"
          >
            AI/ML Engineer & Business Strategist
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
          >
            Building intelligent systems that bridge the gap between cutting-edge AI technology and real-world business solutions.
            Specialized in LangChain, computer vision, and production-ready ML applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              to="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <span className="relative z-10 flex items-center">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <button className="group px-8 py-4 border-2 border-gray-400 rounded-full font-semibold text-gray-300 hover:border-white hover:text-white transition-all duration-300 hover:scale-105">
              <span className="flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </span>
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center space-x-6 pt-8"
          >

            {/* GitHub */}
            <a
              href="https://github.com/klzlykos9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6 text-white" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/arpanpnayak"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6 text-white" />
            </a>

            {/* Mail */}
            <a
              href="mailto:arpanpnayak@gmail.com"
              className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Send Email"
            >
              <Mail className="h-6 w-6 text-white" />
            </a>

          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>

    </div>
  );
};

export default Home;
