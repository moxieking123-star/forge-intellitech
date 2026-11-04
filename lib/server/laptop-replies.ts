import 'server-only';
import {supabaseAdmin} from '@/lib/supabase-admin';
import {laptopReply,type LaptopReplyKind} from '@/lib/laptop-replies';

export async function enqueueLaptopReply(submissionId:string) {
 if(!supabaseAdmin)return false;
 const {error}=await supabaseAdmin.rpc('forge_laptop_reply_enqueue',{p_submission_id:submissionId});
 return !error;
}
export async function deliverNextLaptopReply() {
 // Requires approval of these exact templates and installed outbox migration.
 if(process.env.LAPTOP_AUTOREPLY_ENABLED!=='true')return {disabled:true};
 if(!supabaseAdmin || !process.env.RESEND_API_KEY)throw Error('Laptop acknowledgment service is not configured.');
 const {data:job,error}=await supabaseAdmin.rpc('forge_laptop_reply_claim');
 if(error)throw Error('Acknowledgment queue could not be read.');
 if(!job)return {empty:true};
 if(!['student','adult','donor'].includes(job.kind))throw Error('Invalid acknowledgment template.');
 let providerId:string|null=null;
 let failure:string|null=null;
 try {
  const {data:blocked,error:guardError}=await supabaseAdmin.rpc('forge_notification_recipient_blocked',{p_recipient:job.recipient});
  if(guardError || typeof blocked!=='boolean' || blocked)throw Error('Recipient delivery eligibility could not be confirmed.');
  const reply=laptopReply(job.kind as LaptopReplyKind,job.name,job.submission_id);
  const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`forge-laptop-reply-${job.id}`},body:JSON.stringify({from:'Forge <signin@auth.forgeintellitech.com>',to:[job.recipient],reply_to:'admin@forgeintellitech.com',...reply}),signal:AbortSignal.timeout(15000)});
  if(!result.ok)failure='Provider did not confirm acceptance; staff reconciliation required.';
  else {const data=await result.json();if(typeof data.id==='string'&&data.id)providerId=data.id;else failure='Provider did not confirm acceptance; staff reconciliation required.';}
 } catch {failure='Provider response unavailable; staff reconciliation required.';}
 const {data:finished,error:finishError}=await supabaseAdmin.rpc('forge_laptop_reply_finish',{p_id:job.id,p_lease:job.lease_token,p_provider_id:providerId,p_error:failure});
 if(finishError || finished!==true)throw Error('Acknowledgment receipt could not be saved.');
 return {accepted:!!providerId};
}
