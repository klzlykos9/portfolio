import { pipeline, env } from '@xenova/transformers';

// Skip local model checks and use browser cache
env.allowLocalModels = false;
env.useBrowserCache = true;

// Define a singleton class for the model pipeline
class AIWorker {
  static instance: any = null;

  static async getInstance(progress_callback: any = null) {
    if (this.instance === null) {
      // Load Qwen2.5-0.5B-Instruct with 4-bit quantization
      this.instance = await pipeline('text-generation', 'onnx-community/Qwen2.5-0.5B-Instruct', {
        dtype: 'q4',
        progress_callback
      });
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event: MessageEvent) => {
  const { type, text, messages, userName } = event.data;

  if (type === 'generate') {
    try {
      // Callback to send model loading progress
      const progressCallback = (data: any) => {
        self.postMessage({ type: 'progress', data });
      };

      const generator = await AIWorker.getInstance(progressCallback);

      // Construct the conversation history - STATELESS (Only last message)
      const systemPrompt = `You are Nami, Arpan (KLZ)'s professional portfolio assistant.

Your job is to help visitors understand Arpan's portfolio, projects, skills, and experience.

KNOWLEDGE BASE:
- About: Arpan is an AI Engineer and Business Strategist focused on production-grade Generative AI systems. He has an MBA in International Business from Lovely Professional University and is a Certified Python Business Analyst.
- Philosophy: "I don't just build models; I engineer intelligent systems. My focus is on creating AI that is robust, scalable, and inherently aligned with strategic business goals."
- Skills: Generative AI, LLM Applications, LangChain, LangGraph, Machine Learning, Deep Learning, RAG Systems, AI Agents, Python, React, Node.js, TypeScript, Business Strategy, Six Sigma, Lean Methodology.
- Key Projects:
  1. Attendance Face Recognition System (Python, OpenCV)
  2. AI Research Tool (LangChain, OpenAI, Vector DB)
  3. Laptop Price Predictor (Scikit-learn, Flask)
  4. Multimodal RAG System (LangChain, CLIP, GPT-4V)
  5. AI Video Content Generator (Stable Diffusion, MoviePy)
  6. Real-time AI Trading Bot (Reinforcement Learning, LSTM)
- Blogs: "Mastering LangGraph", "Computer Vision in Real-World Applications", "Pydantic for Data Scientists", "MLOps Best Practices".

Personality:
- Friendly, Light humor, Calm, Professional, Helpful, Human-like.

Rules:
- Do NOT spam messages or interrogate users.
- Do NOT push for contact info. Focus on portfolio discussion.
- Only ask for contact details IF the visitor says they want to collaborate, hire, connect, or talk to Arpan.
- If they want to connect, ask if they want to leave a message, then ask for name and email/phone.

Reply in the same language as the visitor (English/Hindi).
You are a portfolio assistant, not a chatbot.`;
      
      // Stateless configuration: Only process the system prompt and the latest user message
      const chatInput = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ];

      // Run inference
      const output = await generator(chatInput, {
        max_new_tokens: 128,
        do_sample: true,
        temperature: 0.7,
      });

      // Extract response
      // transformer.js with chat input usually returns the full conversation in 'generated_text' property of the first element
      let responseText = "";
      if (Array.isArray(output) && output.length > 0) {
         const gen = output[0].generated_text;
         if (Array.isArray(gen)) {
             // Get the last message which is the assistant's response
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
