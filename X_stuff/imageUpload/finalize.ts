import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import { myOauth } from "../Oauth/Oauth";

export const finalizeUpload = async (mediaID: string) => {
  const finalizeResponse = await new Promise<any>((resolve, reject) => {
    (myOauth.post as any)(
      uploadURL,
      accessToken,
      accessSecret,
      { command: "FINALIZE", media_id: mediaID },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data));
        }
      }
    );
  });

  return finalizeResponse.media_id_string;
};
