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
    // Hologram Nami Greeting
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage({
          id: '1',
          text: "Hi, I am Nami — Arpan’s portfolio manager 😊\nWould you like to share your name, or do you have any queries about Arpan?",
          sender: 'ai',
        });
      }, 1500);
    }
  }, []);

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);

  const [qaData, setQaData] = useState<any[]>([]);

  useEffect(() => {
    const loadQA = async () => {
      try {
        const data = await import('../data/nami_qa.json');
        setQaData(data.default);
      } catch (err) {
        console.error("Failed to load QA data", err);
      }
    };
    loadQA();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userText = inputValue.trim().toLowerCase();
    setInputValue('');
    
    // Add user message to history (only current session)
    const userMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      // Lead analysis
      const leadKeywords = ['hire', 'collaborate', 'connect', 'contact', 'message', 'work with'];
      const isLeadIntent = leadKeywords.some(k => userText.includes(k));

      // Instant replies using extracted dataset
      const match = qaData.find(qa => 
        userText.includes(qa.question.toLowerCase()) || 
        qa.question.toLowerCase().split(' ').some(word => word.length > 3 && userText.includes(word))
      );

      let reply = match ? match.answer : "I specialize in explaining Arpan's AI projects and strategy. Feel free to ask about his work or experience!";

      if (isLeadIntent) {
        reply = "I'd love to help you connect with Arpan! Would you like to share your name and contact details so he can get back to you?";
      }

      addMessage({ id: (Date.now() + 1).toString(), text: reply, sender: 'ai' });
    }, 600);
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
        <div className="relative group">
          <div className="absolute -inset-1 bg-cyan-500 rounded-full opacity-25 group-hover:opacity-50 blur transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] overflow-hidden">
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
            />
            {/* Hologram Girl Face */}
            <div className="relative z-10 flex flex-col items-center">
               <div className="w-8 h-8 rounded-full border-2 border-cyan-400/80 flex items-center justify-center">
                 <div className="w-1 h-1 bg-cyan-400 rounded-full mx-1 shadow-[0_0_5px_#22d3ee]" />
                 <div className="w-1 h-1 bg-cyan-400 rounded-full mx-1 shadow-[0_0_5px_#22d3ee]" />
               </div>
               <div className="w-4 h-1 border-b-2 border-cyan-400/80 rounded-full mt-1" />
            </div>
            <motion.div 
              className="absolute bottom-0 w-full h-1 bg-cyan-400/60 shadow-[0_0_10px_#22d3ee]"
              animate={{ y: [-16, 16] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
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
