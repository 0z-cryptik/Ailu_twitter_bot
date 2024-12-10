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
    "Health is wealth, take your health seriously today";

  const tweetImage: string =
    "https://res.cloudinary.com/ds7xwxu4j/image/upload/v1733819107/DALL_E_2024-12-10_09.22.14_-_A_cute_and_realistic_panda_dressed_as_a_doctor_wearing_a_white_lab_coat_a_stethoscope_around_its_neck_and_holding_a_clipboard._The_panda_is_depicte.webp";

  const imageID: string = await uploadImageAndGetMediaID(tweetImage);

  await tweet(tweetText, imageID);
};

makePost2();
