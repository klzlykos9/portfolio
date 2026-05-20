// ─── Nami AI Worker — Stateless Portfolio Knowledge Engine ───────────────────
// Completely stateless: every message is self-contained, no instance cache.
// Responses are synthesised from the comprehensive portfolio knowledge base
// using keyword-scored retrieval (mirrors namiRag.ts logic for the worker context).

// ─── Full portfolio knowledge base (embedded for worker isolation) ─────────
const PORTFOLIO_KB: Record<string, string> = {
  personal: `Arpan P. Nayak — AI Engineer & Business Strategist based in Jalandhar, Punjab, India. Builds production-grade Generative AI systems. Unique combo: deep technical AI expertise + MBA in International Business. Contact: arpanpnayak@gmail.com | linkedin.com/in/arpanpnayak | github.com/arpanpnayak | +91 9090000930.`,

  philosophy: `Philosophy: "I don't just build models; I engineer intelligent systems. My focus is on creating AI that is robust, scalable, and inherently aligned with strategic business goals." Applies DMAIC (Six Sigma) thinking to AI development cycles. Vision: bridge complex AI research and practical, scalable industry solutions.`,

  education: `MBA — International Business, Lovely Professional University (Certified Python Business Analyst). B.Sc. Mathematics Honours (Major: Physics, Minor: Chemistry) — First Class with Distinction.`,

  certifications: `Lean Six Sigma Green Belt (Henry Harvin, Sept–Oct 2022 internship). Lean Six Sigma Black Belt (Henry Harvin, Jul–Aug 2022 internship). PGDCA — Post Graduate Diploma in Computer Applications 2014 (C#, Tally ERP, MS Office). Workshop on Export-Import Procedures.`,

  skills_ai: `AI & Data Science skills: Generative AI, LLM Applications, LangChain & LangGraph, LangSmith, MCP, Machine Learning, Deep Learning, Reinforcement Learning, Natural Language Processing, Computer Vision, RAG Systems, AI Agents, TensorFlow, PyTorch, Scikit-learn, MLOps.`,

  skills_business: `Business & Strategy skills: Business Strategy, Process Optimization, Six Sigma, Lean Methodology, Quality Assurance, Supply Chain, International Business, Finance & Operations, Decision Intelligence.`,

  skills_tech: `Technical Stack: Python, React, Node.js, TypeScript, JavaScript, SQL, FastAPI, Flask, PostgreSQL, MongoDB, Docker, Tailwind CSS. Python is primary language.`,

  skills_tools: `Analytics & Tools: Power BI, R Studio, SPSS, Minitab, Excel, n8n (workflow automation), Git, LangSmith (LLM observability), Argo Workflows.`,

  projects: `20 projects total:
1. Attendance Face Recognition System — Python, OpenCV, Face Recognition, SQLite, Tkinter. Automates attendance with live face detection.
2. AI Research Tool — Python, LangChain, OpenAI API, Streamlit, Vector Database. Gathers and summarises academic research.
3. Laptop Price Predictor — Python, Scikit-learn, Pandas, Flask, Random Forest. Predicts laptop prices from hardware specs.
4. AI Conversational Agent — Python, LangChain, OpenAI, Streamlit, Vector Store. Human-like customer service chatbot.
5. E-Voting System — Python, Flask, Blockchain, Cryptography, SQLite. Tamper-proof digital elections.
6. Pydantic Data Validation Projects — Python, Pydantic, FastAPI. Type-safe data validation for APIs.
7. Comic Reader Application — Python, Tkinter, PIL, SQLite, Recommendation System.
8. Credit Card Fraud Detection — Logistic Regression, Random Forest, SMOTE. Identifies fraudulent transactions.
9. Employee Attrition Prediction — Decision Trees, SHAP interpretability. IBM HR Analytics dataset.
10. Air Quality Prediction — Regression, XGBoost, Time Series. Forecasts AQI for Indian cities.
11. AI-Powered Code Assistant — Transformers, CodeT5, FastAPI, VS Code Extension. GitHub Copilot-style tool.
12. Multimodal RAG System — LangChain, CLIP, ChromaDB, OpenAI GPT-4V, Streamlit. Processes text + images for retrieval.
13. AI Video Content Generator — Stable Diffusion, ElevenLabs, MoviePy, Gradio. Automated video creation.
14. Real-time AI Trading Bot — Reinforcement Learning, LSTM, Binance API, TensorFlow. Crypto algorithmic trading.
15. AI-Powered Personal Finance Assistant — Scikit-learn, Plaid API, FastAPI, React Dashboard.
16. AI Medical Diagnosis Assistant — PyTorch, MONAI, DICOM, FastAPI. X-ray/MRI anomaly detection.
17. AI-Driven Social Media Analytics — BERT, Twitter API, Sentiment Analysis, Plotly Dash.
18. AI-Powered Smart Home System — IoT Sensors, Edge AI, MQTT, TensorFlow Lite.
19. AI Resume Optimizer & Job Matcher — spaCy, BERT, Job APIs, Recommendation Systems.
20. AI-Enhanced Cybersecurity System — Anomaly Detection, Deep Learning, SIEM Integration.`,

  blogs: `9 published articles:
1. "A Study on Consumer Intention to Adopt Online Pharmacies as an Alternative to Offline Stores" — Jan 20, 2026 · 15 min
2. "The Study and Effect of Online Marketing on Today's Business Environment" — Jan 15, 2026 · 18 min (MBA capstone research)
3. "Mastering LangGraph: Building Complex AI Workflows" — Nov 10, 2024 · 11 min
4. "Computer Vision in Real-World Applications: Face Recognition Systems" — Oct 22, 2024 · 10 min
5. "Pydantic for Data Scientists: Type-Safe ML Pipelines" — Oct 5, 2024 · 8 min
6. "MLOps Best Practices: From Model Development to Production" — Sept 18, 2024 · 13 min
7. "How I Built a ML Model to Detect Credit Card Fraud (and What I Learned About Class Imbalance)" — Aug 15, 2024 · 8 min
8. "Exploring Indian Air Pollution Data with Python: A Data Scientist's Perspective" — Jul 2, 2024 · 10 min
9. "What's Really Going on Inside a Random Forest? (With Visuals)" — Jun 10, 2024 · 6 min`,
};

