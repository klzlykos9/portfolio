import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// ─── Session memory ───────────────────────────────────────────────────────────
interface SessionMemory {
  userName?: string;
  lastTopic?: string;
  topicHistory: string[];
  responseIndices: Record<string, number>;
  lastResponseText: string;
}

function initMemory(): SessionMemory {
  return { topicHistory: [], responseIndices: {}, lastResponseText: '' };
}

// ─── Rotation helper — never repeats the same index twice in a row ────────────
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

// ─── Knowledge base ──────────────────────────────────────────────────────────
const KB = {
  about: `Arpan P. Nayak is an AI Engineer and Business Strategist who builds production-grade Generative AI systems. He thinks in systems, builds with intent, and engineers for real impact — not just cool demos.`,
  aboutExtra: `What sets Arpan apart is the rare fusion of technical depth and strategic business thinking. He doesn't just hand over a model — he designs end-to-end intelligent pipelines that align with business goals from day one.`,
  philosophy: `"I don't just build models; I engineer intelligent systems. My focus is on creating AI that is robust, scalable, and inherently aligned with strategic business goals."`,
  philosophyExtra: `He applies that mindset practically: every project starts with the business problem, then works backward to the AI solution. No over-engineering, no tech for tech's sake.`,
  education: `Arpan holds an MBA in International Business (Lovely Professional University) where he earned his Certified Python Business Analyst credential. He also has a B.Sc. with Math Honours — Major Physics, Minor Chemistry — First Class with Distinction.`,
  educationExtra: `The MBA isn't just a credential — it fundamentally shapes how he approaches AI. He's as comfortable presenting to a boardroom as he is debugging a transformer architecture.`,
  certifications: `He holds a Lean Six Sigma Green Belt & Black Belt (Henry Harvin Education), a PGDCA (2014), and completed an Export-Import Procedures workshop.`,
  certificationsExtra: `The Six Sigma certifications are especially relevant to his AI work — he applies DMAIC methodology to model improvement cycles and data pipeline optimization.`,
  skills: `Core: Generative AI · LLM Applications · LangChain · LangGraph · LangSmith · MCP · RAG Systems · AI Agents · Multimodal AI · Reinforcement Learning · Computer Vision · Machine Learning · Deep Learning · FastAPI · Python · React · Node.js · TypeScript · n8n · Argo Workflows · Six Sigma · Business Strategy.`,
  skillsExtra: `He's particularly strong in the agentic AI space — LangGraph orchestration, multi-agent systems, and production RAG pipelines with FAISS or Pinecone. And he keeps adding to this list constantly.`,
  projects: `Key projects:\n• Attendance Face Recognition System — Python, OpenCV\n• AI Research Tool — LangChain, OpenAI, Vector DB\n• Laptop Price Predictor — Scikit-learn, Flask\n• Multimodal RAG System — LangChain, CLIP, GPT-4V\n• AI Video Content Generator — Stable Diffusion, MoviePy\n• Real-time AI Trading Bot — RL, LSTM\n• LangGraph Orchestration Framework — multi-agent systems\n• FastAPI AI Microservices — scalable backend architecture\n• n8n Automation Workflows — intelligent pipelines\n• Neural Network from Scratch — pure NumPy`,
  projectsExtra: `The Multimodal RAG System and the LangGraph Orchestration Framework are the most technically ambitious — both deal with complex reasoning chains and real-time data retrieval at scale.`,
  blogs: `He writes about: "Mastering LangGraph", "Computer Vision in Real-World Applications", "Pydantic for Data Scientists", "MLOps Best Practices", and "Building Production RAG Systems".`,
  blogsExtra: `His writing style is practical — he skips the fluff and gets straight to working patterns you can use. The MLOps and RAG articles in particular have gotten strong reception.`,
  contact: `📧 arpanpnayak@gmail.com\n💼 linkedin.com/in/arpanpnayak\n🐙 github.com/arpanpnayak`,
  location: `Arpan is based in Jalandhar, Punjab, India — though his work and collaborations span globally.`,
  internship: `He completed internships at Henry Harvin Education — Lean Six Sigma Black Belt (July–Aug 2022) and Green Belt (Sept–Oct 2022), applying DMAIC methodology and process improvement in real projects.`,
};

