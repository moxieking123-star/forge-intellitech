// @ts-nocheck Deno Edge runtime.
import {runNotificationBatch} from './notification-runner.ts';
import {authorizeNotificationWorker} from './notification-worker-auth.ts';
Deno.serve(async(request)=>{
 const env=Deno.env.toObject();
 const headers={'Cache-Control':'private, no-store'};
 if(!await authorizeNotificationWorker(request,env))return new Response('Unauthorized',{status:401,headers});
 try{const result=await runNotificationBatch(env);if(result.disabled)return new Response('Disabled',{status:503,headers});return Response.json({accepted:result.accepted,failed:result.failed,paused:result.paused},{headers});}
 catch{return new Response('Delivery receipt requires reconciliation or retry',{status:503,headers});}
});
