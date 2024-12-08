import OpenAI from "openai";
import { config } from "dotenv";

config();

const key = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: key });

export const generateTweetText = async (prompt: string) => {
  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const answer = gptResponse.choices[0].message.content;
  console.log(answer);

  // remove quotation marks and return
  return answer.replace(/"/g, "");
};
