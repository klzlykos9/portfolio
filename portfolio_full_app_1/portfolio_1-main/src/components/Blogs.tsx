import React from 'react';
import { FileText } from 'lucide-react';
import { blogs } from '../data/blogs';
import BlogCard from './BlogCard';

const Blogs: React.FC = () => {
  return (
    <section id="blog" className="py-10 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg mb-4">
            <FileText className="h-6 w-6 text-blue-700" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
          <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Cutting-edge insights into AI, machine learning, automation, and emerging technologies shaping the future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-6 sm:px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-lg text-sm sm:text-base">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;