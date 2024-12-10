import axios from "axios";
import { oauth } from "../Oauth/Oauth";
import {
  accessSecret,
  accessToken,
  uploadURL
} from "../../globalVariables/globalVariables";

export const initializeMediaUpload = async (imageURL: string) => {
  try {
    // Fetch the image
    const imageFetch = await axios.get(imageURL, {
      responseType: "arraybuffer"
    });

    const imageBuffer = imageFetch.data;

    console.log(imageBuffer);
    console.log(
      "Detected image type:",
      imageBuffer.slice(0, 4).toString("hex")
    );

    // Prepare the OAuth parameters
    const requestData = {
      url: uploadURL,
      method: "POST",
      data: {
        command: "INIT",
        media_type: "image/webp", // Use correct media type for your image
        total_bytes: imageBuffer.length.toString()
      }
    };

    // Add token and secret to the authorization process
    const oauthParams = oauth.toHeader(
      oauth.authorize(requestData, {
        key: accessToken,
        secret: accessSecret
      })
    );

    console.log("OAuth Authorization Header:", oauthParams);

    // Send the request to Twitter API to initialize media upload
    const payload = new URLSearchParams({
      command: "INIT",
      media_type: "image/webp",
      total_bytes: imageBuffer.length.toString()
    });

    const initResponse = await axios.post(uploadURL, payload, {
      headers: {
        Authorization: oauthParams.Authorization,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log("Initialization Response:", initResponse.data);

    return [initResponse.data.media_id_string, imageBuffer];
  } catch (err) {
    console.error(
      "Error during initialization:",
      err.response?.data || err.message || err
    );
    throw new Error("Error initializing media upload");
  }
};
