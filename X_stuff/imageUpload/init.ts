import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";
import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import axios from "axios";

config();

export const initializeMediaUpload = async (imageURL: string) => {
  const imageFetch = await axios.get(imageURL, {
    responseType: "arraybuffer"
  });
  const imageBuffer = imageFetch.data;

  const initResponse = await new Promise<any>((resolve, reject) => {
    (myOauth.post as any)(
      uploadURL,
      accessToken,
      accessSecret,
      {
        command: "INIT",
        media_type: "image/jpeg",
        total_bytes: imageBuffer.length
      },
      (error, response, data) => {
        if (error) {
          reject(error);
        } else if (typeof data === "string") {
          resolve(JSON.parse(data));
        } else {
          resolve(data); 
        }
      }
    );
  });

  return [initResponse.media_id_string, imageBuffer];
};
