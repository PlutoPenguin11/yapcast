import { generateText, generateVoice } from './googlegen.js';

export class Persona {
  constructor(name, voice, personality) {
    this.name = name;
    this.voice = voice; 
    this.personality = personality;
  }

  async generateResponse(previousMessage, previousName) {
    let prompt = 
    `Please generate a short response as though you're a podcast host named ${this.voice}.
    Your personality is: 
    ${this.personality}
    You are responding to your cohost named ${previousName} who just said: 
    ${previousMessage}`;

  try {
      const value = await generateText(prompt);
      console.log(value);
      generateVoice(value, this.voice);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  }

}