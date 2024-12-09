import { myOauth, oauth } from "../Oauth/Oauth";
import { config } from "dotenv";
import { uploadURL } from "./miscVariables";
import axios from "axios";

config();

export const finalizeUpload = async (mediaID: string) => {
  try {
    // Prepare payload
    const payload = new URLSearchParams({
      command: "FINALIZE",
      media_id: mediaID
    });

    // Prepare the OAuth parameters
    const requestData = {
      url: uploadURL,
      method: "POST",
      data: {
        command: "FINALIZE",
        media_id: mediaID
      }
    };

    // OAuth Authorization
    const oauthParams = oauth.toHeader(
      oauth.authorize(requestData, {
        key: process.env.ACCESS_TOKEN,
        secret: process.env.ACCESS_SECRET
      })
    );

    // Send the request
    const response = await axios.post(uploadURL, payload, {
      headers: {
        Authorization: oauthParams.Authorization,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log("Media upload finalized successfully.");
    return response.data.media_id_string;
  } catch (err) {
    console.error("Error finalizing upload:", err.message || err);
    throw new Error("Error finalizing upload");
  }
};
