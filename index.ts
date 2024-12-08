import { generateTweetImage } from "./openAIStuff/generateTweetImage";
import { generateTweetText } from "./openAIStuff/generateTweetText";
import { tweet } from "./X_stuff/functions/tweet";
import { uploadImageAndGetMediaID } from "./X_stuff/imageUpload/uploadImage";

// const makePost = async () => {
//   const prompt = "write a tweet about health";
//   const tweetText: string = await generateTweetText(prompt);
//   const tweetImage: string = await generateTweetImage();
//   const bufferedImage: string = await uploadImageAndGetMediaID(tweetImage);

//   await tweet(tweetText, bufferedImage);
// };

const makePost2 = async () => {
  const prompt = "write a tweet about health";

  const tweetText: string =
    "🌿 Prioritize your health today! Remember, small changes can lead to big results: drink more water, take a short walk, or try a new healthy recipe. Your body and mind will thank you! 💪✨ #HealthMatters #WellnessJourney";

  const tweetImage: string = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-5KF8r6lwWPQPKGqaZAuU1zE8/user-McBQhnPUW2UUfrcRW9rJ4w0D/img-pKClqrbYjL7GyX1THxo8vWIO.png?st=2024-12-08T02%3A17%3A02Z&se=2024-12-08T04%3A17%3A02Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-12-07T23%3A06%3A59Z&ske=2024-12-08T23%3A06%3A59Z&sks=b&skv=2024-08-04&sig=OVQEioAcfkE4qM2jRlHGul4MmPd1HhtHVhVy7G59H/8%3D"

  const bufferedImage: string = await uploadImageAndGetMediaID(tweetImage);

  await tweet(tweetText, bufferedImage);
};

makePost2();
