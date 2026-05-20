import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu } from 'lucide-react';
import { retrieveChunks, topicLabel, KBChunk, matchConcept } from '../data/namiRag';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// ─── Session memory ───────────────────────────────────────────────────────────
interface SessionMemory {
  userName?: string;
  lastTopic?: string;
  lastChunkId?: string;
  topicHistory: string[];
  responseIndices: Record<string, number>;
}

function initMemory(): SessionMemory {
  return { topicHistory: [], responseIndices: {} };
}

function cycleFrom(arr: string[], key: string, mem: SessionMemory): string {
  const cur = mem.responseIndices[key] ?? -1;
  const next = (cur + 1) % arr.length;
  mem.responseIndices[key] = next;
  return arr[next];
}

function pushTopic(topic: string, mem: SessionMemory) {
  mem.lastTopic = topic;
  mem.topicHistory = [topic, ...mem.topicHistory.filter(t => t !== topic)].slice(0, 6);
}

// ─── Short filler guard ───────────────────────────────────────────────────────
const FILLERS = new Set([
  'yes','yeah','yep','yup','ok','okay','k','sure','alright','right','got it',
  'i see','understood','makes sense','interesting','noted','cool','great',
  'nice','wow','really','oh','ah','hmm','hm','lol','haha','hehe','true',
  'exactly','indeed','fair','fine','good','awesome','perfect','brilliant',
]);

// ─── RAG response builder ─────────────────────────────────────────────────────
const TOPIC_INTROS: Record<string, string[]> = {
  about:          ['Here\'s the overview 😊', 'Happy to introduce Arpan!', 'Great question to start with!'],
  philosophy:     ['His thinking on this is really compelling 🧠', 'This is what drives everything he does —', 'Arpan\'s philosophy is distinct —'],
  education:      ['Here\'s his academic background 🎓', 'Educationally, Arpan has an interesting mix —', 'His education story is actually quite unique —'],
  certifications: ['Here are the credentials 🏆', 'He has some impressive certifications —', 'Certification-wise:'],
  internship:     ['Here\'s the training background 💼', 'His hands-on training —', 'These internships shaped a lot of his thinking —'],
  skills:         ['Here\'s what he works with 💻', 'Great question on skills —', 'His tech arsenal:'],
  contact:        ['Here\'s how to reach him 📬', 'Getting in touch is easy —', 'You can find Arpan here:'],
  projects:       ['Found the details on this project 🚀', 'Here\'s that project —', 'Great pick — here\'s the breakdown:'],
  blogs:          ['Here\'s that article 📝', 'Found the piece you\'re looking for —', 'Here\'s what Arpan wrote on that:'],
  experience:     ['Here\'s his professional experience 💼', 'On the work experience side —', 'His career so far:'],
};

const TOPIC_OUTROS: Record<string, string[]> = {
  projects:  ['Want me to walk through any other project?', 'Curious about any other one in his portfolio?', 'He has 20 projects total — want to explore another?'],
  blogs:     ['He has 9 articles in total — want to know about another?', 'More articles on different topics if you\'re interested!', 'Worth a read if that topic interests you!'],
  skills:    ['Any specific technology you\'d like more detail on?', 'Want to dig deeper into any particular area?', 'He\'s always adding to this — ask about any tech specifically.'],
  education: ['Any questions about his academic journey?', 'His MBA + science combo is pretty unusual — any follow-ups?'],
  certifications: ['He has three credentials in total — want the full picture?'],
  default:   ['Want to know anything else?', 'What else would you like to explore?', 'Anything else I can help with? 😊'],
};

function getIntro(topic: string, mem: SessionMemory): string {
  const pool = TOPIC_INTROS[topic] ?? TOPIC_INTROS.about;
  return cycleFrom(pool, `intro_${topic}`, mem);
}

function getOutro(topic: string, mem: SessionMemory): string {
  const pool = TOPIC_OUTROS[topic] ?? TOPIC_OUTROS.default;
  return cycleFrom(pool, `outro_${topic}`, mem);
}

function buildRagResponse(chunks: KBChunk[], mem: SessionMemory): string {
  if (chunks.length === 0) return '';
  const primary = chunks[0];
  pushTopic(primary.topic, mem);
  mem.lastChunkId = primary.id;

  const intro = getIntro(primary.topic, mem);
  const outro = getOutro(primary.topic, mem);

  let body = primary.response;

  // If a second chunk is from a different topic, append a brief note
  if (chunks[1] && chunks[1].topic !== primary.topic) {
    const secondLabel = topicLabel(chunks[1].topic);
    body += `\n\nI also have info on his ${secondLabel} if you'd like to go there next.`;
  }

  return `${intro}\n\n${body}\n\n${outro}`;
}

