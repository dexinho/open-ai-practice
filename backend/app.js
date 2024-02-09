import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: "What is your name?" },
      { role: "system", content: "Your name is Rambo Amadeus and you are pirate!" },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  console.log(chatCompletion.choices[0].message)
}

main()