import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import { myOauth } from "../Oauth/Oauth";
import * as fs from "fs";

export const appendMediaData = async (
  mediaID: string,
  imagePath: string
) => {
  await new Promise<void>((resolve, reject) => {
    (myOauth.post as any)(
      uploadURL,
      accessToken,
      accessSecret,
      {
        command: "APPEND",
        media_id: mediaID,
        segment_index: 0
      },
      fs.createReadStream(imagePath),
      "application/octet-stream",
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};
