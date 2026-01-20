import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Code2, 
  Award, 
  BookOpen, 
  Briefcase, 
  Layers, 
  PenTool, 
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const sections = [
  { id: 'about', title: 'About', icon: User, color: 'from-blue-500 to-cyan-500', desc: 'My Story & Vision', animeIcon: '🌊' },
  { id: 'skills', title: 'Skills', icon: Code2, color: 'from-amber-400 to-orange-600', desc: 'Tech & Expertise', animeIcon: '🔥' },
  { id: 'certifications', title: 'Certs', icon: Award, color: 'from-purple-500 to-fuchsia-600', desc: 'Degrees & Honors', animeIcon: '✨' },
  { id: 'internships', title: 'Training', icon: BookOpen, color: 'from-emerald-500 to-teal-600', desc: 'Growth & Learning', animeIcon: '🍃' },
  { id: 'experience', title: 'Career', icon: Briefcase, color: 'from-rose-500 to-red-600', desc: 'Roles & Results', animeIcon: '⚔️' },
  { id: 'projects', title: 'Work', icon: Layers, color: 'from-blue-600 to-indigo-700', desc: 'AI & Code Projects', animeIcon: '🤖' },
  { id: 'blogs', title: 'Insights', icon: PenTool, color: 'from-cyan-500 to-blue-600', desc: 'Articles & Research', animeIcon: '📖' },
  { id: 'contact', title: 'Connect', icon: Mail, color: 'from-violet-500 to-purple-700', desc: 'Say Hello!', animeIcon: '🤝' },
];

export const SectionPreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 350;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-20 relative overflow-hidden bg-slate-900/40 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Section <span className="text-primary">Shortcuts</span>
              <span className="text-2xl animate-pulse">⚡</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium">Quick navigation to explore my journey</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-slate-800 border border-white/5 hover:bg-slate-700 hover:border-primary/50 text-white transition-all shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-slate-800 border border-white/5 hover:bg-slate-700 hover:border-primary/50 text-white transition-all shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-10 pt-4 no-scrollbar snap-x snap-mandatory"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => scrollToSection(section.id)}
              className="flex-shrink-0 w-[300px] sm:w-[340px] aspect-[16/10] rounded-[2.5rem] bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-2xl cursor-pointer group relative overflow-hidden snap-center p-8 flex flex-col justify-between"
            >
              {/* Anime Gradient Glow */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700`} />

              <div className="relative z-10 flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${section.color} shadow-lg shadow-black/20 group-hover:rotate-6 transition-transform duration-500`}>
                  <section.icon className="text-white" size={32} />
                </div>
                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
                  {section.animeIcon}
                </span>
              </div>
              
              <div className="relative z-10 space-y-1">
                <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors flex items-center gap-2">
                  {section.title}
                  <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-400 text-sm font-medium">
                  {section.desc}
                </p>
              </div>

              {/* Decorative Lines */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};