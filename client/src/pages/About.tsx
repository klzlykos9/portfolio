import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Calendar,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const EducationTimeline = () => {
  const education = [
    {
      degree: "Masters in Business Administration (International Business)",
      institution: "Lovely Professional University",
      period: "",
      description:
        "Capstone: 'The study and effect of online marketing in today's business environment'",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      degree: "Bachelors in Science (Math Hons)",
      institution: "",
      period: "",
      description: "First Class Hons (Major in Physics & Minor in Chemistry)",
      icon: <BookOpen className="w-6 h-6" />,
    },
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
              <span className="flex items-center gap-1 text-cyan-400 text-sm font-mono">
                <Calendar size={14} /> {item.period}
              </span>
            </div>
            <p className="text-cyan-200/80 mb-2">{item.institution}</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Section Title */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-bold text-white mb-4"
            >
              About <span className="text-cyan-400">Me</span>
            </motion.h2>
            <div className="w-20 h-1 bg-cyan-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-cyan-500/10"
              >
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Award className="text-cyan-400" size={32} />
                  Professional Vision
                </h3>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    I am an{" "}
                    <span className="text-cyan-400 font-semibold">
                      AI Engineer and Business Strategist
                    </span>{" "}
                    dedicated to architecting
                    <span className="text-blue-400 font-semibold">
                      {" "}
                      production-grade Generative AI systems
                    </span>{" "}
                    that deliver tangible business value.
                  </p>
                  <p>
                    My journey into AI began during my MBA when I specialized as
                    a{" "}
                    <span className="text-cyan-400 font-semibold">
                      Certified Python Business Analyst
                    </span>
                    . This unique combination of strategic business acumen and
                    technical expertise allows me to bridge the gap between
                    complex AI research and practical, scalable industry
                    solutions.
                  </p>
                  <p>
                    I specialize in{" "}
                    <span className="text-white font-medium">
                      LangChain, LangGraph, and Neural Architectures
                    </span>
                    , building intelligent agents and automated pipelines that
                    transform how organizations operate and make decisions.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/30 p-8 rounded-3xl border border-white/5"
              >
                <h4 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <ChevronRight size={24} /> My Philosophy
                </h4>
                <p className="italic text-gray-400 text-lg">
                  "I don't just build models; I engineer intelligent systems. My
                  focus is on creating AI that is not only impressive
                  technically but is also robust, scalable, and inherently
                  aligned with strategic business goals."
                </p>
              </motion.div>
            </div>

            {/* Timeline Column */}
            <div className="lg:col-span-5">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <GraduationCap className="text-cyan-400" size={32} />
                  Learning Path
                </h3>
                <EducationTimeline />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
