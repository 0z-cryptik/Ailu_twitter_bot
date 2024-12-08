import { initializeMediaUpload } from "./init";
import { appendMediaData } from "./append";
import { finalizeUpload } from "./finalize";

export const uploadImageAndGetMediaID = async (imageURL: string) => {
  try {
    const [mediaID, imageBuffer] = await initializeMediaUpload(imageURL);
    await appendMediaData(mediaID, imageBuffer);
    const mediaIDString = await finalizeUpload(mediaID);

    console.log(`image uploaded successfully, media_id: ${mediaIDString}`);
    return mediaIDString;
  } catch (err) {
    console.error(err);
  }
};
