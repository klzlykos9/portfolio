import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Cpu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Lead collection state
  const [leadStep, setLeadStep] = useState<'none' | 'name' | 'contact' | 'query' | 'submitted'>('none');
  const [leadData, setLeadData] = useState({ name: '', contact: '', query: '' });

  useEffect(() => {
    // No greeting lead collection, purely stateless
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage({
          id: '1',
          text: "Hi, I am Nami — Arpan's portfolio manager 😊 How can I help you explore Arpan's projects or journey?",
          sender: 'ai',
        });
      }, 1500);
    }
  }, []);

  const addMessage = (msg: Message) => setMessages(prev => [msg]); // Keep only last message for stateless feel

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [portfolioData, setPortfolioData] = useState<string>('');

  useEffect(() => {
    // Fetch data for system prompt
    const loadPortfolioData = async () => {
      try {
        const { projects } = await import('../data/projects');
        const { blogs } = await import('../data/blogs');
        
        const dataStr = `
          ARPAN P. NAYAK PORTFOLIO DATA:
          
          PROJECTS:
          ${projects.map(p => `- ${p.title}: ${p.description}. Tech: ${p.tech.join(', ')}`).join('\n')}
          
          BLOGS:
          ${blogs.map(b => `- ${b.title}: ${b.excerpt}`).join('\n')}
          
          EXPERIENCE/JOURNEY:
          Arpan is an AI Engineer & Strategist specializing in production-grade Generative AI, LangChain, and intelligent automation.
          
          SKILLS:
          Generative AI, LLMs, LangChain, Python, Computer Vision, Machine Learning, React, TypeScript.
        `;
        setPortfolioData(dataStr);
      } catch (err) {
        console.error("Failed to load portfolio data", err);
      }
    };
    loadPortfolioData();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userText = inputValue.trim();
    setInputValue('');
    setMessages([{ id: Date.now().toString(), text: userText, sender: 'user' }]);
    setIsTyping(true);

    // Send to Worker with portfolio data as system prompt
    if (workerRef.current) {
        workerRef.current.postMessage({ 
            type: 'generate', 
            text: `System: You are Nami, Arpan P. Nayak's portfolio manager. Use this data to answer: ${portfolioData}\n\nUser: ${userText}`,
            userName: null
        });
    }
  };


  return (
    <>
      <motion.div
        className="fixed bottom-8 right-8 z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
          <span className="text-white font-bold tracking-wider">Nami</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[350px] h-[500px] z-50 flex flex-col bg-slate-900/90 backdrop-blur-xl border border-cyan-500/20 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Cpu className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Nami</h3>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Personal AI Guide</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-black/20 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Nami..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;
