import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SKILLS', path: '/skills' },
    { name: 'CERTIFICATIONS', path: '/certifications' },
    { name: 'TRAINING', path: '/internships' },
    { name: 'CAREER', path: '/experience' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'BLOG', path: '/blog' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Cpu className="text-primary" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            ARPAN'S <span className="text-primary">PORTFOLIO</span>
          </span>
        </div>

        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`text-[10px] font-black tracking-[0.2em] transition-all hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <button className="xl:hidden text-slate-400 hover:text-white transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;