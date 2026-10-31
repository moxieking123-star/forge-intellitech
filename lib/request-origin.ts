/** Compare the browser Origin to the actual HTTP Host, not Next's internal hostname. */
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const internal = new URL(request.url);
    // The dedicated training build is reverse-proxied below this fixed app host.
    // Do not trust arbitrary forwarded-host headers or configurable origins.
    if(process.env.FORGE_TRAINING_BUILD==='true'&&process.env.NEXT_PUBLIC_TRAINING_BASE_PATH==='/instructor-training'&&origin==='https://app.forgeintellitech.com')return true;
    const host = request.headers.get("host");
    const expected = host ? new URL(`${internal.protocol}//${host}`) : internal;
    if (host && expected.host !== host.toLowerCase()) return false;
    return origin === expected.origin;
  } catch { return false; }
}
