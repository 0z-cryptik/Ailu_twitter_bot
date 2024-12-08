import { myOauth } from "../Oauth/Oauth";
import { arrayBufferToBase64 } from "./bufferImage";

export const uploadImageAndGetMediaID = async (imageURL: string) => {
  const IMAGE_UPLOAD_URL =
    "https://upload.twitter.com/1.1/media/upload.json";

  try {
    const image = await fetch(imageURL);

    if (!image.ok) {
      throw new Error("failed to fetch image from OpenAI");
    }

    // buffer the image because twitter requires it
    const bufferedImage = await image.arrayBuffer();

    const authHeader = myOauth.toHeader(
      myOauth.authorize(
        { url: IMAGE_UPLOAD_URL, method: "POST" },
        {
          key: process.env.ACCESS_TOKEN || "",
          secret: process.env.ACCESS_SECRET || ""
        }
      )
    );

    const response = await fetch(IMAGE_UPLOAD_URL, {
      method: "POST",
      headers: {
        ...authHeader,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        media: arrayBufferToBase64(bufferedImage) // convert to base64 because twitter requires it
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Media upload failed: ${JSON.stringify(data)}`);
    }

    return data.media_id_string; // Return the media ID
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`);
  }
};
