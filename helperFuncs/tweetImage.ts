import { getRandomNumber } from "../X_stuff/functions/getRandomNumber";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import fs from "fs";
import { tweetOnlyMedia } from "../X_stuff/functions/tweetOnlyMedia";
import { uploadImageAndGetMediaID } from "../X_stuff/imageUpload/uploadImage";

config();

const accessToken = process.env.ACCESS_TOKEN;
const accessSecret = process.env.ACCESS_SECRET;

export const tweetImage = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imageNumber: number = getRandomNumber();

  let imagePath: string;

  // an mp4 file is at 342
  if (imageNumber === 342) {
    imagePath = path.join(__dirname, "./files/images/342.MP4");
  } else {
    imagePath = path.join(__dirname, `./files/images/${imageNumber}.jpg`);
  }

  const imageBuffer = fs.readFileSync(imagePath);

  const mediaIDString: string = await uploadImageAndGetMediaID(
    imageBuffer,
    accessToken,
    accessSecret,
    imageNumber === 342
  );

  if (mediaIDString) {
    await tweetOnlyMedia(mediaIDString, accessToken, accessSecret);
  } else {
    console.error("couldn't obtain media ID");
  }
};
