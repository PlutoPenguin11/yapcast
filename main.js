import { Persona } from "./persona.js";
import Speaker from 'speaker';

const queue = [];

const greg = new Persona('Greg', 'Umbriel', 'Laid-back and witty');
const rachel = new Persona('Rachel', 'Erinome', 'Casual and knowledgeable');
const john = new Persona('John', 'Achird', 'Supportive and thoughtful');

async function convo() {
    let audio, prompt = `Any cool new resturants you've been to lately?`;
    [prompt, audio] = await greg.generateResponse(prompt, rachel.name);
    queue.push(audio);
    [prompt, audio] = await rachel.generateResponse(prompt, greg.name);
    queue.push(audio);
    //[prompt, audio] = rachel.generateResponse(prompt, greg.name);
    //[prompt, audio] = greg.generateResponse(prompt, rachel.name);
    console.log(queue.length);

    while(queue.length > 0) {
        let cur = queue.shift();
        await playAudio(cur);
    }
}

async function playAudio(audioBuffer) {
    const speaker = new Speaker({
      channels: 1,
      bitDepth: 16,
      sampleRate: 24000,
      signed: true,
    });

   speaker.write(audioBuffer);
   speaker.end();
}

convo();
