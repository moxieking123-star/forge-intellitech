import { parseFeedback } from "./preview-feedback.ts";
// Gateway verifies the project anon JWT. This public intake can only write through
// a service-only, rate-capped RPC; it never exposes reviewer comments or records.
Deno.serve(async (request: Request) => {
  const reply = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "Missing body" }, 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); return reply({ error: "Too large" }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const input = JSON.parse(new TextDecoder().decode(bytes));
    const feedback = parseFeedback(input.feedback);
    if (!feedback || typeof input.build !== "string" || !/^(?:[a-f0-9]{40}|preview|feedback-smoke)$/.test(input.build)) return reply({ error: "Invalid feedback" }, 400);
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/rpc/forge_preview_record_feedback`, {
      method: "POST", headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
      body: JSON.stringify({ p_feedback: feedback, p_build: input.build }), signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return reply({ error: "Storage unavailable" }, 503);
    const result = await response.json();
    return result.saved ? reply({ saved: true }) : reply({ error: "Please wait" }, 429);
  } catch { return reply({ error: "Unable to save" }, 400); }
});
