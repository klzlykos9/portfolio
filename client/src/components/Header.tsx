import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu, Menu, X, ChevronDown, Grid3X3 } from 'lucide-react';

const PRIMARY = [
  { name: 'Home',     path: '/' },
  { name: 'About',    path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Roadmap',  path: '/roadmap' },
  { name: 'Contact',  path: '/contact' },
];

const MORE = [
  { name: 'Skills',         path: '/skills' },
  { name: 'Experience',     path: '/experience' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Training',       path: '/internships' },
  { name: 'Blog',           path: '/blog' },
];

const ALL = [...PRIMARY, ...MORE];

const Header: React.FC = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen,   setMoreOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close "More" on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setMoreOpen(false); }, [location.pathname]);

  const go = (path: string) => { navigate(path); setMobileOpen(false); setMoreOpen(false); };

  const isActive = (path: string) => location.pathname === path;
  const moreActive = MORE.some(m => isActive(m.path));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 220, damping: 28 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#06080f]/92 backdrop-blur-2xl border-b border-white/6 shadow-xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-[68px] flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <button
            onClick={() => go('/')}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/20 transition-all duration-250">
              <Cpu className="text-cyan-400" size={16} />
            </div>
            <span className="text-sm sm:text-base font-black tracking-tighter text-white group-hover:text-cyan-100 transition-colors">
              ARPAN <span className="text-cyan-400">.</span>
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {PRIMARY.map(item => (
              <button
                key={item.name}
                onClick={() => go(item.path)}
                className={`relative px-3.5 py-2 text-[11px] font-black tracking-[0.14em] uppercase transition-all duration-200 rounded-lg ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-cyan-500/8'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="navDot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                  />
                )}
              </button>
            ))}

            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen(o => !o)}
                className={`flex items-center gap-1 px-3.5 py-2 text-[11px] font-black tracking-[0.14em] uppercase transition-all duration-200 rounded-lg ${
                  moreActive
                    ? 'text-cyan-400 bg-cyan-500/8'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                More
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                />
                {moreActive && (
                  <motion.span
                    layoutId="navDot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                  />
                )}
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-[#0a0f1e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="p-1.5">
                      {MORE.map(item => (
                        <button
                          key={item.name}
                          onClick={() => go(item.path)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-black tracking-[0.1em] uppercase transition-all duration-150 flex items-center justify-between group ${
                            isActive(item.path)
                              ? 'text-cyan-400 bg-cyan-500/10'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.name}
                          {isActive(item.path) && (
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-[#08091a] border-l border-white/8 shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <Grid3X3 size={14} className="text-slate-500" />
                  <span className="font-black text-sm text-slate-300 tracking-wider uppercase">Navigation</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                {/* Primary section */}
                <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.25em] px-3 pb-2 pt-1">Main</p>
                {PRIMARY.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => go(item.path)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-between ${
                      isActive(item.path)
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />}
                  </motion.button>
                ))}

                {/* More section */}
                <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.25em] px-3 pb-2 pt-4">More</p>
                {MORE.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (PRIMARY.length + i) * 0.04 }}
                    onClick={() => go(item.path)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-between ${
                      isActive(item.path)
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />}
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-white/6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Cpu className="text-cyan-400" size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">ARPAN P. NAYAK</p>
                    <p className="text-[10px] text-slate-600">AI Engineer & Strategist</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
