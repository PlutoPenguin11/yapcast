import { GoogleGenAI } from "@google/genai";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import 'dotenv/config';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

var message;


async function speak() {
const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Give me one sentence descibing a slimey yellow chair",
});
console.log(response.text);
message = response.text;

const elevenlabs = new ElevenLabsClient();

const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {

  text: message,

  modelId: 'eleven_multilingual_v2',

  outputFormat: 'mp3_44100_128',

});

await play(audio);


}

speak();

console.log(message);

