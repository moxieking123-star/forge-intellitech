import "server-only";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/request-origin";
export function response(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}
export function referralService() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (process.env.REFERRALS_ENABLED !== "true" || !url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
export function validOrigin(request: Request) {
  return sameOrigin(request);
}
export async function verifiedUser(
  request: Request,
  service: NonNullable<ReturnType<typeof referralService>>,
) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ") || auth.length > 8192) return null;
  const { data, error } = await service.auth.getUser(auth.slice(7));
  return !error && data.user?.email_confirmed_at ? data.user : null;
}
export async function ensureReferrer(
  service: NonNullable<ReturnType<typeof referralService>>,
  id: string,
) {
  let { data, error } = await service
    .from("referrer_accounts")
    .select("id,referral_number,status")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("account unavailable");
  if (!data) {
    const inserted = await service
      .from("referrer_accounts")
      .upsert({ id }, { onConflict: "id", ignoreDuplicates: true });
    if (inserted.error) throw new Error("account unavailable");
    const result = await service
      .from("referrer_accounts")
      .select("id,referral_number,status")
      .eq("id", id)
      .single();
    data = result.data;
    error = result.error;
  }
  if (error || !data) throw new Error("account unavailable");
  return data;
}
export function publicLink(r: Record<string, any>) {
  return {
    id: r.id,
    code: r.code,
    schoolName: r.school_name,
    location: r.location,
    stage: r.stage,
    earnedKobo: r.earned_kobo,
    paidKobo: r.paid_kobo,
    startsOn: r.starts_on,
    payableOn: r.payable_on,
  };
}
