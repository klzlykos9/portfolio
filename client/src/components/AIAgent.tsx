import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
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
    
    const userMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      const leadKeywords = ['hire', 'collaborate', 'connect', 'contact', 'message', 'work with'];
      const isLeadIntent = leadKeywords.some(k => userText.includes(k));

      const match = qaData.find(qa => 
        userText.includes(qa.question.toLowerCase()) || 
        qa.question.toLowerCase().split(' ').some((word: string) => word.length > 3 && userText.includes(word))
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
          <div className="absolute -inset-1 bg-cyan-400 rounded-full opacity-30 group-hover:opacity-60 blur-md transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)] overflow-hidden">
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-transparent to-cyan-500/10"
            />
            <div className="relative z-10 flex flex-col items-center">
               <div className="w-8 h-8 rounded-full border-2 border-cyan-400/60 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full mx-1 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                 <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full mx-1 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
               </div>
               <div className="w-4 h-1 border-b-2 border-cyan-400/60 rounded-full mt-1 shadow-[0_1px_5px_rgba(34,211,238,0.5)]" />
            </div>
            {/* Holographic scanning line */}
            <motion.div 
              className="absolute top-0 w-full h-px bg-cyan-300/60 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Holographic flicker effect */}
            <motion.div 
              className="absolute inset-0 bg-cyan-400/5"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 1.5 }}
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
            className="fixed bottom-28 right-8 w-[350px] h-[500px] z-50 flex flex-col bg-[#0f172a]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.25)] overflow-hidden"
          >
            <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between bg-cyan-500/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  <Cpu className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Nami</h3>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    Neural Link Active
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cyan-400/60 hover:text-cyan-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/40 relative">
              {/* Holographic Grid Background Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                   style={{backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
                    msg.sender === 'user' 
                      ? 'bg-cyan-600/80 text-white rounded-tr-none border border-cyan-400/30' 
                      : 'bg-slate-800/60 text-cyan-50 border border-cyan-500/20 rounded-tl-none shadow-[inset_0_0_10px_rgba(34,211,238,0.05)]'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/60 border border-cyan-500/20 p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-cyan-500/20">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Transmit neural command..."
                  className="w-full bg-slate-900/80 border border-cyan-500/30 rounded-full py-3 px-5 pr-12 text-sm text-cyan-50 placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all shadow-[inset_0_0_10px_rgba(34,211,238,0.05)]"
                />
                <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-all">
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