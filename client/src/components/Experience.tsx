import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, Building2, Sparkles, Briefcase, TrendingUp } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

type Tag = 'AI & Process' | 'Sales & Ops' | 'Finance';

const jobs: {
  role: string;
  company: string;
  tag: Tag;
  period: string;
  duration: string;
  location: string;
  description: string;
  points: string[];
  accentColor: string;
  borderColor: string;
  bgColor: string;
  dotColor: string;
}[] = [
  {
    role: 'Process Improvement Manager',
    company: 'Henry Harvin India Education LLP',
    tag: 'AI & Process',
    period: 'Sep 2022 – Oct 2022',
    duration: '2 months',
    location: 'India',
    description:
      'Applied Lean Six Sigma Black Belt methodology to lead process improvement and operational excellence initiatives.',
    points: [
      'Led end-to-end process optimization projects using DMAIC framework and Black Belt tools',
      'Analyzed organizational workflows to identify inefficiencies and design measurable improvements',
      'Collaborated with cross-functional teams on quality transformation and change management',
      'Developed data-driven reports and action plans to track and sustain process gains',
    ],
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'from-cyan-500/8 to-blue-600/8',
    dotColor: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]',
  },
  {
    role: 'Quality Management Specialist',
    company: 'Henry Harvin India',
    tag: 'AI & Process',
    period: 'Jul 2022 – Aug 2022',
    duration: '2 months',
    location: 'India',
    description:
      'Implemented Green Belt quality management frameworks to drive measurable process and quality improvements.',
    points: [
      'Applied DMAIC methodology to real-world business quality challenges across departments',
      'Conducted statistical analysis to identify root causes and eliminate process defects',
      'Created standard operating procedures and process documentation for quality assurance',
      'Delivered measurable improvements in process efficiency and output quality metrics',
    ],
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'from-emerald-500/8 to-teal-600/8',
    dotColor: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]',
  },
  {
    role: 'Sales Team Lead',
    company: 'THE INSPiREEZ IT SOLUTION',
    tag: 'Sales & Ops',
    period: 'Apr 2015 – Sep 2017',
    duration: '2 yrs 6 mos',
    location: 'Bhubaneswar, India',
    description:
      'Led international sales operations and technical support initiatives for a fast-growing IT services company.',
    points: [
      'Managed international sales call center operations running VoIP-based outbound campaigns',
      'Delegated tasks, set deadlines, and monitored team KPIs to ensure consistent target achievement',
      'Handled complex international client relationships and ensured high-quality service delivery',
      'Oversaw remote technical cleanup and troubleshooting operations for global clients',
    ],
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'from-amber-500/8 to-orange-500/8',
    dotColor: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]',
  },
  {
    role: 'Customer Service Representative',
    company: 'Shinux.com',
    tag: 'Sales & Ops',
    period: 'May 2014 – Mar 2015',
    duration: '11 months',
    location: 'Bhubaneswar, India',
    description:
      'Drove customer engagement and sales support in a high-volume, client-facing environment.',
    points: [
      'Mastered lead qualification techniques as part of an intensive sales process training programme',
      'Managed diverse client portfolios with a consistent focus on high-quality service and retention',
      'Optimised customer interaction workflows across multiple communication platforms',
      'Supported senior management in lead generation, onboarding, and client follow-up cycles',
    ],
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'from-blue-500/8 to-indigo-600/8',
    dotColor: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]',
  },
  {
    role: 'Accountant',
    company: 'SACHIN ENTERPRISES',
    tag: 'Finance',
    period: 'Jan 2014 – Apr 2014',
    duration: '4 months',
    location: 'Bhubaneswar, India',
    description:
      'Managed core financial operations and maintained audit-ready accounting records using Tally ERP.',
    points: [
      'Executed end-to-end Tally ERP accounting, billing, and financial record management',
      'Streamlined reconciliation processes for improved accuracy and reduced reporting time',
      'Maintained comprehensive financial documentation compliant with audit requirements',
      'Contributed to monthly financial reports and budget tracking for management review',
    ],
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'from-purple-500/8 to-pink-500/8',
    dotColor: 'bg-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]',
  },
];

