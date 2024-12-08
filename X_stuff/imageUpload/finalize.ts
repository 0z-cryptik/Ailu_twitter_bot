import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";

config();

export const finalizeUpload = async (media_id: string) => {
  const FINALIZE_URL = "https://upload.twitter.com/1.1/media/upload.json";

  const formData = new FormData()
  formData.append("media_id", media_id);

  const authHeader = myOauth.toHeader(
    myOauth.authorize(
      { url: FINALIZE_URL, method: "POST" },
      {
        key: process.env.ACCESS_TOKEN,
        secret: process.env.ACCESS_SECRET
      }
    )
  );

  const response = await fetch(FINALIZE_URL, {
    method: "POST",
    headers: {
      ...authHeader,
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Finalizing media upload failed: ${JSON.stringify(data)}`
    );
  }

  return data.media_id_string;
};
