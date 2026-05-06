import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// ─── Nami's full knowledge base ───────────────────────────────────────────────
const KB = {
  about: `Arpan P. Nayak (also known as KLZ) is an AI Engineer and Business Strategist. He builds production-grade Generative AI systems that solve real business problems — not just demos. He thinks in systems, builds with intent, and engineers for impact.`,
  philosophy: `Arpan's philosophy: "I don't just build models; I engineer intelligent systems. My focus is on creating AI that is robust, scalable, and inherently aligned with strategic business goals." He works at the intersection of AI engineering, data science, and strategic business design.`,
  education: `Arpan holds an MBA in International Business (Lovely Professional University) where he specialized as a Certified Python Business Analyst. He also has a B.Sc. with Math Honours (Major: Physics, Minor: Chemistry).`,
  certifications: `Arpan is certified in Lean Six Sigma Green Belt & Black Belt, holds a PGDCA (Post Graduate Diploma in Computer Applications, 2014 — covering C#, Tally ERP, MS Office), and completed a Workshop on Export Import Procedures.`,
  skills: `Core skills: Generative AI, LLM Applications, LangChain, LangGraph, LangSmith, MCP, RAG Systems, AI Agents, Multimodal AI, Reinforcement Learning, Computer Vision, Machine Learning, Deep Learning, FastAPI, Python, React, Node.js, TypeScript, n8n, Argo Workflows, Six Sigma, Lean Methodology, Business Strategy.`,
  projects: `Key projects Arpan has built:
1. Attendance Face Recognition System — Python, OpenCV; live automated attendance
2. AI Research Tool — LangChain, OpenAI, Vector DB; deep research assistant
3. Laptop Price Predictor — Scikit-learn, Flask; ML price predictions
4. Multimodal RAG System — LangChain, CLIP, GPT-4V; text + image retrieval
5. AI Video Content Generator — Stable Diffusion, MoviePy; automated video creation
6. Real-time AI Trading Bot — Reinforcement Learning, LSTM; algorithmic trading
7. LangGraph Orchestration Framework — custom multi-agent orchestration
8. FastAPI AI Microservices — scalable AI backend architecture
9. n8n Automation Workflows — intelligent no-code automation pipelines
10. Neural Network from Scratch — NumPy-based deep learning from the ground up`,
  blogs: `Arpan writes about: "Mastering LangGraph", "Computer Vision in Real-World Applications", "Pydantic for Data Scientists", "MLOps Best Practices", and "Building Production RAG Systems".`,
  contact: `You can reach Arpan at arpanpnayak@gmail.com or connect on LinkedIn: linkedin.com/in/arpanpnayak — GitHub: github.com/arpanpnayak`,
  experience: `Arpan has internship and professional experience in AI engineering, business strategy, and data science — applying Lean Six Sigma and agile methodologies in real projects.`,
};

// ─── Intent → Response mapping ─────────────────────────────────────────────
type Intent = {
  patterns: string[];
  response: string | ((input: string) => string);
};

const intents: Intent[] = [
  {
    patterns: ['who is arpan', 'tell me about arpan', 'about arpan', 'who are you talking about', 'introduce', 'what does arpan do', 'arpan nayak'],
    response: KB.about,
  },
  {
    patterns: ['philosophy', 'vision', 'mission', 'belief', 'mindset', 'approach', 'how does arpan think'],
    response: KB.philosophy,
  },
  {
    patterns: ['education', 'degree', 'university', 'college', 'study', 'studied', 'qualification', 'mba', 'bsc', 'bachelor', 'masters'],
    response: KB.education,
  },
  {
    patterns: ['certification', 'certified', 'six sigma', 'pgdca', 'lean', 'credential', 'certificate'],
    response: KB.certifications,
  },
  {
    patterns: ['skill', 'technology', 'tech stack', 'what can arpan', 'what does he know', 'expertise', 'langchain', 'langgraph', 'python', 'react', 'llm', 'rag', 'ai agent', 'machine learning', 'deep learning', 'fastapi'],
    response: KB.skills,
  },
  {
    patterns: ['project', 'built', 'portfolio work', 'face recognition', 'trading bot', 'price predictor', 'video generator', 'research tool', 'rag system', 'neural network', 'automation'],
    response: KB.projects,
  },
  {
    patterns: ['blog', 'article', 'write', 'writing', 'post', 'publish', 'mlops', 'pydantic'],
    response: KB.blogs,
  },
  {
    patterns: ['contact', 'email', 'reach', 'linkedin', 'github', 'connect with arpan', 'get in touch', 'reach out'],
    response: KB.contact,
  },
  {
    patterns: ['experience', 'work experience', 'internship', 'job', 'career', 'worked at', 'company', 'professional'],
    response: KB.experience,
  },
  {
    patterns: ['hire', 'hiring', 'collaborate', 'collaboration', 'work with arpan', 'work together', 'recruit', 'opportunity', 'available', 'open to work'],
    response: `Arpan is open to exciting AI engineering and business strategy opportunities! 🚀 You can reach him directly at arpanpnayak@gmail.com or connect on LinkedIn: linkedin.com/in/arpanpnayak. Would you like to share your name and what you have in mind so I can pass the message along?`,
  },
  {
    patterns: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'greetings'],
    response: (input: string) => {
      const greet = input.includes('morning') ? 'Good morning' : input.includes('evening') ? 'Good evening' : 'Hey there';
      return `${greet}! 😊 I'm Nami, Arpan's portfolio assistant. You can ask me anything about Arpan's projects, skills, experience, or background. What would you like to know?`;
    },
  },
  {
    patterns: ['thank', 'thanks', 'awesome', 'great', 'nice', 'cool', 'perfect', 'wonderful', 'amazing'],
    response: `Happy to help! 😊 Feel free to ask anything else about Arpan's work or background.`,
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'cya', 'later', 'take care'],
    response: `Thanks for stopping by! Feel free to come back anytime — Arpan's work is always growing. 👋`,
  },
  {
    patterns: ['who are you', 'what are you', 'are you ai', 'are you a bot', 'what is nami', 'tell me about yourself', 'introduce yourself'],
    response: `I'm Nami — Arpan's AI portfolio assistant! I'm here to tell you all about Arpan's projects, skills, education, experience, and more. What would you like to know?`,
  },
  {
    patterns: ['your name', 'what should i call you', 'what do i call you'],
    response: `I'm Nami! Named and designed to help visitors like you explore Arpan's portfolio. Ask me anything! 😊`,
  },
];

