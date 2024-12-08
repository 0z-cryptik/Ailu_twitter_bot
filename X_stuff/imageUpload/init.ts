import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";
import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import axios from "axios";

config();

export const initializeMediaUpload = async (imageURL: string) => {
  try {
    const imageFetch = await axios.get(imageURL, {
      responseType: "arraybuffer",
    });
    const imageBuffer = imageFetch.data;

    // OAuth Authorization
    const oauthParams = myOauth.authHeader(
      uploadURL,
      process.env.ACCESS_TOKEN,
      process.env.ACCESS_SECRET,
      "POST"
    );

    const payload = new URLSearchParams({
      command: "INIT",
      media_type: "image/jpeg",
      total_bytes: imageBuffer.length.toString(),
    });

    const initResponse = await axios.post(uploadURL, payload, {
      headers: {
        Authorization: oauthParams,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Initialized");
    return [initResponse.data.media_id_string, imageBuffer];
  } catch (err) {
    console.error('error initializing');
    //throw err;
  }
};
