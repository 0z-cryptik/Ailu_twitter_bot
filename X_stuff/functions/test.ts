import fs from "fs";
import path from "path";

const tweets = [
  "ai supercycle\nit's coming https://t.co/xyz",
  "skeeeeeeem https://t.co/abc",
  "Yoyoyo, fuck thisss"
];

const delimiter = "|";

const tweetsFilePath = path.join(
  __dirname,
  "../../files/tweets/daichiTweets.txt"
);

fs.writeFileSync(tweetsFilePath, tweets.join(`\n${delimiter}\n`));
