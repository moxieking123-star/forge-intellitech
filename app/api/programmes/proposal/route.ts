import { NextRequest, NextResponse } from "next/server";
import { queueProposal } from "@/lib/server/proposal-delivery";
import { parseProposalRequest } from "@/lib/school-proposal";
import { boundedBody } from "@/lib/referrals/agreement";
import { sameOrigin } from "@/lib/request-origin";
export const runtime = "nodejs";
const reply = (body: object, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
const unavailable = () => reply({error:"Proposal email is being connected. Please contact programs@forgeintellitech.com and we’ll help you directly."},503);
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return reply({error:"Please request the proposal from our website."},403);
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 4096) return reply({error:"Request is too large."},413);
  let raw: string;
  try { raw = new TextDecoder().decode(await boundedBody(request,4096)); }
  catch { return reply({error:"Request is too large."},413); }
  let body: unknown; try { body = JSON.parse(raw); } catch { return reply({error:"Please check the form."},400); }
  const details = parseProposalRequest(body);
  if (!details) return reply({error:"Please enter your name, school and a valid email, and agree to receive the proposal."},400);
  const env = process.env;
  if (env.VERCEL_ENV !== "preview" || env.SCHOOL_PROPOSAL_QUEUE_ENABLED !== "true" || !env.PREVIEW_FEEDBACK_ANON_KEY) return unavailable();
  try {
    // The isolated SQL intake serialises per-recipient and global rate limits.
    const id = await queueProposal(details);
    return reply({queued:true,id,message:"Your proposal request has been received. Delivery is pending."},202);
  } catch { return reply({error:"We couldn’t record your proposal request just now. Please email programs@forgeintellitech.com or try again later."},502); }
}
