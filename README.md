Make sure ffmpeg is installed

In google cloud's API Library, enable the following apis:
- Generative Language API
- Cloud Text-to-Speech API
And create a key with both enabled.

Once you have your api key, either:
1) Create a .env file with the value GEMINI_API_KEY= followed by your key.
2) Run the program and paste the key into the console when prompted.