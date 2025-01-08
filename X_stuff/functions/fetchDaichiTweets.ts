import { Tweets } from "../../databaseSchema/tweetsSchema";

export const fetchTweets = async (
  BEARER_TOKEN: string,
  USER_ID: string
) => {
  const url = `https://api.twitter.com/2/users/${USER_ID}/tweets`;
  const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

  const params = new URLSearchParams({
    max_results: "40",
    exclude: "replies,retweets"
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    headers
  });

  if (response.ok) {
    const data = await response.json();

    const tweets: string[] =
      data?.data?.map((tweet: { text: string }) => tweet.text) || [];

    if (tweets) {
      await Tweets.deleteMany();
      const newTweets = new Tweets({ tweets: tweets });
      newTweets.save();

      console.log("Tweets successfully fetched and saved to DB");
    } else {
      console.error(
        "response from twitter API is good but tweets array is empty"
      );
    }
  } else {
    throw new Error(`Error fetching tweets: ${await response.json()}`);
  }
};
