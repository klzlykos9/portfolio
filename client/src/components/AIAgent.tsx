import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// ─── Session memory type (per-instance, not module-level) ─────────────────────
interface SessionMemory {
  userName?: string;
  lastTopic?: string;
}

// ─── Nami's knowledge base ────────────────────────────────────────────────────
const KB = {
  about: `Arpan P. Nayak is an AI Engineer and Business Strategist. He builds production-grade Generative AI systems that solve real business problems — not just demos. He thinks in systems, builds with intent, and engineers for impact.`,
  philosophy: `Arpan's philosophy: "I don't just build models; I engineer intelligent systems. My focus is on creating AI that is robust, scalable, and inherently aligned with strategic business goals." He works at the intersection of AI engineering, data science, and strategic business design.`,
  education: `Arpan holds an MBA in International Business (Lovely Professional University), specializing as a Certified Python Business Analyst. He also has a B.Sc. with Math Honours — Major: Physics, Minor: Chemistry. First Class with Distinction!`,
  certifications: `Arpan is certified in Lean Six Sigma Green Belt & Black Belt (Henry Harvin Education), holds a PGDCA (2014), and completed an Export Import Procedures workshop.`,
  skills: `Core skills: Generative AI, LLM Applications, LangChain, LangGraph, LangSmith, MCP, RAG Systems, AI Agents, Multimodal AI, Reinforcement Learning, Computer Vision, Machine Learning, Deep Learning, FastAPI, Python, React, Node.js, TypeScript, n8n, Argo Workflows, Six Sigma, Lean Methodology, Business Strategy.`,
  projects: `Arpan's key projects:\n• Attendance Face Recognition System — Python, OpenCV\n• AI Research Tool — LangChain, OpenAI, Vector DB\n• Laptop Price Predictor — Scikit-learn, Flask\n• Multimodal RAG System — LangChain, CLIP, GPT-4V\n• AI Video Content Generator — Stable Diffusion, MoviePy\n• Real-time AI Trading Bot — Reinforcement Learning, LSTM\n• LangGraph Orchestration Framework — multi-agent systems\n• FastAPI AI Microservices — scalable backend architecture\n• n8n Automation Workflows — intelligent pipelines\n• Neural Network from Scratch — pure NumPy implementation`,
  blogs: `Arpan writes about: "Mastering LangGraph", "Computer Vision in Real-World Applications", "Pydantic for Data Scientists", "MLOps Best Practices", and "Building Production RAG Systems".`,
  contact: `Reach Arpan at arpanpnayak@gmail.com or connect on LinkedIn: linkedin.com/in/arpanpnayak — GitHub: github.com/arpanpnayak`,
  location: `Arpan is based in Jalandhar, Punjab, India.`,
  internship: `Arpan completed internships at Henry Harvin Education — Lean Six Sigma Black Belt Internship (July–August 2022) and Green Belt Internship (Sept–Oct 2022), applying DMAIC methodology and process improvement.`,
};

const NAMI_SELF = [
  `I'm Nami! I work as Arpan's personal portfolio assistant. Think of me as his right hand — I know pretty much everything about his work, projects, and goals. 😊`,
  `Nami here! I'm basically Arpan's AI-powered portfolio buddy. I get to talk about his amazing work all day — honestly not a bad gig. 😄`,
  `That's me! I'm Nami — I help visitors like you explore Arpan's portfolio. I know all the good stuff about his journey. ✨`,
];

const MOODS = {
  happy: ['😊', '😄', '✨', '🚀', '💫', '🙌'],
  thinking: ['🤔', '💭', '🧠', '⚡'],
  excited: ['🔥', '🚀', '💥', '⚡', '🌟'],
  friendly: ['😊', '👋', '💙', '✨'],
};

const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const randomEmoji = (mood: keyof typeof MOODS) => randomFrom(MOODS[mood]);

// ─── Intent system ──────────────────────────────────────────────────────────
type Intent = {
  patterns: string[];
  response: string | ((input: string, mem: SessionMemory) => string);
  topic?: string;
};

