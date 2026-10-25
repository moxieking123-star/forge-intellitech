import {backendPublishableKey} from "@/lib/backend-runtime";
import {response} from "@/lib/server/referrals";
import {referralBackendEnabled} from "@/lib/server/referral-backend";
export function GET(){
 const key=backendPublishableKey();
 if(!referralBackendEnabled()||!key)return response({error:"Referral accounts are being connected."},503);
 return response({url:"https://deblssilgleuiccsgdcy.supabase.co",key,emailLoginEnabled:process.env.REFERRAL_EMAIL_LOGIN_ENABLED==="true"});
}
