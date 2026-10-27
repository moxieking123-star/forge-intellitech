import {backendEnvironmentEnabled,backendPublishableKey} from "@/lib/backend-runtime";
import 'server-only';
import {response} from './referrals';
import {sameOrigin} from '@/lib/request-origin';
import {boundedBody} from '@/lib/referrals/agreement';
import {parseParticipation} from '@/lib/participation';
export function participationBackendEnabled(){return backendEnvironmentEnabled()&&process.env.PARTICIPATION_BACKEND_ENABLED==='true';}
export async function participationBackend(action:string,payload:unknown,authorization?:string|null,kind?:string){
 const key=backendPublishableKey();
 if(!participationBackendEnabled()||!key)return response({error:'Enquiry services are temporarily unavailable. Your request has not been sent.'},503);
 if(authorization&&(!authorization.startsWith('Bearer ')||authorization.length>8192))return response({error:'Staff sign-in required.'},401);
 try{const res=await fetch('https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-participation',{method:'POST',headers:{'Content-Type':'application/json',apikey:key,Authorization:`Bearer ${key}`,...(authorization?{'x-forge-user-token':authorization.slice(7)}:{})},body:JSON.stringify({action,payload,kind}),cache:'no-store',signal:AbortSignal.timeout(12000)});return response(await res.json(),res.status);}catch{return response({error:'We could not confirm receipt. Please retry the same enquiry.'},503);}
}
export async function submitParticipation(request:Request,kind:'contact'|'sponsor'){
 if(!sameOrigin(request))return response({error:'Invalid request origin.'},403);
 let body;try{body=JSON.parse(new TextDecoder().decode(await boundedBody(request,24000)));}catch{return response({error:'Invalid or oversized enquiry.'},400);}
 const payload=parseParticipation(body,kind);if(!payload)return response({error:'Please check the enquiry details.'},400);
 return participationBackend('submit',payload,null,kind);
}
