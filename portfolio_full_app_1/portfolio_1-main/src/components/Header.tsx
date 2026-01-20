import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';

const Header: React.FC = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const handleClick = () => setNav(!nav);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed w-full h-[80px] flex justify-between items-center px-4 sm:px-8 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50 text-white z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <Brain className="h-8 w-8 text-cyan-400" />
          <span className="ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Arpan's Portfolio
          </span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="hidden lg:flex">
        <ul className="flex space-x-6 xl:space-x-8 text-sm xl:text-base">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`relative py-2 transition-colors duration-300 ${
                  location.pathname === item.path 
                    ? 'text-cyan-400' 
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hamburger */}
      <div onClick={handleClick} className="lg:hidden z-10 cursor-pointer">
        {!nav ? <Menu size={24} /> : <X size={24} />}
      </div>

      {/* Mobile Menu */}
      <ul className={`${!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-gray-900/95 backdrop-blur-lg flex flex-col justify-center items-center z-40'}`}>
        {navItems.map((item) => (
          <li key={item.name} className="py-4 sm:py-6 text-2xl sm:text-4xl">
            <Link 
              onClick={handleClick} 
              to={item.path} 
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;