// ─── Acknowledgement responses ─────────────────────────────────────────────────
function acks(mem: SessionMemory): string {
  const follow = mem.lastTopic
    ? ` We were just talking about his ${topicLabel(mem.lastTopic)} — want to go deeper, or shall we switch topics?`
    : ` What would you like to know about Arpan?`;
  return cycleFrom([
    `Glad that landed! 😊${follow}`,
    `Good to know!${follow}`,
    `Got it! 😄${follow}`,
    `Happy to help.${follow}`,
    `Feel free to keep asking — I'm here! 😊${follow}`,
  ], 'ack', mem);
}

// ─── Pure conversational intents (no RAG needed) ──────────────────────────────
type CIntent = { patterns: string[]; topic: string; respond: (input: string, mem: SessionMemory) => string };

const CONV_INTENTS: CIntent[] = [
  {
    patterns: ['hello','hi ','hey ','good morning','good afternoon','good evening','howdy','greetings','hiya','yo ','wassup',"what's up",'whats up'],
    topic: 'greeting',
    respond: (_, mem) => {
      const name = mem.userName ? `, ${mem.userName}` : '';
      return cycleFrom([
        `Hey${name}! 👋 Great to see you here. I'm Nami — Arpan's portfolio assistant. What can I help you with?`,
        `Hi${name}! 😊 Welcome. I know everything about Arpan's work — where would you like to start?`,
        `Hello${name}! ✨ You've found the right place. Ask me about projects, skills, blogs, anything!`,
        `Hey${name}! 🚀 Nami here. What would you like to know about Arpan today?`,
      ], 'greeting', mem);
    },
  },
  {
    patterns: ['how are you','how r u',"how's it going",'how are things','you okay','are you good'],
    topic: 'feelings',
    respond: (_, mem) => cycleFrom([
      `Honestly? Loving it — every conversation is different. 😄 What brings you here today?`,
      `Pretty great! 🙌 Ready to talk AI and interesting work. What can I help with?`,
      `Never better! ✨ What would you like to explore about Arpan?`,
    ], 'feelings', mem),
  },
  {
    patterns: ['my name is','call me ','you can call me'],
    topic: 'name',
    respond: (input, mem) => {
      const match = input.match(/(?:my name is|call me|you can call me)\s+([a-z]+)/i);
      if (match) {
        mem.userName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        return cycleFrom([
          `${mem.userName}! Love that name 😊 Nice to meet you properly. What can I help you with?`,
          `Oh nice, ${mem.userName}! 🙌 Great to meet you. What would you like to know about Arpan?`,
        ], 'name', mem);
      }
      return `Nice to meet you! 😊 What can I help you with?`;
    },
  },
  {
    patterns: ['who are you','what are you','are you ai','are you a bot','are you human','what is nami','tell me about yourself','introduce yourself'],
    topic: 'nami_self',
    respond: (_, mem) => cycleFrom([
      `I'm Nami! Arpan's AI-powered portfolio assistant. I know his work, projects, skills, and background inside out. Ask me anything 😊`,
      `Nami here! Think of me as Arpan's right hand for portfolio conversations. ✨ What would you like to explore?`,
      `I'm Nami — I live inside this portfolio and know every detail about Arpan's work. 😄 Where shall we start?`,
    ], 'nami_self', mem),
  },
  {
    patterns: ['your name','what should i call you',"what's your name",'who are you called'],
    topic: 'nami_name',
    respond: (_, mem) => cycleFrom([
      `I'm Nami! 😊 Named by Arpan himself. And you?`,
      `Nami's the name! ✨ Short, warm, and a little mysterious. What can I help with?`,
    ], 'nami_name', mem),
  },
  {
    patterns: ['tell me more','more details','elaborate','go deeper','expand','what else','say more','continue','more info','dig deeper'],
    topic: 'more',
    respond: (_, mem) => {
      if (mem.lastTopic) {
        const chunks = retrieveChunks(mem.lastTopic, 3);
        const extra = chunks.find(c => c.id !== mem.lastChunkId);
        if (extra) {
          const res = `Going deeper on ${topicLabel(mem.lastTopic)} 😊\n\n${extra.response}\n\nAnything else you'd like to explore?`;
          mem.lastChunkId = extra.id;
          return res;
        }
        return `I've shared everything I know about ${topicLabel(mem.lastTopic)}! 😊 Want to switch to a different topic — his projects, skills, or background?`;
      }
      return `Happy to go deeper! 😊 What topic would you like me to expand on — projects, skills, education, or something else?`;
    },
  },
  {
    patterns: ['joke','tell me a joke','make me laugh','say something funny','funny'],
    topic: 'joke',
    respond: (_, mem) => cycleFrom([
      `Why did the neural network break up with the dataset? Too many layers of attachment! 😄\n\nOkay, back to the serious stuff — what would you like to know?`,
      `A machine learning model walks into a bar. "What'll it be?" "Whatever gets the highest reward." 😄\n\nAnyway — want to know about Arpan's projects?`,
      `Why don't AI models ever get lost? They always follow the gradient! 🤣\n\nRight — what can I help you with?`,
      `Two data scientists walk into a bar. One says "The mean drink here is terrible." The other: "But the median was great!" 😄\n\nBack to Arpan's portfolio?`,
    ], 'joke', mem),
  },
  {
    patterns: ['you are smart',"you're smart",'you are amazing',"you're amazing",'good bot','you are helpful','love you nami','you are the best','nami is great','well done'],
    topic: 'compliment',
    respond: (_, mem) => cycleFrom([
      `Aww, that made my day! 😊 You're pretty great yourself. Anything else I can help with?`,
      `Stop it, you'll make me blush! 😄 What else can I do for you?`,
      `That's so sweet! 🙌 I do have excellent taste in portfolios to manage. Anything else?`,
    ], 'compliment', mem),
  },
  {
    patterns: ['thank','thanks','thank you','thx','ty ','appreciate','cheers'],
    topic: 'thanks',
    respond: (_, mem) => cycleFrom([
      `Always happy to help! 😊 Feel free to ask anything else anytime.`,
      `Of course! 🙌 That's what I'm here for. Anything else on your mind?`,
      `Anytime! ✨ What else can I help with?`,
    ], 'thanks', mem),
  },
  {
    patterns: ['bye','goodbye','see you','cya','later','take care','good night','goodnight','gotta go','farewell'],
    topic: 'bye',
    respond: (_, mem) => {
      const name = mem.userName ? `, ${mem.userName}` : '';
      return cycleFrom([
        `Take care${name}! 👋 It was great chatting. Come back anytime!`,
        `See you${name}! ✨ Hope I was helpful. Don't hesitate to drop back!`,
        `Bye${name}! 😊 Lovely chatting. Arpan would be glad you stopped by!`,
      ], 'bye', mem);
    },
  },
  {
    patterns: ['what can you do','what do you know','help me','help ','capabilities','what topics'],
    topic: 'capabilities',
    respond: (_, mem) => cycleFrom([
      `Here's what I can cover 😊\n\n• All 20 of Arpan's projects (with full detail)\n• His 9 published articles\n• Skills & tech stack (every category)\n• Education & certifications\n• Internship & training history\n• Philosophy & mindset\n• How to contact or collaborate\n• General chit-chat too! 😄\n\nWhere would you like to start?`,
      `I'm trained on Arpan's full portfolio:\n\n• **Projects** — all 20, with tech stacks and goals\n• **Blogs** — all 9 articles with summaries\n• **Skills** — every category in detail\n• **Background** — education, certs, internships\n• **Contact** — all ways to reach him\n\nWhat sounds most useful?`,
    ], 'capabilities', mem),
  },
  {
    patterns: ['hire','hiring','collaborate','work with arpan','work together','recruit','opportunity','available','open to work','job offer','freelance'],
    topic: 'hire',
    respond: (_, mem) => {
      const name = mem.userName ? `${mem.userName}, that's` : `That's`;
      return cycleFrom([
        `${name} exciting! 🔥 Arpan is open to the right AI engineering and business strategy opportunities.\n\n📧 arpanpnayak@gmail.com\n💼 linkedin.com/in/arpanpnayak\n\nFeel free to share what you have in mind!`,
        `Yes! 🚀 Arpan is actively looking for interesting AI collaborations and roles — especially in agentic AI and LLM systems.\n\n📧 arpanpnayak@gmail.com\n💼 linkedin.com/in/arpanpnayak`,
      ], 'hire', mem);
    },
  },
  {
    patterns: ['i am good',"i'm good",'i am fine',"i'm fine",'doing well','doing great'],
    topic: 'user_feeling',
    respond: (_, mem) => cycleFrom([
      `Glad to hear it! 😊 What brings you to Arpan's portfolio today?`,
      `That's great! 😄 What would you like to know about Arpan?`,
    ], 'user_feeling', mem),
  },
  {
    patterns: ['nice to meet you','pleasure to meet','glad to meet'],
    topic: 'meeting',
    respond: (_, mem) => cycleFrom([
      `Likewise! 😊 What brings you here today?`,
      `Really nice to meet you too! ✨ What would you like to explore first?`,
    ], 'meeting', mem),
  },
];

