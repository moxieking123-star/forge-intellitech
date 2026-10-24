// Shared by the Deno worker and no-network Node tests.
// @ts-ignore Explicit extension supports both Deno and Node TypeScript.
import {deliveryEnabled,deliveryContent,idempotencyKey,type DeliveryJob} from './notification-delivery.ts';
// @ts-ignore Explicit extension supports both Deno and Node TypeScript.
import {boundedBody} from './referrals/agreement.ts';
type Dependencies={fetcher?:typeof fetch;sleep?:(ms:number)=>Promise<void>};
export async function runNotificationBatch(env:Record<string,string|undefined>,dependencies:Dependencies={}){
 const result={disabled:false,accepted:0,failed:0,paused:false};
 if(!deliveryEnabled(env)){result.disabled=true;return result;}
 if(!env.SUPABASE_URL||!env.SUPABASE_SERVICE_ROLE_KEY)throw Error('Worker database configuration missing.');
 const fetcher=dependencies.fetcher||fetch,sleep=dependencies.sleep||((ms:number)=>new Promise<void>(resolve=>setTimeout(resolve,ms)));
 const serviceHeaders={apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'};
 async function rpc(name:string,args:object){const r=await fetcher(`${env.SUPABASE_URL}/rest/v1/rpc/${name}`,{method:'POST',headers:serviceHeaders,body:JSON.stringify(args),signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('Delivery receipt could not be confirmed.');return r.json();}
 let providerRequests=0;
 for(const queue of ['school','participation','proposal']){
  // Claim one at a time: a provider outage must not strand a prefetched batch.
  const jobs:DeliveryJob[]=await rpc('forge_notification_claim',{p_queue:queue,p_limit:1});
  for(const job of jobs){
   let provider:string|null=null,error:string|null=null,pause=false;
   try{
    const content=deliveryContent({...job,queue}),attachments:{filename:string;content:string}[]=[];
    if(queue==='proposal'){
     if(env.SCHOOL_PROPOSAL_BUCKET!=='forge-school-proposals')throw Error('attachment');
     const file=await fetcher(`${env.SUPABASE_URL}/storage/v1/object/authenticated/forge-school-proposals/forge-school-proposal-2026-10-22-v1.pdf`,{headers:serviceHeaders,signal:AbortSignal.timeout(20000)});
     if(!file.ok)throw Error('attachment');
     const bytes=await boundedBody(file,8000000);
     if(new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-')throw Error('attachment');
     let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
     attachments.push({filename:'Forge-school-programme-proposal.pdf',content:btoa(binary)});
    }
    if(providerRequests)await sleep(650);providerRequests++;
    const r=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':idempotencyKey({...job,queue})},body:JSON.stringify({from:`Forge <${env.FROM_EMAIL}>`,to:[job.recipient],reply_to:'programs@forgeintellitech.com',...content,...(attachments.length?{attachments}:{})}),signal:AbortSignal.timeout(25000)});
    if(!r.ok){
     let payloadConflict=false;
     if(r.status===409){try{const detail=JSON.parse(new TextDecoder().decode(await boundedBody(r,16384)));payloadConflict=detail.name==='invalid_idempotent_request';}catch{/* Unknown or in-flight conflicts keep the original key and retry later. */}}
     const permanent=[400,404,413,422].includes(r.status)||payloadConflict;
     error=`${permanent?'[permanent] ':''}Provider HTTP ${r.status}; review delivery record.`;
     pause=!permanent;
    }else{const data=await r.json();if(typeof data.id!=='string'||!data.id)throw Error('provider result');provider=data.id;}
   }catch{error='Delivery response unavailable; retry the same job receipt.';pause=true;}
   const confirmed=await rpc('forge_notification_finish',{p_queue:queue,p_id:job.id,p_lease:job.lease_token,p_provider_id:provider,p_error:error});
   if(confirmed!==true)throw Error('Delivery receipt could not be confirmed.');
   if(provider)result.accepted++;else result.failed++;
   if(pause){result.paused=true;return result;}
  }
 }
 return result;
}
