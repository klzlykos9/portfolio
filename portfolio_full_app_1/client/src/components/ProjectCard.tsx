import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col group"
    >
      <div className="h-48 sm:h-56 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-4 sm:p-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
        <p className="text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-xs sm:text-sm font-semibold text-cyan-400 mb-1">Goal:</h4>
          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{project.goal}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs sm:text-sm font-semibold text-cyan-400 mb-1">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span 
                key={index} 
                className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full border border-cyan-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {project.dataset && (
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-cyan-400 mb-1">Dataset:</h4>
            <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{project.dataset}</p>
          </div>
        )}
      </div>
      
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="flex-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 py-2 rounded-lg transition-all duration-300 flex items-center justify-center text-sm border border-cyan-500/30">
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>Live Demo</span>
          </button>
          <button className="sm:px-4 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 py-2 rounded-lg transition-colors flex items-center justify-center text-sm border border-gray-600/50">
            <Github className="h-4 w-4 mr-1" />
            <ChevronRight className="h-4 w-4 ml-1" />
            <span>Code</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;