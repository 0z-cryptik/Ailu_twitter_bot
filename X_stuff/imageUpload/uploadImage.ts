import { initializeMediaUpload } from "./init";
import { appendMediaData } from "./append";
import { finalizeUpload } from "./finalize";

export const uploadImageAndGetMediaID = async (imageURL: string) => {
  try {
    const mediaID = await initializeMediaUpload(imageURL);
    await appendMediaData(mediaID, imageURL);
    const mediaIDString = await finalizeUpload(mediaID);

    console.log(`image uploaded successfully, media_id: ${mediaIDString}`);
    return mediaIDString;
  } catch (err) {
    console.error(err);
  }
};
