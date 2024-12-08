import { initializeMediaUpload } from "./init";
import { appendMediaData } from "./append";
import { finalizeUpload } from "./finalize";
import { arrayBufferToBase64 } from "../functions/bufferImage";
import { myOauth } from "../Oauth/Oauth";

export const uploadImageAndGetMediaID = async (imageURL: string) => {
  const IMAGE_UPLOAD_URL =
    "https://upload.twitter.com/1.1/media/upload.json";

  try {
    const image = await fetch(imageURL);

    if (!image.ok) {
      throw new Error("Failed to fetch image for processing");
    }

    const bufferedImage = await image.arrayBuffer();
    const uploadReadyImage = arrayBufferToBase64(bufferedImage);

    // Step 1: Initialize upload
    const media_id = await initializeMediaUpload();

    // Step 2: Append image data
    await appendMediaData(media_id, uploadReadyImage);

    // Step 3: Finalize upload
    const media_id_string = await finalizeUpload(media_id);

    const formData = new FormData();

    formData.append("media_data", uploadReadyImage)
    formData.append("media_category", "tweet_image");

    const authHeader = myOauth.toHeader(
      myOauth.authorize(
        { url: IMAGE_UPLOAD_URL, method: "POST" },
        {
          key: process.env.ACCESS_TOKEN,
          secret: process.env.ACCESS_SECRET
        }
      )
    );

    // Make the POST request with the OAuth header
    const response = await fetch(IMAGE_UPLOAD_URL, {
      method: "POST",
      headers: {
        ...authHeader,
        "Content-Type": "multipart/form-data",
        "Content-Transfer-Encoding": "base64"
      },
      body: formData
    });

    // Parse the response from Twitter API
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Media upload failed: ${JSON.stringify(data)}`);
    }

    return data.media_id_string;
  } catch (error) {
    throw new Error(`Error uploading image: ${(error as Error).message}`);
  }
};
