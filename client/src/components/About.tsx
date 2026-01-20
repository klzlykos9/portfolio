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
    <section id="about" className="w-full min-h-screen py-24 bg-white relative overflow-hidden">
      {/* Anime Cloud Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Title */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-12 h-px bg-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Introduction</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-black text-slate-900 mb-4"
          >
            About <span className="text-primary">Me</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 text-primary">
                    <Award size={28} />
                    <h3 className="text-2xl font-bold text-slate-900">Professional Vision</h3>
                  </div>
                  <div className="space-y-6 text-slate-500 leading-relaxed text-lg">
                    <p>
                      I am an <span className="text-slate-900 font-bold">AI Engineer and Business Strategist</span> dedicated to building real-world, production-grade Generative AI systems that deliver measurable business value.
                    </p>
                    <p>
                      With a solid foundation in business strategy (MBA) and process optimization (Lean Six Sigma), I engineer AI solutions that are not only technically excellent but also aligned with business strategy.
                    </p>
                    <p className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 font-medium">
                      Specializing in: <span className="text-primary font-bold">LangChain, LangGraph, LangSmith, MCP, neural architectures, n8n, Argo Workflows, and FastAPI.</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="relative p-10 bg-gradient-to-br from-primary to-blue-600 rounded-[2rem] text-white overflow-hidden shadow-xl">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold uppercase tracking-widest opacity-80 mb-4">Philosophy</h3>
                      <p className="text-2xl font-black italic leading-tight">
                        “I don’t just build models. I engineer intelligent systems with purpose. I think in systems, build with intent, and engineer for impact.”
                      </p>
                    </div>
                    {/* Abstract Shape Overlay */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <BookOpen className="text-primary w-6 h-6" />
                      Career Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Generative AI & LLM applications",
                        "Intelligent agent systems",
                        "Data analysis pipelines",
                        "Backend integrations",
                        "Scalable AI orchestration"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 font-medium text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
