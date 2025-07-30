import { Persona } from "./persona.js";
import Speaker from 'speaker';
import { Readable } from 'stream';

const queue = [];
const MAX_BUFFER_SIZE = 6;
const MAX_RESPONSES = 10; // Pick a number above 4
let responseCount = 0;

// Personality definitions. (Name in podcast, Voice selector for Google TTS, Text description of personality)
const greg = new Persona('Greg', 'Umbriel', 'Laid-back and thoughtful');
const rachel = new Persona('Rachel', 'Erinome', 'Engaged and knowledgeable');
const john = new Persona('John', 'Achird', 'Supportive and friendly');

const podcasters = [greg, rachel]; // Adds personas to actual podcast. Only use 2 here so introductions make sense.
let lastSpeaker = null;
let prompt = `Any cool new restaurants you've been to lately?`;

async function main() {
  await Promise.all([producer(), consumer()]);
}

async function producer() {
  while (responseCount < MAX_RESPONSES) {
    if (queue.length < MAX_BUFFER_SIZE) {
      const speaker = getNextSpeaker(lastSpeaker);

      // Will work best with 2 Personas in podcasters
      // With more than 2, AI will introduce with the first 2 Personas
      const previousName = lastSpeaker ? lastSpeaker.name
        : podcasters.find(p => p !== speaker)?.name || "a guest";

      let thisPrompt = prompt;
      let responsesLeft = (responseCount != 0) ? MAX_RESPONSES - responseCount : -1; // Sets first message's value to -1 for prompting purposes in persona.js

      // Performs API calls
      const [text, audio] = await speaker.generateResponse(thisPrompt, previousName, responsesLeft);

      // Adds audio clip to queue
      if (audio) {
        queue.push(audio);
        prompt = text;
        lastSpeaker = speaker;
        responseCount++;
        console.log(`[${speaker.name}]: ${text}`);
      }
    } else {
      await delay(100);
    }
  }

  console.log("Producer finished — max responses reached.");
}

function getNextSpeaker(previous) {
  if (!previous) return podcasters[0]; // Returns first element if it's the first call
  const index = podcasters.indexOf(previous);
  return podcasters[(index + 1) % podcasters.length]; // Otherwise, returns next element in array
}

async function consumer() {
  // Wait for queue to reach a minimum quantity at start as a buffer
  while (queue.length < 4) {
    await delay(100);
  }

  // Plays each audio clip from queue[] sequentially
  while (true) {
    if (queue.length > 0) {
      await playNext();
    } else {
      await delay(100);
    }
  }
}

async function playNext() {
  const audioBuffer = queue.shift();

  const speaker = new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 24000,
    signed: true,
  });

  const stream = Readable.from(audioBuffer);

  return new Promise((resolve, reject) => {
    stream.pipe(speaker);
    speaker.on('close', resolve);
    speaker.on('error', reject);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();
