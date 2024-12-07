import { config } from "dotenv";
import OAuth from "oauth-1.0a";
import { createHmac } from "crypto";

config();

const consumerKey = process.env.API_KEY;
const consumerSecret = process.env.API_SECRET;

export const myOauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return createHmac("sha1", key).update(baseString).digest("base64");
  }
});
