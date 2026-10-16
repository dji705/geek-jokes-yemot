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
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(405).send("read=השירות זמין באמצעות בקשת GET בלבד");
  }

  try {
    const result = await fetchJoke();
    const joke = yemotSafeText(result.joke || "לא נמצאה בדיחה כרגע");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(`read=${joke}.\n`);
  } catch {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send("read=מצטערים, לא הצלחנו להביא בדיחה כרגע. נסו שוב מאוחר יותר.\n");
  }
}
