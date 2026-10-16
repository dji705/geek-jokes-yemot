# Geek Jokes for Yemot HaMashiach

A lightweight Node.js serverless adaptation inspired by [sameerkumar18/geek-joke-api](https://github.com/sameerkumar18/geek-joke-api), designed for Vercel and Yemot HaMashiach IVR.

## Endpoints
- `GET /api/joke` — JSON response containing a random programming/geek joke.
- `GET /api/yemot` — plain-text response in `read=...` format for IVR playback.

The upstream service generally provides English jokes. If it is unavailable, the API returns a local Hebrew fallback joke.

## Deploy to Vercel
1. Import this repository at https://vercel.com/new
2. Keep the default settings. No dependencies or build command are needed.
3. Deploy and test:
   - `https://YOUR-DEPLOYMENT.vercel.app/api/joke`
   - `https://YOUR-DEPLOYMENT.vercel.app/api/yemot`

## Technical notes
- Node.js 18+ (uses built-in `fetch`).
- No API key or external package installation required.
- This adapts the API behavior; it is not a byte-for-byte copy of the original Flask app.
