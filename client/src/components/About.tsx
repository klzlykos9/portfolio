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
    <section id="about" className="w-full min-h-screen py-24 relative overflow-hidden bg-slate-950/20">
      {/* Artistic Overlay */}
      <div className="absolute top-0 left-0 w-full h-full anime-swirl opacity-30 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-16 h-1 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-primary font-black tracking-[0.2em] uppercase text-sm">System Identity</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl font-black text-white mb-4 tracking-tighter"
          >
            ABOUT <span className="text-primary">ME</span>
            <span className="ml-4 text-3xl text-slate-600 font-normal">/ 01</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/60 backdrop-blur-3xl p-10 sm:p-16 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
              {/* Anime Inspired Background Shape */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-4 text-primary bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                      <Award size={24} />
                      <h3 className="text-xl font-black uppercase tracking-widest">Professional Vision</h3>
                    </div>
                    <div className="space-y-8 text-slate-400 leading-relaxed text-xl font-medium">
                      <p>
                        I am an <span className="text-white font-black">AI Engineer and Business Strategist</span> dedicated to building real-world, production-grade Generative AI systems that deliver measurable business value.
                      </p>
                      <p>
                        With a solid foundation in business strategy (MBA) and process optimization (Lean Six Sigma), I engineer AI solutions that are not only technically excellent but also aligned with business strategy.
                      </p>
                      <div className="p-8 bg-slate-800/50 rounded-3xl border border-white/5 text-slate-300 font-bold border-l-8 border-l-primary">
                        Stack Expertise: <span className="text-primary">LangChain, LangGraph, LangSmith, MCP, Neural Architectures, n8n, Argo, and FastAPI.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-16">
                  <div className="relative p-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] border border-white/10 shadow-2xl group overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500">Core Philosophy</h3>
                      </div>
                      <p className="text-3xl font-black italic leading-tight text-white group-hover:text-primary transition-colors duration-500">
                        “I don’t just build models. I engineer intelligent systems with purpose.”
                      </p>
                      <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                        <span className="text-xs font-mono text-slate-600 uppercase">Strategic intent // 2026</span>
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                          <span className="text-2xl">🔥</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-2xl font-black text-white flex items-center gap-4">
                      <BookOpen className="text-primary w-8 h-8" />
                      SYSTEM HIGHLIGHTS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { text: "Generative AI Systems", color: "border-primary", animeIcon: "🌀" },
                        { text: "Intelligent Agents", color: "border-amber-500", animeIcon: "🔱" },
                        { text: "Data Pipelines", color: "border-emerald-500", animeIcon: "📜" },
                        { text: "Backend Systems", color: "border-rose-500", animeIcon: "⚡" }
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-5 bg-slate-800/40 rounded-2xl border-l-4 ${item.color} hover:bg-slate-800 transition-all cursor-default group hover:-translate-y-1`}>
                          <div className="flex items-center gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                            <span className="text-slate-300 font-black text-sm uppercase tracking-widest">{item.text}</span>
                          </div>
                          <span className="text-xl opacity-20 group-hover:opacity-100 transition-opacity">{item.animeIcon}</span>
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
