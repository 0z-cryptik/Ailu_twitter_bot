import { generateTweetText } from "./openAIStuff/generateTweetText.js";
import { uploadImageAndGetMediaID } from "./X_stuff/imageUpload/uploadImage.js";
import fs from "fs";
import { config } from "dotenv";
import { tweetOnlyText } from "./X_stuff/functions/tweetOnlyText.js";
import { tweetOnlyMedia } from "./X_stuff/functions/tweetOnlyMedia.js";
import express, { Express, Response } from "express";
import { fetchTweets } from "./X_stuff/functions/fetchDaichiTweets.js";
import { getRandomNumber } from "./X_stuff/functions/getRandomNumber.js";
import path from "path";
import { fileURLToPath } from "url";
config();

const openAIKey = process.env.OPENAI_API_KEY;
const bearerToken = process.env.BEARER_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;
const accessSecret = process.env.ACCESS_SECRET;
const userID = process.env.DAICHI_ACCOUNT_ID;

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/fetchTweets", async (_, res: Response) => {
  try {
    await fetchTweets(bearerToken, userID);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/tweet", async (_, res: Response) => {
  try {
    const tweetTextOrImage = Math.random() < 0.5 ? tweetImage : tweetText;
    await tweetTextOrImage();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

const tweetText = async () => {
  const tweets = fs.readFileSync(
    "./files/tweets/daichiTweets.txt",
    "utf-8"
  );

  console.log(tweets);

  const prompt = `These are tweets from a certain twitter account, I want you to study them and write a tweet in the style and manner of this twitter account, I want you to copy the user's style. These are the tweets: ${tweets} NOTE: don't include any link in the tweet`;

  const answer = await generateTweetText(prompt, openAIKey);

  if (answer) {
    const response = await tweetOnlyText(
      answer,
      accessToken,
      accessSecret
    );

    console.log(response);
  } else {
    console.error("no response from openAI");
  }
};

const tweetImage = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imagePath = path.join(
    __dirname,
    `./files/images/${getRandomNumber()}.jpg`
  );

  const imageBuffer = fs.readFileSync(imagePath);
  const mediaIDString: string = await uploadImageAndGetMediaID(
    imageBuffer,
    accessToken,
    accessSecret
  );

  if (mediaIDString) {
    await tweetOnlyMedia(mediaIDString, accessToken, accessSecret);
  } else {
    console.error("couldn't obtain media ID");
  }
};

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
