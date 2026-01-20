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
    const hasGreeted = sessionStorage.getItem('nami_greeted');
    if (!hasGreeted && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          id: '1',
          text: "Hi, I am Nami — Arpan's portfolio manager 😊\nWould you like to share your name, or do you have any queries about Arpan?",
          sender: 'ai',
        });
        setLeadStep('name');
        sessionStorage.setItem('nami_greeted', 'true');
      }, 1500);
    }
  }, []);

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker(new URL('../lib/ai-worker.ts', import.meta.url), {
      type: 'module'
    });

    workerRef.current.onmessage = (e) => {
      const { type, text, data, error } = e.data;
      
      if (type === 'progress') {
        if (data.status === 'progress') {
           // Track model loading progress
           setLoadingProgress(Math.round(data.progress || 0));
           setIsModelLoading(true);
        } else if (data.status === 'done') {
           setIsModelLoading(false);
        }
      } else if (type === 'complete') {
        setIsTyping(false);
        addMessage({ id: Date.now().toString(), text: text, sender: 'ai' });
      } else if (type === 'error') {
        setIsTyping(false);
        console.error("AI Error:", error);
        addMessage({ id: 'err', text: "I'm having trouble thinking right now. Please try again.", sender: 'ai' });
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userText = inputValue.trim();
    setInputValue('');
    addMessage({ id: Date.now().toString(), text: userText, sender: 'user' });
    setIsTyping(true);

    if (leadStep === 'name') {
      setLeadData(prev => ({ ...prev, name: userText }));
      setUserName(userText);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          id: Date.now().toString(),
          text: `Nice to meet you, ${userText}! Could you please share your email or contact number so Arpan can get back to you?`,
          sender: 'ai',
        });
        setLeadStep('contact');
      }, 1000);
      return;
    }

    if (leadStep === 'contact') {
      setLeadData(prev => ({ ...prev, contact: userText }));
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          id: Date.now().toString(),
          text: `Great! What would you like to know or request from Arpan?`,
          sender: 'ai',
        });
        setLeadStep('query');
      }, 1000);
      return;
    }

    if (leadStep === 'query') {
      const finalData = { ...leadData, query: userText };
      setLeadData(finalData);
      
      // Send email logic (mailto or API)
      const subject = encodeURIComponent(`New Portfolio Inquiry from ${finalData.name}`);
      const body = encodeURIComponent(`Visitor Name: ${finalData.name}\nVisitor Email/Phone: ${finalData.contact}\nVisitor Message: ${finalData.query}`);
      window.location.href = `mailto:arpanpnayak@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          id: Date.now().toString(),
          text: `Thank you ${finalData.name}! Your message has been sent to Arpan. He will get back to you soon.`,
          sender: 'ai',
        });
        setLeadStep('submitted');
      }, 1000);
      return;
    }

    // Send to Worker
    if (workerRef.current) {
        // We construct a simplified history for the worker if needed, but for now just sending text
        // Ideally we pass context
        workerRef.current.postMessage({ 
            type: 'generate', 
            text: userText,
            userName: userName 
            // messages: messages // Could pass history here
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
