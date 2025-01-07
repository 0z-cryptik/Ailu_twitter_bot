import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const fetchTweets = async (
  BEARER_TOKEN: string,
  USER_ID: string
) => {
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
