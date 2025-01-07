import { initializeMediaUpload } from "./init";
import { appendMediaData } from "./append";
import { finalizeUpload } from "./finalize";

export const uploadImageAndGetMediaID = async (
  imageBuffer: Buffer,
  accessToken: string,
  accessSecret: string
) => {
  // Step 1: Initialize the media upload and get media ID and buffer
  const mediaID = await initializeMediaUpload(imageBuffer, accessToken, accessSecret);

  // Step 2: Append the image data
  await appendMediaData(mediaID, imageBuffer, accessToken, accessSecret);

  // Step 3: Finalize the upload and retrieve the final media ID string
  const mediaIDString = await finalizeUpload(mediaID, accessToken, accessSecret);

  console.log(`Image uploaded successfully, media_id: ${mediaID}`);
  return mediaID;
};
