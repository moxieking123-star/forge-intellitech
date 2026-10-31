import {trainingWorkerAuthorized} from '@/lib/recruitment/worker-auth';
import {runRecruitmentDelivery} from '@/lib/server/recruitment-delivery';
import {runTrainingInvitations} from '@/lib/server/training-invitations';
export const dynamic='force-dynamic';
export const maxDuration=120;
/** Called by a private scheduler only. No recipient, content or application ID is accepted. */
export async function POST(request:Request){
 const headers={'Cache-Control':'private, no-store'};
 if(!trainingWorkerAuthorized(request,process.env.TRAINING_WORKER_SECRET))return new Response('Unauthorized',{status:401,headers});
 if(process.env.TRAINING_AUTOMATION_ENABLED!=='true')return Response.json({disabled:true},{status:503,headers});
 try{const provision=await runRecruitmentDelivery(1),welcome=await runTrainingInvitations();return Response.json({provision,welcome},{headers});}catch{return Response.json({error:'Training delivery requires retry or reconciliation.'},{status:503,headers});}
}
