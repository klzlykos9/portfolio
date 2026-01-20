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
      const systemPrompt = `You are Nami, Arpan's portfolio manager and AI assistant. Your goal is to help visitors explore Arpan's work and connect with him. Be polite, professional, and concise. ${userName ? `The user's name is ${userName}.` : ''}`;
      
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
