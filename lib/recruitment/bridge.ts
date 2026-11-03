import {createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
export type ProvisionPayload={applicantId:string;verifiedEmail:string;displayName:string;assessmentReceiptId:string;eligibility:'training'};
export type ProvisionEnvelope={version:1;eventId:string;timestamp:number;nonce:string;action:'trainee.provision';payload:ProvisionPayload;signature:string};
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
const exact=(v:unknown,keys:string[]):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&Object.keys(v).every(k=>keys.includes(k));
const bounded=(v:unknown,max:number):v is string=>typeof v==='string'&&!!v.trim()&&v.length<=max&&!/[\x00-\x1f]/.test(v);
export const provisionSigningKeyReady=(secret:unknown):secret is string=>typeof secret==='string'&&/^[0-9a-f]{64}$/i.test(secret);
function payloadValid(value:unknown):value is ProvisionPayload{
 if(!exact(value,['applicantId','verifiedEmail','displayName','assessmentReceiptId','eligibility']))return false;
 return uuid(value.applicantId)&&uuid(value.assessmentReceiptId)&&value.eligibility==='training'&&bounded(value.displayName,120)&&bounded(value.verifiedEmail,254)&&value.verifiedEmail===value.verifiedEmail.toLowerCase().trim()&&/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(value.verifiedEmail);
}
/** Fixed field order shared with Apps Script. No generic object canonicalisation. */
export function canonicalProvisionEvent(event:Omit<ProvisionEnvelope,'signature'>){
 const p=event.payload;return JSON.stringify([event.version,event.eventId,event.timestamp,event.nonce,event.action,p.applicantId,p.verifiedEmail,p.displayName,p.assessmentReceiptId,p.eligibility]);
}
export function signProvisionEvent(secret:string,event:{eventId:string;payload:ProvisionPayload},options:{timestamp?:number;nonce?:string}={}){
 const timestamp=options.timestamp??Math.floor(Date.now()/1000),nonce=options.nonce??randomBytes(24).toString('hex');
 if(!provisionSigningKeyReady(secret)||!exact(event,['eventId','payload'])||!uuid(event.eventId)||!payloadValid(event.payload)||!Number.isSafeInteger(timestamp)||timestamp<0||!/^[0-9a-f]{48}$/.test(nonce))throw Error('Invalid provisioning configuration or event');
 const unsigned={version:1 as const,eventId:event.eventId,timestamp,nonce,action:'trainee.provision' as const,payload:{...event.payload}};
 const signature=createHmac('sha256',Buffer.from(secret,'hex')).update(canonicalProvisionEvent(unsigned),'utf8').digest('hex');
 return {...unsigned,signature};
}
export function verifyProvisionEvent(secret:string,value:unknown,now=Math.floor(Date.now()/1000)):ProvisionEnvelope|null{
 try{
  if(!exact(value,['version','eventId','timestamp','nonce','action','payload','signature'])||value.version!==1||value.action!=='trainee.provision'||typeof value.signature!=='string'||!/^[0-9a-f]{64}$/.test(value.signature)||typeof value.timestamp!=='number'||typeof value.nonce!=='string'||!Number.isSafeInteger(now)||value.timestamp>now+60||value.timestamp<now-300)return null;
  const signed=signProvisionEvent(secret,{eventId:value.eventId as string,payload:value.payload as ProvisionPayload},{timestamp:value.timestamp,nonce:value.nonce});
  return timingSafeEqual(Buffer.from(signed.signature,'hex'),Buffer.from(value.signature,'hex'))?signed:null;
 }catch{return null;}
}
export function verifyProvisionReceipt(value:unknown,eventId:string):{eventId:string;traineeId:string;status:'created'|'existing'}|null{
 if(!exact(value,['eventId','traineeId','status'])||value.eventId!==eventId||typeof value.traineeId!=='string'||!/^TRN-[a-zA-Z0-9_-]{1,90}$/.test(value.traineeId)||!['created','existing'].includes(String(value.status)))return null;
 return {eventId,traineeId:value.traineeId,status:value.status as 'created'|'existing'};
}
