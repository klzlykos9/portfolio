import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Roadmap from './pages/Roadmap';
import ScrollToTop from './components/ScrollToTop';
import AIAgent from './components/AIAgent';
import Certifications from './components/Certifications';
import InternshipTraining from './components/InternshipTraining';
import Experience from './components/Experience';
import IntroScreen from './components/IntroScreen';

function App() {
  // Show intro once per browser session
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem('arpan_intro_seen')
  );

  const handleIntroComplete = () => {
    sessionStorage.setItem('arpan_intro_seen', '1');
    setShowIntro(false);
  };

  return (
    <Router>
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
        <AIAgent />
        <Header />
        <ScrollToTop />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/internships" element={<InternshipTraining />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;