const intents: Intent[] = [
  {
    patterns: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'greetings', 'hiya', 'yo ', "what's up", 'wassup'],
    topic: 'greeting',
    response: (_input, mem) => {
      const name = mem.userName ? `, ${mem.userName}` : '';
      return randomFrom([
        `Hey${name}! ${randomEmoji('friendly')} Good to see you here! I'm Nami — I look after Arpan's portfolio. What can I help you with today?`,
        `Hi${name}! ${randomEmoji('happy')} Welcome! Feel free to ask me anything about Arpan's projects, skills, or background.`,
        `Hello${name}! ${randomEmoji('friendly')} Great that you stopped by. What's on your mind?`,
      ]);
    }
  },
  {
    patterns: ['how are you', 'how r u', "how's it going", 'how are things', 'you okay', 'are you good', 'how do you feel'],
    topic: 'feelings',
    response: () => randomFrom([
      `I'm doing great, thanks for asking! ${randomEmoji('happy')} I love talking about Arpan's work — it keeps me energized. What about you?`,
      `Pretty awesome! ${randomEmoji('excited')} I just love chatting with people. What brings you here today?`,
      `Fantastic! ${randomEmoji('happy')} Every conversation is a new adventure. I'm all ears — what would you like to know?`,
    ])
  },
  {
    patterns: ['my name is', 'i am ', "i'm ", 'call me ', 'you can call me'],
    topic: 'name',
    response: (input, mem) => {
      const match = input.match(/(?:my name is|i am|i'm|call me|you can call me)\s+([a-z]+)/i);
      if (match) {
        mem.userName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        return `${mem.userName}! What a lovely name! ${randomEmoji('happy')} Nice to meet you properly. So, ${mem.userName}, what would you like to know about Arpan?`;
      }
      return `Nice to meet you! ${randomEmoji('friendly')} What can I help you with today?`;
    }
  },
  {
    patterns: ['who is arpan', 'tell me about arpan', 'about arpan', 'introduce arpan', 'what does arpan do', 'arpan nayak', 'who is he', 'tell me about him'],
    topic: 'about',
    response: () => `${KB.about}\n\nHe's one of the most driven people I know. ${randomEmoji('excited')} Want me to go deeper into his skills or projects?`,
  },
  {
    patterns: ['philosophy', 'vision', 'mission', 'belief', 'mindset', 'approach', 'what drives him', 'what motivates'],
    topic: 'philosophy',
    response: () => `${KB.philosophy}\n\n${randomEmoji('thinking')} That mindset is what makes his work stand out — always thinking about real-world impact.`,
  },
  {
    patterns: ['education', 'degree', 'university', 'college', 'study', 'studied', 'qualification', 'mba', 'bsc', 'bachelor', 'masters', 'academic'],
    topic: 'education',
    response: () => `${KB.education} ${randomEmoji('happy')}\n\nPretty impressive mix of business and science, right? What else would you like to know?`,
  },
  {
    patterns: ['certification', 'certified', 'six sigma', 'pgdca', 'lean', 'credential', 'certificate'],
    topic: 'certs',
    response: () => `${KB.certifications} ${randomEmoji('excited')}\n\nHe's quite the achiever! Anything specific you'd like more details on?`,
  },
  {
    patterns: ['skill', 'technology', 'tech stack', 'expertise', 'langchain', 'langgraph', 'python', 'react', 'llm', 'rag', 'ai agent', 'machine learning', 'deep learning', 'fastapi', 'what can arpan do'],
    topic: 'skills',
    response: () => `${KB.skills} ${randomEmoji('thinking')}\n\nHe's always adding to this list — constantly learning. Any particular tech area you'd like more detail on?`,
  },
  {
    patterns: ['project', 'built', 'portfolio work', 'face recognition', 'trading bot', 'price predictor', 'video generator', 'research tool', 'rag system', 'neural network', 'automation', 'what has arpan made'],
    topic: 'projects',
    response: () => `${KB.projects}\n\nThose are just the highlights! ${randomEmoji('excited')} My personal faves are the Multimodal RAG and the Trading Bot. Which one catches your eye?`,
  },
  {
    patterns: ['blog', 'article', 'write', 'writing', 'post', 'publish', 'mlops', 'pydantic', 'content'],
    topic: 'blogs',
    response: () => `${KB.blogs} ${randomEmoji('happy')}\n\nHe writes really well — breaks down complex topics into digestible insights. Worth a read!`,
  },
  {
    patterns: ['contact', 'email', 'reach', 'linkedin', 'github', 'connect with arpan', 'get in touch', 'reach out', 'find arpan'],
    topic: 'contact',
    response: () => `${KB.contact} ${randomEmoji('friendly')}\n\nHe's pretty responsive! Drop him a message — he loves meeting interesting people.`,
  },
  {
    patterns: ['where is arpan', 'location', 'where does he live', 'city', 'india', 'jalandhar', 'punjab'],
    topic: 'location',
    response: () => `${KB.location} ${randomEmoji('happy')}\n\nThough his work reaches globally — pretty cool for someone working out of Punjab!`,
  },
  {
    patterns: ['internship', 'training', 'henry harvin', 'work experience', 'six sigma intern'],
    topic: 'internship',
    response: () => `${KB.internship} ${randomEmoji('excited')}\n\nThose internships really shaped his process-thinking approach to AI systems.`,
  },
  {
    patterns: ['hire', 'hiring', 'collaborate', 'collaboration', 'work with arpan', 'work together', 'recruit', 'opportunity', 'available', 'open to work', 'job offer', 'freelance'],
    topic: 'hire',
    response: (_input, mem) => {
      const name = mem.userName ? `${mem.userName}, that's` : `That's`;
      return `${name} exciting! ${randomEmoji('excited')} Arpan is absolutely open to interesting opportunities in AI engineering and business strategy.\n\nYou can reach him at:\n📧 arpanpnayak@gmail.com\n💼 linkedin.com/in/arpanpnayak\n\nFeel free to share a bit about what you have in mind!`;
    }
  },
  {
    patterns: ['you are smart', "you're smart", 'you are amazing', "you're amazing", 'good bot', 'good assistant', 'you are helpful', 'love you nami', 'you are the best', 'nami is great'],
    topic: 'compliment',
    response: () => randomFrom([
      `Aww, that made my day! ${randomEmoji('happy')} You're pretty great yourself. Anything else I can help with?`,
      `Stop it, you'll make me blush! ${randomEmoji('happy')} Thanks! What else can I do for you?`,
      `That's so sweet! ${randomEmoji('happy')} I do have good taste in portfolios to manage... 😄 Anything else?`,
    ])
  },
  {
    patterns: ['who are you', 'what are you', 'are you ai', 'are you a bot', 'are you human', 'are you real', 'what is nami', 'tell me about yourself', 'introduce yourself'],
    topic: 'nami_self',
    response: () => randomFrom(NAMI_SELF),
  },
  {
    patterns: ['your name', 'what should i call you', "what's your name"],
    topic: 'nami_name',
    response: () => `I'm Nami! ${randomEmoji('happy')} Named by Arpan himself — short, memorable, a little mysterious. What's yours?`,
  },
  {
    patterns: ['joke', 'tell me a joke', 'make me laugh', 'say something funny', 'funny'],
    topic: 'joke',
    response: () => randomFrom([
      `Why did the neural network break up with the dataset? Too many layers of attachment! ${randomEmoji('happy')}\n\nOkay okay — back to Arpan's portfolio. What would you like to know?`,
      `Why don't AI models ever get lost? They always follow the gradient! 😄\n\nShall we get back to the serious stuff — Arpan's incredible work?`,
      `A machine learning model walks into a bar. "What'll it be?" "Whatever gets the highest reward." ${randomEmoji('happy')}\n\nAnyway — want to know about Arpan's projects?`,
    ])
  },
  {
    patterns: ['what do you think', 'your opinion', 'do you like', "what's your favorite", 'favourite project', 'best project'],
    topic: 'opinion',
    response: () => randomFrom([
      `Honestly? The Multimodal RAG System is my personal favorite. ${randomEmoji('excited')} Combining text and image understanding is just so elegant. What about you — what kind of AI work interests you?`,
      `If I had to pick, I'd say the AI Trading Bot is the most daring. ${randomEmoji('thinking')} RL in live markets? Bold move. Which one caught your eye?`,
      `I'm a bit biased since I talk about all of them, but the LangGraph Orchestration work is genuinely impressive. ${randomEmoji('happy')} What draws your interest?`,
    ])
  },
  {
    patterns: ['i am good', "i'm good", 'i am fine', "i'm fine", 'doing well', 'i am great', "i'm great", 'not bad'],
    topic: 'user_feeling',
    response: () => randomFrom([
      `Glad to hear it! ${randomEmoji('happy')} So what brings you to Arpan's portfolio today?`,
      `That's great! ${randomEmoji('happy')} What's on your mind? Any questions about Arpan's work?`,
    ])
  },
  {
    patterns: ['thank', 'thanks', 'thank you', 'thx', 'ty ', 'appreciate'],
    topic: 'thanks',
    response: () => randomFrom([
      `Always happy to help! ${randomEmoji('happy')} Feel free to ask anything else anytime.`,
      `Of course! ${randomEmoji('happy')} That's what I'm here for. Anything else on your mind?`,
      `No problem at all! ${randomEmoji('happy')} Is there anything else about Arpan's work you'd like to know?`,
    ])
  },
  {
    patterns: ['awesome', 'great', 'nice', 'cool', 'perfect', 'wonderful', 'amazing', 'wow', 'impressive', 'brilliant', 'excellent', 'fantastic'],
    topic: 'positive',
    response: () => randomFrom([
      `Right?! ${randomEmoji('excited')} I never get tired of talking about this stuff. What else would you like to explore?`,
      `I know! ${randomEmoji('happy')} Arpan's work is genuinely impressive. Want to dig deeper into anything?`,
      `Glad you think so! ${randomEmoji('excited')} There's even more to discover — what's next on your list?`,
    ])
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'cya', 'later', 'take care', 'good night', 'goodnight', 'gotta go'],
    topic: 'bye',
    response: (_input, mem) => {
      const name = mem.userName ? `, ${mem.userName}` : '';
      return `Take care${name}! ${randomEmoji('friendly')} It was great chatting. Come back anytime — Arpan's portfolio is always growing! 👋`;
    }
  },
  {
    patterns: ['what can you do', 'what do you know', 'help me', 'help', 'what can you tell', 'what can you help'],
    topic: 'capabilities',
    response: () => `I can tell you all about: ${randomEmoji('happy')}\n\n• Arpan's projects & tech stack\n• His education & certifications\n• His skills & expertise areas\n• How to contact or collaborate with him\n• His professional philosophy\n• His blogs & writing\n\nOr we can just chat — I'm good at that too! 😄 What would you like to start with?`,
  },
  {
    patterns: ['nice to meet you', 'pleasure to meet', 'glad to meet'],
    topic: 'meeting',
    response: () => `Likewise! ${randomEmoji('happy')} I love meeting new people. So, what brings you here today?`,
  },
  {
    patterns: ['interesting', "that's interesting", 'tell me more', 'really', 'is that so'],
    topic: 'curious',
    response: () => randomFrom([
      `I know, right? ${randomEmoji('excited')} There's so much depth to Arpan's work. Want me to elaborate on anything specific?`,
      `Happy to go deeper! ${randomEmoji('happy')} Just let me know what you'd like more details on.`,
    ])
  },
  {
    patterns: ['haha', 'lol', 'hehe', '😄', '😂', '😆', 'ha ha'],
    topic: 'laugh',
    response: () => `Haha, glad that landed! ${randomEmoji('happy')} Okay, in all seriousness — anything about Arpan's portfolio I can help with?`,
  },
];

