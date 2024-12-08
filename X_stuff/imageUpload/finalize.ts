import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";
import { uploadURL } from "./miscVariables";
import axios from "axios";

config();

export const finalizeUpload = async (mediaID: string) => {
  try {
    // Prepare payload
    const payload = new URLSearchParams({
      command: "FINALIZE",
      media_id: mediaID,
    });

    // OAuth Authorization
    const oauthParams = myOauth.authHeader(
      uploadURL,
      process.env.ACCESS_TOKEN,
      process.env.ACCESS_SECRET,
      "POST"
    );

    // Send the request
    const response = await axios.post(uploadURL, payload, {
      headers: {
        Authorization: oauthParams,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Media upload finalized successfully.");
    return response.data.media_id_string;
  } catch (error) {
    console.error("Error finalizing upload:");
    //throw error;
  }
};
