import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { parseProposalRequest, proposalEmail, SCHOOL_PROPOSAL_VERSION } from "@/lib/school-proposal";
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
  if (env.SCHOOL_PROPOSAL_EMAIL_ENABLED !== "true" || !env.ZOHO_SMTP_HOST || !env.ZOHO_SMTP_USER || !env.ZOHO_SMTP_PASSWORD || !env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN || !env.PROPOSAL_RATE_SECRET) return unavailable();
  const port = Number(env.ZOHO_SMTP_PORT || "465");
  if (![465,587].includes(port) || env.ZOHO_SMTP_USER !== "programs@forgeintellitech.com") return unavailable();
  try {
    const redis = new Redis({url:env.UPSTASH_REDIS_REST_URL,token:env.UPSTASH_REDIS_REST_TOKEN});
    const hash = (value:string) => createHmac("sha256",env.PROPOSAL_RATE_SECRET!).update(value).digest("hex");
    const limit = new Ratelimit({redis,limiter:Ratelimit.slidingWindow(2,"1 h"),prefix:"forge:proposal:email",analytics:false});
    const emailLimit = await limit.limit(hash(details.email));
    // Vercel sets this trusted header. Do not trust a caller-controlled forwarding header.
    const ip = env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() : null;
    const globalLimit = new Ratelimit({redis,limiter:Ratelimit.slidingWindow(100,"1 h"),prefix:"forge:proposal:global",analytics:false});
    if (!emailLimit.success || !(await globalLimit.limit("requests")).success) return reply({error:"We’ve received several requests. Please try again later or email programs@forgeintellitech.com."},429);
    if (ip) {
      const ipLimit = new Ratelimit({redis,limiter:Ratelimit.slidingWindow(8,"1 h"),prefix:"forge:proposal:ip",analytics:false});
      if (!(await ipLimit.limit(hash(ip))).success) return reply({error:"Please wait before requesting another copy."},429);
    }
    let pdf: Buffer;
    if (env.SCHOOL_PROPOSAL_PATH && env.NODE_ENV !== "production") pdf = await readFile(env.SCHOOL_PROPOSAL_PATH);
    else {
      if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY || !env.SCHOOL_PROPOSAL_BUCKET) return unavailable();
      const service = createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
      const {data,error} = await service.storage.from(env.SCHOOL_PROPOSAL_BUCKET).download(`forge-school-proposal-${SCHOOL_PROPOSAL_VERSION}.pdf`);
      if (error || !data) return unavailable();
      pdf = Buffer.from(await data.arrayBuffer());
    }
    if (pdf.length > 8_000_000 || pdf.subarray(0,5).toString() !== "%PDF-") return unavailable();
    const transport = nodemailer.createTransport({host:env.ZOHO_SMTP_HOST,port,secure:port===465,requireTLS:true,auth:{user:env.ZOHO_SMTP_USER,pass:env.ZOHO_SMTP_PASSWORD},connectionTimeout:10000,socketTimeout:20000});
    const content = proposalEmail(details);
    const sent = await transport.sendMail({from:'Forge programmes <programs@forgeintellitech.com>',replyTo:"programs@forgeintellitech.com",to:details.email,bcc:"programs@forgeintellitech.com",...content,attachments:[{filename:"Forge-school-programme-proposal.pdf",content:pdf,contentType:"application/pdf"}],disableFileAccess:true,disableUrlAccess:true});
    if (!sent.accepted?.some(address => String(address).toLowerCase() === details.email)) throw new Error("recipient not accepted");
    return reply({sent:true},200);
  } catch { return reply({error:"We couldn’t send your proposal just now. Please email programs@forgeintellitech.com or try again later."},502); }
}
