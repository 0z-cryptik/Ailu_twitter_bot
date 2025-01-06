import { generateTweetImage } from "./openAIStuff/generateTweetImage";
import { generateTweetText } from "./openAIStuff/generateTweetText";
// import { tweet } from "./X_stuff/functions/tweetWithMedia";
import { uploadImageAndGetMediaID } from "./X_stuff/imageUpload/uploadImage";
import fs from "fs";
import { config } from "dotenv";
import { tweetOnlyText } from "./X_stuff/functions/tweetOnlyText";
config();

const openAIKey = process.env.OPENAI_API_KEY;
const bearerToken = process.env.BEARER_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;
const accessSecret = process.env.ACCESS_SECRET;

// const makePost = async () => {
//   const prompt = "write a tweet about health";
//   const tweetText: string = await generateTweetText(prompt);
//   const tweetImage: string = await generateTweetImage();
//   const bufferedImage: string = await uploadImageAndGetMediaID(tweetImage);

//   await tweet(tweetText, bufferedImage);
// };

// const makePost2 = async () => {
//   const prompt = "write a tweet about health";

//   const tweetText: string =
//     "testing testing";

//   const tweetImage: string =
//     "https://oaidalleapiprodscus.blob.core.windows.net/private/org-5KF8r6lwWPQPKGqaZAuU1zE8/user-McBQhnPUW2UUfrcRW9rJ4w0D/img-ei3NucblQvOBvnbgdlT26lDG.png?st=2024-12-10T07%3A45%3A31Z&se=2024-12-10T09%3A45%3A31Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-12-09T12%3A16%3A13Z&ske=2024-12-10T12%3A16%3A13Z&sks=b&skv=2024-08-04&sig=CZDv8VoELObbdJXh5VEAgdoLmO%2BvCFMgTfjng4p3BZg%3D";

//   const imageID: string = await uploadImageAndGetMediaID(tweetImage);

//   await tweet(tweetText, imageID);
// };

// makePost2();

const makePost3 = async () => {
  const tweets = fs.readFileSync(
    "./files/tweets/daichiTweets.txt",
    "utf-8"
  );

  const prompt = `These are tweets from a certain twitter account, I want you to study them and write a tweet in the style and manner of this twitter account, I want you to copy the user's style. These are the tweets: ${tweets} NOTE: don't include any link in the tweet`;

  const answer = await generateTweetText(prompt, openAIKey);

  console.log(answer);

  if (answer) {
    const response = await tweetOnlyText(
      answer,
      accessToken,
      accessSecret
    );

    console.log(response);
  } else {
    console.error("no response from openAI");
  }
};

makePost3()