// ─── Smart response engine (stateless: memory passed in) ──────────────────────
function getNamiResponse(userInput: string, memory: SessionMemory): string {
  const lower = userInput.toLowerCase().trim();

  for (const intent of intents) {
    const matched = intent.patterns.some(p => lower.includes(p));
    if (matched) {
      if (intent.topic) memory.lastTopic = intent.topic;
      const r = intent.response;
      return typeof r === 'function' ? r(lower, memory) : r;
    }
  }

  if (lower.includes('arpan')) {
    return `${KB.about}\n\nWant more detail on his projects, skills, or how to get in touch? ${randomEmoji('happy')}`;
  }

  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('llm')) {
    return `AI is literally Arpan's bread and butter! ${randomEmoji('excited')} He's specialized in LLMs, RAG systems, AI agents, and production-grade Generative AI. Want me to share some of his projects in that space?`;
  }

  return randomFrom([
    `Hmm, let me think... ${randomEmoji('thinking')} I'm best at answering questions about Arpan's portfolio, projects, and skills. Try asking:\n• "What projects has Arpan built?"\n• "What are his skills?"\n• "How can I contact Arpan?"`,
    `That's a tricky one! ${randomEmoji('thinking')} I'm Arpan's portfolio assistant, so I'm most helpful around his work and experience. Want me to give you an overview?`,
    `Interesting! I'm tuned mainly for Arpan-related things, but I'm happy to chat. ${randomEmoji('happy')} What would you like to know about his work?`,
  ]);
}

