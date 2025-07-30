import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import { Buffer } from 'buffer';
const ai = new GoogleGenAI({});

// Both functions pull api key from .env

export async function generateText(prompt) {
   // Call to Google's Generative Language API
   const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
   })
   return response.text; // Returns string of generated text
}

export async function generateVoice(text, name) {
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
}

console.log("Promise has been created and handlers attached. Waiting for settlement...");
