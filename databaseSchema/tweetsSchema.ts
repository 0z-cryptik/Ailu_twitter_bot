import mongoose from "mongoose";

const tweetsSchema = new mongoose.Schema({ tweets: [String] });

export const Tweets = mongoose.model("Tweets", tweetsSchema);
