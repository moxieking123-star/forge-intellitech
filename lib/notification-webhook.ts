// @ts-ignore Explicit extension supports Node tests and Deno.
import {boundedBody} from './referrals/agreement.ts';
type Verify=(payload:string,headers:{id:string;timestamp:string;signature:string},secret:string)=>unknown;
const types=['email.delivered','email.delivery_delayed','email.bounced','email.complained','email.failed'];
export async function handleNotificationWebhook(request:Request,env:Record<string,string|undefined>,verify:Verify,fetcher:typeof fetch=fetch){
 const reply=(status:number)=>new Response(null,{status,headers:{'Cache-Control':'no-store'}});
 if(request.method!=='POST')return reply(405);
 const secret=env.RESEND_WEBHOOK_SECRET;
 if(!secret?.startsWith('whsec_')||secret.length<24||!env.SUPABASE_URL||!env.SUPABASE_SERVICE_ROLE_KEY)return reply(503);
 const headers={id:request.headers.get('svix-id')||'',timestamp:request.headers.get('svix-timestamp')||'',signature:request.headers.get('svix-signature')||''};
 if(!headers.id||headers.id.length>255||!headers.timestamp||headers.timestamp.length>20||!headers.signature||headers.signature.length>4096)return reply(401);
 let raw:string;try{raw=new TextDecoder().decode(await boundedBody(request,65536));}catch{return reply(413);}
 let event:unknown;try{event=verify(raw,headers,secret);}catch{return reply(401);}
 if(!event||typeof event!=='object')return reply(400);
 const e=event as {type?:unknown;created_at?:unknown;data?:{email_id?:unknown}};
 if(typeof e.type!=='string')return reply(400);
 if(!types.includes(e.type))return reply(204);
 if(typeof e.data?.email_id!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(e.data.email_id)||typeof e.created_at!=='string'||!/^\d{4}-\d\d-\d\dT/.test(e.created_at)||!Number.isFinite(Date.parse(e.created_at)))return reply(400);
 try{
  const res=await fetcher(`${env.SUPABASE_URL}/rest/v1/rpc/forge_notification_provider_event`,{method:'POST',headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({p_event_id:headers.id,p_provider_id:e.data.email_id,p_event_type:e.type,p_occurred_at:e.created_at}),signal:AbortSignal.timeout(4000)});
  if(!res.ok)return reply(503);
  const receipt=await res.json();return reply(receipt.saved===true?200:503);
 }catch{return reply(503);}
}
