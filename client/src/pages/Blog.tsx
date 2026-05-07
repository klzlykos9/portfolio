import React from 'react';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import { PenTool, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
              <PenTool size={12} /> Articles & Insights
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Articles</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6" />
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Insights into AI, machine learning, automation, and emerging technologies shaping the future.
            </p>
          </motion.div>

          {/* Featured Article */}
          {blogs.length > 0 && (
            <motion.div
              custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="mb-12 sm:mb-16"
            >
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-800/60 backdrop-blur-sm group hover:border-cyan-500/30 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-56 sm:h-72 lg:h-auto overflow-hidden">
                    <img
                      src={blogs[0].image}
                      alt={blogs[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 sm:p-10 flex flex-col justify-center">
                    <span className="inline-flex items-center gap-1.5 text-cyan-300 text-xs font-black uppercase tracking-widest mb-4">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                      Featured Article
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                      {blogs[0].title}
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base mb-6 line-clamp-3 leading-relaxed">
                      {blogs[0].excerpt}
                    </p>
                    <div className="flex items-center text-xs text-slate-400 mb-7 gap-3">
                      <span>{blogs[0].date}</span>
                      <span className="w-1 h-1 bg-slate-500 rounded-full" />
                      <span>{blogs[0].readTime}</span>
                    </div>
                    <button className="self-start group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-white text-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all duration-300">
                      Read Article
                      <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(1).map((blog, i) => (
              <motion.div
                key={blog.id}
                custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
