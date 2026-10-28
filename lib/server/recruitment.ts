import 'server-only';
import {supabaseAdmin} from '../supabase-admin';
import {createRecruitmentService} from '../recruitment/service';

/** This switch is intentionally unset until the private pilot is ready. */
export const recruitmentService=createRecruitmentService({
 enabled:process.env.RECRUITMENT_BACKEND_ENABLED==='true',
 async verify(token){
  if(!supabaseAdmin)throw Error('Recruitment unavailable');
  const {data,error}=await supabaseAdmin.auth.getUser(token);
  if(error||!data.user)return null;
  return {id:data.user.id,email:data.user.email,emailConfirmedAt:data.user.email_confirmed_at};
 },
 async rpc(name,args){
  if(!supabaseAdmin)throw Error('Recruitment unavailable');
  const {data,error}=await supabaseAdmin.rpc(name,args);
  // Keep internal errors, credentials and question-bank details out of responses.
  if(error)throw Error('Recruitment request could not be completed');
  return data;
 }
});
