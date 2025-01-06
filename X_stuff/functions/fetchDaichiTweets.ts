import fetch from "node-fetch";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

// Twitter API credentials
const BEARER_TOKEN = process.env.BEARER_TOKEN;

if (!BEARER_TOKEN) {
    throw new Error("Bearer token not found in environment variables.");
}

/**
 * Fetch the user ID for a given username.
 * 
 * @returns {Promise<string | null>} The user ID or null if an error occurs.
 */
async function fetchUserId(): Promise<string | null> {
    const url = "https://api.twitter.com/2/users/by/username/CryptoDaichi";
    const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

    try {
        const response = await fetch(url, { headers });
        if (response.ok) {
            const data = await response.json();
            return data?.data?.id || null;
        } else {
            console.error("Error fetching user ID:", await response.json());
            return null;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

/**
 * Fetch tweets for a given user ID.
 * 
 * @param {string} userId - The Twitter user ID.
 * @param {number} maxResults - Number of tweets to fetch (max is 100 per request).
 * @returns {Promise<string[]>} A list of tweet texts.
 */
async function fetchTweets(userId: string, maxResults: number = 100): Promise<string[]> {
    const url = `https://api.twitter.com/2/users/${userId}/tweets`;
    const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };
    const params = new URLSearchParams({
        max_results: maxResults.toString(),
        exclude: "replies,retweets"
    });

    try {
        const response = await fetch(`${url}?${params.toString()}`, { headers });
        if (response.ok) {
            const data = await response.json();
            return data?.data?.map((tweet: { text: string }) => tweet.text) || [];
        } else {
            console.error("Error fetching tweets:", await response.json());
            return [];
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

/**
 * Save tweets to a text file, numbering each tweet.
 * 
 * @param {string[]} tweets - List of tweet texts.
 * @param {string} filename - Name of the file to save tweets.
 */
function saveTweetsToFile(tweets: string[], filename: string = "tweets2.txt"): void {
    const content = tweets
        .map((tweet, index) => `${index + 1}. ${tweet}\n\n`)
        .join("");
    fs.writeFileSync(filename, content, { encoding: "utf-8" });
    console.log(`Saved ${tweets.length} tweets to ${filename}`);
}

(async () => {
    // Fetch user ID
    const userId = await fetchUserId();

    if (userId) {
        // Fetch and save tweets
        const tweets = await fetchTweets(userId);
        if (tweets.length > 0) {
            saveTweetsToFile(tweets);
        } else {
            console.error("No tweets fetched or an error occurred.");
        }
    } else {
        console.error("Failed to fetch user ID.");
    }
})();
