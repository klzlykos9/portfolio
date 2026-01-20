import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'PROJECTS', path: '/projects' },
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
            ARPAN<span className="text-primary">.SYS</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`text-xs font-black tracking-[0.3em] transition-all hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;