import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Attendance Face Recognition System',
    description: 'An intelligent attendance management system using facial recognition technology to automate employee check-ins and check-outs.',
    goal: 'Automate attendance tracking using computer vision.',
    tech: ['Python', 'OpenCV', 'Face Recognition', 'SQLite', 'Tkinter'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'AI Research Tool',
    description: 'An intelligent research assistant that helps gather, analyze, and summarize academic papers and research materials using AI.',
    goal: 'Streamline research process with AI-powered analysis.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'Streamlit', 'Vector Database'],
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Laptop Price Predictor',
    description: 'A machine learning model that predicts laptop prices based on specifications like RAM, processor, storage, and brand.',
    goal: 'Predict laptop prices using hardware specifications.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Random Forest'],
    dataset: 'Laptop specifications dataset from Kaggle',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'AI Conversational Agent',
    description: 'An intelligent chatbot built with advanced NLP capabilities for customer service and general assistance.',
    goal: 'Create human-like conversational AI for customer support.',
    tech: ['Python', 'LangChain', 'OpenAI', 'Streamlit', 'Vector Store'],
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    title: 'E-Voting System',
    description: 'A secure online voting platform with blockchain integration for transparent and tamper-proof elections.',
    goal: 'Enable secure and transparent online voting.',
    tech: ['Python', 'Flask', 'Blockchain', 'Cryptography', 'SQLite'],
    image: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    title: 'Pydantic Data Validation Projects',
    description: 'A collection of projects showcasing advanced data validation and serialization using Pydantic for robust API development.',
    goal: 'Implement type-safe data validation and serialization.',
    tech: ['Python', 'Pydantic', 'FastAPI', 'Type Hints', 'JSON Schema'],
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 7,
    title: 'Comic Reader Application',
    description: 'A digital comic reader with features like bookmarking, offline reading, and personalized recommendations.',
    goal: 'Create an engaging digital comic reading experience.',
    tech: ['Python', 'Tkinter', 'PIL', 'SQLite', 'Recommendation System'],
    image: 'https://images.pexels.com/photos/1005012/pexels-photo-1005012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 8,
    title: 'Credit Card Fraud Detection',
    description: 'A machine learning system designed to identify fraudulent credit card transactions with high accuracy while minimizing false positives.',
    goal: 'Classify transactions as legit or fraudulent.',
    tech: ['Logistic Regression', 'Random Forest', 'SMOTE (for imbalance)'],
    image: 'https://cdn.britannica.com/54/237654-050-9DD5E536/Macro-image-of-all-major-credit-card-companies.jpg?w=385'
  },
  {
    id: 9,
    title: 'Employee Attrition Prediction',
    description: 'A predictive model that helps HR departments identify employees at risk of leaving, enabling proactive retention strategies.',
    goal: 'Predict which employees might leave a company.',
    tech: ['Decision Trees', 'SHAP for interpretability'],
    dataset: 'IBM HR Analytics on Kaggle',
    image: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 10,
    title: 'Air Quality Prediction',
    description: 'A regression model that forecasts air quality indices based on weather patterns and historical pollution data.',
    goal: 'Predict AQI or pollution levels using weather features.',
    tech: ['Regression models', 'XGBoost', 'Time Series'],
    dataset: 'Indian Air Quality Dataset (Kaggle or CPCB)',
    image: 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2018/11/05/Pictures/pollution_ad2e9940-e0b6-11e8-a684-a3b63261dee4.jpg'
  },
  {
    id: 11,
    title: 'AI-Powered Code Assistant',
    description: 'An intelligent code completion and generation tool similar to GitHub Copilot, built using transformer models and fine-tuned on programming datasets.',
    goal: 'Assist developers with intelligent code suggestions and generation.',
    tech: ['Python', 'Transformers', 'CodeT5', 'FastAPI', 'VS Code Extension'],
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 12,
    title: 'Multimodal RAG System',
    description: 'Advanced Retrieval-Augmented Generation system that processes text, images, and documents to provide comprehensive AI-powered answers.',
    goal: 'Create intelligent document analysis with multimodal understanding.',
    tech: ['LangChain', 'CLIP', 'ChromaDB', 'OpenAI GPT-4V', 'Streamlit'],
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 13,
    title: 'AI Video Content Generator',
    description: 'Automated video creation platform that generates engaging content from text prompts using AI models for script writing, voiceover, and visual generation.',
    goal: 'Automate video content creation for social media and marketing.',
    tech: ['Python', 'Stable Diffusion', 'ElevenLabs API', 'MoviePy', 'Gradio'],
    image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 14,
    title: 'Real-time AI Trading Bot',
    description: 'Sophisticated trading algorithm using reinforcement learning and sentiment analysis to make automated trading decisions in cryptocurrency markets.',
    goal: 'Develop profitable automated trading strategies using AI.',
    tech: ['Python', 'Reinforcement Learning', 'LSTM', 'Binance API', 'TensorFlow'],
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 15,
    title: 'AI-Powered Personal Finance Assistant',
    description: 'Intelligent financial advisor that analyzes spending patterns, provides budgeting recommendations, and predicts future financial trends using machine learning.',
    goal: 'Provide personalized financial insights and recommendations.',
    tech: ['Python', 'Scikit-learn', 'Plaid API', 'FastAPI', 'React Dashboard'],
    image: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 16,
    title: 'AI Medical Diagnosis Assistant',
    description: 'Computer vision system for medical image analysis, capable of detecting anomalies in X-rays, MRIs, and CT scans with high accuracy.',
    goal: 'Assist healthcare professionals with AI-powered medical imaging analysis.',
    tech: ['Python', 'PyTorch', 'MONAI', 'DICOM', 'FastAPI', 'Medical Imaging'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 17,
    title: 'AI-Driven Social Media Analytics',
    description: 'Comprehensive social media monitoring tool that uses NLP and sentiment analysis to track brand mentions, analyze competitor strategies, and predict viral content.',
    goal: 'Provide actionable social media insights using AI analytics.',
    tech: ['Python', 'BERT', 'Twitter API', 'Sentiment Analysis', 'Plotly Dash'],
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 18,
    title: 'AI-Powered Smart Home System',
    description: 'Intelligent home automation system that learns user preferences and optimizes energy consumption, security, and comfort using IoT sensors and machine learning.',
    goal: 'Create adaptive smart home automation using AI and IoT.',
    tech: ['Python', 'IoT Sensors', 'Edge AI', 'MQTT', 'TensorFlow Lite'],
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 19,
    title: 'AI Resume Optimizer & Job Matcher',
    description: 'Intelligent career platform that optimizes resumes using NLP, matches candidates with suitable jobs, and provides personalized career recommendations.',
    goal: 'Revolutionize job searching with AI-powered matching and optimization.',
    tech: ['Python', 'spaCy', 'BERT', 'Job APIs', 'Recommendation Systems'],
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 20,
    title: 'AI-Enhanced Cybersecurity System',
    description: 'Advanced threat detection system using machine learning to identify and prevent cyber attacks, analyze network traffic patterns, and predict security vulnerabilities.',
    goal: 'Enhance cybersecurity with AI-powered threat detection and prevention.',
    tech: ['Python', 'Anomaly Detection', 'Network Analysis', 'Deep Learning', 'SIEM Integration'],
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];