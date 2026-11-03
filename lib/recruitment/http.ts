import {sameOrigin} from '../request-origin.ts';
import {boundedBody} from '../referrals/agreement.ts';
type Service={
 save:(token:string,input:unknown)=>Promise<unknown>;
 start:(token:string,id:unknown)=>Promise<unknown>;
 answer:(token:string,id:unknown,input:unknown)=>Promise<unknown>;
 submit:(token:string,id:unknown)=>Promise<unknown>;
 abandon:(token:string,id:unknown)=>Promise<unknown>;
 state:(token:string)=>Promise<unknown>;
};
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});
const failures:Record<string,[number,string,string]>={
 'Verified identity required':[401,'sign_in','Please sign in with a verified email to continue.'],
 'Application identity does not match':[401,'sign_in','The application email must match your signed-in email.'],
 'Invalid application':[400,'invalid','Please check every application field and your consent.'],
 'Invalid request key':[400,'invalid','Please retry starting the assessment.'],
 'Invalid attempt':[400,'invalid','The assessment reference is invalid.'],
 'Invalid answer':[400,'invalid','Please choose one of the listed answers.'],
 'Assessment bank not ready':[503,'not_ready','The assessment is being prepared. Your draft is saved; please try again later.'],
 'Attempt already active':[409,'active','An assessment is already open. Return to your application to review it.'],
 'Staff review required':[409,'locked','You have used three attempts. Please contact work@forgeintellitech.com for a review.'],
 'Assessment already passed':[409,'passed','Your pass is already recorded. Training access is being prepared.'],
 'Attempt closed':[409,'closed','This assessment has ended. Only answers saved before the deadline count.'],
 'Attempt unavailable':[404,'missing','This assessment is not available to this account.'],
 'Application unavailable':[404,'missing','Save your application before starting an assessment.'],
};
export async function handleRecruitmentRequest(request:Request,deps:{enabled:boolean;service:Service}){
 if(!deps.enabled)return reply({error:'Recruitment is not open yet.',code:'closed'},503);
 if(!['GET','POST'].includes(request.method))return reply({error:'Method not allowed.'},405);
 if(request.method==='POST'&&!sameOrigin(request))return reply({error:'Invalid request origin.'},403);
 const authorization=request.headers.get('authorization');
 if(!authorization?.startsWith('Bearer ')||authorization.length>8200||!authorization.slice(7).trim())return reply({error:'Please sign in with a verified email.',code:'sign_in'},401);
 const token=authorization.slice(7);
 try{
  if(request.method==='GET')return reply(await deps.service.state(token));
  if(!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Expected a JSON request.'},400);
  let input:Record<string,unknown>;
  try{const raw=JSON.parse(new TextDecoder().decode(await boundedBody(request,16384)));if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error();input=raw;}catch{return reply({error:'Invalid or oversized request.'},400);}
  const allowed:Record<string,string[]>={save:['action','application'],start:['action','requestId'],answer:['action','attemptId','answer'],submit:['action','attemptId'],abandon:['action','attemptId']};
  const action=input.action;
  if(typeof action!=='string'||!Object.hasOwn(allowed,action)||Object.keys(input).length!==allowed[action].length||Object.keys(input).some(key=>!allowed[action].includes(key)))return reply({error:'Invalid request fields.'},400);
  let result:unknown;
  switch(action){
   case 'save':result=await deps.service.save(token,input.application);break;
   case 'start':result=await deps.service.start(token,input.requestId);break;
   case 'answer':result=await deps.service.answer(token,input.attemptId,input.answer);break;
   case 'submit':result=await deps.service.submit(token,input.attemptId);break;
   case 'abandon':result=await deps.service.abandon(token,input.attemptId);break;
  }
  return reply(result);
 }catch(error){
  const failure=error instanceof Error&&Object.hasOwn(failures,error.message)?failures[error.message]:undefined;
  if(failure)return reply({error:failure[2],code:failure[1]},failure[0]);
  return reply({error:'We could not complete this request. Please retry; your saved progress is kept.',code:'unavailable'},503);
 }
}
