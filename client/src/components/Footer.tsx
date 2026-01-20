import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-800/50 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 text-cyan-400" />
              <span className="ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Arpan P. Nayak
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-sm sm:text-base">
              Building intelligent systems that solve real-world problems.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/arpanpnayak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/arpanpnayak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:arpanpnayak@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-cyan-400">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>Jalandhar, Punjab, India</li>
              <li>arpanpnayak@gmail.com</li>
              <li>+91 9090000930</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-500 text-sm sm:text-base">
          <p>© {new Date().getFullYear()} Arpan P. Nayak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;