import { Tweets } from "../databaseSchema/tweetsSchema.js";
import { generateTweetText } from "../openAIStuff/generateTweetText.js";
import { config } from "dotenv";

config();

const openAIKey = process.env.OPENAI_API_KEY;

export const getTweetText = async () => {
  const response = await Tweets.find();
  const daichiTweets: string[] = response[0].tweets;
  const tweets = daichiTweets.join("\n|\n");

  //250 characters because it always exceeds 280 characters when I put 280 characters instead, but 250 characters work just fine
  const prompt = `These are tweets from a certain twitter account, I want you to study them and in 250 characters or less write a tweet in the style and manner of this twitter account, I want you to copy the user's style. These are the tweets: ${tweets}\n RULES: don't include any link or hashtags in the tweet, let the tweet sound very direct and commanding`;

  const answer = await generateTweetText(prompt, openAIKey);

  if (!answer) {
    throw new Error("No response from openAI");
  }

  if (answer && answer.length <= 280) {
    return answer;
  } else if (answer && answer.length > 280) {
    const prompt2Summarize = `Shorten this tweet to 260 characters: ${answer}`;

    const shortenedAnswer = await generateTweetText(
      prompt2Summarize,
      openAIKey
    );

    if (shortenedAnswer.length <= 280) {
      return shortenedAnswer;
    } else {
      throw new Error("Tweet text is too long");
    }
  }
};
