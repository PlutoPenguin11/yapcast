import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
const ai = new GoogleGenAI({});
import { Buffer } from 'buffer';
import Speaker from 'speaker';

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

   const message = `Say in a casual, natural tone like you're in a chill podcast:
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
   const audioBuffer = Buffer.from(data, 'base64');

   const speaker = new Speaker({
      channels: 1,
      bitDepth: 16,
      sampleRate: 24000,
      signed: true,
   });

   speaker.write(audioBuffer);
   speaker.end();
}

console.log("Promise has been created and handlers attached. Waiting for settlement...");
