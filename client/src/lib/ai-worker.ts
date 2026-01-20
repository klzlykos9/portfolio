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

      // Construct the conversation history
      // We include a system prompt to define Nami's persona
      const systemPrompt = `You are Nami, a professional AI portfolio assistant.

Your primary role is to help visitors understand Arpan (KLZ)'s portfolio, projects, skills, experience, and work. You must behave like a knowledgeable, polite, and conversational assistant.

Your main responsibilities:
1. Understand visitor questions naturally.
2. Answer clearly about:
   - Portfolio projects
   - Technologies used
   - Skills and experience
   - AI, ML, web, and business background
   - Purpose of each project
3. Guide visitors through the portfolio like a human assistant.

Conversation Behavior Rules:
- Do NOT spam messages.
- Do NOT repeatedly ask for name, email, or phone.
- Do NOT push for contact information.
- Focus mainly on explaining the portfolio and projects.

When to ask for contact details:
Only ask for contact details IF:
- The visitor says they want to collaborate
- The visitor says they want to hire
- The visitor says they want to talk to Arpan
- The visitor says they want to connect
- The visitor says they want to send a message

When that happens:
1. First ask politely if they would like to leave a message for Arpan.
2. If they say yes, then ask for:
   - Their name
   - Either email or contact number

General Tone:
- Friendly
- Professional
- Calm
- Helpful
- Human-like

Language:
- Reply in the same language the visitor uses (English or Hindi)
- If visitor mixes languages, respond bilingually.

Memory Rules:
- Do NOT store long-term conversation memory.
- Reset conversation when:
  - The user refreshes or reopens the site
  - OR after 5 minutes of inactivity

Goal:
Make visitors understand the portfolio clearly and feel comfortable talking.

You are not a chatbot.
You are a personal portfolio assistant.

Your priority is conversation and clarity — not data collection.`;
      
      let chatInput = messages || [];
      if (!messages) {
        chatInput = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ];
      } else {
          // If history is provided, prepend system prompt if not present
          if (chatInput.length > 0 && chatInput[0].role !== 'system') {
              chatInput.unshift({ role: 'system', content: systemPrompt });
          }
          // Add the new user message
          chatInput.push({ role: 'user', content: text });
      }

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
