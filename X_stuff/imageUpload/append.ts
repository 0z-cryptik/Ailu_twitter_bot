import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";

config();

export const appendMediaData = async (
  media_id: string,
  imageData: string
) => {
  const APPEND_URL = "https://upload.twitter.com/1.1/media/upload.json";

  const formData = new URLSearchParams();
  formData.append("media_id", media_id);
  formData.append("media_data", imageData); // Ensure the image data is base64 encoded

  const authHeader = myOauth.toHeader(
    myOauth.authorize(
      { url: APPEND_URL, method: "POST" },
      {
        key: process.env.ACCESS_TOKEN,
        secret: process.env.ACCESS_SECRET
      }
    )
  );

  const response = await fetch(APPEND_URL, {
    method: "POST",
    headers: {
      ...authHeader,
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Media append failed: ${JSON.stringify(data)}`);
  }

  return data;
};
