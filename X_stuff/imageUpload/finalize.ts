import { myOauth2 } from "../Oauth/Oauth";
import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import axios from "axios";


export const finalizeUpload = async (mediaID: string) => {
  try {
    const payload = {
      command: "FINALIZE",
      media_id: mediaID,
    };

    const authHeader = myOauth2.toHeader(
      myOauth2.authorize(
        { url: uploadURL, method: "POST" },
        {
          key: accessToken!,
          secret: accessSecret!,
        }
      )
    );

    const response = await axios.post(uploadURL, payload, {
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
      },
    });

    console.log("Media upload finalized.");
    return response.data.media_id_string;
  } catch (error) {
    console.error("Error finalizing upload:", error);
    throw error;
  }
};
