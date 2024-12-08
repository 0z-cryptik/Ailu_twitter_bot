import { myOauth } from "../Oauth/Oauth";
import { config } from "dotenv";
import { uploadURL } from "./miscVariables";
import axios from "axios";

config();

export const appendMediaData = async (mediaID: string, imageBuffer: Buffer) => {
  try {
    // Base64 encode the image data
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // Prepare payload
    const payload = new URLSearchParams({
      command: "APPEND",
      media_id: mediaID,
      segment_index: "0", // For larger files, you may need multiple segments
      media: base64Image,
    });

    // OAuth Authorization
    const oauthParams = myOauth.authHeader(
      uploadURL,
      process.env.ACCESS_TOKEN,
      process.env.ACCESS_SECRET,
      "POST"
    );

    // Send the request
    await axios.post(uploadURL, payload, {
      headers: {
        Authorization: oauthParams,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Picture appended successfully.");
  } catch (err) {
    console.error("Error appending media data:");
    //throw err;
  }
};
