// @ts-nocheck Deno Edge runtime.
import {parseNotificationAdmin} from './notification-admin.ts';
import {boundedBody} from './agreement.ts';
Deno.serve(async(request)=>{
 const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store'}});
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 const token=request.headers.get('x-forge-user-token');if(!token||token.length>8192)return reply({error:'Staff sign-in required.'},401);
 try{const url=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 const auth=await fetch(`${url}/auth/v1/user`,{headers:{apikey:key,Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000)});if(!auth.ok)return reply({error:'Please sign in again.'},401);
 const user=await auth.json();if(!user.id||!user.email||!user.email_confirmed_at)return reply({error:'Confirmed sign-in required.'},401);
 const input=JSON.parse(new TextDecoder().decode(await boundedBody(request,4096))),payload=parseNotificationAdmin(input.action,input.payload);if(!payload)return reply({error:'Invalid notification action.'},400);
 const res=await fetch(`${url}/rest/v1/rpc/forge_notification_staff_action`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({p_user_id:user.id,p_verified_email:user.email,p_action:input.action,p_payload:payload}),signal:AbortSignal.timeout(10000)});if(!res.ok)return reply({error:'Delivery status could not be confirmed.'},503);const data=await res.json();if(data.forbidden)return reply({error:'Administrator access required.'},403);if(data.locked)return reply({error:'This job cannot be retried safely. Reconcile it in the email provider dashboard.'},409);return reply(data);
 }catch{return reply({error:'Notification review unavailable.'},503);}
});
