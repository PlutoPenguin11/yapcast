import { generateText, generateVoice } from './googlegen.js';

export class Persona {
  constructor(name, voice, personality) {
    this.name = name;
    this.voice = voice; 
    this.personality = personality;
  }

  async generateResponse(previousMessage, previousName, promptsLeft) {
    let text = '', voice = '', prompt = '';

    switch (promptsLeft) {
      case 1:
        prompt = `Please generate a short response as though you're a podcast host named ${this.name}.
        You're out of time so put your last words in and sign off. For reference, your cohost ${previousName} just said: 
        ${previousMessage}`;
        break;
      case 2:
        prompt = `Please generate a short response as though you're a podcast host named ${this.name}.
        You've just check the clock, and you're out of time, so you need to address what your cohost just said and get ready to sign off.
        Your cohost named ${previousName} just said: 
        ${previousMessage}`;
        break;
      default:
        prompt = 
        `Please generate a short response as though you're a podcast host named ${this.name}.
        Your personality is: 
        ${this.personality}
        You are responding to your cohost named ${previousName} who just said: 
        ${previousMessage}`;
        break;
    }

  try {
      const generatedText = await generateText(prompt);
      text = generatedText;
      const generatedVoice = await generateVoice(generatedText, this.voice);
      voice = generatedVoice;
    } catch (error) {
      console.error("Error generating text:", error);
    }

    return [text, voice];
  }

}