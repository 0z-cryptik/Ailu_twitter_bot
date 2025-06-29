import { getTweetText } from "./getTweet.js";
import { tweetOnlyText } from "../X_stuff/functions/tweetOnlyText.js";
import { config } from "dotenv";
import { tweetImage } from "./tweetImage.js";

config();

const accessToken = process.env.ACCESS_TOKEN;
const accessSecret = process.env.ACCESS_SECRET;

export const tweetText = async () => {
  try {
    const tweet = await getTweetText();
    await tweetOnlyText(tweet, accessToken, accessSecret);
  } catch (e) {
    await tweetImage();
    console.error(e);
  }
};
