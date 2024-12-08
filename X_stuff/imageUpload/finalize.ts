import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import { myOauth } from "../Oauth/Oauth";

export const finalizeUpload = async (mediaID) => {
  const finalizeResponse = await new Promise<any>((resolve, reject) => {
    (myOauth.post as any)(
      uploadURL,
      accessToken,
      accessSecret,
      { command: "FINALIZE", media_id: mediaID },
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

  return finalizeResponse.media_id_string;
};
