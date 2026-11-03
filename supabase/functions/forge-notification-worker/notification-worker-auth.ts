// @ts-ignore Explicit extension supports Node tests and Deno.
import {boundedBody} from './referrals/agreement.ts';
export async function authorizeNotificationWorker(request:Request,env:Record<string,string|undefined>,fetcher:typeof fetch=fetch){
 const secret=env.NOTIFICATION_WORKER_SECRET;
 if(request.method!=='POST'||!secret||secret.length<32)return false;
 if(request.headers.get('authorization')===`Bearer ${secret}`)return true;
 const signature=request.headers.get('x-forge-signature');
 if(!signature||!/^[a-f0-9]{64}$/.test(signature)||!env.SUPABASE_URL||!env.SUPABASE_SERVICE_ROLE_KEY)return false;
 try{
  const body=JSON.parse(new TextDecoder().decode(await boundedBody(request,1024)));
  if(!body||Object.keys(body).some(k=>!['timestamp','nonce'].includes(k))||!Number.isSafeInteger(body.timestamp)||Math.abs(Date.now()/1000-body.timestamp)>90||typeof body.nonce!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(body.nonce))return false;
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['verify']);
  const bytes=new Uint8Array(32);for(let i=0;i<32;i++)bytes[i]=parseInt(signature.slice(i*2,i*2+2),16);
  if(!await crypto.subtle.verify('HMAC',key,bytes,new TextEncoder().encode(`forge-notifications-v1\n${body.timestamp}\n${body.nonce}`)))return false;
  const receipt=await fetcher(`${env.SUPABASE_URL}/rest/v1/rpc/forge_notification_consume_trigger`,{method:'POST',headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({p_nonce:body.nonce,p_timestamp:body.timestamp}),signal:AbortSignal.timeout(5000)});
  return receipt.ok&&(await receipt.json())===true;
 }catch{return false;}
}
