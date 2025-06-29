import { config } from "dotenv";
import express, { Express, Response, Request } from "express";
import { fetchTweets } from "./X_stuff/functions/fetchDaichiTweets.js";
import mongoose from "mongoose";
import { tweetImage } from "./helperFuncs/tweetImage.js";
import { tweetText } from "./helperFuncs/tweetText.js";

config();

const bearerToken = process.env.BEARER_TOKEN;
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});