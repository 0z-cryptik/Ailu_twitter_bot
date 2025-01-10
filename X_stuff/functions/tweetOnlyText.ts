import { tweetURL } from "../../globalVariables/globalVariables.js";
import { oauth } from "../Oauth/Oauth.js";

export const tweetOnlyText = async (
  tweetText: string,
  accessToken: string,
  accessTokenSecret: string
) => {
  const payloadData = {
    text: tweetText
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      { url: tweetURL, method: "POST" },
      {
        key: accessToken,
        secret: accessTokenSecret
      }
    )
  );

  const response = await fetch(tweetURL, {
    method: "POST",
    headers: { ...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(payloadData)
  });

  if (!response.ok){
    const errorResponse = await response.json()
    throw new Error(`Error posting text tweet ${JSON.stringify(errorResponse)}`)
  }
};
