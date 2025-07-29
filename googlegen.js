import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
const ai = new GoogleGenAI({});
import { Buffer } from 'buffer';

let prompt = 'Give me one sentence of an indroduction someone might give as an icebreaker';

export async function generateText(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  })
  return response.text;
}

export async function generateVoice(text, name) {
   const ai = new GoogleGenAI({});

   ${text}`;

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

   const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
   return Buffer.from(data, 'base64');
}

console.log("Promise has been created and handlers attached. Waiting for settlement...");
