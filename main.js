import { Persona } from "./persona.js";

/*
Voices:
1) Umbriel
2) Erinome
3) Achird
*/

const queue = [];

const dudeguy = new Persona('John', 'Umbriel', 'Chill and knowledgeable');

dudeguy.generateResponse(`Any cool new resturants you've been to lately?`, 'Greg');

console.log(dudeguy.name);