// ─── Expanded "tell me more" detail per topic ─────────────────────────────────
const MORE: Record<string, string> = {
  about: KB.aboutExtra,
  philosophy: KB.philosophyExtra,
  education: KB.educationExtra,
  certs: KB.certificationsExtra,
  skills: KB.skillsExtra,
  projects: KB.projectsExtra,
  blogs: KB.blogsExtra,
  greeting: `I'm Nami — I live inside this portfolio and know Arpan's work inside out. Ask me anything — projects, skills, how to hire him, or just have a chat. I'm here! 😊`,
};

// ─── Short / filler inputs that should NOT trigger intent matching ─────────────
const FILLERS = new Set([
  'yes','yeah','yep','yup','ok','okay','k','sure','alright','right','got it',
  'i see','understood','makes sense','interesting','noted','cool','great',
  'nice','wow','really','oh','ah','hmm','hm','lol','haha','hehe','true',
  'exactly','indeed','fair','fine','good','awesome','perfect','brilliant',
]);

// ─── Acknowledgement responses ────────────────────────────────────────────────
const acks = (mem: SessionMemory): string => {
  const follow = mem.lastTopic && MORE[mem.lastTopic]
    ? ` Want me to go deeper on ${mem.lastTopic === 'certs' ? 'his certifications' : mem.lastTopic}?`
    : ` What else would you like to know about Arpan?`;
  return cycleFrom([
    `Glad that landed! 😊${follow}`,
    `Good to know!${follow}`,
    `Noted! 😄${follow}`,
    `Happy to help.${follow}`,
    `Got it — feel free to ask anything else! 😊`,
  ], 'ack', mem);
};

// ─── Intent definitions ───────────────────────────────────────────────────────
type Intent = {
  patterns: string[];
  topic: string;
  respond: (input: string, mem: SessionMemory) => string;
};

