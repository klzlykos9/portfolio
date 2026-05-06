import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Award, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55 } }),
};

const experiences = [
  {
    title: 'Lean Six Sigma Black Belt Internship',
    organization: 'Henry Harvin Education',
    duration: 'July 2022 – August 2022',
    role: 'Six Sigma Intern',
    color: 'from-cyan-500/15 to-blue-600/15',
    border: 'border-cyan-500/20',
    outcomes: [
      'Mastered advanced process optimization strategies',
      'Applied Black Belt methodologies to real-world business cases',
      'Collaborated with cross-functional teams on quality improvement',
      'Gained deep insights into statistical analysis and change management',
    ],
  },
  {
    title: 'Lean Six Sigma Green Belt Internship',
    organization: 'Henry Harvin Education',
    duration: 'Sept 2022 – Oct 2022',
    role: 'Six Sigma Intern',
    color: 'from-emerald-500/15 to-teal-600/15',
    border: 'border-emerald-500/20',
    outcomes: [
      'Implemented DMAIC methodology for process improvement',
      'Successfully completed project-based assignments',
      'Analyzed business data to identify bottlenecks',
      'Developed efficient workflows and documentation standards',
    ],
  },
];

const InternshipTraining: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={12} /> Practical Training
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
            Internship & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Training</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${exp.color} border ${exp.border} backdrop-blur-sm overflow-hidden group transition-all duration-400`}
            >
              {/* Decorative icon */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase size={90} className="text-cyan-400" />
              </div>

              <div className="relative z-10 flex flex-col gap-5">
                {/* Meta */}
                <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-black uppercase tracking-widest">
                  <Calendar size={13} /> {exp.duration}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-1 group-hover:text-cyan-300 transition-colors leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm sm:text-base">{exp.organization}</p>
                </div>

                {/* Role badge */}
                <span className="self-start px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 text-slate-300 text-xs font-black uppercase tracking-wider">
                  {exp.role}
                </span>

                {/* Outcomes */}
                <div>
                  <h4 className="text-[11px] font-black text-cyan-500/70 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Award size={13} /> Key Learning Outcomes
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.outcomes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm">
                        <ChevronRight className="text-cyan-500 mt-0.5 shrink-0" size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default InternshipTraining;
