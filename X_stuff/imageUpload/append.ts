import { oauth } from "../Oauth/Oauth";
import {
  uploadURL,
  accessSecret,
  accessToken
} from "../../globalVariables/globalVariables";
import axios from "axios";

export const appendMediaData = async (
  mediaID: string,
  imageBuffer: Buffer
) => {
  try {
    // Base64 encode the image data
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // Prepare payload
    const payload = new URLSearchParams({
      command: "APPEND",
      media_id: mediaID,
      segment_index: "0", // For larger files, you may need multiple segments
      media: base64Image
    });

    // Prepare the OAuth parameters
    const requestData = {
      url: uploadURL,
      method: "POST",
      data: {
        command: "APPEND",
        media_id: mediaID,
        segment_index: "0", // For larger files, you may need multiple segments
        media: base64Image
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
    await axios.post(uploadURL, payload, {
      headers: {
        Authorization: oauthParams.Authorization,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log("OAuth Authorization Header (APPEND):", oauthParams);

    console.log("Picture appended successfully.");
  } catch (err) {
    throw new Error(`error appending, reason: ${err.message}`);
  }
};
