import { generateText, generateVoice } from './googlegen.js';

export class Persona {
  constructor(name, voice, personality) {
    this.name = name;
    this.voice = voice; 
    this.personality = personality;
  }

  async generateResponse(previousMessage, previousName) {
    let text = '', voice = '';
    let prompt = 
    `Please generate a short response as though you're a podcast host named ${this.name}.
    Your personality is: 
    ${this.personality}
    You are responding to your cohost named ${previousName} who just said: 
    ${previousMessage}`;

  try {
      const generatedText = await generateText(prompt);
      console.log(generatedText);
      text = generatedText;
      const generatedVoice = await generateVoice(generatedText, this.voice);
      voice = generatedVoice;
    } catch (error) {
      console.error("Error generating text:", error);
    }

    return [text, voice];
  }

}