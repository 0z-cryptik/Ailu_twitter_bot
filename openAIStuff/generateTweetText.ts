import OpenAI from "openai";

export const generateTweetText = async (prompt: string, apiKey: string) => {
  const openai = new OpenAI({ apiKey: apiKey });

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

  // remove quotation marks and return
  return answer.replace(/"/g, "");
};
