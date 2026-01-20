import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

const EducationTimeline = () => {
  const education = [
    {
      degree: "Masters in Business Administration (International Business)",
      institution: "Lovely Professional University",
      period: "",
      description: (
        <div className="space-y-4">
          <p>Capstone: 'The study and effect of online marketing in today's business environment'</p>
          <div className="pt-2 border-t border-cyan-500/10">
            <p className="text-cyan-400 font-semibold mb-2">New Capstone Project:</p>
            <p className="text-gray-400">A STUDY ON CONSUMER INTENTION TO ADOPT ONLINE PHARMACIES AS AN ALTERNATIVE TO OFFLINE STORES</p>
          </div>
        </div>
      ),
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      degree: "Bachelors in Science (Math Hons)",
      institution: "",
      period: "",
      description: "First Class Hons (Major in Physics & Minor in Chemistry)",
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  return (
    <div className="space-y-8">
      {education.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="relative pl-8 border-l-2 border-cyan-500/30"
        >
          <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-400">
            {item.icon}
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h4 className="text-xl font-bold text-white">{item.degree}</h4>
              {item.period && (
                <span className="flex items-center gap-1 text-cyan-400 text-sm font-mono">
                  <Calendar size={14} /> {item.period}
                </span>
              )}
            </div>
            {item.institution && <p className="text-cyan-200/80 mb-2">{item.institution}</p>}
            <div className="text-gray-400 text-sm leading-relaxed">{item.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="w-full min-h-screen py-20 bg-slate-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Title */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            About <span className="text-cyan-400">Me</span>
          </motion.h2>
          <div className="w-20 h-1 bg-cyan-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-cyan-500/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-cyan-400" />
                Professional Journey
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  My journey into artificial intelligence began during my MBA when I chose the{' '}
                  <span className="text-cyan-400 font-semibold">Certified Python Business Analyst</span> path. 
                  This single decision transformed my career trajectory, igniting a passion for data-driven intelligence.
                </p>
                <p>
                  Specializing in International Business, I've successfully pivoted into AI/ML, 
                  mastering the intricate balance between technical implementation and strategic business value.
                </p>
                <p>
                  I build production-grade systems using <span className="text-cyan-400 font-medium">Python, TensorFlow, and PyTorch</span>, 
                  with a deep focus on reinforcement learning and scalable neural architectures.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="text-cyan-400" />
                Learning Path
              </h3>
              <EducationTimeline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
