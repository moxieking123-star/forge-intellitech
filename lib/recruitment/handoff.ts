import {createHmac,randomBytes} from 'node:crypto';
import {provisionSigningKeyReady} from './bridge.ts';
type Dependencies={enabled:boolean;secret:string;verify:(token:string,signal:AbortSignal)=>Promise<unknown>;lookup:(verifiedOwnerId:string,signal:AbortSignal)=>Promise<unknown>;exchange:(envelope:SessionEnvelope,signal:AbortSignal)=>Promise<unknown>};
export type SessionPayload={applicantId:string;verifiedEmail:string;assessmentReceiptId:string;traineeId:string;token:string;expiresAt:number};
export type SessionEnvelope={version:1;action:'trainee.session';timestamp:number;nonce:string;payload:SessionPayload;signature:string};
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
export function canonicalTrainingSession(e:Omit<SessionEnvelope,'signature'>){const p=e.payload;return JSON.stringify([e.version,e.action,e.timestamp,e.nonce,p.applicantId,p.verifiedEmail,p.assessmentReceiptId,p.traineeId,p.token,p.expiresAt]);}
/** Server-only orchestration: never provide lookup or identity from browser JSON.
 * Returned token is private response data, never a redirect/query parameter. */
export function createTrainingHandoff(deps:Dependencies,options:{timeoutMs?:number}={}){return async function(authToken:string){
 if(!deps.enabled)throw Error('Training sign-in is unavailable');
 if(!provisionSigningKeyReady(deps.secret)||typeof authToken!=='string'||!authToken.trim()||authToken.length>8192)throw Error('Training sign-in is unavailable');
 const timeoutMs=options.timeoutMs??25000;
 if(!Number.isInteger(timeoutMs)||timeoutMs<1||timeoutMs>25000)throw Error('Invalid training deadline');
 const controller=new AbortController(),signal=controller.signal;
 const timer=setTimeout(()=>controller.abort(),timeoutMs);
 async function bounded<T>(work:()=>Promise<T>):Promise<T>{
  if(signal.aborted)throw Error('Training sign-in timed out');
  return new Promise<T>((resolve,reject)=>{
   const abort=()=>reject(Error('Training sign-in timed out'));
   signal.addEventListener('abort',abort,{once:true});
   Promise.resolve().then(()=>{if(signal.aborted)throw Error('Training sign-in timed out');return work();}).then(resolve,reject).finally(()=>signal.removeEventListener('abort',abort));
  });
 }
 try{
 const identity=await bounded(()=>deps.verify(authToken,signal)) as Record<string,unknown>|null;
 if(!identity||!uuid(identity.id)||typeof identity.email!=='string'||identity.email!==identity.email.trim().toLowerCase()||!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(identity.email)||typeof identity.emailConfirmedAt!=='string'||!Number.isFinite(Date.parse(identity.emailConfirmedAt)))throw Error('Verified identity required');
 const ownerId=identity.id;
 const record=await bounded(()=>deps.lookup(ownerId,signal)) as Record<string,unknown>|null;
 if(!record||record.ownerId!==identity.id||record.verifiedEmail!==identity.email||record.status!=='provisioned'||!uuid(record.applicantId)||!uuid(record.assessmentReceiptId)||typeof record.traineeId!=='string'||!/^TRN-[A-Za-z0-9_-]{1,90}$/.test(record.traineeId))throw Error('Training profile is not ready');
 const token=randomBytes(32).toString('base64url'),expiresAt=Date.now()+3600000;
 const unsigned={version:1 as const,action:'trainee.session' as const,timestamp:Math.floor(Date.now()/1000),nonce:randomBytes(24).toString('hex'),payload:{applicantId:record.applicantId,verifiedEmail:identity.email,assessmentReceiptId:record.assessmentReceiptId,traineeId:record.traineeId,token,expiresAt}};
 const signature=createHmac('sha256',Buffer.from(deps.secret,'hex')).update(canonicalTrainingSession(unsigned),'utf8').digest('hex');
 const receipt=await bounded(()=>deps.exchange({...unsigned,signature},signal)) as Record<string,unknown>|null;
 if(!receipt||Object.keys(receipt).sort().join(',')!=='access,expiresAt,traineeId'||receipt.traineeId!==record.traineeId||receipt.expiresAt!==expiresAt||receipt.access!=='trainee')throw Error('Training sign-in could not be confirmed');
 return {token,traineeId:record.traineeId,access:'trainee' as const,expiresAt};
 }finally{clearTimeout(timer);}
};}
