import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-slate-500 text-xs font-black tracking-[0.2em]">
          © 2026 ARPAN P. NAYAK // AI ENGINEER & STRATEGIST
        </div>
        <div className="flex gap-8 text-slate-500 text-[10px] font-black tracking-[0.3em]">
          <span className="hover:text-primary cursor-pointer transition-colors">SYSTEM STATUS: OPTIMAL</span>
          <span className="hover:text-primary cursor-pointer transition-colors">ENCRYPTION: ACTIVE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;