const TAG_COLORS: Record<Tag, string> = {
  'AI & Process': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
  'Sales & Ops':  'bg-amber-500/10 text-amber-300 border-amber-500/25',
  'Finance':      'bg-purple-500/10 text-purple-300 border-purple-500/25',
};

const Experience: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | Tag>('All');

  const filters: Array<'All' | Tag> = ['All', 'AI & Process', 'Sales & Ops', 'Finance'];
  const filtered = activeFilter === 'All' ? jobs : jobs.filter(j => j.tag === activeFilter);

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
      <section className="w-full py-16 sm:py-24 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles size={12} /> Professional Timeline
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-3">
              Work <span className="text-cyan-400">Experience</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-6">
              From finance and sales operations to process engineering and AI — a career built on continuous reinvention.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="grid grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
          >
            {[
              { icon: Briefcase, label: 'Roles', value: '5', color: 'text-cyan-400' },
              { icon: TrendingUp, label: 'Years Active', value: '5+', color: 'text-amber-400' },
              { icon: Building2, label: 'Industries', value: '3', color: 'text-emerald-400' },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <div key={i} className="p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-white/8 text-center backdrop-blur-sm">
                <Icon className={`${color} mx-auto mb-2`} size={20} />
                <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Filter chips */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-cyan-500 text-white border-cyan-500 shadow-[0_0_16px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-800/60 text-slate-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden sm:block absolute left-[calc(25%+1.5rem)] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-slate-700 to-transparent" />

            <div className="space-y-8 sm:space-y-10">
              {filtered.map((job, index) => (
                <motion.div
                  key={`${job.company}-${job.period}`}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  {/* Desktop: 3-col grid */}
                  <div className="hidden sm:grid grid-cols-12 gap-6 items-start">
                    {/* Left: date column */}
                    <div className="col-span-3 text-right pt-6">
                      <p className={`${job.accentColor} font-mono text-sm font-bold mb-1`}>{job.period}</p>
                      <p className="text-slate-500 text-xs uppercase tracking-widest">{job.duration}</p>
                      <span className={`mt-3 inline-block px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${TAG_COLORS[job.tag]}`}>
                        {job.tag}
                      </span>
                    </div>

                    {/* Center: dot + line */}
                    <div className="col-span-1 flex flex-col items-center pt-6">
                      <div className={`w-4 h-4 rounded-full ${job.dotColor} z-10 shrink-0`} />
                    </div>

                    {/* Right: card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.005 }}
                      className={`col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${job.bgColor} border ${job.borderColor} backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-5">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white mb-1 leading-tight">{job.role}</h3>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Building2 size={14} className={job.accentColor} />
                            <span className="text-sm font-bold">{job.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs shrink-0">
                          <MapPin size={13} /> {job.location}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm italic mb-5 leading-relaxed">{job.description}</p>
                      <ul className="space-y-2.5">
                        {job.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                            <CheckCircle2 className={`${job.accentColor} mt-0.5 shrink-0`} size={15} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Mobile */}
                  <div className="sm:hidden">
                    <div className={`p-5 rounded-2xl bg-gradient-to-br ${job.bgColor} border ${job.borderColor}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${job.dotColor}`} />
                        <span className={`${job.accentColor} font-mono text-xs font-bold`}>{job.period}</span>
                        <span className={`ml-auto px-2 py-0.5 rounded-full border text-[9px] font-black uppercase ${TAG_COLORS[job.tag]}`}>{job.tag}</span>
                      </div>
                      <h3 className="text-lg font-black text-white mb-1">{job.role}</h3>
                      <p className="text-slate-300 text-sm font-medium mb-4">{job.company}</p>
                      <ul className="space-y-2">
                        {job.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                            <CheckCircle2 className={`${job.accentColor} mt-0.5 shrink-0`} size={13} />
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
        </div>
      </section>
    </div>
  );
};

export default Experience;
