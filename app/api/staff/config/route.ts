import { schoolBackendEnabled } from "@/lib/server/school-backend";
import { response } from "@/lib/server/referrals";
export function GET(){
  if(!schoolBackendEnabled())return response({error:"Staff sign-in is being connected."},503);
  const key=process.env.PREVIEW_FEEDBACK_ANON_KEY?.trim();
  if(!key)return response({error:"Staff sign-in is being connected."},503);
  // Publishable key only. It cannot read private school records or execute staff RPCs.
  return response({url:"https://deblssilgleuiccsgdcy.supabase.co",key,emailLoginEnabled:process.env.STAFF_EMAIL_LOGIN_ENABLED==="true"});
}
