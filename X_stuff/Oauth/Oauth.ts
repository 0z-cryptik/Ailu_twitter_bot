import { config } from "dotenv";
import OAuth from "oauth-1.0a";
import { createHmac } from "crypto";
import OAuth2 from "oauth";

config();

const consumerKey = process.env.API_KEY;
const consumerSecret = process.env.API_SECRET;
const accessToken = process.env.ACCESS_TOKEN;
const accessSecret = process.env.ACCESS_SECRET;

export const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return createHmac("sha1", key).update(baseString).digest("base64");
  }
});

export const myOauth = new OAuth2.OAuth(
  "https://api.twitter.com/oauth/request_token",
  `https://api.twitter.com/oauth/access_token`,
  consumerKey,
  consumerSecret,
  "1.0A",
  null,
  "HMAC-SHA1"
);
