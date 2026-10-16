import { fetchJoke } from "../lib/fetch-joke.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await fetchJoke();
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    success: true,
    joke: result.joke,
    language: result.language,
    source: result.source,
    ...(result.fallback ? { fallback: true } : {})
  });
}
