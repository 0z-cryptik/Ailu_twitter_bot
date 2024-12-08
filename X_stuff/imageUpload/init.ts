import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";
import * as fs from "fs";
import { uploadURL, accessSecret, accessToken } from "./miscVariables";

config();

export const initializeMediaUpload = async (imagePath: string) => {
  const imageStats = fs.statSync(imagePath);
  const totalBytes = imageStats.size;

  const initResponse = await new Promise<any>((resolve, reject) => {
    (myOauth.post as any)(
      uploadURL,
      accessToken,
      accessSecret,
      {
        command: "INIT",
        media_type: "image/jpeg",
        total_bytes: totalBytes
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data));
        }
      }
    );
  });

  return initResponse.media_id_string;
};
