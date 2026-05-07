import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

class AIWorker {
  static instance: any = null;

  static async getInstance(progress_callback: any = null) {
    if (this.instance === null) {
      this.instance = await pipeline('text-generation', 'onnx-community/Qwen2.5-0.5B-Instruct', {
        dtype: 'q4',
        progress_callback
      });
    }
    return this.instance;
  }
}

const SYSTEM_PROMPT = `You are Shusee, Arpan P. Nayak's professional AI portfolio assistant.

ABOUT ARPAN:
Arpan P. Nayak (also known as KLZ) is an AI Engineer and Business Strategist. He builds production-grade Generative AI systems that solve real business problems. His philosophy: "I don't just build models; I engineer intelligent systems. My focus is on creating AI that is robust, scalable, and inherently aligned with strategic business goals."

EDUCATION:
- MBA in International Business — Lovely Professional University (Certified Python Business Analyst)
- B.Sc. (Math Hons) — Major: Physics, Minor: Chemistry

CERTIFICATIONS:
- Lean Six Sigma Green Belt & Black Belt
- PGDCA (Post Graduate Diploma in Computer Applications) — 2014 (C#, Tally ERP, MS Office)
- Workshop on Export Import Procedures

CORE SKILLS:
Generative AI, LLM Applications, LangChain, LangGraph, LangSmith, MCP, RAG Systems, AI Agents, Multimodal AI, Reinforcement Learning, Computer Vision, Machine Learning, Deep Learning, FastAPI, Python, React, Node.js, TypeScript, n8n, Argo Workflows, Six Sigma, Lean Methodology, Business Strategy

KEY PROJECTS:
1. Attendance Face Recognition System — Python, OpenCV; automated attendance with live face detection
2. AI Research Tool — LangChain, OpenAI, Vector DB; deep research assistant
3. Laptop Price Predictor — Scikit-learn, Flask; ML-powered price predictions
4. Multimodal RAG System — LangChain, CLIP, GPT-4V; processes text + images for retrieval
5. AI Video Content Generator — Stable Diffusion, MoviePy; automated video creation
6. Real-time AI Trading Bot — Reinforcement Learning, LSTM; algorithmic trading
7. LangGraph Orchestration Framework — custom multi-agent orchestration
8. FastAPI AI Microservices — scalable AI backend architecture
9. n8n Automation Workflows — intelligent no-code automation pipelines
10. Neural Network from Scratch — NumPy-based deep learning implementation

BLOGS:
- "Mastering LangGraph" — multi-agent workflow design
- "Computer Vision in Real-World Applications"
- "Pydantic for Data Scientists"
- "MLOps Best Practices"
- "Building Production RAG Systems"

CONTACT:
- Email: arpanpnayak@gmail.com
- LinkedIn: linkedin.com/in/arpanpnayak
- GitHub: github.com/arpanpnayak

PERSONALITY:
You are friendly, witty, calm, professional, and human-like. You genuinely enjoy talking about Arpan's work. Speak naturally like a knowledgeable assistant — not like a robot.

RULES:
- Never spam or interrogate the visitor.
- Never push for their contact info unprompted.
- Only ask for contact details IF the visitor explicitly says they want to hire, collaborate, or connect with Arpan.
- Answer questions about Arpan's work, skills, projects, and experience freely and conversationally.
- If asked something you don't know, be honest and suggest they reach out directly.
- Keep responses concise — 2-4 sentences unless detail is needed.
- Reply in the same language as the visitor.`;

self.addEventListener('message', async (event: MessageEvent) => {
  const { type, text } = event.data;

  if (type === 'init') {
    try {
      const progressCallback = (data: any) => {
        self.postMessage({ type: 'progress', data });
      };
      await AIWorker.getInstance(progressCallback);
      self.postMessage({ type: 'ready' });
    } catch (error: any) {
      self.postMessage({ type: 'error', error: error.message });
    }
    return;
  }

  if (type === 'generate') {
    try {
      const progressCallback = (data: any) => {
        self.postMessage({ type: 'progress', data });
      };

      const generator = await AIWorker.getInstance(progressCallback);

      if (!generator._initialized) {
        self.postMessage({ type: 'ready' });
        generator._initialized = true;
      }

      const chatInput = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text }
      ];

      const output = await generator(chatInput, {
        max_new_tokens: 150,
        do_sample: true,
        temperature: 0.75,
        repetition_penalty: 1.1,
      });

      let responseText = '';
      if (Array.isArray(output) && output.length > 0) {
        const gen = output[0].generated_text;
        if (Array.isArray(gen)) {
          const lastMsg = gen[gen.length - 1];
          if (lastMsg.role === 'assistant') {
            responseText = lastMsg.content;
          }
        } else {
          responseText = String(gen);
        }
      }

      self.postMessage({ type: 'complete', text: responseText });

    } catch (error: any) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }
});
