// ─── Nami RAG Engine ──────────────────────────────────────────────────────────
// Lightweight client-side retrieval: keyword-scored chunks → natural responses
// Every section of the portfolio lives here as a queryable knowledge chunk.

export interface KBChunk {
  id: string;
  topic: string;
  keywords: string[];
  response: string;
}

// ─── Stopwords (excluded from token scoring) ─────────────────────────────────
const STOP = new Set([
  'a','an','the','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall','can',
  'i','me','my','we','you','your','he','she','it','they','them','his','her','its',
  'their','what','which','who','when','where','why','how','in','on','at','to',
  'for','of','and','or','but','not','with','from','by','as','into','through',
  'this','these','those','any','all','both','each','more','most','other','some',
  'tell','give','show','know','like','just','also','than','too','very','really',
  'get','got','want','need','about','then','so','if','that','no','yes','up','out',
  'there','here','just','been','such','even','own','same','few','new','old','much',
]);

// ─── Full knowledge base ──────────────────────────────────────────────────────
export const KB: KBChunk[] = [

  // ── PERSONAL ──────────────────────────────────────────────────────────────
  {
    id: 'personal',
    topic: 'about',
    keywords: ['arpan','nayak','who','person','engineer','strategist','ai engineer','business','introduction','background','summary'],
    response: `Arpan P. Nayak is an **AI Engineer and Business Strategist** based in Jalandhar, Punjab, India. 😊

He builds **production-grade Generative AI systems** — not demos, not prototypes. Real, scalable, deployed systems that solve genuine business problems.

What makes him unusual is the rare combination: deep technical AI expertise *plus* an MBA in International Business. He speaks both the language of engineering and the language of the boardroom. His work sits at the intersection of AI, data science, decision intelligence, and strategic business design.

Want to know more about his projects, skills, or how to reach him?`,
  },

  // ── PHILOSOPHY ────────────────────────────────────────────────────────────
  {
    id: 'philosophy',
    topic: 'philosophy',
    keywords: ['philosophy','vision','mission','approach','mindset','belief','principle','values','drives','motivates','goal','intent','purpose','thinking'],
    response: `Arpan's guiding principle: 🧠

*"I don't just build models; I engineer intelligent systems. My focus is on creating AI that is robust, scalable, and inherently aligned with strategic business goals."*

In practice, this means he starts every project with the business problem and works backward to the technical solution — no over-engineering, no tech for tech's sake. He applies DMAIC thinking (from Six Sigma) to his AI development cycles — measure first, then optimize.

He sees AI as a *strategic tool*, not a novelty. Every system he ships is built to deliver measurable value.`,
  },

  // ── EDUCATION: MBA ────────────────────────────────────────────────────────
  {
    id: 'edu_mba',
    topic: 'education',
    keywords: ['mba','masters','international business','lpu','lovely professional','university','certified python','business analyst','marketing','capstone','postgraduate'],
    response: `🎓 **MBA — International Business**
**Lovely Professional University (LPU)**

During his MBA, Arpan earned the **Certified Python Business Analyst** credential — which is where his transition from pure business into AI/data began.

His MBA capstone thesis: *"The Study and Effect of Online Marketing in Today's Business Environment"* — already applying data thinking to real business questions.

He specialised in data-driven business strategy and predictive analytics. This isn't just a credential on a resume; it's why he thinks about AI differently from pure engineers — he always asks "what business problem does this solve?"`,
  },

  // ── EDUCATION: BSc ────────────────────────────────────────────────────────
  {
    id: 'edu_bsc',
    topic: 'education',
    keywords: ['bsc','bachelor','science','math','maths','mathematics','honours','physics','chemistry','minor','degree','undergraduate','first class','distinction'],
    response: `🎓 **B.Sc. — Mathematics Honours**
**Major: Physics · Minor: Chemistry**
**First Class with Distinction**

His science foundation built strong analytical reasoning and quantitative problem-solving — the bedrock for everything that came after. The Physics + Math combo is a classic foundation for ML/AI work: linear algebra, calculus, probability — all the core mathematical tools of machine learning.`,
  },

  // ── CERTIFICATIONS: Six Sigma ──────────────────────────────────────────────
  {
    id: 'cert_sixsigma',
    topic: 'certifications',
    keywords: ['six sigma','lean','green belt','black belt','henry harvin','dmaic','quality','process','certification','sigma','certified'],
    response: `🏆 **Lean Six Sigma — Green Belt & Black Belt**
**Henry Harvin Education**

Both the Green Belt and Black Belt certifications in Lean Six Sigma. DMAIC methodology (Define, Measure, Analyze, Improve, Control) is something Arpan actively applies to AI pipeline development and optimization cycles — not just a box-ticking credential.

The process improvement mindset from Six Sigma shows up directly in how he approaches model evaluation, data pipeline quality, and iterative system improvement.`,
  },

  // ── CERTIFICATIONS: PGDCA ─────────────────────────────────────────────────
  {
    id: 'cert_pgdca',
    topic: 'certifications',
    keywords: ['pgdca','post graduate','diploma','computer','applications','csharp','c#','tally','erp','microsoft','office','2014'],
    response: `🏆 **PGDCA — Post Graduate Diploma in Computer Applications (2014)**

An early technical credential covering C#, Tally ERP, and Microsoft Office. This was his first formal step into computing — laying the groundwork for what would become a deep technical career in AI and software engineering.`,
  },

  // ── CERTIFICATIONS: Export Import ─────────────────────────────────────────
  {
    id: 'cert_export',
    topic: 'certifications',
    keywords: ['export','import','procedures','workshop','trade','international','commerce'],
    response: `🏆 **Workshop on Export-Import Procedures**

A business-focused credential covering international trade procedures — relevant to his International Business MBA specialisation and his understanding of global commerce strategies.`,
  },

  // ── INTERNSHIP: Six Sigma Black Belt ─────────────────────────────────────
  {
    id: 'intern_bb',
    topic: 'internship',
    keywords: ['internship','training','henry harvin','black belt','july','august','2022','dmaic','process improvement','six sigma intern'],
    response: `💼 **Lean Six Sigma Black Belt Internship**
**Henry Harvin Education — July–August 2022**

Applied DMAIC methodology to real projects during this internship. The focus was on process improvement and quality management in live business scenarios. This is where Arpan developed his structured, measurement-first approach to problem solving — a mindset he now applies directly to AI system design.`,
  },

  // ── INTERNSHIP: Six Sigma Green Belt ─────────────────────────────────────
  {
    id: 'intern_gb',
    topic: 'internship',
    keywords: ['internship','training','henry harvin','green belt','september','october','2022','lean','methodology','process'],
    response: `💼 **Lean Six Sigma Green Belt Internship**
**Henry Harvin Education — September–October 2022**

Completed back-to-back with the Black Belt internship. This training covered Lean methodology — eliminating waste and optimising flow in business processes. Arpan brings this "reduce friction" thinking to how he designs AI pipelines and system architectures.`,
  },

  // ── SKILLS: AI & Data Science ─────────────────────────────────────────────
  {
    id: 'skills_ai',
    topic: 'skills',
    keywords: ['ai','artificial intelligence','machine learning','deep learning','llm','langchain','langgraph','rag','agents','nlp','computer vision','reinforcement','tensorflow','pytorch','transformers','generative','mlops','langsmith'],
    response: `🧠 **AI & Data Science Skills**

• **Generative AI & LLMs** — LangChain, LangGraph, LangSmith, MCP
• **RAG Systems** — retrieval-augmented generation with FAISS, ChromaDB, Pinecone
• **AI Agents** — multi-agent orchestration, tool use, LangGraph state machines
• **Deep Learning** — TensorFlow, PyTorch, Transformers, CodeT5
• **Machine Learning** — Scikit-learn, Random Forest, XGBoost, LSTM
• **Reinforcement Learning** — policy gradients, Q-learning, real-world RL
• **NLP** — BERT, spaCy, sentiment analysis, text classification
• **Computer Vision** — OpenCV, CLIP, YOLO, face recognition, MONAI
• **MLOps** — model versioning, monitoring, CI/CD for ML, Argo Workflows

This is where Arpan is deepest — especially in the **agentic AI + RAG** space, which is his primary focus right now.`,
  },

  // ── SKILLS: Business & Strategy ───────────────────────────────────────────
  {
    id: 'skills_business',
    topic: 'skills',
    keywords: ['business','strategy','six sigma','lean','process optimization','quality','supply chain','international','finance','operations','decision','intelligence','management'],
    response: `📊 **Business & Strategy Skills**

• Business Strategy & Process Optimization
• Six Sigma (Green Belt + Black Belt)
• Lean Methodology
• Quality Assurance & QMS
• Supply Chain Management
• International Business
• Finance & Operations
• Decision Intelligence

This business layer is what makes Arpan distinct from pure engineers — he can scope a project from the business outcome down, not just the tech up.`,
  },

  // ── SKILLS: Technical Stack ────────────────────────────────────────────────
  {
    id: 'skills_tech',
    topic: 'skills',
    keywords: ['python','react','nodejs','node','typescript','javascript','sql','fastapi','flask','postgresql','mongodb','docker','tailwind','programming','language','framework','backend','frontend','stack','code'],
    response: `💻 **Technical Stack**

• **Languages:** Python · TypeScript · JavaScript · SQL
• **Backend:** FastAPI · Flask · Node.js · Express
• **Frontend:** React · Tailwind CSS
• **Databases:** PostgreSQL · MongoDB · SQLite
• **DevOps:** Docker · Git
• **AI Infra:** Vector databases (FAISS, ChromaDB) · Streamlit · Gradio

Python is his primary language — he uses it for everything from data pipelines to production APIs to ML model training.`,
  },

  // ── SKILLS: Analytics & Tools ─────────────────────────────────────────────
  {
    id: 'skills_tools',
    topic: 'skills',
    keywords: ['analytics','tools','power bi','r studio','spss','minitab','excel','n8n','git','langsmith','argo','workflows','visualization','dashboard','reporting','automation tools'],
    response: `📈 **Analytics & Tools**

• **BI & Visualization:** Power BI · R Studio · Plotly Dash
• **Statistical:** SPSS · Minitab · Excel
• **Automation:** n8n (workflow automation) · Argo Workflows
• **AI Tooling:** LangSmith (LLM observability) · Git
• **Data:** Pandas · NumPy · Matplotlib · Seaborn

n8n is a big one — Arpan builds intelligent automation pipelines using n8n, connecting AI models with business processes without heavy infrastructure.`,
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  {
    id: 'contact',
    topic: 'contact',
    keywords: ['contact','email','linkedin','github','phone','reach','connect','message','find','social','get in touch','call','location','jalandhar','punjab','india'],
    response: `📬 **How to reach Arpan:**

• 📧 Email: **arpanpnayak@gmail.com**
• 💼 LinkedIn: **linkedin.com/in/arpanpnayak**
• 🐙 GitHub: **github.com/arpanpnayak**
• 📍 Location: **Jalandhar, Punjab, India**
• 📞 Phone: **+91 9090000930**

He's most responsive on **LinkedIn and email**. If you're thinking about collaborating or have a project opportunity, drop him a message — he actively checks both.`,
  },

  // ── PROJECT: Attendance Face Recognition ──────────────────────────────────
  {
    id: 'proj_attendance',
    topic: 'projects',
    keywords: ['attendance','face','recognition','facial','opencv','biometric','employee','checkin','check-in','checkout','tkinter','sqlite','camera','vision'],
    response: `🤖 **Attendance Face Recognition System**

An intelligent attendance management system that automates employee check-ins and check-outs using facial recognition technology.

**Tech Stack:** Python · OpenCV · Face Recognition library · SQLite · Tkinter
**Goal:** Eliminate manual attendance tracking using computer vision

The system detects and recognises faces in real-time via camera, matches them against a stored employee database, and logs timestamps automatically — no cards, no manual entry.`,
  },

  // ── PROJECT: AI Research Tool ──────────────────────────────────────────────
  {
    id: 'proj_research',
    topic: 'projects',
    keywords: ['research','tool','academic','papers','summarize','summarization','analysis','langchain','openai','vector','streamlit','assistant','document'],
    response: `🔬 **AI Research Tool**

An intelligent research assistant that helps gather, analyse, and summarise academic papers and research materials using AI.

**Tech Stack:** Python · LangChain · OpenAI API · Streamlit · Vector Database
**Goal:** Streamline the research process with AI-powered analysis

Users input a research topic and the system retrieves, analyses, and summarises relevant academic content — cutting research time dramatically. Built on LangChain with vector-based semantic search.`,
  },

  // ── PROJECT: Laptop Price Predictor ────────────────────────────────────────
  {
    id: 'proj_laptop',
    topic: 'projects',
    keywords: ['laptop','price','predictor','prediction','scikit','sklearn','random forest','flask','pandas','machine learning','regression','hardware','specs','specification'],
    response: `💻 **Laptop Price Predictor**

A machine learning model that predicts laptop prices based on hardware specifications (RAM, processor, storage, brand, GPU, etc.).

**Tech Stack:** Python · Scikit-learn · Pandas · Flask · Random Forest
**Dataset:** Laptop specifications dataset from Kaggle
**Goal:** Predict laptop prices from specs with high accuracy

Trained on thousands of laptop listings, this model helps buyers and sellers estimate fair market value. Deployed as a Flask web app with an interactive UI.`,
  },

  // ── PROJECT: AI Conversational Agent ─────────────────────────────────────
  {
    id: 'proj_chatbot',
    topic: 'projects',
    keywords: ['conversational','chatbot','customer service','nlp','openai','langchain','support','chat','dialogue','natural language'],
    response: `💬 **AI Conversational Agent**

An intelligent chatbot with advanced NLP capabilities for customer service and general assistance.

**Tech Stack:** Python · LangChain · OpenAI · Streamlit · Vector Store
**Goal:** Create human-like conversational AI for customer support

Goes beyond simple rule-based responses — uses semantic understanding via vector embeddings to retrieve relevant context and generate natural, accurate replies. Designed for production customer service scenarios.`,
  },

  // ── PROJECT: E-Voting System ────────────────────────────────────────────────
  {
    id: 'proj_evoting',
    topic: 'projects',
    keywords: ['voting','e-voting','evoting','blockchain','cryptography','election','secure','tamper','transparent','flask','sqlite'],
    response: `🗳️ **E-Voting System**

A secure online voting platform with blockchain integration for transparent, tamper-proof elections.

**Tech Stack:** Python · Flask · Blockchain · Cryptography · SQLite
**Goal:** Enable secure and transparent online voting

Each vote is cryptographically signed and stored on a blockchain, making it immutable and auditable. The system ensures both anonymity and verifiability — key requirements for legitimate digital elections.`,
  },

  // ── PROJECT: Pydantic Validation ────────────────────────────────────────────
  {
    id: 'proj_pydantic',
    topic: 'projects',
    keywords: ['pydantic','validation','serialization','fastapi','type','hints','json','schema','api','data quality'],
    response: `🔒 **Pydantic Data Validation Projects**

A collection of projects showcasing advanced data validation and serialization using Pydantic for robust API development.

**Tech Stack:** Python · Pydantic · FastAPI · Type Hints · JSON Schema
**Goal:** Implement type-safe data validation and serialization

Demonstrates production patterns for data integrity in ML pipelines and APIs — validating inputs, catching edge cases at schema level, and ensuring clean data flows through AI systems.`,
  },

  // ── PROJECT: Comic Reader ────────────────────────────────────────────────────
  {
    id: 'proj_comic',
    topic: 'projects',
    keywords: ['comic','reader','digital','bookmark','offline','recommendation','tkinter','pil','sqlite','reading'],
    response: `📚 **Comic Reader Application**

A digital comic reader with bookmarking, offline reading, and personalised recommendations.

**Tech Stack:** Python · Tkinter · PIL (Pillow) · SQLite · Recommendation System
**Goal:** Create an engaging digital comic reading experience

Features a recommendation engine that suggests comics based on reading history and preferences — applying collaborative filtering concepts in a consumer-facing desktop app.`,
  },

  // ── PROJECT: Credit Card Fraud Detection ──────────────────────────────────
  {
    id: 'proj_fraud',
    topic: 'projects',
    keywords: ['fraud','credit card','detection','fraudulent','transaction','smote','imbalanced','logistic regression','random forest','classification','banking','finance'],
    response: `🛡️ **Credit Card Fraud Detection**

A machine learning system that identifies fraudulent credit card transactions with high accuracy while minimising false positives.

**Tech Stack:** Logistic Regression · Random Forest · SMOTE (for class imbalance)
**Goal:** Classify transactions as legitimate or fraudulent in real-time

The key challenge was extreme class imbalance (fraud is rare). Arpan applied SMOTE oversampling to balance the training data, significantly improving recall on the fraud class without sacrificing precision. He wrote about this challenge in his blog.`,
  },

  // ── PROJECT: Employee Attrition Prediction ────────────────────────────────
  {
    id: 'proj_attrition',
    topic: 'projects',
    keywords: ['employee','attrition','hr','retention','prediction','decision trees','shap','ibm','kaggle','human resources','leave','turnover'],
    response: `👥 **Employee Attrition Prediction**

A predictive model that helps HR departments identify employees at risk of leaving — enabling proactive retention strategies.

**Tech Stack:** Decision Trees · SHAP for model interpretability
**Dataset:** IBM HR Analytics (Kaggle)
**Goal:** Predict which employees might leave a company

Uses SHAP values to explain *why* the model flagged each employee — making the predictions actionable for HR teams, not just a black box score.`,
  },

  // ── PROJECT: Air Quality Prediction ────────────────────────────────────────
  {
    id: 'proj_airquality',
    topic: 'projects',
    keywords: ['air quality','aqi','pollution','prediction','xgboost','regression','time series','india','weather','environment','forecast'],
    response: `🌿 **Air Quality Prediction**

A regression model that forecasts Air Quality Index (AQI) values based on weather patterns and historical pollution data.

**Tech Stack:** Regression models · XGBoost · Time Series analysis
**Dataset:** Indian Air Quality Dataset (Kaggle / CPCB)
**Goal:** Predict AQI and pollution levels using weather features

Built on Indian air quality data, this model forecasts pollution levels up to 24 hours ahead — useful for public health advisories and city planning. Arpan also wrote a data analysis article on this dataset.`,
  },

  // ── PROJECT: AI Code Assistant ─────────────────────────────────────────────
  {
    id: 'proj_code_assistant',
    topic: 'projects',
    keywords: ['code','assistant','copilot','completion','generation','transformer','codet5','fastapi','vscode','vs code','extension','developer','autocomplete'],
    response: `⚡ **AI-Powered Code Assistant**

An intelligent code completion and generation tool — similar in concept to GitHub Copilot — built using transformer models fine-tuned on programming datasets.

**Tech Stack:** Python · Transformers · CodeT5 · FastAPI · VS Code Extension
**Goal:** Assist developers with intelligent code suggestions and generation

Fine-tuned CodeT5 on a curated programming dataset and exposed it via a FastAPI backend with a VS Code extension frontend. Handles multi-language code completion and docstring generation.`,
  },

  // ── PROJECT: Multimodal RAG ──────────────────────────────────────────────────
  {
    id: 'proj_multimodal_rag',
    topic: 'projects',
    keywords: ['multimodal','rag','retrieval','augmented','generation','clip','chromadb','gpt4v','gpt-4','vision','image','document','text','streamlit'],
    response: `🔥 **Multimodal RAG System** *(One of Arpan's flagship projects)*

An advanced Retrieval-Augmented Generation system that processes **text, images, and documents together** to provide comprehensive AI-powered answers.

**Tech Stack:** LangChain · CLIP · ChromaDB · OpenAI GPT-4V · Streamlit
**Goal:** Create intelligent document analysis with multimodal understanding

What makes this special: it doesn't just search text — it understands images and visual content too. CLIP generates embeddings for both text and images into the same vector space, enabling cross-modal retrieval. GPT-4V then synthesises answers from mixed text/image context. A genuinely cutting-edge RAG implementation.`,
  },

  // ── PROJECT: AI Video Generator ──────────────────────────────────────────────
  {
    id: 'proj_video_gen',
    topic: 'projects',
    keywords: ['video','content','generator','generation','stable diffusion','elevenlabs','moviepy','gradio','social media','marketing','automated','script','voiceover'],
    response: `🎬 **AI Video Content Generator**

An automated video creation platform that generates engaging content from text prompts using AI for scripting, voiceover, and visual generation.

**Tech Stack:** Python · Stable Diffusion · ElevenLabs API · MoviePy · Gradio
**Goal:** Automate video content creation for social media and marketing

Full pipeline: text prompt → AI-generated script → ElevenLabs voiceover → Stable Diffusion visuals → MoviePy assembly → finished video. Reduces video production from hours to minutes.`,
  },

  // ── PROJECT: AI Trading Bot ────────────────────────────────────────────────
  {
    id: 'proj_trading',
    topic: 'projects',
    keywords: ['trading','bot','crypto','cryptocurrency','reinforcement learning','lstm','binance','tensorflow','sentiment','automated','market','algorithm','finance'],
    response: `📈 **Real-time AI Trading Bot** *(Arpan's boldest project)*

A sophisticated trading algorithm using Reinforcement Learning and sentiment analysis for automated cryptocurrency trading.

**Tech Stack:** Python · Reinforcement Learning · LSTM · Binance API · TensorFlow
**Goal:** Develop profitable automated trading strategies using AI

The RL agent learns from market patterns over time while the LSTM component handles time-series price prediction. Sentiment signals from news and social media add a third data layer. All decisions execute in real-time on the Binance exchange. High-risk, high-complexity — and a great demonstration of real-world RL deployment.`,
  },

  // ── PROJECT: Finance Assistant ─────────────────────────────────────────────
  {
    id: 'proj_finance',
    topic: 'projects',
    keywords: ['finance','financial','personal finance','budget','spending','plaid','fastapi','react','dashboard','money','investment','advisor','recommendation'],
    response: `💰 **AI-Powered Personal Finance Assistant**

An intelligent financial advisor that analyses spending patterns, provides budgeting recommendations, and predicts future financial trends.

**Tech Stack:** Python · Scikit-learn · Plaid API · FastAPI · React Dashboard
**Goal:** Provide personalised financial insights and recommendations

Connects to bank accounts via Plaid API, analyses transaction history, categorises spending automatically, and generates personalised budgeting advice using ML. The React dashboard displays trends and forecasts visually.`,
  },

  // ── PROJECT: Medical Diagnosis AI ─────────────────────────────────────────
  {
    id: 'proj_medical',
    topic: 'projects',
    keywords: ['medical','diagnosis','xray','mri','ct scan','healthcare','imaging','pytorch','monai','dicom','fastapi','anomaly','detection','hospital','doctor'],
    response: `🏥 **AI Medical Diagnosis Assistant**

A computer vision system for medical image analysis — detecting anomalies in X-rays, MRIs, and CT scans.

**Tech Stack:** Python · PyTorch · MONAI · DICOM · FastAPI · Medical Imaging
**Goal:** Assist healthcare professionals with AI-powered medical imaging analysis

Uses MONAI (Medical Open Network for AI) — a specialised deep learning framework for healthcare imaging — to process DICOM files and flag potential anomalies for clinician review. Designed as a *decision support tool*, not a replacement for medical judgment.`,
  },

  // ── PROJECT: Social Media Analytics ────────────────────────────────────────
  {
    id: 'proj_social',
    topic: 'projects',
    keywords: ['social media','analytics','sentiment','bert','twitter','brand','competitor','viral','plotly','dash','nlp','monitoring','instagram','marketing'],
    response: `📱 **AI-Driven Social Media Analytics**

A comprehensive social media monitoring tool using NLP and sentiment analysis to track brand mentions, analyse competitor strategies, and predict viral content.

**Tech Stack:** Python · BERT · Twitter API · Sentiment Analysis · Plotly Dash
**Goal:** Provide actionable social media insights using AI analytics

Real-time sentiment tracking across platforms, competitor benchmarking, and viral prediction scoring — all in a Plotly Dash interactive dashboard. Uses fine-tuned BERT for domain-specific sentiment classification.`,
  },

  // ── PROJECT: Smart Home AI ──────────────────────────────────────────────────
  {
    id: 'proj_smarthome',
    topic: 'projects',
    keywords: ['smart home','home automation','iot','edge ai','mqtt','tensorflow lite','sensor','energy','security','comfort','adaptive','raspberry'],
    response: `🏠 **AI-Powered Smart Home System**

An intelligent home automation system that learns user preferences and optimises energy consumption, security, and comfort.

**Tech Stack:** Python · IoT Sensors · Edge AI · MQTT · TensorFlow Lite
**Goal:** Create adaptive smart home automation using AI and IoT

Runs TensorFlow Lite models on edge devices (Raspberry Pi) for low-latency local inference. Learns occupancy patterns, adjusts lighting/temperature automatically, and sends security alerts — all without sending data to the cloud.`,
  },

  // ── PROJECT: AI Resume Optimizer ────────────────────────────────────────────
  {
    id: 'proj_resume',
    topic: 'projects',
    keywords: ['resume','optimizer','job','matching','career','nlp','spacy','bert','recommendation','hiring','linkedin','ats','keyword'],
    response: `📄 **AI Resume Optimizer & Job Matcher**

An intelligent career platform that optimises resumes using NLP, matches candidates with suitable jobs, and provides personalised career recommendations.

**Tech Stack:** Python · spaCy · BERT · Job APIs · Recommendation Systems
**Goal:** Revolutionise job searching with AI-powered matching and optimisation

Analyses a resume against job descriptions using BERT embeddings, identifies gaps, suggests improvements, and ranks job matches by semantic similarity — going far beyond keyword matching.`,
  },

  // ── PROJECT: Cybersecurity AI ────────────────────────────────────────────────
  {
    id: 'proj_cybersec',
    topic: 'projects',
    keywords: ['cybersecurity','security','threat','detection','anomaly','network','deep learning','siem','intrusion','prevention','attack','vulnerability','firewall'],
    response: `🔐 **AI-Enhanced Cybersecurity System**

An advanced threat detection system using machine learning to identify and prevent cyber attacks, analyse network traffic patterns, and predict security vulnerabilities.

**Tech Stack:** Python · Anomaly Detection · Network Analysis · Deep Learning · SIEM Integration
**Goal:** Enhance cybersecurity with AI-powered threat detection and prevention

Analyses network traffic in real-time for anomalous patterns indicative of intrusion attempts. Integrates with SIEM platforms to feed alerts into existing security workflows. Uses autoencoders for unsupervised anomaly detection — no labelled attack data required.`,
  },

  // ── BLOG: Online Pharmacies ────────────────────────────────────────────────
  {
    id: 'blog_pharmacy',
    topic: 'blogs',
    keywords: ['pharmacy','online pharmacy','consumer','intention','adopt','offline','brick mortar','digital','pharmaceutical','health','ecommerce'],
    response: `📝 **"A Study on Consumer Intention to Adopt Online Pharmacies as an Alternative to Offline Stores"**
*Published: January 20, 2026 · 15 min read*

This research study investigates the factors influencing consumer decisions to switch from traditional brick-and-mortar pharmacies to digital pharmaceutical platforms.

Examines trust, convenience, product variety, and pricing as key decision drivers — with implications for digital health businesses and pharmacy chains planning online expansion.`,
  },

  // ── BLOG: Online Marketing ─────────────────────────────────────────────────
  {
    id: 'blog_marketing',
    topic: 'blogs',
    keywords: ['online marketing','digital marketing','business environment','pandemic','post-pandemic','marketing','strategy','transformation','consumer behaviour'],
    response: `📝 **"The Study and Effect of Online Marketing on Today's Business Environment"**
*Published: January 15, 2026 · 18 min read*

An in-depth analysis of how digital marketing strategies have transformed the modern business landscape, particularly in the post-pandemic era.

This was also Arpan's MBA capstone research — examining ROI metrics, consumer behaviour shifts, and the accelerated digital adoption caused by COVID-19. Bridges academic research with practical business implications.`,
  },

  // ── BLOG: LangGraph ────────────────────────────────────────────────────────
  {
    id: 'blog_langgraph',
    topic: 'blogs',
    keywords: ['langgraph','complex','workflow','graph','conversational','flow','decision','tree','ai workflow','state machine','agent','tutorial'],
    response: `📝 **"Mastering LangGraph: Building Complex AI Workflows"**
*Published: November 10, 2024 · 11 min read*

A deep technical guide to building sophisticated AI applications using LangGraph's graph-based approach for managing complex conversational flows and decision trees.

Covers: state machine design, branching logic, multi-agent coordination, and handling long-running AI tasks. Code-first, practical examples throughout. One of Arpan's most well-received technical articles.`,
  },

  // ── BLOG: Face Recognition ─────────────────────────────────────────────────
  {
    id: 'blog_face_recognition',
    topic: 'blogs',
    keywords: ['face recognition','computer vision','opencv','attendance','deep learning','deployment','real world','facial','detection','recognition system'],
    response: `📝 **"Computer Vision in Real-World Applications: Face Recognition Systems"**
*Published: October 22, 2024 · 10 min read*

A practical deep dive into implementing face recognition systems for attendance tracking — exploring OpenCV, deep learning models, and deployment strategies.

Goes from theory to production: model selection, accuracy vs. speed trade-offs, handling edge cases (lighting, occlusion, multiple faces), and deploying on resource-constrained hardware. Companion piece to his Attendance Face Recognition project.`,
  },

  // ── BLOG: Pydantic ─────────────────────────────────────────────────────────
  {
    id: 'blog_pydantic',
    topic: 'blogs',
    keywords: ['pydantic','data validation','type safe','ml pipeline','machine learning','serialization','api','data quality','type hints','schema'],
    response: `📝 **"Pydantic for Data Scientists: Type-Safe ML Pipelines"**
*Published: October 5, 2024 · 8 min read*

How to use Pydantic for robust data validation in machine learning projects — ensuring data quality and reducing debugging time.

Covers model input validation, output schema enforcement, and integration with FastAPI for production ML APIs. Practical patterns for catching data quality issues before they propagate through the pipeline.`,
  },

  // ── BLOG: MLOps ────────────────────────────────────────────────────────────
  {
    id: 'blog_mlops',
    topic: 'blogs',
    keywords: ['mlops','production','deployment','model','monitoring','versioning','ci/cd','continuous integration','pipeline','devops','model registry','drift'],
    response: `📝 **"MLOps Best Practices: From Model Development to Production"**
*Published: September 18, 2024 · 13 min read*

Essential practices for deploying machine learning models in production — covering monitoring, versioning, and continuous integration.

Covers model registries, data drift detection, A/B testing for models, automated retraining triggers, and CI/CD pipelines for ML. One of Arpan's most comprehensive technical guides.`,
  },

  // ── BLOG: Fraud Detection ──────────────────────────────────────────────────
  {
    id: 'blog_fraud',
    topic: 'blogs',
    keywords: ['fraud detection','credit card','imbalanced','class imbalance','smote','machine learning','random forest','logistic regression','recall','precision'],
    response: `📝 **"How I Built a ML Model to Detect Credit Card Fraud (and What I Learned About Class Imbalance)"**
*Published: August 15, 2024 · 8 min read*

An honest account of building a fraud detection model — with a deep focus on the class imbalance problem that makes fraud detection hard.

Covers SMOTE oversampling, precision/recall trade-offs, why accuracy is a misleading metric for imbalanced data, and practical solutions. A companion to his Credit Card Fraud Detection project.`,
  },

  // ── BLOG: Air Quality ──────────────────────────────────────────────────────
  {
    id: 'blog_air',
    topic: 'blogs',
    keywords: ['air quality','pollution','india','python','matplotlib','seaborn','data visualization','eda','exploratory','aqi','environment'],
    response: `📝 **"Exploring Indian Air Pollution Data with Python: A Data Scientist's Perspective"**
*Published: July 2, 2024 · 10 min read*

A deep dive into air quality data visualisation using Python, Matplotlib, and Seaborn to uncover pollution patterns across India.

Features rich EDA (exploratory data analysis) with geographic heatmaps, seasonal trend analysis, and correlation studies between weather variables and pollution levels. Companion to his Air Quality Prediction project.`,
  },

  // ── BLOG: Random Forest ────────────────────────────────────────────────────
  {
    id: 'blog_random_forest',
    topic: 'blogs',
    keywords: ['random forest','algorithm','decision tree','ensemble','bagging','feature importance','visual','beginner','explainer','how it works'],
    response: `📝 **"What's Really Going on Inside a Random Forest? (With Visuals)"**
*Published: June 10, 2024 · 6 min read*

Demystifying the inner workings of Random Forest algorithms with intuitive explanations and visual diagrams for beginners.

Covers: how decision trees vote, bootstrap aggregation, feature importance scoring, and when to use Random Forest vs. other ensemble methods. Written to be beginner-friendly without dumbing down the actual mechanics.`,
  },

  // ── EXPERIENCE ─────────────────────────────────────────────────────────────
  {
    id: 'experience',
    topic: 'experience',
    keywords: ['experience','work','career','job','role','freelance','self employed','current','professional','history','employed'],
    response: `💼 **Professional Experience**

**AI Engineer & Strategist — Freelance/Self-employed (Current)**
Focused on Generative AI system design and strategic AI consulting. Building production-grade LLM applications, RAG systems, and multi-agent architectures for clients.

His hands-on experience spans:
• End-to-end LLM application development
• Business process automation with AI (n8n, Argo Workflows)
• Data pipeline architecture
• AI strategy consulting for businesses
• 20+ AI/ML projects across diverse domains

He's actively seeking exciting opportunities — especially in agentic AI, LLM systems, and strategic AI product roles.`,
  },

];

// ─── Retrieval Engine ──────────────────────────────────────────────────────────
export function retrieveChunks(query: string, topN = 3): KBChunk[] {
  const tokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOP.has(t));

  if (tokens.length === 0) return [];

  const scored = KB.map(chunk => {
    let score = 0;
    const kwLower = chunk.keywords.map(k => k.toLowerCase());
    const respLower = chunk.response.toLowerCase();

    for (const token of tokens) {
      // Exact keyword match — highest weight
      if (kwLower.some(k => k === token)) { score += 5; continue; }
      // Partial keyword match
      if (kwLower.some(k => k.includes(token) || token.includes(k))) { score += 3; continue; }
      // Content match — each occurrence adds 1
      const hits = (respLower.match(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      score += hits;
    }

    return { chunk, score };
  });

  return scored
    .filter(s => s.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(s => s.chunk);
}

// ─── Topic grouping helper ─────────────────────────────────────────────────────
export function topicLabel(topic: string): string {
  const map: Record<string, string> = {
    about: 'background', philosophy: 'philosophy', education: 'education',
    certifications: 'certifications', internship: 'training & internships',
    skills: 'skills', contact: 'contact', projects: 'projects',
    blogs: 'articles', experience: 'experience',
  };
  return map[topic] ?? topic;
}
