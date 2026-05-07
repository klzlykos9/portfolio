import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6 } }),
};

const About: React.FC = () => {
  const education = [
    {
      degree: "MBA — International Business",
      institution: "Lovely Professional University",
      note: "Certified Python Business Analyst",
      desc: "Specialized in data-driven business strategy and predictive analytics. Capstone: 'The study and effect of online marketing in today's business environment'.",
      icon: GraduationCap,
    },
    {
      degree: "B.Sc. — Math Honours",
      institution: "First Class with Distinction",
      note: "Major: Physics • Minor: Chemistry",
      desc: "Built a strong foundation in analytical reasoning and quantitative problem-solving.",
      icon: BookOpen,
    },
  ];

  const traits = [
    { label: "Systems Thinker", desc: "Sees the big picture, designs for scale" },
    { label: "Impact-Driven", desc: "Every project solves a real problem" },
    { label: "Lifelong Learner", desc: "Always upskilling, always building" },
    { label: "Strategic AI", desc: "Business + Engineering mindset" },
  ];

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles size={12} /> About Me
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-4">
              Who is{" "}
              <span className="text-cyan-400">
                Arpan?
              </span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            {/* Left — Story */}
            <div className="space-y-6">
              <motion.div
                custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-white/10 backdrop-blur-sm"
              >
                <h2 className="text-xl sm:text-2xl font-black text-white mb-5 flex items-center gap-3">
                  <Award className="text-cyan-400 shrink-0" size={24} /> Professional Vision
                </h2>
                <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    I am an{" "}
                    <span className="text-cyan-400 font-bold">AI Engineer and Business Strategist</span>{" "}
                    dedicated to building{" "}
                    <span className="text-white font-bold">production-grade Generative AI systems</span>{" "}
                    that deliver real business value.
                  </p>
                  <p>
                    My journey began during my MBA when I became a{" "}
                    <span className="text-cyan-400 font-bold">Certified Python Business Analyst</span>. This
                    unique fusion of strategic business thinking and technical depth lets me bridge the gap
                    between complex AI research and practical industry solutions.
                  </p>
                  <p>
                    I specialize in{" "}
                    <span className="text-white font-semibold">LangChain, LangGraph, and Neural Architectures</span>{" "}
                    — building intelligent agents and automated pipelines that transform how organizations operate.
                  </p>
                </div>
              </motion.div>

              <motion.div
                custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20"
              >
                <h3 className="text-cyan-300 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ArrowRight size={14} /> My Philosophy
                </h3>
                <p className="italic text-slate-200 text-sm sm:text-base leading-relaxed">
                  "I don't just build models; I engineer intelligent systems. My focus is on creating AI
                  that is robust, scalable, and inherently aligned with strategic business goals."
                </p>
              </motion.div>

              {/* Traits */}
              <motion.div
                custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="grid grid-cols-2 gap-3"
              >
                {traits.map((t, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-800/60 border border-white/10 hover:border-cyan-500/25 transition-all group"
                  >
                    <div className="text-white font-black text-sm mb-1.5 group-hover:text-cyan-400 transition-colors">
                      {t.label}
                    </div>
                    <div className="text-slate-400 text-xs leading-relaxed">{t.desc}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Education */}
            <div>
              <motion.h2
                custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-xl sm:text-2xl font-black text-white mb-8 flex items-center gap-3"
              >
                <GraduationCap className="text-cyan-400 shrink-0" size={24} /> Learning Path
              </motion.h2>
              <div className="space-y-5">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="relative pl-6 border-l-2 border-cyan-500/30 group"
                  >
                    <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-[#080e1a] border-2 border-cyan-500 flex items-center justify-center text-cyan-400 group-hover:border-cyan-300 transition-colors">
                      <item.icon size={12} />
                    </div>
                    <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-white/10 hover:border-cyan-500/25 transition-all">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-black uppercase tracking-wider mb-3">
                        {item.note}
                      </span>
                      <h4 className="text-white font-black text-base sm:text-lg mb-1">{item.degree}</h4>
                      <p className="text-cyan-400 text-sm font-semibold mb-3">{item.institution}</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
