import {backendEnvironmentEnabled,backendPublishableKey} from "@/lib/backend-runtime";
import {sameOrigin} from '@/lib/request-origin';
import {boundedBody} from '@/lib/referrals/agreement';
import {response} from '@/lib/server/referrals';
import {parseNotificationAdmin} from '@/lib/notification-admin';
export async function POST(request:Request){
 const key=backendPublishableKey();if(!backendEnvironmentEnabled()||process.env.NOTIFICATION_ADMIN_ENABLED!=='true'||!key)return response({error:'Delivery review not connected.'},503);
 if(!sameOrigin(request))return response({error:'Invalid request origin.'},403);
 const token=request.headers.get('authorization');if(!token?.startsWith('Bearer ')||token.length>8192)return response({error:'Staff sign-in required.'},401);
 try{const input=JSON.parse(new TextDecoder().decode(await boundedBody(request,4096))),payload=parseNotificationAdmin(input.action,input.payload);if(!payload)return response({error:'Invalid delivery review.'},400);
 const res=await fetch('https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-notification-admin',{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'x-forge-user-token':token.slice(7),'Content-Type':'application/json'},body:JSON.stringify({action:input.action,payload}),cache:'no-store',signal:AbortSignal.timeout(12000)});return response(await res.json(),res.status);
 }catch{return response({error:'Delivery review could not be confirmed.'},503);}
}
