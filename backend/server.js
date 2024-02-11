import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

const app = express();

const PORT = 3000;
const host = "localhost";

app.use(cors());
app.use(express.json());

app.post("/open-ai", async (req, res) => {
  const { systemContent, userContent } = req.body;

  const response = await main({ systemContent, userContent });

  res.status(200).send(response);
});

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main({ systemContent, userContent }) {
  console.log(systemContent, userContent);
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${
          systemContent.username ? `My name is ${systemContent.username}` : ""
        }, you are ${
          systemContent.chatboxStyle
        }, answer every questions in this style!`,
      },
      { role: "user", content: userContent },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  return chatCompletion.choices[0].message;
}

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});
