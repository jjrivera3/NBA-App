// Serverless proxy for RapidAPI.
//
// The browser never sees the RapidAPI key. It calls /api/rapidapi/<path>
// with an `x-rapidapi-host` header naming which upstream it wants; this
// function injects the secret key (from the server-only RAPIDAPI_KEY env var)
// and forwards the request.
//
// Set RAPIDAPI_KEY in Vercel: Project Settings -> Environment Variables.
// Do NOT prefix it with VITE_ — that would bundle it back into the client.

// Only these upstreams may be proxied, so this can't be used as an open relay.
const ALLOWED_HOSTS = new Set([
  "api-basketball-nba.p.rapidapi.com",
  "basketball-head.p.rapidapi.com",
  "tank01-fantasy-stats.p.rapidapi.com",
]);

export default async function handler(req: any, res: any) {
  const host = req.headers["x-rapidapi-host"];

  if (typeof host !== "string" || !ALLOWED_HOSTS.has(host)) {
    res.status(400).json({ error: "Invalid or missing x-rapidapi-host header" });
    return;
  }

  const key = process.env.RAPIDAPI_KEY;
  if (!key) {
    res.status(500).json({ error: "Server misconfigured: RAPIDAPI_KEY is not set" });
    return;
  }

  // Keep the caller's path + query string, drop our own /api/rapidapi prefix.
  const upstreamPath = req.url.replace(/^\/api\/rapidapi/, "");
  const upstreamUrl = `https://${host}${upstreamPath}`;

  try {
    const upstream = await fetch(upstreamUrl, {
      method: req.method,
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": host,
      },
    });

    const body = await upstream.text();
    res.status(upstream.status);
    res.setHeader(
      "content-type",
      upstream.headers.get("content-type") || "application/json"
    );
    res.send(body);
  } catch (err) {
    res.status(502).json({ error: "Upstream request failed" });
  }
}
