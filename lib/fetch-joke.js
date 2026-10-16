const SOURCE_URL = "https://geek-jokes.sameerkumar.website/api?format=json";

const HEBREW_FALLBACKS = [
  "למה המתכנת התבלבל בין ליל כל הקדושים לחג המולד? כי OCT 31 שווה ל DEC 25.",
  "כמה מתכנתים צריך כדי להחליף נורה? אף אחד. זו בעיית חומרה.",
  "למה המחשב הלך לרופא? כי היה לו וירוס.",
  "מתכנת נכנס לבר ומזמין אחד, אפס, ועוד אחד, אפס."
];

function cleanText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 1200);
}

export async function fetchJoke() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);

  try {
    const response = await fetch(SOURCE_URL, {
      headers: { accept: "application/json" },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Joke source returned HTTP ${response.status}`);

    const data = await response.json();
    const raw = typeof data === "string"
      ? data
      : data.joke ?? data.setup ?? data.text ?? data.question;

    const joke = cleanText(raw);
    if (!joke) throw new Error("Joke source returned an empty response");

    return { joke, source: "geek-jokes.sameerkumar.website", language: "en" };
  } catch (error) {
    const joke = HEBREW_FALLBACKS[Math.floor(Math.random() * HEBREW_FALLBACKS.length)];
    return { joke, source: "local-fallback", language: "he", fallback: true };
  } finally {
    clearTimeout(timeout);
  }
}

export { cleanText };
