import { myOauth, myOauth2 } from "../Oauth/Oauth";
import { config } from "dotenv";
import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import axios from "axios";

config();

export const initializeMediaUpload = async (imageURL: string) => {
  try {
    const imageFetch = await axios.get(imageURL, {
      responseType: "arraybuffer"
    });
    const imageBuffer = imageFetch.data;

    const oauthHeader = myOauth2.toHeader(
      myOauth2.authorize(
        { url: uploadURL, method: "POST" },
        { key: accessToken, secret: accessSecret }
      )
    );

    const payload = new URLSearchParams({
      command: "INIT",
      media_type: "image/jpeg",
      total_bytes: imageBuffer.length.toString()
    });

    const initResponse = await axios.post(uploadURL, payload, {
      headers: {
        ...oauthHeader,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log("initialized")
    return [initResponse.data.media_id_string, imageBuffer];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
