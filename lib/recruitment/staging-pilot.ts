import {trainingWorkerAuthorized} from './worker-auth.ts';
import {trainingInvitation} from './invitation.ts';
import {trainingDashboardUrl} from './paths.ts';
import {boundedBody} from '../referrals/agreement.ts';
/** Explicit owner-only preview test. Never claims the real invitation queue. */
export async function handleStagingWelcome(request:Request,env:Record<string,string|undefined>,send:(mail:ReturnType<typeof trainingInvitation>&{idempotencyKey:string})=>Promise<{id:string}>){
 const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
 if(env.VERCEL_ENV!=='preview'||env.TRAINING_STAGING_PILOT_ENABLED!=='true')return reply({error:'Not available.'},404);
 if(!trainingWorkerAuthorized(request,env.TRAINING_WORKER_SECRET))return reply({error:'Unauthorized.'},401);
 if(!env.VERCEL_URL||!/^[-a-z0-9]+\.vercel\.app$/.test(env.VERCEL_URL))return reply({error:'Staging destination is unavailable.'},503);
 let id;try{const body=JSON.parse(new TextDecoder().decode(await boundedBody(request,256)));if(Object.keys(body).join(',')!=='requestId'||typeof body.requestId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(body.requestId))throw Error();id=body.requestId;}catch{return reply({error:'Invalid test request.'},400);}
 const mail=trainingInvitation({verifiedEmail:'admin@forgeintellitech.com',displayName:'Forge owner pilot',traineeId:'TRN-owner-pilot'});
 const url='https://'+env.VERCEL_URL+'/instructor-training/join/training';
 try{const result=await send({...mail,subject:'[Staging test] Your Forge instructor welcome',text:'CONTROLLED STAGING TEST: This checks the welcome email and training sign-in. It does not record an assessment pass or employment decision.\n\n'+mail.text.replace(trainingDashboardUrl,url),idempotencyKey:'forge-training-staging/'+id});return reply({accepted:true,providerId:result.id,destination:url});}catch{return reply({error:'The test email could not be confirmed. Retry with the same request ID.'},503);}
}
