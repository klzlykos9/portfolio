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
          <div className="absolute -inset-1 bg-primary rounded-full opacity-25 group-hover:opacity-50 blur transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white border border-primary/20 shadow-xl overflow-hidden">
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
            />
            <div className="relative z-10 flex flex-col items-center">
               <div className="w-8 h-8 rounded-full border-2 border-primary/50 flex items-center justify-center">
                 <div className="w-1 h-1 bg-primary rounded-full mx-1 shadow-[0_0_5px_theme(colors.primary.DEFAULT)]" />
                 <div className="w-1 h-1 bg-primary rounded-full mx-1 shadow-[0_0_5px_theme(colors.primary.DEFAULT)]" />
               </div>
               <div className="w-4 h-1 border-b-2 border-primary/50 rounded-full mt-1" />
            </div>
            <motion.div 
              className="absolute bottom-0 w-full h-1 bg-primary/40"
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
            className="fixed bottom-28 right-8 w-[350px] h-[500px] z-50 flex flex-col bg-white/90 backdrop-blur-xl border border-primary/20 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Cpu className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Nami</h3>
                  <p className="text-[10px] text-primary uppercase tracking-widest font-bold">AI Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-600 border border-slate-100 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Nami..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-full py-3 px-5 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:scale-110 transition-transform">
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