import { oauth } from "../Oauth/Oauth.js";
import { uploadURL } from "../../globalVariables/globalVariables.js";
import axios from "axios";

export const finalizeUpload = async (
  mediaID: string,
  accessToken: string,
  accessSecret: string
) => {
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
        key: accessToken,
        secret: accessSecret
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
  } catch (err) {
    console.error("Error finalizing upload:", err.message || err);
    console.error("Error finalizing upload");
  }
};
