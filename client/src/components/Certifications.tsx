import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ShieldCheck, GraduationCap, BookOpen, Briefcase, Sparkles } from 'lucide-react';
import lssgbImg from '@assets/Lean_six_sigma_green_belt_1768872542109.jpg';
import lssbbImg from '@assets/Lean_six_sigma_black_belt_1768872548115.jpg';
import cpbaImg from '@assets/certified_python_business_analyst_1768872554502.jpg';

interface Certification {
  id: string;
  title: string;
  authority: string;
  year: string;
  image: string;
  skills: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const degrees = [
    {
      title: 'MBA in International Business',
      institution: 'Lovely Professional University',
      note: 'Certified Python Business Analyst Path',
      details: 'Specialized in data-driven business strategy and predictive analytics. Successfully pivoted into AI/ML through rigorous technical coursework.',
      icon: GraduationCap,
    },
    {
      title: "Bachelor's in Science — Math Hons",
      institution: 'First Class with Distinction',
      note: 'Major: Physics • Minor: Chemistry',
      details: 'Developed strong analytical and quantitative foundations in applied mathematics and physics.',
      icon: BookOpen,
    },
  ];

  const extraCerts = [
    {
      title: 'Export Import Procedures & Documentation',
      institution: 'Certified during MBA',
      details: 'Comprehensive workshop covering international trade logistics and documentation.',
    },
    {
      title: 'PGDCA — Post Graduate Diploma in Computer Applications',
      institution: '2014',
      details: 'Professional diploma covering C#, Tally ERP, and Microsoft Office productivity suite.',
    },
  ];

  const certs: Certification[] = [
    {
      id: 'lssbb',
      title: 'Lean Six Sigma Black Belt',
      authority: 'Henry Harvin Education',
      year: '2022',
      image: lssbbImg,
      skills: ['Advanced Process Optimization', 'Statistical Analysis', 'Project Management', 'Change Leadership'],
    },
    {
      id: 'lssgb',
      title: 'Lean Six Sigma Green Belt',
      authority: 'Henry Harvin Education',
      year: '2021',
      image: lssgbImg,
      skills: ['DMAIC Methodology', 'Process Improvement', 'Data Collection', 'Problem Solving'],
    },
    {
      id: 'cpba',
      title: 'Certified Python Business Analyst',
      authority: 'Henry Harvin Education',
      year: '2020',
      image: cpbaImg,
      skills: ['Python for Data Analysis', 'Statistical Modeling', 'Predictive Analytics', 'Business Intelligence'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={12} /> Education & Credentials
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Certifications</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </motion.div>

        {/* Degrees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16 sm:mb-20">
          {degrees.map((degree, i) => (
            <motion.div
              key={i}
              custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-white/10 hover:border-cyan-500/25 transition-all backdrop-blur-sm group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
                  <degree.icon className="text-cyan-400" size={22} />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-black uppercase tracking-wider mb-2">
                    {degree.note}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white mb-1">{degree.title}</h3>
                  <p className="text-cyan-400 font-bold text-sm mb-3">{degree.institution}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{degree.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16 sm:mb-20">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-xl sm:text-2xl font-black text-white mb-8 flex items-center gap-3"
          >
            <ShieldCheck className="text-cyan-400 shrink-0" size={24} /> Professional Certifications
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.id}
                custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedCert(cert)}
                className="bg-slate-800/60 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group backdrop-blur-sm"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="text-white drop-shadow-lg" size={30} />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-2">
                    <ShieldCheck size={12} /> {cert.year}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-4">{cert.authority}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 2).map((skill, j) => (
                      <span key={j} className="px-2 py-1 bg-slate-700/80 rounded text-[10px] text-slate-200 font-bold uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extra Qualifications */}
        <div>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-xl sm:text-2xl font-black text-white mb-8 flex items-center gap-3"
          >
            <Briefcase className="text-cyan-400 shrink-0" size={24} /> Additional Qualifications
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {extraCerts.map((cert, i) => (
              <motion.div
                key={i}
                custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-white/10 hover:border-white/20 transition-all"
              >
                <h4 className="text-sm sm:text-base font-black text-white mb-1">{cert.title}</h4>
                <p className="text-cyan-400 text-xs font-bold mb-3">{cert.institution}</p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{cert.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black/90 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-white p-4 flex items-center justify-center">
                  <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto shadow-lg" />
                </div>
                <div className="p-6 sm:p-10">
                  <div className="inline-flex items-center gap-1.5 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <ShieldCheck size={12} /> {selectedCert.year}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">{selectedCert.title}</h3>
                  <p className="text-cyan-400 text-base sm:text-lg font-bold mb-6">{selectedCert.authority}</p>

                  <div>
                    <h4 className="text-slate-400 uppercase tracking-widest text-xs font-black mb-4 flex items-center gap-2">
                      <Award size={14} className="text-cyan-400" /> Key Skills Gained
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCert.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-200 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/8 flex items-center justify-between">
                    <span className="text-slate-400 font-mono text-sm">Issued: {selectedCert.year}</span>
                    <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 rounded-full text-xs font-black border border-cyan-500/20">
                      Verified Professional
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </div>
  );
};

export default Certifications;
