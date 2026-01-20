import React from 'react';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Latest Articles
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights into AI, machine learning, automation, and emerging technologies shaping the future
            </p>
          </motion.div>

          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-64 lg:h-auto">
                  <img 
                    src={blogs[0].image} 
                    alt={blogs[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-cyan-400 text-sm font-medium mb-2">Featured Article</span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{blogs[0].title}</h2>
                  <p className="text-gray-300 mb-6 line-clamp-3">{blogs[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-400 mb-6">
                    <span>{blogs[0].date}</span>
                    <span className="mx-2">•</span>
                    <span>{blogs[0].readTime}</span>
                  </div>
                  <button className="self-start px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
                    Read Article
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.slice(1).map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;