// ─── Core response engine ──────────────────────────────────────────────────────
function getNamiResponse(userInput: string, memory: SessionMemory): string {
  const raw = userInput.trim();
  const lower = raw.toLowerCase();

  // 1. Filler / acknowledgement guard
  if (FILLERS.has(lower) || (lower.split(' ').length <= 2 && lower.length < 12 && !lower.includes('?'))) {
    return acks(memory);
  }

  // 2. Conversational intent check
  for (const intent of CONV_INTENTS) {
    if (intent.patterns.some(p => lower.includes(p))) {
      pushTopic(intent.topic, memory);
      return intent.respond(lower, memory);
    }
  }

  // 3. Concept understanding — handles abstract/conceptual questions with rich synthesis
  const concept = matchConcept(raw);
  if (concept) {
    pushTopic(concept.topic, memory);
    memory.lastChunkId = concept.topic;
    const outro = getOutro(concept.topic, memory);
    return `${concept.response}\n\n${outro}`;
  }

  // 4. RAG retrieval — keyword-scored factual lookup for specific entities
  const chunks = retrieveChunks(raw, 3);
  if (chunks.length > 0) {
    return buildRagResponse(chunks, memory);
  }

  // 5. Loose fallback: Arpan-related
  if (lower.includes('arpan')) {
    const aboutChunks = retrieveChunks('arpan engineer background', 1);
    if (aboutChunks.length > 0) return buildRagResponse(aboutChunks, memory);
  }

  // 6. Context-bridged fallback
  if (memory.lastTopic) {
    return cycleFrom([
      `Hmm, I'm not sure I caught that. 🤔 We were just on his ${topicLabel(memory.lastTopic)} — want to continue there, or switch topics?`,
      `Not quite sure what you mean, but happy to keep going! 😊 Shall we stay on ${topicLabel(memory.lastTopic)}, or try something else?`,
    ], 'fallback_ctx', memory);
  }

  // 7. Generic fallback
  return cycleFrom([
    `Hmm, let me think... 🤔 Try asking about:\n• "What makes Arpan unique?"\n• "List all his projects"\n• "What are his skills?"\n• "Should I hire him?"`,
    `Not sure I caught that! 😅 I can answer conceptual questions too — try "what's his approach?" or "what can he build?"`,
    `I might have missed that — could you rephrase? 😊 I understand both specific questions (project names, skills) and conceptual ones (unique value, capabilities).`,
  ], 'fallback', memory);
}

