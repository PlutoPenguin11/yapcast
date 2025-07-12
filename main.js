/*

const GeminiKey = process.env.GEMINI_API_KEY;
console.log(GeminiKey)




*/

//const ElevenlabsKey = process.env.ElevenlabsKey;
const ElevenlabsKey = process.env.ElevenlabsTestingKey;


import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Please give a brief affirmative response confirming you recieved this prompt",
  });
  console.log(response.text);
}

main();
