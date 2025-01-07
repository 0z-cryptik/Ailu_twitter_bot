import axios from "axios";
import { oauth } from "../Oauth/Oauth";
import { uploadURL } from "../../globalVariables/globalVariables";
import imageType from "image-type";
import fs from "fs";

export const initializeMediaUpload = async (
  imageBuffer: Buffer,
  accessToken: string,
  accessSecret: string
) => {
  try {
    const imgType = await imageType(imageBuffer);

    // Prepare the OAuth parameters
    const requestData = {
      url: uploadURL,
      method: "POST",
      data: {
        command: "INIT",
        media_type: imgType.mime, // Use correct media type for your image
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
      media_type: imgType.mime,
      total_bytes: imageBuffer.length.toString()
    });

    const initResponse = await axios.post(uploadURL, payload, {
      headers: {
        Authorization: oauthParams.Authorization,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log("Initialization Response:", initResponse.data);

    return initResponse.data.media_id_string;
  } catch (err) {
    console.error(
      "Error during initialization:",
      err.response?.data || err.message || err
    );
    throw new Error("Error initializing media upload");
  }
};
