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
  const { systemContent, userContent, messagesHistory } = req.body;

  const response = await main({ systemContent, userContent, messagesHistory });

  res.status(200).send(response);
});

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main({ systemContent, userContent, messagesHistory }) {
  const systemMessageContent = `${
    systemContent.username
      ? `My absolute name is ${systemContent.username} and always start the sentence with my name mentioned, `
      : ""
  }you are absolutely ${
    systemContent.chatboxStyle
  }, answer every questions in this style! Don't mix up my name with previous history chats because my real name is at the start of the sentence! Our previous messages are: ${messagesHistory.map(
    (message) =>
      `${
        message.role === "system"
          ? " Your message: " + message.content
          : " My message: " + message.content
      }`
  )}`;

  console.log(systemMessageContent);
  console.log('-----------------');
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessageContent,
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
