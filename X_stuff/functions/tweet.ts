import { config } from "dotenv";
import { myOauth2 } from "../Oauth/Oauth";

config();

const API_URL = "https://api.x.com/2/tweets";

const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_SECRET;

export const tweet = async (tweetText: string, mediaID: string) => {
  try {
    const payloadData = {
      text: tweetText,
      media: {
        media_ids: [mediaID]
      }
    };

    const authHeader = myOauth2.toHeader(
      myOauth2.authorize(
        { url: API_URL, method: "POST" },
        {
          key: accessToken,
          secret: accessTokenSecret
        }
      )
    );

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        ...authHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payloadData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      return;
    }

    const responseData = await response.json();
    console.info("Tweet posted successfully", responseData);
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
