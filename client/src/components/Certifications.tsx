import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ShieldCheck, GraduationCap, BookOpen, Briefcase } from 'lucide-react';
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

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const degrees = [
    {
      title: "MBA in International Business",
      institution: "Certified Python Business Analyst Path",
      details: "Specialized in data-driven business strategy and predictive analytics. Successfully pivoted into AI/ML through rigorous technical coursework.",
      icon: <GraduationCap className="text-cyan-400" />
    },
    {
      title: "Bachelor's Degree in Science",
      institution: "Math Honors",
      details: "First Class Honors with a Major in Physics and Minor in Chemistry. Developed strong analytical and quantitative foundations.",
      icon: <BookOpen className="text-cyan-400" />
    }
  ];

  const extraCerts = [
    {
      title: "Export Import Procedures & Documentation",
      institution: "Certified during MBA",
      details: "Comprehensive workshop covering international trade logistics and documentation."
    },
    {
      title: "PGDCA (Post Graduate Diploma in Computer Applications)",
      institution: "2014",
      details: "Professional diploma covering C#, Tally ERP, and Microsoft Office productivity suite."
    }
  ];

  const certs: Certification[] = [
    {
      id: 'lssbb',
      title: 'Lean Six Sigma Black Belt',
      authority: 'Henry Harvin Education',
      year: '2022',
      image: lssbbImg,
      skills: ['Advanced Process Optimization', 'Statistical Analysis', 'Project Management', 'Change Leadership']
    },
    {
      id: 'lssgb',
      title: 'Lean Six Sigma Green Belt',
      authority: 'Henry Harvin Education',
      year: '2021',
      image: lssgbImg,
      skills: ['DMAIC Methodology', 'Process Improvement', 'Data Collection', 'Problem Solving']
    },
    {
      id: 'cpba',
      title: 'Certified Python Business Analyst',
      authority: 'Henry Harvin Education',
      year: '2020',
      image: cpbaImg,
      skills: ['Python for Data Analysis', 'Statistical Modeling', 'Predictive Analytics', 'Business Intelligence']
    }
  ];

  return (
    <section id="certifications" className="w-full py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Education & <span className="text-cyan-400">Certifications</span>
          </motion.h2>
          <div className="w-20 h-1 bg-cyan-500 rounded-full" />
        </div>

        {/* Degrees Section */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {degrees.map((degree, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 hover:border-cyan-500/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-2xl">
                  {degree.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{degree.title}</h3>
                  <p className="text-cyan-400 font-medium text-sm mb-4">{degree.institution}</p>
                  <p className="text-gray-400 leading-relaxed">{degree.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <ShieldCheck className="text-cyan-400" />
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedCert(cert)}
                className="bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="text-white" size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                    <ShieldCheck size={14} /> {cert.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{cert.authority}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.slice(0, 2).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 rounded text-[10px] text-gray-400 uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extra Courses Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Briefcase className="text-cyan-400" />
            Additional Qualifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {extraCerts.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/30 p-6 rounded-2xl border border-white/5"
              >
                <h4 className="text-lg font-bold text-white mb-1">{cert.title}</h4>
                <p className="text-cyan-500/80 text-sm mb-2">{cert.institution}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{cert.details}</p>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors z-10"
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-white p-4">
                  <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto shadow-lg" />
                </div>
                <div className="p-8 sm:p-12">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedCert.title}</h3>
                  <p className="text-cyan-400 text-xl mb-6">{selectedCert.authority}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-3 flex items-center gap-2">
                        <Award size={18} className="text-cyan-400" /> Key Skills Gained
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedCert.skills.map((skill, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-mono">Issued: {selectedCert.year}</span>
                        <div className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold border border-cyan-500/20">
                          Verified Professional
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
