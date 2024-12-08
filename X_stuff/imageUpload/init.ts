import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";

config();

export const initializeMediaUpload = async () => {
  const INIT_URL = "https://upload.twitter.com/1.1/media/upload.json";

  const formData = new URLSearchParams();
  formData.append("media_category", "tweet_image");

  const authHeader = myOauth.toHeader(
    myOauth.authorize(
      { url: INIT_URL, method: "POST" },
      {
        key: process.env.ACCESS_TOKEN,
        secret: process.env.ACCESS_SECRET
      }
    )
  );

  const response = await fetch(INIT_URL, {
    method: "POST",
    headers: {
      ...authHeader,
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Media init failed: ${JSON.stringify(data)}`);
  }

  return data.media_id_string;
};
