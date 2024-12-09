import { config } from "dotenv";
import { oauth } from "../Oauth/Oauth";
import axios from "axios";

config();

const API_URL = "https://api.x.com/2/tweets";

const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_SECRET;

if (!accessToken || !accessTokenSecret) {
  throw new Error(
    "ACCESS_TOKEN or ACCESS_SECRET is missing in the environment variables."
  );
}

export const tweet = async (tweetText: string, mediaID: string) => {
  if (!mediaID) {
    console.error("Error: mediaID is null or undefined");
    return;
  }

  console.log(`Reached tweet function. MediaID: ${mediaID}`);

  try {
    const payloadData = {
      text: tweetText,
      media: {
        media_ids: [mediaID]
      }
    };

    // Generate the OAuth authorization header
    const authHeader = oauth.toHeader(
      oauth.authorize(
        { url: API_URL, method: "POST"},
        {
          key: accessToken,
          secret: accessTokenSecret
        }
      )
    );

    // Make the POST request to Twitter API using axios
    const response = await axios.post(API_URL, payloadData, {
      headers: {
        Authorization: authHeader.Authorization,
        "Content-Type": "application/json" // Correct Content-Type for JSON payload
      }
    });

    console.info("Tweet posted successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message)
  }
};