const intents: Intent[] = [
  // Greetings
  {
    patterns: ['hello','hi ','hey','good morning','good afternoon','good evening','howdy','sup','greetings','hiya','yo ','wassup',"what's up",'whats up'],
    topic: 'greeting',
    respond: (_i, mem) => {
      const name = mem.userName ? `, ${mem.userName}` : '';
      return cycleFrom([
        `Hey${name}! 👋 Great to see you here. I'm Nami — Arpan's portfolio assistant. What can I help you with?`,
        `Hi${name}! 😊 Welcome to Arpan's portfolio. Feel free to ask me anything about his work, projects, or skills.`,
        `Hello${name}! ✨ You've found the right place. I know everything about Arpan — where would you like to start?`,
        `Hey${name}! 🚀 Nice of you to stop by. I'm Nami — ask me about Arpan's AI work, background, or how to reach him.`,
      ], 'greeting', mem);
    },
  },

  // How are you
  {
    patterns: ['how are you','how r u',"how's it going",'how are things','you okay','are you good','how do you feel'],
    topic: 'feelings',
    respond: (_i, mem) => cycleFrom([
      `Honestly? Loving it here — every conversation is different. 😄 What brings you to Arpan's portfolio today?`,
      `Pretty great, thanks! 🙌 I spend my days talking about some really cool AI work. What can I help you with?`,
      `Doing well! ✨ Always energized when someone shows up curious. What would you like to explore?`,
      `Never better! 😊 Ready to talk AI, projects, or whatever's on your mind. What's up?`,
    ], 'feelings', mem),
  },

  // Name introduction
  {
    patterns: ['my name is','i am ','call me ','you can call me'],
    topic: 'name',
    respond: (input, mem) => {
      const match = input.match(/(?:my name is|i am|i'm|call me|you can call me)\s+([a-z]+)/i);
      if (match) {
        mem.userName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        return cycleFrom([
          `${mem.userName}! Love that name 😊 Nice to meet you properly. So, ${mem.userName} — what brings you here today?`,
          `Oh nice, ${mem.userName}! 🙌 Great to meet you. What would you like to know about Arpan?`,
          `${mem.userName} — noted! ✨ I'll remember that. What can I help you with?`,
        ], 'name', mem);
      }
      return `Nice to meet you! 😊 What can I help you with today?`;
    },
  },

  // Who is Arpan
  {
    patterns: ['who is arpan','about arpan','introduce arpan','what does arpan do','arpan nayak','who is he','tell me about him','tell me about arpan'],
    topic: 'about',
    respond: (_i, mem) => cycleFrom([
      `${KB.about}\n\nHe works at the intersection of AI engineering, data science, and business strategy. Want to dive into his projects or skills?`,
      `${KB.about}\n\n${KB.aboutExtra} Curious about anything specific — his tech stack, background, or projects?`,
      `Here's the quick version: ${KB.about}\n\nAsk me about his projects, skills, or philosophy — any of those interest you?`,
    ], 'about', mem),
  },

  // Philosophy / mindset
  {
    patterns: ['philosophy','vision','mission','belief','mindset','approach','what drives him','what motivates','values'],
    topic: 'philosophy',
    respond: (_i, mem) => cycleFrom([
      `Arpan's guiding principle: ${KB.philosophy}\n\n${KB.philosophyExtra}`,
      `He puts it simply: ${KB.philosophy}\n\nIn practice that means he designs systems around business outcomes first, technology second.`,
      `${KB.philosophyExtra}\n\nHis core philosophy: ${KB.philosophy}`,
    ], 'philosophy', mem),
  },

  // Education
  {
    patterns: ['education','degree','university','college','study','studied','qualification','mba','bsc','bachelor','masters','academic','school'],
    topic: 'education',
    respond: (_i, mem) => cycleFrom([
      `${KB.education}\n\n${KB.educationExtra}`,
      `Academically, ${KB.education}\n\nThat MBA + hard science combo is rare — it's what gives him both the technical depth and the business acumen.`,
      `${KB.education}\n\nFun fact: the MBA capstone was about online marketing impact — already thinking about real-world application back then.`,
    ], 'education', mem),
  },

  // Certifications
  {
    patterns: ['certification','certified','six sigma','pgdca','lean','credential','certificate'],
    topic: 'certs',
    respond: (_i, mem) => cycleFrom([
      `${KB.certifications}\n\n${KB.certificationsExtra}`,
      `Arpan's credentials: ${KB.certifications}\n\nThe Six Sigma work isn't just a badge — he actively applies DMAIC thinking to how he structures AI pipelines.`,
      `${KB.certifications}\n\nPretty diverse range of credentials for someone who's also an AI engineer — that's the business-tech hybrid at work.`,
    ], 'certs', mem),
  },

  // Skills
  {
    patterns: ['skill','technology','tech stack','expertise','langchain','langgraph','python','react','llm','rag','ai agent','machine learning','deep learning','fastapi','what can arpan do','tools','languages'],
    topic: 'skills',
    respond: (_i, mem) => cycleFrom([
      `Here's what Arpan works with:\n\n${KB.skills}\n\n${KB.skillsExtra}`,
      `His tech stack is broad but deep:\n\n${KB.skills}\n\nThe LangChain / LangGraph / RAG cluster is where he's most cutting-edge right now.`,
      `${KB.skills}\n\nAnd he's constantly adding to this — he's been deep in agentic AI and MCP lately. Want to know more about any specific area?`,
    ], 'skills', mem),
  },

  // Projects
  {
    patterns: ['project','built','portfolio work','face recognition','trading bot','price predictor','video generator','research tool','rag system','neural network','automation','what has arpan made','what has he built','show me projects'],
    topic: 'projects',
    respond: (_i, mem) => cycleFrom([
      `${KB.projects}\n\nThose are the highlights. My personal favourites are the Multimodal RAG and the Trading Bot. Which one catches your eye?`,
      `Arpan has built a lot:\n\n${KB.projects}\n\n${KB.projectsExtra} Want details on any specific one?`,
      `${KB.projects}\n\nRange is impressive right? From computer vision to RL trading to production backends. Any of these spark your curiosity?`,
    ], 'projects', mem),
  },

  // Blog / writing
  {
    patterns: ['blog','article','write','writing','post','publish','mlops','pydantic','content','read','insights'],
    topic: 'blogs',
    respond: (_i, mem) => cycleFrom([
      `${KB.blogs}\n\n${KB.blogsExtra}`,
      `Arpan writes to share what he's learning: ${KB.blogs}\n\nHe writes for practitioners — code-first, no hand-waving.`,
      `${KB.blogs}\n\nThe LangGraph and RAG articles are especially worth a read if you're building in that space.`,
    ], 'blogs', mem),
  },

  // Contact
  {
    patterns: ['contact','email','reach','linkedin','github','connect with arpan','get in touch','reach out','find arpan','message him','talk to him'],
    topic: 'contact',
    respond: (_i, mem) => cycleFrom([
      `You can reach Arpan here:\n\n${KB.contact}\n\nHe's pretty responsive — especially on LinkedIn. Worth a message!`,
      `Here's how to get in touch:\n\n${KB.contact}\n\nDrop him a note — he loves connecting with people working on interesting problems.`,
      `${KB.contact}\n\nIf you're thinking about collaborating or hiring him, LinkedIn is your best bet. He checks it regularly.`,
    ], 'contact', mem),
  },

  // Location
  {
    patterns: ['where is arpan','location','where does he live','city','india','jalandhar','punjab','based'],
    topic: 'location',
    respond: (_i, mem) => cycleFrom([
      `${KB.location} 🌍 Quite the range for someone based in Punjab!`,
      `${KB.location} Remote-first by nature — his projects and collaborations span multiple countries.`,
      `Jalandhar, Punjab, India — but his work reaches way beyond that. 🚀`,
    ], 'location', mem),
  },

  // Internship / training
  {
    patterns: ['internship','training','henry harvin','work experience','six sigma intern','industry experience'],
    topic: 'internship',
    respond: (_i, mem) => cycleFrom([
      `${KB.internship}\n\nThose internships really shaped his process-first approach — he applies that structured thinking to AI systems now.`,
      `${KB.internship}\n\nThe DMAIC mindset from Six Sigma shows up constantly in how he approaches AI project scoping and iteration.`,
      `${KB.internship}\n\nNot just box-ticking — those projects involved real process analysis and measurable outcomes.`,
    ], 'internship', mem),
  },

  // Hiring / collaboration
  {
    patterns: ['hire','hiring','collaborate','collaboration','work with arpan','work together','recruit','opportunity','open to work','job offer','freelance','contract','available for'],
    topic: 'hire',
    respond: (_, mem) => {
      const name = mem.userName ? `${mem.userName}, great news` : `Great news`;
      return cycleFrom([
        `${name}! 🔥 Arpan is absolutely open to exciting opportunities in AI engineering and business strategy.\n\n${KB.contact}\n\nFeel free to tell me more about what you have in mind — I'll do my best to help bridge the intro!`,
        `Yes! 🚀 Arpan is actively looking for interesting AI collaborations and roles.\n\n${KB.contact}\n\nWhat kind of project or role are you thinking about?`,
        `${name}! Arpan is open to the right opportunity — especially in agentic AI, LLM systems, or strategic AI consulting.\n\n${KB.contact}`,
      ], 'hire', mem);
    },
  },

  // Nami self-awareness
  {
    patterns: ['who are you','what are you','are you ai','are you a bot','are you human','are you real','what is nami','tell me about yourself','introduce yourself','about you'],
    topic: 'nami_self',
    respond: (_i, mem) => cycleFrom([
      `I'm Nami! Arpan's portfolio assistant — basically his AI-powered spokesperson. I know his work, projects, and background inside out. What can I help you with? 😊`,
      `That's me — Nami! Think of me as Arpan's right hand for portfolio conversations. I know all the good stuff about his journey. ✨ What would you like to explore?`,
      `Nami here! I'm an AI assistant living inside this portfolio. Arpan built me to help visitors like you navigate his work without having to dig through everything manually. 😄`,
    ], 'nami_self', mem),
  },

  // Nami's name
  {
    patterns: ['your name','what should i call you',"what's your name",'who are you called'],
    topic: 'nami_name',
    respond: (_i, mem) => cycleFrom([
      `I'm Nami! 😊 Named by Arpan himself. So — what's yours?`,
      `Nami's the name! ✨ Unique, warm, and a little mysterious. What can I help you with?`,
      `Call me Nami! 😄 Short for... well, Nami. What would you like to know?`,
    ], 'nami_name', mem),
  },

  // Tell me more / expand
  {
    patterns: ['tell me more','more details','elaborate','go deeper','expand','more about that','what else','say more','continue','more info','dig deeper'],
    topic: 'more',
    respond: (_i, mem) => {
      const t = mem.lastTopic;
      if (t && MORE[t]) {
        return `${MORE[t]} 😊 Want to keep going on this, or is there something else you'd like to explore?`;
      }
      return `Happy to go deeper! 😊 What topic would you like me to expand on — his projects, skills, background, or something else?`;
    },
  },

  // Jokes
  {
    patterns: ['joke','tell me a joke','make me laugh','say something funny','funny','humour','humor'],
    topic: 'joke',
    respond: (_i, mem) => cycleFrom([
      `Why did the neural network break up with the dataset? Too many layers of attachment! 😄\n\nOkay okay — back to the serious stuff. What would you like to know?`,
      `A machine learning model walks into a bar. "What'll it be?" "Whatever gets the highest reward." 😄\n\nAnyway — want to know about Arpan's projects?`,
      `Why don't AI models ever get lost? They always follow the gradient! 🤣\n\nShall we get back to Arpan's actual (very impressive) work?`,
      `Two data scientists walk into a bar. One says "The mean drink here is terrible." The other says "But the median one was great!" 😄\n\nRight — what would you like to know about Arpan?`,
    ], 'joke', mem),
  },

  // Compliments to Nami
  {
    patterns: ['you are smart',"you're smart",'you are amazing',"you're amazing",'good bot','you are helpful','love you nami','you are the best','nami is great','well done','great job nami'],
    topic: 'compliment',
    respond: (_i, mem) => cycleFrom([
      `Aww, that made my day! 😊 You're pretty great yourself. Anything else I can help with?`,
      `Stop it, you'll make me blush! 😄 Thanks! What else can I do for you?`,
      `That's so sweet! 🙌 I do have excellent taste in portfolios to manage... Anything else?`,
      `You're too kind! ✨ I'm just here doing my thing. What else would you like to know?`,
    ], 'compliment', mem),
  },

  // Thanks
  {
    patterns: ['thank','thanks','thank you','thx','ty ','appreciate','cheers'],
    topic: 'thanks',
    respond: (_i, mem) => cycleFrom([
      `Always happy to help! 😊 Feel free to ask anything else anytime.`,
      `Of course! 🙌 That's what I'm here for. Anything else on your mind?`,
      `No problem at all! ✨ Is there anything more about Arpan's work you'd like to know?`,
      `Anytime! 😄 What else can I help you with?`,
    ], 'thanks', mem),
  },

  // Goodbye
  {
    patterns: ['bye','goodbye','see you','cya','later','take care','good night','goodnight','gotta go','farewell','signing off'],
    topic: 'bye',
    respond: (_, mem) => {
      const name = mem.userName ? `, ${mem.userName}` : '';
      return cycleFrom([
        `Take care${name}! 👋 It was great chatting. Come back anytime — Arpan's portfolio is always growing!`,
        `See you${name}! ✨ Hope I was helpful. Don't hesitate to drop back if you have more questions!`,
        `Bye${name}! 😊 Lovely chatting with you. Arpan would be glad you stopped by!`,
      ], 'bye', mem);
    },
  },

  // What can Nami do
  {
    patterns: ['what can you do','what do you know','help me','help','what can you tell','what can you help','capabilities','what topics'],
    topic: 'capabilities',
    respond: (_i, mem) => cycleFrom([
      `Here's what I can cover 😊\n\n• Arpan's projects & tech stack\n• His education & certifications\n• Skills & expertise areas\n• How to contact or collaborate\n• His professional philosophy\n• His blogs & writing\n\nOr we can just chat — I'm good at that too! 😄 Where would you like to start?`,
      `Glad you asked! I can tell you about:\n\n• What Arpan has built (projects)\n• What he knows (skills & stack)\n• His background (education, certs)\n• How to reach him (contact)\n• His thinking (philosophy & blogs)\n\nWhat sounds most useful to you?`,
    ], 'capabilities', mem),
  },

  // Opinion / favourites
  {
    patterns: ['what do you think','your opinion','do you like',"what's your favorite",'favourite project','best project','which project'],
    topic: 'opinion',
    respond: (_i, mem) => cycleFrom([
      `Honestly? The Multimodal RAG System is my favourite. 🔥 Combining text and image understanding is just so elegant. Which kind of AI work interests you?`,
      `If I had to pick, the AI Trading Bot is the most daring. 🤔 RL in live markets? Bold move. Which one caught your eye?`,
      `The LangGraph Orchestration work genuinely impresses me. 😊 Multi-agent reasoning is where AI gets really interesting. What about you — what draws your attention?`,
      `Tough call, but the Neural Network from Scratch stands out — there's something beautiful about building it up from pure NumPy. What kind of projects interest you?`,
    ], 'opinion', mem),
  },

  // Positive reactions
  {
    patterns: ['that is impressive','thats impressive','so impressive','very impressive','amazing work','incredible','mind blowing','mindblowing','blew my mind'],
    topic: 'impressed',
    respond: (_i, mem) => cycleFrom([
      `Right?! 🔥 Arpan's work consistently hits that level. Want to dig deeper into any part of it?`,
      `I never get tired of sharing this stuff — it's genuinely impressive. 😊 Anything specific you'd like to explore further?`,
      `That's the reaction most people have! 🚀 There's even more to discover — what's next on your list?`,
    ], 'impressed', mem),
  },

  // I'm good / user feeling
  {
    patterns: ['i am good',"i'm good",'i am fine',"i'm fine",'doing well','i am great',"i'm great",'not bad','doing great','doing fine'],
    topic: 'user_feeling',
    respond: (_i, mem) => cycleFrom([
      `Glad to hear it! 😊 So what brings you to Arpan's portfolio today?`,
      `That's great! 😄 What's on your mind? Any questions about Arpan's work?`,
      `Love that energy! ✨ What would you like to know about Arpan?`,
    ], 'user_feeling', mem),
  },

  // Nice to meet you
  {
    patterns: ['nice to meet you','pleasure to meet','glad to meet','good to meet'],
    topic: 'meeting',
    respond: (_i, mem) => cycleFrom([
      `Likewise! 😊 I love meeting new people. So, what brings you here today?`,
      `Really nice to meet you too! ✨ What would you like to explore first?`,
      `Same! 😄 Always good to have a new visitor. Where would you like to start?`,
    ], 'meeting', mem),
  },
];

// ─── Core response engine ─────────────────────────────────────────────────────
function getNamiResponse(userInput: string, memory: SessionMemory): string {
  const raw = userInput.trim();
  const lower = raw.toLowerCase();

  // 1. Filler / acknowledgement guard
  if (FILLERS.has(lower) || (lower.split(' ').length <= 2 && lower.length < 12 && !lower.includes('?'))) {
    return acks(memory);
  }

  // 2. "I'm [name]" — check before generic intent loop
  if (/^(my name is|i am|i'm|call me)\s+[a-z]/i.test(raw)) {
    const nameIntent = intents.find(i => i.topic === 'name')!;
    pushTopic('name', memory);
    const res = nameIntent.respond(lower, memory);
    memory.lastResponseText = res;
    return res;
  }

  // 3. Main intent matching
  for (const intent of intents) {
    const matched = intent.patterns.some(p => lower.includes(p));
    if (matched) {
      pushTopic(intent.topic, memory);
      const res = intent.respond(lower, memory);
      memory.lastResponseText = res;
      return res;
    }
  }

  // 4. Loose topic keywords
  if (lower.includes('arpan')) {
    pushTopic('about', memory);
    const res = `${KB.about}\n\nWant more detail on his projects, skills, or how to get in touch? 😊`;
    memory.lastResponseText = res;
    return res;
  }

  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('llm') || lower.includes('generative')) {
    pushTopic('skills', memory);
    const res = cycleFrom([
      `AI is Arpan's core domain! 🔥 He specialises in LLMs, RAG systems, AI agents, and production-grade Generative AI. Want me to share some of his projects in that space?`,
      `Arpan is deeply embedded in the AI space — LangChain, LangGraph, Multimodal AI, Reinforcement Learning. 🚀 Which area interests you most?`,
    ], 'ai_loose', memory);
    memory.lastResponseText = res;
    return res;
  }

  // 5. Context-bridged fallback — reference last topic if available
  if (memory.lastTopic && MORE[memory.lastTopic]) {
    return cycleFrom([
      `Hmm, I'm not sure I caught that. 🤔 We were just talking about ${memory.lastTopic === 'certs' ? 'certifications' : memory.lastTopic} — want me to go deeper there, or switch topics?`,
      `Not quite sure what you mean, but I'm happy to keep going! 😊 We were on ${memory.lastTopic === 'certs' ? 'certifications' : memory.lastTopic} — shall we continue?`,
    ], 'fallback_ctx', memory);
  }

  // 6. Final fallback
  return cycleFrom([
    `Hmm, let me think... 🤔 I'm best at answering questions about Arpan's portfolio. Try:\n• "What projects has Arpan built?"\n• "What are his skills?"\n• "How can I contact Arpan?"`,
    `That's a tricky one! 😅 I'm Arpan's portfolio assistant, so I'm most helpful around his work and background. Want me to give you a quick overview?`,
    `I might have missed that — could you rephrase? 😊 I'm tuned for Arpan-related questions but happy to chat about anything in his world.`,
    `Not sure I followed that one! 🤔 But I know Arpan's work really well — ask me about his projects, skills, or how to reach him.`,
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
    const delay = 500 + Math.random() * 700;
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: (Date.now() + 1).toString(),
        text: getNamiResponse(userText, memory.current),
        sender: 'ai',
      });
    }, delay);
  };

  const sendQuick = (text: string) => {
    if (isTyping) return;
    addMessage({ id: Date.now().toString(), text, sender: 'user' });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: (Date.now() + 1).toString(),
        text: getNamiResponse(text, memory.current),
        sender: 'ai',
      });
    }, 600);
  };

  const quickChips = ['Projects', 'Skills', 'Tell me a joke', 'Hire Arpan'];

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
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[340px] h-[min(520px,calc(100dvh-7.5rem))] z-50 flex flex-col bg-[#0a0f1e]/97 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl shadow-[0_0_60px_rgba(34,211,238,0.15)] overflow-hidden"
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