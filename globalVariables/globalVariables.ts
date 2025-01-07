import { config } from "dotenv";

config({ path: "../.env" });

export const accessToken = process.env.ACCESS_TOKEN;
export const accessSecret = process.env.ACCESS_SECRET;
export const bearertoken = process.env.BEARER_TOKEN;
export const uploadURL =
  "https://upload.twitter.com/1.1/media/upload.json";
export const tweetURL = "https://api.x.com/2/tweets";
export const mediaPostURL =
  "https://upload.twitter.com/1.1/media/metadata/create.json";

console.log(accessSecret, bearertoken);
