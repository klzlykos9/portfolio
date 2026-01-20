import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  User, 
  Code2, 
  Award, 
  BookOpen, 
  Briefcase, 
  Layers, 
  PenTool, 
  Mail,
  ChevronRight
} from 'lucide-react';

const sections = [
  { id: 'about', title: 'About', icon: User, color: 'from-blue-400 to-cyan-400', desc: 'Professional Vision & Philosophy' },
  { id: 'skills', title: 'Skills', icon: Code2, color: 'from-orange-400 to-yellow-400', desc: 'Technical Stack & Expertise' },
  { id: 'certifications', title: 'Certifications', icon: Award, color: 'from-purple-400 to-pink-400', desc: 'Education & Professional Certificates' },
  { id: 'internships', title: 'Internships', icon: BookOpen, color: 'from-green-400 to-emerald-400', desc: 'Training & Practical Learning' },
  { id: 'experience', title: 'Experience', icon: Briefcase, color: 'from-red-400 to-orange-400', desc: 'Career History & Key Roles' },
  { id: 'projects', title: 'Projects', icon: Layers, color: 'from-indigo-400 to-blue-400', desc: 'Featured AI & Engineering Work' },
  { id: 'blogs', title: 'Blog', icon: PenTool, color: 'from-cyan-400 to-teal-400', desc: 'Insights & Research Papers' },
  { id: 'contact', title: 'Contact', icon: Mail, color: 'from-violet-400 to-fuchsia-400', desc: 'Let\'s Connect & Collaborate' },
];

export const SectionPreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-16 bg-white/30 backdrop-blur-sm relative overflow-hidden">
      {/* Anime Energy Lines Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 20 L100 80 M0 80 L100 20 M50 0 L50 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explore <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium hidden sm:block">
            Swipe to navigate <ChevronRight className="inline-block w-4 h-4" />
          </p>
        </div>

        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => scrollToSection(section.id)}
              className="flex-shrink-0 w-[280px] sm:w-[320px] aspect-[4/5] rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 cursor-pointer group relative overflow-hidden snap-center"
            >
              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <section.icon size={28} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {section.desc}
                  </p>
                </div>
              </div>

              {/* Hover Visual Accent */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${section.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              
              {/* Background Accent Gradient */}
              <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-[0.03] rounded-full blur-3xl transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};