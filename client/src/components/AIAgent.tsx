import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>('idle');
  const [loadProgress, setLoadProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const workerReadyRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      const timer = setTimeout(() => {
        addMessage({
          id: '1',
          text: "Hi, I am Nami — Arpan's portfolio manager 😊\nWould you like to share your name, or do you have any queries about Arpan?",
          sender: 'ai',
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const initWorker = useCallback(() => {
    if (workerRef.current) return;

    setModelStatus('loading');
    setLoadProgress(0);

    const worker = new Worker(
      new URL('../lib/ai-worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (event: MessageEvent) => {
      const { type, data, text, error } = event.data;

      if (type === 'progress') {
        if (data?.status === 'progress' && data?.progress != null) {
          setLoadProgress(Math.round(data.progress));
        }
      } else if (type === 'complete') {
        setIsTyping(false);
        addMessage({
          id: Date.now().toString(),
          text: text || "I couldn't generate a response. Please try again.",
          sender: 'ai',
        });
      } else if (type === 'error') {
        setIsTyping(false);
        addMessage({
          id: Date.now().toString(),
          text: "Sorry, I ran into an issue. Please try again!",
          sender: 'ai',
        });
        console.error('AI Worker error:', error);
      } else if (type === 'ready') {
        workerReadyRef.current = true;
        setModelStatus('ready');
        setLoadProgress(100);
      }
    };

    worker.onerror = (err) => {
      console.error('Worker error:', err);
      setModelStatus('error');
      setIsTyping(false);
    };

    workerRef.current = worker;

    worker.postMessage({ type: 'init' });
  }, [addMessage]);

  useEffect(() => {
    if (isOpen && !workerRef.current) {
      initWorker();
    }
  }, [isOpen, initWorker]);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userText = inputValue.trim();
    setInputValue('');

    addMessage({ id: Date.now().toString(), text: userText, sender: 'user' });
    setIsTyping(true);

    if (!workerRef.current) {
      initWorker();
    }

    workerRef.current?.postMessage({
      type: 'generate',
      text: userText,
    });
  };

  const getStatusLabel = () => {
    if (modelStatus === 'loading') return `Loading model… ${loadProgress}%`;
    if (modelStatus === 'error') return 'Model error';
    if (modelStatus === 'ready') return 'Online';
    return 'Initializing';
  };

  const statusColor = modelStatus === 'ready'
    ? 'bg-green-400'
    : modelStatus === 'error'
    ? 'bg-red-400'
    : 'bg-yellow-400 animate-pulse';

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
            <motion.div
              className="absolute top-0 w-full h-px bg-cyan-300/60 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
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
            className="fixed bottom-28 right-8 w-[320px] h-[480px] z-50 flex flex-col bg-[#0f172a]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-[1.5rem] shadow-[0_0_50px_rgba(34,211,238,0.25)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between bg-cyan-500/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  <Cpu className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Nami</h3>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
                    {modelStatus === 'loading'
                      ? getStatusLabel()
                      : "ARPAN'S PORTFOLIO MANAGER"}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cyan-400/60 hover:text-cyan-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Model loading bar */}
            {modelStatus === 'loading' && (
              <div className="h-1 w-full bg-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/40 relative">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                   style={{backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px'}} />

              {modelStatus === 'loading' && messages.length <= 1 && (
                <div className="flex justify-center py-4">
                  <div className="text-center text-cyan-400/60 text-xs flex flex-col items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Loading AI model ({loadProgress}%)<br />First load may take a moment…</span>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm whitespace-pre-line ${
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

            {/* Input */}
            <div className="p-4 bg-slate-950/80 border-t border-cyan-500/20">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isTyping ? 'Nami is thinking…' : 'Talk with Nami...'}
                  disabled={isTyping}
                  className="w-full bg-slate-900/80 border border-cyan-500/30 rounded-full py-3 px-5 pr-12 text-sm text-cyan-50 placeholder-cyan-900 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all shadow-[inset_0_0_10px_rgba(34,211,238,0.05)] disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-all disabled:opacity-40"
                >
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
