import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });

const BEARER_TOKEN = process.env.BEARER_TOKEN;
const USER_ID = process.env.DAICHI_ACCOUNT_ID;

export const fetchTweets = async (): Promise<string[]> => {
  const url = `https://api.twitter.com/2/users/${USER_ID}/tweets`;
  const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

  const params = new URLSearchParams({
    max_results: "50",
    exclude: "replies,retweets"
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();

      return (
        data?.data?.map((tweet: { text: string }) => tweet.text) || []
      );
    } else {
      console.error("Error fetching tweets:", await response.json());
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

