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

// const makePost3 = async() => {
//   const tweets = fs.readFileSync("../files/tweets/daichiTweets.txt", "utf-8")

//   const prompt = `These are tweets from a certain twitter account, I want you to study them and write a tweet in the style and manner of this twitter account, I want you to copy the user's style. These are the tweets: ${tweets} NOTE: don't include any link in the tweet`

//   const answer = await generateTweetText(prompt)

//   return answer
// }

// makePost3()
