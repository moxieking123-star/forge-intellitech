// @ts-nocheck Deno Edge runtime.
import {runNotificationBatch} from './notification-runner.ts';
Deno.serve(async(request)=>{
 const env=Deno.env.toObject(),secret=env.NOTIFICATION_WORKER_SECRET;
 const headers={'Cache-Control':'private, no-store'};
 if(request.method!=='POST'||!secret||secret.length<32||request.headers.get('authorization')!==`Bearer ${secret}`)return new Response('Unauthorized',{status:401,headers});
 try{const result=await runNotificationBatch(env);if(result.disabled)return new Response('Disabled',{status:503,headers});return Response.json({delivered:result.accepted,failed:result.failed,paused:result.paused},{headers});}
 catch{return new Response('Delivery receipt requires reconciliation or retry',{status:503,headers});}
});
