import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, Code } from 'lucide-react';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const skills = {
    business: [
      'Six Sigma', 'Lean Manufacturing', 'Quality Assurance', 'Supply Chain',
      'Lean Leadership', 'Planning and Forecasting', 'Management',
      'Lean Six Sigma Green Belt', 'Lean Six Sigma Black Belt',
      'International Business', 'Finance & Operations', 'Logistics Management'
    ],
    technical: [
      'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js',
      'TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'LangGraph'
    ],
    ai: [
      'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP',
      'Reinforcement Learning', 'MLOps', 'LangChain', 'OpenAI API'
    ]
  };

  return (
    <div className="min-h-screen pt-20">
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
              About Me
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bridging the gap between cutting-edge AI technology and practical business solutions
            </p>
          </motion.div>

          {/* AI Engineer Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-cyan-500/30"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
              AI Engineer & Business Strategist
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                I am an <span className="text-cyan-400 font-semibold">AI Engineer and Business Strategist</span> focused on building
                <span className="text-blue-400 font-semibold"> real-world, production-grade Generative AI systems</span>.
              </p>
              <p>
                With a strong foundation in <span className="text-cyan-400 font-semibold">business strategy (MBA)</span> and
                <span className="text-blue-400 font-semibold"> process optimization (Lean Six Sigma)</span>, I specialize in designing
                intelligent systems that solve real business problems using modern AI architectures. My work sits at the intersection
                of <span className="text-cyan-400 font-semibold">AI engineering, data science, and decision intelligence</span>.
              </p>
              <p>
                I have hands-on experience building <span className="text-blue-400 font-semibold">Generative AI applications</span> using
                <span className="text-cyan-400 font-semibold"> LangChain, LangGraph, LangSmith, MCP, and neural networks</span>.
                I work extensively with <span className="text-blue-400 font-semibold">data analysis pipelines, LLM-based agents,
                retrieval-augmented generation (RAG), workflow orchestration, and AI automation systems</span>.
              </p>
              <div className="border-l-4 border-cyan-400 pl-6 py-4 bg-gray-900/40 rounded-r-lg">
                <p className="font-semibold text-cyan-300 mb-2">My Philosophy</p>
                <p className="italic text-gray-400">
                  "Building AI products that are not just impressive demos — but scalable, reliable, and business-ready.
                  I think in systems, build with intent, and engineer for impact."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-gray-700/50"
          >
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">My Journey</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                My journey into artificial intelligence began during my MBA studies when I chose the
                <span className="text-cyan-400 font-semibold"> Certified Python Business Analyst (CPBA)</span> course
                as a substitute for my internship. That decision ignited a passion for data, models, and intelligent systems.
              </p>
              <p>
                After completing my MBA in International Business, I pivoted into AI/ML and haven't looked back.
                I've mastered <span className="text-blue-400 font-semibold">Machine Learning, Deep Learning, and Reinforcement Learning</span>,
                developing expertise in both theory and practical implementation.
              </p>
              <p>
                Today, I specialize in building intelligent systems using cutting-edge technologies like
                <span className="text-cyan-400 font-semibold"> LangChain, TensorFlow, PyTorch</span>, and modern AI frameworks.
                I believe the future belongs to <span className="text-blue-400 font-semibold">AI practitioners who understand both
                business and applied AI</span> — and that's exactly where I build.
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
              >
                <div className="flex items-center mb-4">
                  <Code className="h-6 w-6 text-cyan-400 mr-2" />
                  <h3 className="text-xl font-bold text-white capitalize">{category} Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education & Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center mb-6">
                <GraduationCap className="h-6 w-6 text-cyan-400 mr-2" />
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-400 pl-4">
                  <h4 className="font-bold text-cyan-300">MBA - International Business</h4>
                  <p className="text-gray-400">Lovely Professional University</p>
                  <p className="text-sm text-gray-500">Capstone: Online Marketing in Business Environment</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-bold text-blue-300">BSc Mathematics (Hons)</h4>
                  <p className="text-gray-400">First Class Honours</p>
                  <p className="text-sm text-gray-500">Major: Physics, Minor: Chemistry</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Lean Six Sigma Black Belt - Henry Harvin, 2022',
                  'Lean Six Sigma Green Belt - Henry Harvin, 2021',
                  'Certified Python Business Analyst - Henry Harvin, 2020',
                  'Post Graduate Diploma in Computer Applications - NIAT, 2014'
                ].map((cert, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{cert}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;