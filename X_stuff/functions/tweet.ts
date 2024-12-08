import { config } from "dotenv";
import { myOauth2 } from "../Oauth/Oauth";

config();

const API_URL = "https://api.x.com/2/tweets";

const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_SECRET;

if (!accessToken || !accessTokenSecret) {
  throw new Error("ACCESS_TOKEN or ACCESS_SECRET is missing in the environment variables.");
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
        media_ids: [mediaID],
      },
    };

    const authHeader = myOauth2.toHeader(
      myOauth2.authorize(
        { url: API_URL, method: "POST" },
        {
          key: accessToken,
          secret: accessTokenSecret,
        }
      )
    );

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        ...authHeader,
        "Content-Type": "application/json", // Correct Content-Type for JSON payload
      },
      body: JSON.stringify(payloadData), // JSON payload
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error posting tweet:", errorData);
      return;
    }

    const responseData = await response.json();
    console.info("Tweet posted successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};
