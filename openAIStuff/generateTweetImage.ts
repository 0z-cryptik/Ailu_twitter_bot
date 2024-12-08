import OpenAI from "openai";
import { config } from "dotenv";

config();

const key = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: key });

export const generateTweetImage = async () => {
  const gpt_image_response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `create an image of a black and white panda dressed as a medical doctor`,
    n: 1,
    size: "1024x1024"
  });

  const image_url = gpt_image_response.data[0].url;
  console.log(image_url);
  return image_url;
};
