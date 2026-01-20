import React from 'react';
import { Database } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-10 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg mb-4">
            <Database className="h-6 w-6 text-blue-700" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            A comprehensive collection of AI, machine learning, and software development projects showcasing cutting-edge technologies and real-world applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="text-center">
          <button className="px-6 sm:px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-lg text-sm sm:text-base">
            View All Projects on GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;