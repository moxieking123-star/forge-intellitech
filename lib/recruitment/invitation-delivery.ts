import {trainingInvitation} from './invitation.ts';
type InvitationJob={invitationId:string;leaseToken:string;recipient:Parameters<typeof trainingInvitation>[0]};
type Settlement={invitationId:string;leaseToken:string;providerId?:string;errorCode?:'invalid_invitation'|'email_unavailable'|'invalid_receipt'};
type Dependencies={enabled:boolean;destinationReady:boolean;claim:()=>Promise<InvitationJob[]>;send:(mail:ReturnType<typeof trainingInvitation>&{idempotencyKey:string})=>Promise<unknown>;settle:(receipt:Settlement)=>Promise<{saved?:boolean}>};
const uuid=(value:unknown):value is string=>typeof value==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
/** Disabled until the training destination works. Privileged queue adapter only;
 * no arbitrary recipient or content supplied by an HTTP caller. */
export async function deliverTrainingInvitations(deps:Dependencies){
 const report={disabled:!deps.enabled||!deps.destinationReady,sent:0,retryQueued:0,unconfirmed:0};
 if(report.disabled)return report;
 const jobs=await deps.claim();
 if(!Array.isArray(jobs)||jobs.length>5||jobs.some(job=>!job||!uuid(job.invitationId)||!uuid(job.leaseToken))||new Set(jobs.map(j=>j.invitationId)).size!==jobs.length)throw Error('Invalid invitation batch');
 for(const job of jobs){
  const receipt:Settlement={invitationId:job.invitationId,leaseToken:job.leaseToken};
  let mail:ReturnType<typeof trainingInvitation>;
  try{mail=trainingInvitation(job.recipient);}catch{receipt.errorCode='invalid_invitation';await settle(receipt);continue;}
  try{
   const provider=await deps.send({...mail,idempotencyKey:'forge-training-invitation/'+job.invitationId}) as {id?:unknown}|null;
   if(provider&&typeof provider.id==='string'&&/^[A-Za-z0-9_-]{1,120}$/.test(provider.id))receipt.providerId=provider.id;
   else receipt.errorCode='invalid_receipt';
  }catch{receipt.errorCode='email_unavailable';}
  await settle(receipt);
 }
 return report;
 async function settle(receipt:Settlement){try{const result=await deps.settle(receipt);if(result.saved){if(receipt.providerId)report.sent++;else report.retryQueued++;}else report.unconfirmed++;}catch{report.unconfirmed++;}}
}
