import {sameOrigin} from '@/lib/request-origin';
import {boundedBody} from '@/lib/referrals/agreement';
import {parseRecruitmentReview} from '@/lib/recruitment/review';
import {createRecruitmentStaffService} from '@/lib/recruitment/staff-service';
import {supabaseAdmin} from '@/lib/supabase-admin';
export const dynamic='force-dynamic';
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
export async function POST(request:Request){
 if(process.env.RECRUITMENT_BACKEND_ENABLED!=='true')return reply({error:'Recruitment review is not open yet.'},503);
 if(!sameOrigin(request))return reply({error:'Invalid request origin.'},403);
 const token=request.headers.get('authorization');if(!token?.startsWith('Bearer ')||token.length>8200)return reply({error:'Staff sign-in required.'},401);
 let review;try{review=parseRecruitmentReview(JSON.parse(new TextDecoder().decode(await boundedBody(request,4096))));}catch{return reply({error:'Invalid request.'},400);}
 if(!review)return reply({error:'Please check the filters or provide a reason of at least 20 characters.'},400);
 if(!supabaseAdmin)return reply({error:'Recruitment review is not connected.'},503);
 const service=supabaseAdmin;
 const action=createRecruitmentStaffService({enabled:true,async verify(accessToken){const {data,error}=await service.auth.getUser(accessToken);return error||!data.user?null:{id:data.user.id,email:data.user.email,emailConfirmedAt:data.user.email_confirmed_at};},async rpc(args){const {data,error}=await service.rpc('forge_recruitment_staff_action',args);if(error)throw Error('Review unavailable');return data;}});
 try{
  const result=await action(token.slice(7),review) as Record<string,unknown>;
  if(result.forbidden)return reply({error:'Only authorised recruitment administrators can read or reset applications.'},403);
  if(result.conflict)return reply({error:'This record changed. Reload it before requesting another reset.'},409);
  if(result.locked)return reply({error:'A reset is available only after all attempts are used, with no active assessment or recorded pass.'},409);
  if(result.missing)return reply({error:'Application not found.'},404);
  return reply(result);
 }catch(error){return error instanceof Error&&error.message==='Verified identity required'?reply({error:'Please sign in again.'},401):reply({error:'We could not confirm the review action. Retry without changing the reason; the request is protected against duplicate resets.'},503);}
}
