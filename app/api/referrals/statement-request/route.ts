import { referralAccess } from "@/lib/referrals/access";
import {referralBackendEnabled,referralBackendFetch} from "@/lib/server/referral-backend";
import { boundedBody, referralIdPattern } from "@/lib/referrals/agreement";
import { response, validOrigin } from "@/lib/server/referrals";
export async function GET(request:Request) {
  if(referralBackendEnabled()){
    const id=new URL(request.url).searchParams.get("referralId");if(!id||!referralIdPattern.test(id))return response({error:"Invalid referral."},400);return referralBackendFetch(request,"statement",{referralId:id});
  }
  try {
    const access=await referralAccess(request); if(access.error) return access.error;
    const id=new URL(request.url).searchParams.get("referralId");
    if(!id || !referralIdPattern.test(id)) return response({error:"Invalid referral."},400);
    const result=await access.service.from("referral_statement_requests").select("id,requested_at,due_on,status").eq("referrer_id",access.user.id).eq("referral_id",id).order("requested_at",{ascending:false}).limit(1).maybeSingle();
    if(result.error) throw result.error;
    return response({receipt:result.data ? {id:result.data.id,requestedAt:result.data.requested_at,dueOn:result.data.due_on,status:result.data.status} : null});
  }catch{return response({error:"Statement records unavailable."},503);}
}
export async function POST(request:Request) {
  if(!validOrigin(request)) return response({error:"Invalid origin."},403);
  if(referralBackendEnabled()){
    try{const input=JSON.parse(new TextDecoder().decode(await boundedBody(request,1024)));if(!referralIdPattern.test(input.referralId||""))return response({error:"Invalid referral."},400);return referralBackendFetch(request,"statement_request",{referralId:input.referralId});}catch{return response({error:"Invalid referral."},400);}
  }
  try {
    const access=await referralAccess(request);if(access.error) return access.error;
    const body=JSON.parse(new TextDecoder().decode(await boundedBody(request,1024)));if(typeof body.referralId!=="string" || !referralIdPattern.test(body.referralId)) return response({error:"Invalid referral."},400);
    const result=await access.service.rpc("request_referral_statement",{p_owner:access.user.id,p_referral:body.referralId});
    if(result.error) return response({error:"A reviewed Nigerian holiday calendar is required to confirm the deadline. Contact Forge for your earnings breakdown.",contact:"/contact?interest=referral"},503);
    return response({receipt:result.data},201);
  }catch{return response({error:"Statement request unavailable."},503);}
}
