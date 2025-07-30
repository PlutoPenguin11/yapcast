Make sure ffmpeg is installed

This program uses Google Cloud Services. 
You'll need to create an account and an API key.

As of this project's creation, both APIs used available for free with usage limits, but the Cloud Text-to-Speech API requires a valid payment method on file.

In google cloud's API Library, enable the following apis:
- Generative Language API
- Cloud Text-to-Speech API

Create a key with both APIs enabled.

Once you have your api key, either:
1) Create a .env file with the value `GEMINI_API_KEY=` followed by your key.
2) Run the program and paste the key into the console when prompted.

To play podcast, run main.js
