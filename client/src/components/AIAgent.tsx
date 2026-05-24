import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu } from 'lucide-react';
import { retrieveChunks, topicLabel, KBChunk, matchConcept, hasKBSignal, KB } from '../data/namiRag';

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

// Smarter filler check — only treat as filler if the message has NO KB signal
function isFiller(lower: string): boolean {
  if (lower.includes('?')) return false; // questions always go through
  if (hasKBSignal(lower)) return false;  // has portfolio-related content
  return FILLERS.has(lower) || (lower.split(' ').length <= 2 && lower.length < 12);
}

// ─── Topic router — maps common topic words to KB queries ─────────────────────
const TOPIC_ROUTES: [RegExp, string][] = [
  [/\b(project|projects|built|build|portfolio|work)\b/i, 'projects portfolio list'],
  [/\b(skill|skills|tech|stack|know|expertise|proficiency|tools|toolset)\b/i, 'skills ai python technical tools'],
  [/\b(blog|article|post|write|wrote|writing|published|publication)\b/i, 'blog articles published'],
  [/\b(education|study|degree|university|college|course|mba|bsc)\b/i, 'education mba bsc university'],
  [/\b(cert|certification|credential|award|achievement)\b/i, 'certifications six sigma pgdca'],
  [/\b(internship|training|intern|placement)\b/i, 'internship training henry harvin'],
  [/\b(experience|work history|career|professional|role|position|job)\b/i, 'experience work career freelance'],
  [/\b(contact|reach|email|phone|linkedin|social|github|connect|location|where)\b/i, 'contact email linkedin location'],
  [/\b(philosophy|approach|vision|mindset|thinking|principle|mission|why)\b/i, 'philosophy vision mission approach'],
  [/\b(about|who|introduce|overview|summary|background|story|profile)\b/i, 'about personal background'],
  [/\b(rag|retrieval|vector|chroma|faiss|embed)\b/i, 'rag systems vector database retrieval'],
  [/\b(agent|agentic|langgraph|langchain|langsmith|mcp)\b/i, 'ai agents langchain langgraph'],
  [/\b(python|react|fastapi|docker|typescript|sql|node)\b/i, 'python technical stack programming'],
  [/\b(trading|crypto|finance|investment|stock|market)\b/i, 'trading finance reinforcement learning'],
  [/\b(medical|health|hospital|xray|mri|diagnosis)\b/i, 'medical diagnosis pytorch monai'],
  [/\b(cyber|security|threat|intrusion|network|attack)\b/i, 'cybersecurity threat detection anomaly'],
  [/\b(social media|twitter|sentiment|brand|viral|instagram)\b/i, 'social media analytics bert sentiment'],
  [/\b(smart home|iot|edge|raspberry|mqtt|sensor)\b/i, 'smart home iot edge ai tensorflow'],
  [/\b(video|generation|stable diffusion|elevenlabs|moviepy)\b/i, 'video content generator stable diffusion'],
  [/\b(fraud|credit card|transaction|smote|imbalanced)\b/i, 'fraud credit card detection'],
  [/\b(face|facial|recognition|attendance|opencv|camera)\b/i, 'attendance face recognition opencv'],
  [/\b(multimodal|clip|gpt.?4v|image|vision)\b/i, 'multimodal rag clip chromadb'],
  [/\b(resume|job matcher|ats|career|spacy|nlp|bert)\b/i, 'resume optimizer job matching spacy bert'],
  [/\b(code assistant|copilot|autocomplete|codet5|vscode)\b/i, 'code assistant codet5 fastapi vscode'],
]; 

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
        `Hey${name}! 👋 I'm Nami — Arpan's portfolio assistant. Ask me anything about his projects, skills, background, or articles!`,
        `Hi${name}! 😊 Welcome. I know everything about Arpan's work — where would you like to start?`,
        `Hello${name}! ✨ You've found the right place. Ask me about any project, skill, blog, or just say "tell me about Arpan"!`,
        `Hey${name}! 🚀 Nami here. What would you like to know about Arpan today?`,
      ], 'greeting', mem);
    },
  },
  {
    patterns: ['how are you','how r u',"how's it going",'how are things','you okay','are you good'],
    topic: 'feelings',
    respond: (_, mem) => cycleFrom([
      `Loving every conversation! 😄 What brings you here today?`,
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
          `${mem.userName}! Love that name 😊 Nice to meet you. What can I help you with?`,
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
      `I'm Nami — Arpan's AI portfolio assistant! I know his 20 projects, 9 articles, full skill set, education, and background inside out. Ask me anything 😊`,
      `Nami here! Think of me as Arpan's personal guide to his work. ✨ Ask about any project, tech, article, or just "who is Arpan?"`,
      `I'm Nami — living inside this portfolio with knowledge of everything Arpan has built and written. 😄 Where shall we start?`,
    ], 'nami_self', mem),
  },
  {
    patterns: ['your name','what should i call you',"what's your name",'who are you called'],
    topic: 'nami_name',
    respond: (_, mem) => cycleFrom([
      `I'm Nami! 😊 Named by Arpan himself. And you?`,
      `Nami's the name! ✨ What can I help with?`,
    ], 'nami_name', mem),
  },
  {
    patterns: ['tell me more','more details','elaborate','go deeper','expand on','what else','say more','continue','more info','dig deeper','keep going'],
    topic: 'more',
    respond: (_, mem) => {
      if (mem.lastTopic) {
        // Get all chunks for this topic and find one not yet shown
        const allChunks = KB.filter(c => c.topic === mem.lastTopic);
        const extra = allChunks.find(c => c.id !== mem.lastChunkId);
        if (extra) {
          mem.lastChunkId = extra.id;
          return `More on ${topicLabel(mem.lastTopic)} 😊\n\n${extra.response}\n\nWant me to keep going, or switch topics?`;
        }
        // Try RAG retrieval on the topic for anything adjacent
        const adjacent = retrieveChunks(mem.lastTopic, 4).find(c => c.id !== mem.lastChunkId && c.topic !== mem.lastTopic);
        if (adjacent) {
          return `I've covered ${topicLabel(mem.lastTopic)} fully! Here's something related 😊\n\n${adjacent.response}\n\nAnything else?`;
        }
        return `I've shared everything I know about ${topicLabel(mem.lastTopic)}! 😊 Want to explore his projects, skills, or articles instead?`;
      }
      return `Happy to go deeper! 😊 What topic should I expand on — his projects, AI skills, education, or something specific?`;
    },
  },
  {
    patterns: ['joke','tell me a joke','make me laugh','say something funny','funny'],
    topic: 'joke',
    respond: (_, mem) => cycleFrom([
      `Why did the neural network break up with the dataset? Too many layers of attachment! 😄\n\nBack to Arpan's work — what would you like to know?`,
      `A machine learning model walks into a bar. "What'll it be?" "Whatever maximises the reward." 😄\n\nAnyway — want to explore Arpan's projects?`,
      `Why don't AI models ever get lost? They always follow the gradient! 🤣\n\nRight — what can I help you with?`,
      `Two data scientists walk into a bar. One: "The mean drink here is terrible." Other: "But the median was great!" 😄\n\nBack to Arpan's portfolio?`,
    ], 'joke', mem),
  },
  {
    patterns: ['you are smart',"you're smart",'you are amazing',"you're amazing",'good bot','you are helpful','love you nami','you are the best','nami is great','well done'],
    topic: 'compliment',
    respond: (_, mem) => cycleFrom([
      `Aww, that made my day! 😊 You're pretty great yourself. Anything else I can help with?`,
      `Stop it, you'll make me blush! 😄 What else can I do for you?`,
      `That's so sweet! 🙌 I do have excellent taste in portfolios to assist. Anything else?`,
    ], 'compliment', mem),
  },
  {
    patterns: ['thank','thanks','thank you','thx','ty ','appreciate','cheers'],
    topic: 'thanks',
    respond: (_, mem) => cycleFrom([
      `Always happy to help! 😊 Anything else on your mind?`,
      `Of course! 🙌 That's what I'm here for. What else would you like to know?`,
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
    patterns: ['what can you do','what do you know','help me','capabilities','what topics','what can i ask'],
    topic: 'capabilities',
    respond: (_, mem) => cycleFrom([
      `Here's everything I can tell you 😊\n\n• **20 Projects** — full breakdowns with tech stacks\n• **9 Articles** — summaries of every blog post\n• **Skills** — AI, ML, Python, LangChain, RAG, Agents, and more\n• **Education** — MBA + B.Sc. background\n• **Certifications** — Six Sigma, PGDCA, and more\n• **Experience** — his freelance AI work\n• **Contact** — how to reach or hire him\n\nJust ask naturally — "what projects has he built?" or "does he know Docker?"`,
      `I'm trained on Arpan's full portfolio:\n\n• All **20 projects** with details\n• All **9 blog articles**\n• Complete **skills & tech stack**\n• **Education, certs, internships**\n• **Contact & hire info**\n\nAsk me anything — I understand context, so just talk naturally!`,
    ], 'capabilities', mem),
  },
  {
    patterns: ['hire','hiring','collaborate','work with arpan','work together','recruit','open to work','job offer','freelance','opportunity'],
    topic: 'hire',
    respond: (_, mem) => {
      const name = mem.userName ? `${mem.userName}, that's` : `That's`;
      return cycleFrom([
        `${name} exciting! 🔥 Arpan is open to the right AI engineering and strategy opportunities.\n\n📧 arpanpnayak@gmail.com\n💼 linkedin.com/in/arpanpnayak\n\nFeel free to share what you have in mind!`,
        `Yes! 🚀 Arpan is actively looking for AI collaborations — especially in agentic AI, LLM systems, and production AI products.\n\n📧 arpanpnayak@gmail.com\n💼 linkedin.com/in/arpanpnayak`,
      ], 'hire', mem);
    },
  },
  {
    patterns: ['i am good',"i'm good",'i am fine',"i'm fine",'doing well','doing great','not bad'],
    topic: 'user_feeling',
    respond: (_, mem) => cycleFrom([
      `Glad to hear it! 😊 What brings you to Arpan's portfolio today?`,
      `Great! 😄 What would you like to know about Arpan?`,
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
  // ── Smart topic shortcuts ──────────────────────────────────────────────────
  {
    patterns: ['tell me about his projects','show me his projects','list his projects','what projects','how many projects'],
    topic: 'projects',
    respond: (_, mem) => {
      const chunks = retrieveChunks('all 20 projects list portfolio', 1);
      if (chunks.length) return buildRagResponse(chunks, mem);
      return `Arpan has **20 projects** spanning RAG systems, computer vision, reinforcement learning, NLP, healthcare AI, fintech, cybersecurity, and more! 🚀\n\nAsk me about any specific one — like "tell me about his trading bot" or "what's the multimodal RAG project?"`;
    },
  },
  {
    patterns: ['tell me about his skills','what skills does he have','what can he do','what does he know','his tech stack','his expertise'],
    topic: 'skills',
    respond: (_, mem) => {
      const chunks = retrieveChunks('skills ai python technical tools analytics', 2);
      if (chunks.length) return buildRagResponse(chunks, mem);
      return `Arpan's skills span AI/ML, LangChain/LangGraph, RAG, Python, FastAPI, React, Docker, and more. Ask me about a specific area! 😊`;
    },
  },
  {
    patterns: ['tell me about his education','what did he study','his degree','his university','where did he study'],
    topic: 'education',
    respond: (_, mem) => {
      const chunks = retrieveChunks('education mba bsc university', 2);
      if (chunks.length) return buildRagResponse(chunks, mem);
      return `Arpan holds an MBA in International Business (LPU) and a B.Sc. in Mathematics Honours (Major: Physics). Want more detail? 😊`;
    },
  },
  {
    patterns: ['does he know','can he work with','does he use','has he used','is he familiar with','does he have experience with'],
    topic: 'skills_check',
    respond: (input, mem) => {
      // Extract the technology being asked about
      const techMatch = input.replace(/does he know|can he work with|does he use|has he used|is he familiar with|does he have experience with/gi, '').trim();
      if (techMatch.length > 1) {
        const chunks = retrieveChunks(techMatch, 2);
        if (chunks.length > 0 && chunks[0].score > 2) return buildRagResponse(chunks, mem);
        // Check if keyword appears in any KB response
        const found = KB.some(c => c.response.toLowerCase().includes(techMatch.toLowerCase()) || c.keywords.some(k => k.toLowerCase().includes(techMatch.toLowerCase())));
        if (found) return `Yes! ${techMatch.charAt(0).toUpperCase() + techMatch.slice(1)} is part of Arpan's toolkit. 😊 Want me to go into detail about how he uses it?`;
        return `I don't have specific info on "${techMatch}" in the portfolio, but Arpan is experienced with a wide range of AI and tech tools. You can reach out at arpanpnayak@gmail.com to ask directly!`;
      }
      return `Sure! What technology are you asking about? 😊 I can check if it's in Arpan's skill set.`;
    },
  },
  {
    patterns: ['what about','tell me about','show me','give me info on','info on','details on','details about'],
    topic: 'redirect',
    respond: (input, mem) => {
      // Extract the subject after the trigger phrase
      const subject = input.replace(/what about|tell me about|show me|give me info on|info on|details on|details about/gi, '').trim();
      if (subject.length > 2) {
        // Route through topic routes first
        for (const [pattern, query] of TOPIC_ROUTES) {
          if (pattern.test(subject)) {
            const chunks = retrieveChunks(query + ' ' + subject, 2);
            if (chunks.length) return buildRagResponse(chunks, mem);
          }
        }
        // Fall through to RAG
        const chunks = retrieveChunks(subject, 2);
        if (chunks.length) return buildRagResponse(chunks, mem);
      }
      if (mem.lastTopic) {
        return `I'm not sure I have that specific detail, but we were on ${topicLabel(mem.lastTopic)} — want to continue there, or ask something else? 😊`;
      }
      return `I'm not sure about that one — could you be more specific? 😊 I can answer questions about Arpan's projects, skills, education, articles, and more.`;
    },
  },
];

// ─── Core response engine ──────────────────────────────────────────────────────
function getNamiResponse(userInput: string, memory: SessionMemory): string {
  const raw = userInput.trim();
  const lower = raw.toLowerCase();

  // 1. Smarter filler / acknowledgement guard — only blocks true fillers with no KB signal
  if (isFiller(lower)) {
    return acks(memory);
  }

  // 2. Conversational intent check (longest-pattern-first for accuracy)
  const sortedIntents = [...CONV_INTENTS].sort((a, b) =>
    Math.max(...b.patterns.map(p => p.length)) - Math.max(...a.patterns.map(p => p.length))
  );
  for (const intent of sortedIntents) {
    if (intent.patterns.some(p => lower.includes(p))) {
      pushTopic(intent.topic, memory);
      return intent.respond(raw, memory);
    }
  }

  // 3. Concept synthesis — rich pre-written answers for abstract questions
  const concept = matchConcept(raw);
  if (concept) {
    pushTopic(concept.topic, memory);
    memory.lastChunkId = concept.topic;
    const outro = getOutro(concept.topic, memory);
    return `${concept.response}\n\n${outro}`;
  }

  // 4. Topic route matching — detect topic keywords and route to best RAG query
  for (const [pattern, query] of TOPIC_ROUTES) {
    if (pattern.test(raw)) {
      const chunks = retrieveChunks(query + ' ' + raw, 3);
      if (chunks.length > 0) return buildRagResponse(chunks, memory);
    }
  }

  // 5. RAG retrieval — keyword-scored factual lookup
  const chunks = retrieveChunks(raw, 3);
  if (chunks.length > 0) {
    return buildRagResponse(chunks, memory);
  }

  // 6. Loose fallback: Arpan-related catch-all
  if (lower.includes('arpan') || lower.includes('he') || lower.includes('his')) {
    if (memory.lastTopic) {
      const contextChunks = retrieveChunks(memory.lastTopic, 2);
      if (contextChunks.length > 0) {
        return `Based on what we've covered — ${topicLabel(memory.lastTopic)}:\n\n${contextChunks[0].response}\n\n${getOutro(contextChunks[0].topic, memory)}`;
      }
    }
    const aboutChunks = retrieveChunks('arpan engineer background skills', 1);
    if (aboutChunks.length > 0) return buildRagResponse(aboutChunks, memory);
  }

  // 7. Context-bridged fallback — use current topic to suggest continuation
  if (memory.lastTopic) {
    return cycleFrom([
      `Hmm, I'm not sure I caught that. 🤔 We were just on his ${topicLabel(memory.lastTopic)} — want to continue there, or ask about something else?`,
      `Not quite sure what you mean! 😊 Shall we stay on ${topicLabel(memory.lastTopic)}, or try a different topic — projects, skills, education?`,
      `I might have missed that. Could you rephrase? 🤔 We were talking about ${topicLabel(memory.lastTopic)} — happy to keep going there!`,
    ], 'fallback_ctx', memory);
  }

  // 8. Generic helpful fallback
  return cycleFrom([
    `Hmm, let me think... 🤔 Try:\n• "What makes Arpan unique?"\n• "Show me his best projects"\n• "What are his AI skills?"\n• "How do I contact him?"`,
    `Not sure I caught that! 😅 You can ask about any project by name, any technology, his background, or say "tell me about Arpan" to start!`,
    `I might have missed that — could you rephrase? 😊 I understand questions about projects, skills, education, blogs, certifications, and more. Or just ask "what can you tell me?"`,
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
