import { referralAccess } from "@/lib/referrals/access";
import { boundedBody, maskAccountNumber, validatePayoutProfile } from "@/lib/referrals/agreement";
import { response, validOrigin } from "@/lib/server/referrals";
export async function GET(request: Request) {
  try {
    const access = await referralAccess(request); if (access.error) return access.error;
    const {data,error} = await access.service.from("referrer_payout_profiles").select("bank_name,account_name,account_number").eq("referrer_id",access.user.id).maybeSingle();
    if(error) throw error;
    return response({profile:data ? {bankName:data.bank_name,accountName:data.account_name,maskedAccountNumber:maskAccountNumber(data.account_number)} : null});
  } catch { return response({error:"Payout profile unavailable."},503); }
}
export async function POST(request: Request) {
  if(!validOrigin(request)) return response({error:"Invalid origin."},403);
  if(Number(request.headers.get("content-length"))>2048) return response({error:"Request too large."},413);
  try {
    const access = await referralAccess(request); if(access.error) return access.error;
    const profile=validatePayoutProfile(JSON.parse(new TextDecoder().decode(await boundedBody(request,2048)))); if(!profile) return response({error:"Enter bank name, account name and a ten-digit Nigerian account number."},400);
    const {error}=await access.service.from("referrer_payout_profiles").insert({referrer_id:access.user.id,...profile});
    if(error) return response({error:"Profile could not be saved. Existing bank details require a reviewed correction."},409);
    return response({saved:true},201);
  } catch { return response({error:"Payout profile unavailable."},503); }
}
