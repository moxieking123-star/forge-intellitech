import {createClient} from '@supabase/supabase-js';
import {handleTrainingReview,signReview} from '@/lib/recruitment/training-review';
import {sendProvisionEnvelope} from '@/lib/recruitment/transport';
export const dynamic='force-dynamic';
export const maxDuration=30;
export function POST(request:Request){return handleTrainingReview(request,{enabled:process.env.TRAINING_SIGN_IN_ENABLED==='true',async authorize(token,signal){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw Error();
 const service=createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false},global:{fetch:(input,init)=>fetch(input,{...init,signal})}});
 const {data:identity,error}=await service.auth.getUser(token);const user=identity.user;if(error||!user?.email||!user.email_confirmed_at)return null;
 // Reuse the existing service-only recruitment administrator guard. No new grant.
 const {data,error:denied}=await service.rpc('forge_recruitment_staff_action',{p_actor:user.id,p_email:user.email.toLowerCase(),p_action:'list',p_payload:{status:'all',search:'__training_access_check__',offset:10000}});
 if(denied)throw Error();return data&&!data.forbidden&&Array.isArray(data.items)&&Number.isInteger(data.total)?user.id:null;
 },exchange:(actor,command,signal)=>sendProvisionEnvelope(process.env.TRAINING_BRIDGE_URL||'',signReview(process.env.TRAINING_BRIDGE_SIGNING_KEY||'',actor,command),fetch,signal,16384)});}
