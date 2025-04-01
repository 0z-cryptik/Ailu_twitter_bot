import { generateTweetText } from "./openAIStuff/generateTweetText.js";
import { uploadImageAndGetMediaID } from "./X_stuff/imageUpload/uploadImage.js";
import fs from "fs";
import { config } from "dotenv";
import { tweetOnlyText } from "./X_stuff/functions/tweetOnlyText.js";
import { tweetOnlyMedia } from "./X_stuff/functions/tweetOnlyMedia.js";
import express, { Express, Response, Request } from "express";
import { fetchTweets } from "./X_stuff/functions/fetchDaichiTweets.js";
import { getRandomNumber } from "./X_stuff/functions/getRandomNumber.js";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Tweets } from "./databaseSchema/tweetsSchema.js";

config();

const openAIKey = process.env.OPENAI_API_KEY;
const bearerToken = process.env.BEARER_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;
const accessSecret = process.env.ACCESS_SECRET;
const userID = process.env.DAICHI_ACCOUNT_ID;

const app: Express = express();
const port = process.env.PORT;
const database = process.env.MONGODB_URI;

mongoose.connect(database);

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to DB");
});

app.use(express.json());

app.get("/fetchTweets", async (req: Request, res: Response) => {
  if (!req.query.pass || req.query.pass !== process.env.MYPASS) {
    res.sendStatus(400);
    return;
  }

  try {
    await fetchTweets(bearerToken, userID);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/tweet", async (req: Request, res: Response) => {
  if (!req.query.pass || req.query.pass !== process.env.MYPASS) {
    res.sendStatus(400);
    return;
  }

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
  const response = await Tweets.find();
  const daichiTweets: string[] = response[0].tweets;
  const tweets = daichiTweets.join("\n|\n");

  const prompt = `These are tweets from a certain twitter account, I want you to study them and write a tweet in the style and manner of this twitter account, I want you to copy the user's style. These are the tweets: ${tweets} NOTE: don't include any link or hashtags in the tweet, also let the tweet sound very direct and commanding`;

  const answer = await generateTweetText(prompt, openAIKey);

  if (answer) {
    console.info(answer);
    await tweetOnlyText(answer, accessToken, accessSecret);
  } else {
    console.error("no response from openAI");
  }
};

const tweetImage = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imageNumber: number = getRandomNumber();

  let imagePath: string;

  // an mp4 file is at 342
  if (imageNumber === 342) {
    imagePath = path.join(__dirname, "./files/images/342.MP4");
  } else {
    imagePath = path.join(__dirname, `./files/images/${imageNumber}.jpg`);
  }

  const imageBuffer = fs.readFileSync(imagePath);

  const mediaIDString: string = await uploadImageAndGetMediaID(
    imageBuffer,
    accessToken,
    accessSecret,
    imageNumber === 342
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
