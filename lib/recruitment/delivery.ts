import {signProvisionEvent,verifyProvisionReceipt,provisionSigningKeyReady,type ProvisionEnvelope,type ProvisionPayload} from './bridge.ts';
export type ProvisionJob={eventId:string;leaseToken:string;payload:ProvisionPayload};
type Settlement={eventId:string;leaseToken:string;traineeId?:string;errorCode?:'bridge_unavailable'|'invalid_receipt'|'invalid_event'};
type Dependencies={enabled:boolean;secret:string;claim:()=>Promise<ProvisionJob[]>;send:(event:ProvisionEnvelope)=>Promise<unknown>;settle:(value:Settlement)=>Promise<{saved?:boolean}>};
/** No email or operational-account creation belongs in this worker. */
export async function deliverRecruitmentBatch(deps:Dependencies){
 const report={disabled:!deps.enabled,provisioned:0,retryQueued:0,unconfirmed:0};
 if(!deps.enabled)return report;
 if(!provisionSigningKeyReady(deps.secret))throw Error('Training bridge signing key is not configured');
 const jobs=await deps.claim();if(!Array.isArray(jobs)||jobs.length>5)throw Error('Invalid provisioning batch');
 for(const job of jobs){
  let settlement:Settlement={eventId:job.eventId,leaseToken:job.leaseToken};
  let envelope:ProvisionEnvelope;
  try{envelope=signProvisionEvent(deps.secret,{eventId:job.eventId,payload:job.payload});}
  catch{settlement.errorCode='invalid_event';await settle(settlement);continue;}
  try{const reply=verifyProvisionReceipt(await deps.send(envelope),job.eventId);if(reply)settlement.traineeId=reply.traineeId;else settlement.errorCode='invalid_receipt';}
  catch{settlement.errorCode='bridge_unavailable';}
  await settle(settlement);
 }
 return report;
 async function settle(value:Settlement){
  try{const result=await deps.settle(value);if(result.saved){if(value.traineeId)report.provisioned++;else report.retryQueued++;}else report.unconfirmed++;}
  catch{report.unconfirmed++;}
 }
}
