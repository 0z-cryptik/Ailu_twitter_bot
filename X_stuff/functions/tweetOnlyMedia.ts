import { tweetURL } from "../../globalVariables/globalVariables.js";
import { oauth } from "../Oauth/Oauth.js";
import axios from "axios";

export const tweetOnlyMedia = async (
  mediaIDString: string,
  accessToken: string,
  accessTokenSecret: string
) => {
    const payloadData = {
      media: { media_ids: [mediaIDString] }
    };

    // Generate the OAuth authorization header
    const authHeader = oauth.toHeader(
      oauth.authorize(
        { url: tweetURL, method: "POST" },
        {
          key: accessToken,
          secret: accessTokenSecret
        }
      )
    );

    // Make the POST request to Twitter API using axios
    const response = await axios.post(tweetURL, payloadData, {
      headers: {
        Authorization: authHeader.Authorization,
        "Content-Type": "application/json" // Correct Content-Type for JSON payload
      }
    });

    console.info("media posted successfully:", response.data);
    return response.data;
};
