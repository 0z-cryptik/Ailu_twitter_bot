import { generateTweetImage } from "./openAIStuff/generateTweetImage";
import { generateTweetText } from "./openAIStuff/generateTweetText";
import { tweet } from "./X_stuff/functions/tweet";
import { uploadImageAndGetMediaID } from "./X_stuff/functions/uploadImage";

const makePost = async () => {
  const prompt = "write a tweet about health";
  const tweetText: string = await generateTweetText(prompt);
  const tweetImage: string = await generateTweetImage();
  const bufferedImage: string = await uploadImageAndGetMediaID(tweetImage);

  await tweet(tweetText, bufferedImage);
};

makePost()