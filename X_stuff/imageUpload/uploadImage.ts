import { initializeMediaUpload } from "./init";
import { appendMediaData } from "./append";
import { finalizeUpload } from "./finalize";

export const uploadImageAndGetMediaID = async (imageURL: string): Promise<string | undefined> => {
  try {
    // Step 1: Initialize the media upload and get media ID and buffer
    const [mediaID, imageBuffer] = await initializeMediaUpload(imageURL);

    // Step 2: Append the image data
    await appendMediaData(mediaID, imageBuffer);

    // Step 3: Finalize the upload and retrieve the final media ID string
    const mediaIDString = await finalizeUpload(mediaID);

    console.log(`Image uploaded successfully, media_id: ${mediaIDString}`);
    return mediaIDString;
  } catch (err) {
    console.error("Error during image upload");
    //throw err; // Propagate the error to the caller
  }
};
