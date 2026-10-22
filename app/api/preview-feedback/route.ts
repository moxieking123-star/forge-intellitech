import { NextResponse } from "next/server";
import { parseFeedback } from "@/lib/preview-feedback";
import { sameOrigin } from "@/lib/request-origin";
import { boundedBody } from "@/lib/referrals/agreement";
export const runtime = "nodejs";
const reply = (data: object, status: number) => NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "preview") return reply({ error: "Feedback is available on the review preview only." }, 404);
  if (!sameOrigin(request)) return reply({ error: "Please send feedback from the website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Please check your feedback." }, 415);
  let input: unknown;
  try { input = JSON.parse(new TextDecoder().decode(await boundedBody(request, 8192))); }
  catch { return reply({ error: "Please keep your feedback short and try again." }, 400); }
  const feedback = parseFeedback(input);
  if (!feedback) return reply({ error: "Please choose a reaction or leave a short comment." }, 400);
  const key = process.env.PREVIEW_FEEDBACK_ANON_KEY?.trim();
  if (!key) return reply({ error: "Feedback is temporarily unavailable. Please try again shortly." }, 503);
  try {
    const response = await fetch("https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-preview-feedback", {
      method: "POST", headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
      body: JSON.stringify({ feedback, build: (process.env.VERCEL_GIT_COMMIT_SHA || "preview").slice(0, 40) }),
      cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (response.ok && result.saved === true) return reply({ saved: true }, 200);
    if (response.status === 429) return reply({ error: "Thanks for sharing your thoughts. Please wait a while before sending more." }, 429);
    return reply({ error: "Your feedback wasn’t saved. Please try again shortly." }, 502);
  } catch { return reply({ error: "We couldn’t save your feedback. Please try again." }, 502); }
}
