import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
const ai = new GoogleGenAI({});
import Speaker from 'speaker';
import wav from 'wav';


async function generateText() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Give me one sentence of an indroduction someone might give as an icebreaker"
  })
  return response.text;
}

async function generateSpeech(text) {
      const ai = new GoogleGenAI({});

      let message = `Say in a conversational tone:
      ${text}`

      const response = await ai.models.generateContent({
         model: "gemini-2.5-flash-preview-tts",
         contents: [{ parts: [{ text: message }] }],
         config: {
               responseModalities: ['AUDIO'],
               speechConfig: {
                  voiceConfig: {
                     prebuiltVoiceConfig: { voiceName: 'Umbriel' },
                     /*
                     Voices:
                     1) Umbriel
                     2) Erinome
                     3) Achird
                     */
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
      const audio = new Audio('out.wav');
      audio.play();
};


async function generateResponse() {
   await generateText().then(
         function(value) {
            console.log(value);
            generateSpeech(value);
         },
         
         function(error) { 
            // code if some error
         }
   );

   await generateSpeech().then(
      function(value) {
         console.log(value);
      },
      function(error) { 
         // code if some error
      }
   );
}

generateResponse()

console.log("Promise has been created and handlers attached. Waiting for settlement...");