// ─── Component ──────────────────────────────────────────────────────────────
const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Per-instance session memory — fully stateless across mounts
  const memory = useRef<SessionMemory>({});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const addMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      const timer = setTimeout(() => {
        addMessage({
          id: '1',
          text: `Hi there! I'm Nami — Arpan's portfolio assistant 😊\nI know everything about his work, projects, and skills. What can I help you with today?`,
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
    const delay = 500 + Math.random() * 800;
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ id: (Date.now() + 1).toString(), text: getNamiResponse(userText, memory.current), sender: 'ai' });
    }, delay);
  };

  const sendQuick = (text: string) => {
    if (isTyping) return;
    addMessage({ id: Date.now().toString(), text, sender: 'user' });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ id: (Date.now() + 1).toString(), text: getNamiResponse(text, memory.current), sender: 'ai' });
    }, 600);
  };

  const quickChips = ['Projects', 'Skills', 'Tell me a joke', 'Hire Arpan'];

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 group-hover:opacity-50 blur-md transition-all duration-500" />
          <div className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <div className="relative">
              <div className="w-7 h-7 rounded-full border-2 border-cyan-400/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(103,232,249,0.9)]" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-slate-900 animate-pulse" />
            </div>
            <span className="text-sm font-black text-white tracking-wide">Nami</span>
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
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[340px] h-[520px] z-50 flex flex-col bg-[#0a0f1e]/97 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl shadow-[0_0_60px_rgba(34,211,238,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-cyan-500/15 flex items-center justify-between bg-gradient-to-r from-cyan-500/5 to-blue-500/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <Cpu className="text-cyan-400" size={18} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0f1e] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm tracking-wide">Nami</h3>
                  <p className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest">Portfolio Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-cyan-400 transition-colors p-1.5 rounded-xl hover:bg-cyan-400/10"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Cpu size={10} className="text-cyan-400" />
                    </div>
                  )}
                  <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-sm shadow-lg'
                      : 'bg-slate-800/80 text-slate-100 border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mr-2 mt-1 shrink-0">
                    <Cpu size={10} className="text-cyan-400" />
                  </div>
                  <div className="bg-slate-800/80 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
                {quickChips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendQuick(chip)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-cyan-500/25 text-cyan-400/80 hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all font-medium"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/5 shrink-0 bg-slate-950/50">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isTyping ? 'Nami is typing…' : 'Ask me anything…'}
                  disabled={isTyping}
                  className="w-full bg-slate-900/70 border border-white/10 rounded-full py-3 px-5 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !inputValue.trim()}
                  className="absolute right-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all disabled:opacity-30 disabled:bg-none disabled:bg-slate-700"
                >
                  <Send size={14} />
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
