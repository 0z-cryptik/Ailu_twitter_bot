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
    "Your health is your greatest asset. 🩺 Don't wait for symptoms—regular medical checkups can catch issues early and save lives. Take charge of your well-being today. #HealthIsWealth #StayHealthy";

  const tweetImage: string =
    "https://res.cloudinary.com/ds7xwxu4j/image/upload/v1733648961/DALL_E_2024-12-05_19.27.07_-_A_detailed_illustration_of_a_panda_dressed_as_a_medical_doctor._The_panda_is_wearing_a_white_lab_coat_a_stethoscope_around_its_neck_and_holding_a_cl_uwdhph.webp";

  const image: string = await uploadImageAndGetMediaID(tweetImage);

  await tweet(tweetText, image);
};

makePost2();
