import { Persona } from "./persona.js";
import Speaker from 'speaker';
import { Readable } from 'stream';

const queue = [];
const MAX_BUFFER_SIZE = 6;
const MAX_RESPONSES = 10;
let responseCount = 0;

const greg = new Persona('Greg', 'Umbriel', 'Laid-back and knowledgeable');
const rachel = new Persona('Rachel', 'Erinome', 'Engaged and friendly');
const john = new Persona('John', 'Achird', 'Supportive and thoughtful');

const speakers = [greg, rachel];
let lastSpeaker = null;
let prompt = `Any cool new restaurants you've been to lately?`;




async function main() {
  await Promise.all([producer(), consumer()]);
}

async function producer() {
  while (responseCount < MAX_RESPONSES) {
    if (queue.length < MAX_BUFFER_SIZE) {
      const speaker = getNextSpeaker(lastSpeaker);
      const previousName = lastSpeaker?.name || "a guest";

      // Customize the prompt if we're near the end
      let thisPrompt = prompt;
      if (responseCount === MAX_RESPONSES - 2) {
        thisPrompt = `${prompt}
        We're almost out of time — anything you'd like to share before we wrap up?`;
      } else if (responseCount === MAX_RESPONSES - 1) {
        thisPrompt = `${prompt}
        Last thoughts before we go?`;
      }

      const [text, audio] = await speaker.generateResponse(thisPrompt, previousName);

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
  if (!previous) return speakers[0];
  const index = speakers.indexOf(previous);
  return speakers[(index + 1) % speakers.length];
}

async function consumer() {
  while (queue.length < 4) {
    await delay(100);
  }

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
