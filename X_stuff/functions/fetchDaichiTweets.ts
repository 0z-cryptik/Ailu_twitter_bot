import fetch from "node-fetch";
import { config } from "dotenv";

config({ path: "../../.env" });

const BEARER_TOKEN = process.env.BEARER_TOKEN


const fetchUserId = async (): Promise<string | null> => {
  const url = "https://api.twitter.com/2/users/by/username/CryptoDaichi";
  const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

  try {
    const response = await fetch(url, { headers });

    if (response.ok) {
      const data = await response.json();
      return data?.data?.id || null;
    } else {
      console.error("Error fetching user ID:", await response.json());
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const fetchTweets = async (
  userId: string,
  maxResults: number = 100
): Promise<string[]> => {
  const url = `https://api.twitter.com/2/users/${userId}/tweets`;
  const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

  const params = new URLSearchParams({
    max_results: maxResults.toString(),
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

(async () => {
  // Fetch user ID
  const userId = await fetchUserId();

  if (userId) {
    // Fetch and save tweets
    const tweets = await fetchTweets(userId);

    if (tweets.length > 0) {
      console.log(tweets)
    } else {
      console.error("No tweets fetched or an error occurred.");
    }
  } else {
    console.error("Failed to fetch user ID.");
  }
})();

//1490204143104974849
