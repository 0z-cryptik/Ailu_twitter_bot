import { config } from "dotenv";

config();

export const accessToken = process.env.ACCESS_TOKEN;
export const accessSecret = process.env.ACCESS_SECRET;
export const uploadURL =
  "https://upload.twitter.com/1.1/media/upload.json";
export const tweetURL = "https://api.x.com/2/tweets";
