import { fetchJoke, cleanText } from "../lib/fetch-joke.js";

function yemotSafeText(value) {
  return cleanText(value)
    .replace(/[.]/g, ",")
    .replace(/[=]/g, " ")
    .replace(/&/g, " and ")
    .replace(/\?/g, ",")
    .replace(/#/g, "")
    .trim();
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("read=השירות זמין באמצעות בקשת GET בלבד&");
  }

  try {
    const result = await fetchJoke();
    const joke = yemotSafeText(result.joke || "לא נמצאה בדיחה כרגע");
    // Yemot API expects an ampersand terminator after the read command.
    return res.status(200).send(`read=${joke}&`);
  } catch {
    return res.status(200).send("read=לא נמצאה בדיחה כרגע, נסו שוב מאוחר יותר&");
  }
}
