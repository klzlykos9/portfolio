import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';

const Experience: React.FC = () => {
  const jobs = [
    {
      role: "Sales Team Lead",
      company: "THE INSPiREEZ IT SOLUTION",
      type: "Full-time",
      period: "Apr 2015 – Sep 2017",
      location: "Bhubaneswar, India",
      description: "Led international sales operations and technical cleanup initiatives.",
      points: [
        "Managed international sales call center operations with focus on VoIP campaigns",
        "Monitored and optimized team KPIs to ensure consistent target achievement",
        "Delegated tasks across diverse teams and managed complex client communications",
        "Led high-impact service and remote technical cleanup operations"
      ]
    },
    {
      role: "Customer Service Representative",
      company: "Shinux.com",
      type: "Full-time",
      period: "May 2014 – Mar 2015",
      location: "Bhubaneswar, India",
      description: "Drove customer engagement and sales support in a fast-paced environment.",
      points: [
        "Participated as a sales process trainee, mastering lead qualification techniques",
        "Handled diverse client portfolios with focus on high-quality service support",
        "Optimized customer interaction workflows across multiple platforms",
        "Supported senior management in lead generation and client onboarding"
      ]
    },
    {
      role: "Accountant",
      company: "SACHIN ENTERPRISES",
      type: "Full-time",
      period: "Jan 2014 – Apr 2014",
      location: "Bhubaneswar, India",
      description: "Managed core financial operations and accounting records.",
      points: [
        "Executed end-to-end Tally ERP accounting and financial record management",
        "Streamlined billing and reconciliation processes for improved accuracy",
        "Maintained comprehensive financial documentation and audit-ready records",
        "Collaborated on monthly financial reports and budget tracking"
      ]
    }
  ];

  return (
    <section id="experience" className="w-full py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Job <span className="text-cyan-400">Experience</span>
          </motion.h2>
          <div className="w-20 h-1 bg-cyan-500 rounded-full" />
        </div>

        <div className="space-y-12">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 sm:pl-0"
            >
              {/* Desktop Timeline */}
              <div className="hidden sm:grid grid-cols-12 gap-8 items-start">
                <div className="col-span-3 text-right">
                  <p className="text-cyan-400 font-mono text-sm mb-1">{job.period}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">{job.type}</p>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-10" />
                  <div className="w-0.5 h-full bg-slate-800" />
                </div>
                <div className="col-span-8 bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                      <div className="flex items-center gap-2 text-gray-400 mt-1">
                        <Building2 size={16} className="text-cyan-500" />
                        <span className="text-lg font-medium">{job.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 italic text-sm">{job.description}</p>
                  <ul className="space-y-3">
                    {job.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                        <CheckCircle2 className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="sm:hidden">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-800" />
                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-cyan-500" />
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                  <p className="text-cyan-400 font-mono text-xs mb-2">{job.period}</p>
                  <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                  <p className="text-gray-400 text-sm mb-4">{job.company}</p>
                  <ul className="space-y-3">
                    {job.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-xs">
                        <CheckCircle2 className="text-cyan-500 mt-0.5 flex-shrink-0" size={14} />
                        {point}
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

export default Experience;
