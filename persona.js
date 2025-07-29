import { generateText, generateVoice } from './googlegen.js';

export class Persona {
  constructor(name, personality) {
    this.name = name; 
    this.personality = personality;
  }

  async generateResponse(previousMessage, previousName) {
    let prompt = 
    `Please generate a short response as though you're a podcast host named ${this.name}.
    Your personality is: 
    ${this.personality}
    You are responding to your cohost named ${previousName} who just said: 
    ${previousMessage}`;

  try {
      const value = await generateText(prompt);
      console.log(value);
      generateVoice(value, this.name);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  }

}