// ─── Component ────────────────────────────────────────────────────────────────
const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const memory = useRef<SessionMemory>(initMemory());

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
          text: `Hi there! I'm Nami — Arpan's portfolio assistant 😊\n\nI'm trained on his full portfolio — all 20 projects, 9 articles, skills, education, certifications, and more. Ask me anything!`,
          sender: 'ai',
        });
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dispatch = (text: string) => {
    if (!text.trim() || isTyping) return;
    addMessage({ id: Date.now().toString(), text: text.trim(), sender: 'user' });
    setIsTyping(true);
    const delay = 500 + Math.random() * 700;
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: (Date.now() + 1).toString(),
        text: getNamiResponse(text, memory.current),
        sender: 'ai',
      });
    }, delay);
  };

  const handleSend = () => { dispatch(inputValue); setInputValue(''); };
  const sendQuick = (text: string) => dispatch(text);

  const quickChips = ['20 Projects', 'His Skills', 'Latest Articles', 'Hire Arpan'];

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) window.dispatchEvent(new Event('nami-open'));
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 group-hover:opacity-50 blur-md transition-all duration-500" />
          <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
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
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[360px] h-[min(560px,calc(100dvh-7.5rem))] z-50 flex flex-col bg-[#0a0f1e]/97 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl shadow-[0_0_60px_rgba(34,211,238,0.15)] overflow-hidden"
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
                  <p className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest">Portfolio Assistant • Trained on Full Portfolio</p>
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
                  <div className={`max-w-[84%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
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
                  placeholder={isTyping ? 'Nami is thinking…' : 'Ask about any project, skill, or article…'}
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
