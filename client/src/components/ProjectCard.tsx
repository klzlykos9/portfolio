import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 h-full flex flex-col group"
    >
      <div className="h-48 sm:h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 sm:p-6 flex-grow flex flex-col gap-3">
        <h3 className="text-lg sm:text-xl font-black text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{project.description}</p>

        <div>
          <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1.5">Goal</h4>
          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">{project.goal}</p>
        </div>

        <div>
          <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="inline-block bg-cyan-500/15 text-cyan-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-cyan-500/25"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.dataset && (
          <div>
            <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1.5">Dataset</h4>
            <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">{project.dataset}</p>
          </div>
        )}
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 text-sm font-bold border border-cyan-500/25 hover:border-cyan-400/50">
            <ExternalLink size={14} />
            Live Demo
          </button>
          <button className="px-4 bg-slate-700/80 hover:bg-slate-600/80 text-slate-200 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm font-bold border border-white/10 hover:border-white/20">
            <Github size={14} />
            Code
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
