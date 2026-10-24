// @ts-nocheck Deno edge runtime.
import {deliveryEnabled,deliveryContent,idempotencyKey} from './notification-delivery.ts';
Deno.serve(async(request)=>{
 const env=Deno.env.toObject(),secret=env.NOTIFICATION_WORKER_SECRET;
 if(request.method!=='POST'||!secret||secret.length<32||request.headers.get('authorization')!==`Bearer ${secret}`) return new Response('Unauthorized',{status:401});
 if(!deliveryEnabled(env)||!env.SUPABASE_URL||!env.SUPABASE_SERVICE_ROLE_KEY) return new Response('Disabled',{status:503});
 const rpc=async(name,args)=>{const r=await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(args),signal:AbortSignal.timeout(20000)});if(!r.ok) throw Error('Database operation failed');return r.json();};
 let delivered=0;
 try {for(const queue of ['school','participation','proposal']) {
  const jobs=await rpc('forge_notification_claim',{p_queue:queue,p_limit:2});
  for(const job of jobs) {
   let provider=null,error=null;
   try {
    const content=deliveryContent(job),attachments=[];
    if(queue==='proposal') {
     if(!env.SCHOOL_PROPOSAL_BUCKET) throw Error('Attachment unavailable');
     const file=await fetch(`${env.SUPABASE_URL}/storage/v1/object/authenticated/${encodeURIComponent(env.SCHOOL_PROPOSAL_BUCKET)}/forge-school-proposal-2026-10-22-v1.pdf`,{headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`},signal:AbortSignal.timeout(20000)});
     if(!file.ok) throw Error('Attachment unavailable');
     const bytes=new Uint8Array(await file.arrayBuffer());
     if(bytes.length>8000000||new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-') throw Error('Invalid attachment');
     let binary='';for(let i=0;i<bytes.length;i+=8192) binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
     attachments.push({filename:'Forge-school-programme-proposal.pdf',content:btoa(binary)});
    }
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':idempotencyKey(job)},body:JSON.stringify({from:`Forge <${env.FROM_EMAIL}>`,to:[job.recipient],reply_to:'programs@forgeintellitech.com',...content,...(attachments.length?{attachments}:{})}),signal:AbortSignal.timeout(20000)});
    if(!r.ok) throw Error('Provider failure');const result=await r.json();if(typeof result.id!=='string'||!result.id) throw Error('Provider reference missing');provider=result.id;
   }catch{error='Delivery attempt failed; inspect provider dashboard using job reference';}
   if(await rpc('forge_notification_finish',{p_queue:queue,p_id:job.id,p_lease:job.lease_token,p_provider_id:provider,p_error:error})&&provider) delivered++;
  }
 }return Response.json({delivered});}catch{return new Response('Delivery state requires retry',{status:503});}
});
