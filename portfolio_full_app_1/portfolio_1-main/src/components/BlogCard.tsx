import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col group"
    >
      <div className="h-40 sm:h-48 overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-4 sm:p-6 flex-grow">
        <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-3">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {blog.date}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {blog.readTime}
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
        <p className="text-gray-300 line-clamp-3 text-sm sm:text-base">{blog.excerpt}</p>
      </div>
      
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-4">
        <button className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors flex items-center text-sm sm:text-base group-hover:translate-x-1 duration-300">
          Read Article
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default BlogCard;