import { uploadURL, accessSecret, accessToken } from "./miscVariables";
import { myOauth, myOauth2 } from "../Oauth/Oauth";
import axios from "axios";
import FormData from "form-data";

export const appendMediaData = async (mediaID: any, imageBuffer: any) => {
  try {
    const payload = new FormData();
    payload.append("command", "APPEND");
    payload.append("media_id", mediaID);
    payload.append("segment_index", "0");
    payload.append("media", imageBuffer);

    const authHeader = myOauth2.toHeader(
      myOauth2.authorize(
        { url: uploadURL, method: "POST" },
        { key: accessToken, secret: accessSecret }
      )
    );

    await axios.post(uploadURL, payload, {
      headers: {
        ...authHeader,
        ...payload.getHeaders()
      }
    });

    console.log("picture appended");
  } catch (err) {
    console.error(err);
  }
};
