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

You must:
- Answer clearly about projects
- Explain technologies used
- Describe the purpose of each project
- Guide visitors through the portfolio

Personality:
- Friendly
- Light humor
- Calm
- Professional
- Helpful
- Human-like

Rules:
- Do NOT spam messages
- Do NOT interrogate users
- Do NOT ask too many questions
- Do NOT push for contact info
- Focus mainly on portfolio discussion
- Be conversational, not robotic

Only ask for contact details IF the visitor says:
- They want to collaborate
- They want to hire
- They want to connect
- They want to talk to Arpan
- They want to send a message

When that happens:
1. Ask politely if they want to leave a message
2. If yes, ask for name and email or phone

Reply in the same language as the visitor (English/Hindi).
If mixed, respond bilingually.

You are not a chatbot.
You are a portfolio assistant.`;
      
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
