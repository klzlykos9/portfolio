import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Award } from 'lucide-react';

const InternshipTraining: React.FC = () => {
  const experiences = [
    {
      title: "Lean Six Sigma Black Belt Internship",
      organization: "Henry Harvin Education",
      duration: "July 2022 – August 2022",
      role: "Six Sigma Intern",
      outcomes: [
        "Mastered advanced process optimization strategies",
        "Applied Black Belt methodologies to real-world business cases",
        "Collaborated with cross-functional teams on quality improvement",
        "Gained deep insights into statistical analysis and change management"
      ]
    },
    {
      title: "Lean Six Sigma Green Belt Internship",
      organization: "Henry Harvin Education",
      duration: "Sept 2022 – Oct 2022",
      role: "Six Sigma Intern",
      outcomes: [
        "Implemented DMAIC methodology for process improvement",
        "Successfully completed project-based assignments",
        "Analyzed business data to identify bottlenecks",
        "Developed efficient workflows and documentation standards"
      ]
    }
  ];

  return (
    <section id="internships" className="w-full py-20 bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Internship & <span className="text-cyan-400">Training</span>
          </motion.h2>
          <div className="w-20 h-1 bg-cyan-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase size={80} className="text-cyan-400" />
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                  <Calendar size={14} /> {exp.duration}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-gray-400 font-medium">{exp.organization}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-bold text-cyan-500/70 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Award size={16} /> Key Learning Outcomes
                  </h4>
                  <ul className="space-y-3">
                    {exp.outcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
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
  );
};

export default InternshipTraining;