// ─── Smart response engine ─────────────────────────────────────────────────
function getNamiResponse(userInput: string): string {
  const lower = userInput.toLowerCase().trim();

  for (const intent of intents) {
    const matched = intent.patterns.some(p => lower.includes(p));
    if (matched) {
      return typeof intent.response === 'function'
        ? intent.response(lower)
        : intent.response;
    }
  }

  // Fallback: try to detect any keyword loosely
  if (lower.includes('arpan')) {
    return `${KB.about}\n\nFeel free to ask more — about his projects, skills, certifications, or how to get in touch!`;
  }

  // Generic fallback
  return `That's a great question! I'm best at answering things about Arpan's AI projects, skills, education, and experience. Try asking something like:\n• "What projects has Arpan built?"\n• "What are his skills?"\n• "How can I contact Arpan?"`;
}

// ─── Component ─────────────────────────────────────────────────────────────
const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          text: "Hi, I'm Nami — Arpan's portfolio assistant 😊\nAsk me anything about Arpan's projects, skills, experience, or background!",
          sender: 'ai',
        });
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const userText = inputValue.trim();
    setInputValue('');

    addMessage({ id: Date.now().toString(), text: userText, sender: 'user' });
    setIsTyping(true);

    // Simulate natural response delay
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      setIsTyping(false);
      const reply = getNamiResponse(userText);
      addMessage({ id: (Date.now() + 1).toString(), text: reply, sender: 'ai' });
    }, delay);
  };

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 cursor-pointer"
        whileHover={{ scale: 1.08 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-cyan-400 rounded-full opacity-30 group-hover:opacity-60 blur-md transition duration-500" />
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
              <div className="w-4 h-1 border-b-2 border-cyan-400/60 rounded-full mt-1" />
            </div>
            <motion.div
              className="absolute top-0 w-full h-px bg-cyan-300/60 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          {/* "Nami" label */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-black text-cyan-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
            Nami
          </div>
        </div>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.92 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-28 right-8 w-[320px] h-[480px] z-50 flex flex-col bg-[#0f172a]/97 backdrop-blur-2xl border border-cyan-500/30 rounded-[1.5rem] shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between bg-cyan-500/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  <Cpu className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Nami</h3>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    ARPAN'S PORTFOLIO ASSISTANT
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cyan-400/50 hover:text-cyan-400 transition-colors p-1 rounded-lg hover:bg-cyan-400/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900/40 relative">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[86%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600/80 text-white rounded-tr-none border border-cyan-400/30 shadow-lg'
                      : 'bg-slate-800/70 text-cyan-50 border border-cyan-500/20 rounded-tl-none shadow-[inset_0_0_10px_rgba(34,211,238,0.04)]'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/70 border border-cyan-500/20 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-950/80 border-t border-cyan-500/20 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Arpan…"
                  disabled={isTyping}
                  autoFocus
                  className="w-full bg-slate-900/80 border border-cyan-500/30 rounded-full py-3 px-5 pr-12 text-sm text-cyan-50 placeholder-slate-600 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !inputValue.trim()}
                  className="absolute right-2 p-2 text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-all disabled:opacity-30"
                >
                  <Send size={17} />
                </button>
              </div>

              {/* Quick suggestions */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['Projects', 'Skills', 'Contact Arpan'].map(chip => (
                    <button
                      key={chip}
                      onClick={() => {
                        setInputValue(chip);
                        setTimeout(() => {
                          addMessage({ id: Date.now().toString(), text: chip, sender: 'user' });
                          setIsTyping(true);
                          setTimeout(() => {
                            setIsTyping(false);
                            addMessage({ id: (Date.now() + 1).toString(), text: getNamiResponse(chip), sender: 'ai' });
                          }, 700);
                          setInputValue('');
                        }, 50);
                      }}
                      className="text-[11px] px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400/80 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;
