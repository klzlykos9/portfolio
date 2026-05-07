import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 h-full flex flex-col group"
    >
      <div className="h-44 sm:h-48 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 sm:p-6 flex-grow flex flex-col gap-3">
        <div className="flex items-center gap-3 text-slate-400 text-xs">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {blog.date}
          </span>
          <span className="w-1 h-1 bg-slate-600 rounded-full" />
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {blog.readTime}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-white line-clamp-2 group-hover:text-cyan-400 transition-colors leading-snug">
          {blog.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 flex-grow">{blog.excerpt}</p>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <button className="flex items-center gap-1.5 text-cyan-400 font-bold text-sm hover:text-cyan-300 transition-colors group-hover:gap-2.5">
          Read Article
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default BlogCard;
