import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
const ai = new GoogleGenAI({});

import wav from 'wav';

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

export async function generateVoice(text, voiceName) {
      const ai = new GoogleGenAI({});

      let message = `Say in a casual, natural tone like you're in a chill podcast:
      ${text}`

      const response = await ai.models.generateContent({
         model: "gemini-2.5-flash-preview-tts",
         contents: [{ parts: [{ text: message }] }],
         config: {
               responseModalities: ['AUDIO'],
               speechConfig: {
                  voiceConfig: {
                     prebuiltVoiceConfig: { voiceName: voiceName },
                  },
               },
         },
      });

   async function saveWaveFile(
      filename,
      pcmData,
      channels = 1,
      rate = 24000,
      sampleWidth = 2,
   ) {
      return new Promise((resolve, reject) => {
         const writer = new wav.FileWriter(filename, {
               channels,
               sampleRate: rate,
               bitDepth: sampleWidth * 8,
         });

         writer.on('finish', resolve);
         writer.on('error', reject);

         writer.write(pcmData);
         writer.end();
      });
   }

      const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      const audioBuffer = Buffer.from(data, 'base64');

      const fileName = 'out.wav';
      await saveWaveFile(fileName, audioBuffer);
};

console.log("Promise has been created and handlers attached. Waiting for settlement...");
