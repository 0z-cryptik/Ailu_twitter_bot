import { getTweetText } from "./getTweet";
import { tweetOnlyText } from "../X_stuff/functions/tweetOnlyText";
import { config } from "dotenv";
import { tweetImage } from "./tweetImage";

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
