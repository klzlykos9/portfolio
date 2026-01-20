import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Handling imports robustly for Replit environment
try:
    import numpy as np
    from ctransformers import AutoModelForCausalLM
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    IMPORTS_OK = True
except ImportError as e:
    print(f"Import Error (AI functionality limited): {e}")
    IMPORTS_OK = False
    np = None
    AutoModelForCausalLM = None
    TfidfVectorizer = None
    cosine_similarity = None

app = FastAPI()

# --- Comprehensive Data Loading for Nami ---
PROJECTS = [
    {"title": "Attendance Face Recognition System", "description": "Intelligent attendance management using facial recognition.", "tech": ["Python", "OpenCV", "SQLite"]},
    {"title": "AI Research Tool", "description": "Research assistant analyzing academic papers using AI.", "tech": ["Python", "LangChain", "Vector DB"]},
    {"title": "Laptop Price Predictor", "description": "ML model predicting prices based on specs.", "tech": ["Python", "Scikit-learn", "Random Forest"]},
    {"title": "AI Conversational Agent", "description": "NLP chatbot for customer assistance.", "tech": ["Python", "LangChain", "Vector Store"]},
    {"title": "E-Voting System", "description": "Blockchain-based secure voting platform.", "tech": ["Python", "Blockchain", "Cryptography"]},
    {"title": "AI Video Content Generator", "description": "Automated video creation from text prompts.", "tech": ["Python", "Stable Diffusion", "MoviePy"]},
    {"title": "Multimodal RAG System", "description": "Advanced RAG processing text and images.", "tech": ["LangChain", "CLIP", "ChromaDB"]}
]

EXPERIENCE = [
    {"role": "Sales Team Lead", "company": "THE INSPiREEZ IT SOLUTION", "period": "Apr 2015 – Sep 2017", "location": "Bhubaneswar, India", "responsibilities": ["Managed international sales call center", "VoIP campaigns", "KPI monitoring", "Client communications"]},
    {"role": "Customer Service Representative", "company": "Shinux.com", "period": "May 2014 – Mar 2015", "location": "Bhubaneswar, India", "responsibilities": ["Sales process trainee", "Client handling", "Lead qualification"]},
    {"role": "Accountant", "company": "SACHIN ENTERPRISES", "period": "Jan 2014 – Apr 2014", "location": "Bhubaneswar, India", "responsibilities": ["Tally ERP accounting", "Financial records management", "Billing and reconciliation"]}
]

EDUCATION = [
    {"degree": "MBA (International Business)", "school": "Lovely Professional University", "period": ""},
    {"degree": "B.Sc (Math Hons)", "school": "Utkal University", "period": ""}
]

CAPSTONES = [
    {"title": "The study and effect of online marketing in today's business environment", "description": "Capstone research project during MBA."},
    {"title": "A STUDY ON CONSUMER INTENTION TO ADOPT ONLINE PHARMACIES AS AN ALTERNATIVE TO OFFLINE STORES", "description": "Capstone research project during MBA."}
]

CERTIFICATIONS = [
    {"title": "Lean Six Sigma Black Belt", "org": "Henry Harvin", "year": "2022"},
    {"title": "Lean Six Sigma Green Belt", "org": "Henry Harvin", "year": "2021"},
    {"title": "Certified Python Business Analyst", "org": "Henry Harvin", "year": "2020"}
]

INTERNSHIPS = [
    {"title": "Lean Six Sigma Black Belt Internship", "org": "Henry Harvin", "period": "July - Aug 2022"},
    {"title": "Lean Six Sigma Green Belt Internship", "org": "Henry Harvin", "period": "Sept - Oct 2022"}
]

# Flatten all data for RAG
documents = []
documents.append("Arpan P. Nayak is an AI/ML Engineer & Business Strategist. He is a senior full-stack AI engineer and frontend architect.")
documents.append("Nami is Arpan’s portfolio manager. She helps visitors explore his work and connect with him. She is energetic, warm, professional, human-like, business-friendly, confident, and welcoming.")
for p in PROJECTS:
    documents.append(f"Project: {p['title']}. Description: {p['description']}. Tech: {', '.join(p['tech'])}.")
for e in EXPERIENCE:
    documents.append(f"Job: {e['role']} at {e['company']} ({e['period']}). Responsibilities: {', '.join(e['responsibilities'])}.")
for ed in EDUCATION:
    documents.append(f"Education: {ed['degree']} from {ed['school']}.")
for cs in CAPSTONES:
    documents.append(f"Capstone Project: {cs['title']}. Description: {cs['description']}.")
for c in CERTIFICATIONS:
    documents.append(f"Certification: {c['title']} from {c['org']} ({c['year']}).")
for i in INTERNSHIPS:
    documents.append(f"Internship: {i['title']} at {i['org']} ({i['period']}).")

documents.append("Skills: AI, Machine Learning, Deep Learning, NLP, Computer Vision, LangChain, Six Sigma, Lean Manufacturing, Python, React, SQL, Power BI, TensorFlow, PyTorch, LangGraph, n8n, MLOps, Pydantic, Computer Vision.")
documents.append("Contact: Email arpanpnayak@gmail.com, LinkedIn linkedin.com/in/arpanpnayak.")

# --- Retrieval Setup ---
if IMPORTS_OK:
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)
else:
    vectorizer = None

# --- LLM Setup ---
MODEL_FILE = "tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"
try:
    if IMPORTS_OK and os.path.exists(MODEL_FILE):
        llm = AutoModelForCausalLM.from_pretrained(MODEL_FILE, model_type="llama", context_length=2048)
    else:
        llm = None
except Exception as e:
    print(f"LLM Load Error: {e}")
    llm = None

class ChatRequest(BaseModel):
    message: str
    user_name: str
    current_page: Optional[str] = None

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not llm or not vectorizer:
        return {"response": "I'm still calibrating my knowledge base. Please try again in a moment."}

    # Proper Greeting Detection
    greetings = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"]
    is_greeting = any(g in request.message.lower() for g in greetings)
    
    if is_greeting and len(request.message.split()) <= 3:
        return {"response": f"Hello {request.user_name}! I'm Nami, Arpan's AI assistant. How can I help you today?"}

    # Retrieval
    query_vec = vectorizer.transform([request.message])
    sims = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_indices = sims.argsort()[-3:][::-1]
    context = [documents[i] for i in top_indices if sims[i] > 0.1]
    context_str = "\n".join(context) if context else "No specific info found."

    prompt = f"""<|system|>
You are Nami, Arpan's professional and witty AI assistant. 
Answer only using the context. If missing, say: "That information is not available yet."
Support English and Hindi. Be friendly to {request.user_name}.
Context: {context_str}
</s>
<|user|>
{request.message}
</s>
<|assistant|>"""

    response = llm(prompt, max_new_tokens=100, temperature=0.7, stop=["</s>"])
    return {"response": response.strip()}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
