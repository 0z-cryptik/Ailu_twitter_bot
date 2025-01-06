import fetch from "node-fetch";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config({ path: "../../.env" });

const BEARER_TOKEN = process.env.BEARER_TOKEN;
const USER_ID = process.env.DAICHI_ACCOUNT_ID;

export const fetchTweets = async () => {
  const url = `https://api.twitter.com/2/users/${USER_ID}/tweets`;
  const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

  const params = new URLSearchParams({
    max_results: "10",
    exclude: "replies,retweets"
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();

      const tweets: string[] =
        data?.data?.map((tweet: { text: string }) => tweet.text) || [];

      console.log(tweets);

      const delimiter = "|";

      const tweetsFilePath = path.join(
        __dirname,
        "../../files/tweets/daichiTweets.txt"
      );

      fs.writeFileSync(tweetsFilePath, tweets.join(`\n${delimiter}\n`));
      console.log(
        "Tweets successfully fetched and saved to daichiTweets.txt"
      );
    } else {
      console.error("Error fetching tweets:", await response.json());
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

fetchTweets();
