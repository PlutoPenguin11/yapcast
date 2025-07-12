const GeminiKey = process.env.GeminiKey;
//const ElevenlabsKey = process.env.ElevenlabsKey;
const ElevenlabsKey = process.env.ElevenlabsTestingKey;

import { GoogleGenAI } from "@google/genai";

const chat_model = "chatgpt";

if (chat_model == "chatgpt") {

    const openai = new OpenAI();

    const response = await openai.responses.create({
        model: "gpt-4o",
        input: "Tell me a three sentence bedtime story about a unicorn."
    });

    console.log(response);

} else {

    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({});

    async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
    }

    main();
}
