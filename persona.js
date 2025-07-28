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

    await generateText(prompt).then(
      function(value) {
        console.log(value);
        generateVoice(value);
      },
              
      function(error) { 
        // code if some error
      }
    );

    await generateVoice().then(
      function(value) {
        console.log(value);
      },
      function(error) { 
        // code if some error
      }
    );
  }

}