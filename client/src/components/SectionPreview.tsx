import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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

// Import AI themed visuals
import aboutImg from '@assets/generated_images/ai_neural_network_about_me_section_visual.png';
import skillsImg from '@assets/generated_images/ai_skills_and_programming_visual.png';
import certsImg from '@assets/generated_images/ai_certifications_and_achievements_visual.png';
import trainingImg from '@assets/generated_images/ai_training_and_learning_visual.png';
import careerImg from '@assets/generated_images/ai_career_and_professional_experience_visual.png';
import workImg from '@assets/generated_images/ai_projects_and_development_visual.png';
import insightsImg from '@assets/generated_images/ai_blog_and_research_insights_visual.png';
import connectImg from '@assets/generated_images/ai_contact_and_connection_visual.png';

const sections = [
  { id: 'about', title: 'About', icon: User, color: 'from-blue-500 to-cyan-500', desc: 'My Story & Vision', image: aboutImg },
  { id: 'skills', title: 'Skills', icon: Code2, color: 'from-amber-400 to-orange-600', desc: 'Tech & Expertise', image: skillsImg },
  { id: 'certifications', title: 'Certs', icon: Award, color: 'from-purple-500 to-fuchsia-600', desc: 'Degrees & Honors', image: certsImg },
  { id: 'internships', title: 'Training', icon: BookOpen, color: 'from-emerald-500 to-teal-600', desc: 'Growth & Learning', image: trainingImg },
  { id: 'experience', title: 'Career', icon: Briefcase, color: 'from-rose-500 to-red-600', desc: 'Roles & Results', image: careerImg },
  { id: 'projects', title: 'Work', icon: Layers, color: 'from-blue-600 to-indigo-700', desc: 'AI & Code Projects', image: workImg },
  { id: 'blogs', title: 'Insights', icon: PenTool, color: 'from-cyan-500 to-blue-600', desc: 'Articles & Research', image: insightsImg },
  { id: 'contact', title: 'Connect', icon: Mail, color: 'from-violet-500 to-purple-700', desc: 'Say Hello!', image: connectImg },
];

export const SectionPreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    if (id === 'projects') {
      navigate('/projects');
      return;
    }
    
    // Check if the route exists, otherwise assume it's a section on its own page
    const routes: Record<string, string> = {
      'about': '/about',
      'skills': '/skills',
      'certifications': '/certifications',
      'internships': '/internships',
      'experience': '/experience',
      'blogs': '/blog',
      'contact': '/contact'
    };

    if (routes[id]) {
      navigate(routes[id]);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#' + id);
      }
    }
  };

  return (
    <section className="w-full py-20 relative overflow-hidden bg-slate-900/40 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Section <span className="text-primary">Shortcuts</span>
              <span className="text-2xl animate-pulse">🤖</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium">Neural pathways to my digital workspace</p>
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
              className="flex-shrink-0 w-[300px] sm:w-[340px] aspect-[16/10] rounded-[2.5rem] bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-2xl cursor-pointer group relative overflow-hidden snap-center flex flex-col justify-end p-8"
            >
              {/* Background AI Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent`} />
              </div>

              {/* Anime Gradient Glow */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700`} />

              <div className="relative z-10 flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {section.title}
                    <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-300 text-sm font-medium">
                    {section.desc}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color} shadow-lg shadow-black/20 group-hover:rotate-6 transition-transform duration-500`}>
                  <section.icon className="text-white" size={24} />
                </div>
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