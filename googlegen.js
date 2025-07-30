import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import { Buffer } from 'buffer';

// Both functions pull api key from .env
// If .env doesn't exist (it won't directly downloaded from GitHub) then program will prompt user.

export async function generateText(prompt) {
   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

   try {
      // Call to Google's Generative Language API
      const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: prompt
      });

      return response.text; // Returns string of generated text
   } catch (err) {
      // Handle invalid key
      throw new Error("Gemini API error (text): " + err.message);
   }
}

export async function generateVoice(text, name) {
   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

   try {
      // Prompt with tone directions for TTS
      const message = `Say in a casual, natural tone like you're in a chill podcast:
      ${text}`;

      // Call to Google's Cloud Text-to-Speech API
      const response = await ai.models.generateContent({
         model: "gemini-2.5-flash-preview-tts",
         contents: [{ parts: [{ text: message }] }],
         config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
               voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: name },
               },
            },
         },
      });

      // Clean data and return audio only
      const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return Buffer.from(data, 'base64');
   } catch (err) {
      // Handle invalid key, quota, or other Gemini API issues
      throw new Error("Gemini API error (voice): " + err.message);
   }
}
