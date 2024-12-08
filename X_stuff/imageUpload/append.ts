import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import { myOauth } from "../Oauth/Oauth";

export const appendMediaData = async (
  mediaID: any,
  imageBuffer: any
) => {
  await new Promise<void>((resolve, reject) => {
    (myOauth.post as any)(
      uploadURL,
      accessToken,
      accessSecret,
      {
        command: "APPEND",
        media_id: mediaID,
        segment_index: 0,
        media_data: imageBuffer.toString("base64")
      },
      (error, response, data) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};
