import {parseFinanceAction} from './referral-finance.ts';
import {boundedBody} from './agreement.ts';
Deno.serve(async(request:Request)=>{
 const reply=(body:object,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 const token=request.headers.get('x-forge-user-token');if(!token||token.length>8192)return reply({error:'Sign-in required.'},401);
 try{
 const url=Deno.env.get('SUPABASE_URL')!,key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,headers={apikey:key,Authorization:`Bearer ${key}`};
 const auth=await fetch(`${url}/auth/v1/user`,{headers:{...headers,Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000)});
 if(!auth.ok)return reply({error:'Please sign in again.'},401);const user=await auth.json();if(!user.id||!user.email||!user.email_confirmed_at)return reply({error:'Confirmed email required.'},401);
 let input;try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,262144)));}catch{return reply({error:'Invalid request.'},400);}
 const owner=input.owner===true,payload=parseFinanceAction(input.action,input.payload??{},owner);if(!payload||owner&&input.action!=='statements')return reply({error:'Invalid finance request.'},400);
 const res=await fetch(`${url}/rest/v1/rpc/forge_referral_finance_action`,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({p_user_id:user.id,p_verified_email:user.email,p_action:input.action,p_payload:payload,p_owner:owner}),signal:AbortSignal.timeout(10000)});
 if(!res.ok)return reply({error:'Finance result could not be confirmed. Refresh before retrying with the same receipt.'},503);
 const data=await res.json();if(data.forbidden)return reply({error:'Access denied.'},403);if(data.missing)return reply({error:'Record unavailable.'},404);if(data.conflict||data.locked)return reply({error:'Record changed or prerequisites incomplete. Refresh and review the evidence.'},409);return reply(data);
 }catch{return reply({error:'Finance service unavailable. Refresh before retrying with the same receipt.'},503);}
});