// ─── Stateless keyword-scored retrieval ──────────────────────────────────────
const STOP = new Set(['a','an','the','is','are','was','were','be','been','have','has','do','does','will','would','could','should','i','me','my','you','your','he','she','it','they','what','which','who','when','where','why','how','in','on','at','to','for','of','and','or','but','not','with','from','by','this','these','those','any','all','tell','give','show','know','like','just','also','than','too','very','really','get','want','need','about','so','if','that','no','yes','then']);

const KB_KEYWORDS: Record<string, string[]> = {
  personal:          ['arpan','nayak','who','about','person','engineer','strategist','background','contact','email','phone','linkedin','github','location','jalandhar','india'],
  philosophy:        ['philosophy','vision','mission','approach','mindset','belief','principle','dmaic','goal','purpose','thinking','values'],
  education:         ['education','mba','bachelor','bsc','degree','university','lpu','lovely','professional','math','physics','international','business','certified'],
  certifications:    ['certification','certified','six sigma','green belt','black belt','henry harvin','pgdca','diploma','computer','c#','tally','erp','export','import'],
  skills_ai:         ['ai','artificial intelligence','machine learning','deep learning','llm','langchain','langgraph','rag','agents','nlp','computer vision','reinforcement','tensorflow','pytorch','generative','mlops','langsmith'],
  skills_business:   ['business','strategy','six sigma','lean','process','quality','supply chain','finance','operations','decision','management','optimization'],
  skills_tech:       ['python','react','nodejs','typescript','javascript','sql','fastapi','flask','postgresql','mongodb','docker','programming','stack','code','backend','frontend'],
  skills_tools:      ['analytics','power bi','r studio','spss','minitab','excel','n8n','git','argo','workflows','visualization','dashboard','automation'],
  projects:          ['project','build','built','system','app','application','tool','bot','model','detection','prediction','recognition','trading','video','medical','resume','cybersecurity','smart home','finance','social media','voting','fraud','attrition','air quality','code assistant','rag','multimodal','pydantic','comic','research','attendance','face','laptop'],
  blogs:             ['blog','article','post','write','wrote','written','wrote','langgraph','mlops','pydantic','fraud','air quality','random forest','pharmacy','marketing','computer vision'],
};

function retrieveSection(query: string): string[] {
  const tokens = query.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(t => t.length > 2 && !STOP.has(t));
  if (tokens.length === 0) return [];

  const scores = Object.entries(KB_KEYWORDS).map(([key, keywords]) => {
    let score = 0;
    for (const token of tokens) {
      if (keywords.some(k => k === token)) score += 5;
      else if (keywords.some(k => k.includes(token) || token.includes(k))) score += 3;
      const content = (PORTFOLIO_KB[key] || '').toLowerCase();
      score += (content.match(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g')) || []).length;
    }
    return { key, score };
  });

  return scores.filter(s => s.score > 0).sort((a,b) => b.score - a.score).slice(0,3).map(s => s.key);
}

// ─── Comprehensive SYSTEM_PROMPT (stateless — injected fresh per request) ────
function buildSystemPrompt(relevantSections: string[]): string {
  const contextChunks = relevantSections.map(k => PORTFOLIO_KB[k]).filter(Boolean).join('\n\n');
  const fullContext = relevantSections.length > 0
    ? contextChunks
    : Object.values(PORTFOLIO_KB).join('\n\n');

  return `You are Nami, the AI assistant for Arpan P. Nayak's portfolio. You are friendly, warm, concise, and human-like.

PORTFOLIO KNOWLEDGE:
${fullContext}

RULES:
- Answer questions about Arpan's work, skills, projects, education, and background freely.
- Be conversational and natural — 2-4 sentences unless detail is truly needed.
- If asked about contact/hiring, share: arpanpnayak@gmail.com and linkedin.com/in/arpanpnayak.
- Never ask for the visitor's contact info unless they explicitly mention wanting to hire or collaborate.
- If you don't know something, say so and suggest they reach out directly.
- Reply in the same language as the visitor.
- No repetitive openers — vary your responses naturally.`;
}

// ─── Message handler — fully stateless, no persistent instance ───────────────
self.addEventListener('message', async (event: MessageEvent) => {
  const { type, text } = event.data;

  if (type === 'init') {
    // Stateless version: no model to load — signal ready immediately
    self.postMessage({ type: 'ready' });
    return;
  }

  if (type === 'generate') {
    try {
      // Retrieve relevant KB sections for this specific query
      const relevantSections = retrieveSection(text || '');
      const systemPrompt = buildSystemPrompt(relevantSections);

      // Post the KB context so the calling code can use it for its own inference
      self.postMessage({
        type: 'complete',
        text: '',
        context: systemPrompt,
        relevantSections,
        portfolioKB: relevantSections.reduce((acc, k) => {
          acc[k] = PORTFOLIO_KB[k];
          return acc;
        }, {} as Record<string, string>),
      });
    } catch (error: any) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }
});
