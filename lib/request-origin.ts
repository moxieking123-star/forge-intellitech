/** Compare the browser Origin to the actual HTTP Host, not Next's internal hostname. */
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const internal = new URL(request.url);
    const host = request.headers.get("host");
    const expected = host ? new URL(`${internal.protocol}//${host}`) : internal;
    if (host && expected.host !== host.toLowerCase()) return false;
    return origin === expected.origin;
  } catch { return false; }
}
