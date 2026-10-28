import {parseInstructorApplication,matchVerifiedApplicant} from './application.ts';

/** Server-only orchestration. Inject Auth.getUser and a privileged RPC transport.
 * Never construct this service with an identity taken from request JSON. */
type Dependencies={enabled:boolean;verify:(token:string)=>Promise<unknown>;rpc:(name:string,args:Record<string,unknown>)=>Promise<unknown>};
const uuid=(value:unknown):value is string=>typeof value==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export function createRecruitmentService(deps:Dependencies){
 async function identity(token:string){
  if(!deps.enabled)throw Error('Recruitment is closed');
  if(typeof token!=='string'||!token.trim()||token.length>8192)throw Error('Verified identity required');
  const raw=await deps.verify(token);
  if(!raw||typeof raw!=='object')throw Error('Verified identity required');
  const u=raw as Record<string,unknown>;
  if(!uuid(u.id)||typeof u.email!=='string'||typeof u.emailConfirmedAt!=='string'||!Number.isFinite(Date.parse(u.emailConfirmedAt)))throw Error('Verified identity required');
  return {id:u.id,email:u.email,emailConfirmedAt:u.emailConfirmedAt};
 }
 return {
  async save(token:string,input:unknown){
   const owner=await identity(token),application=parseInstructorApplication(input);
   if(!application)throw Error('Invalid application');
   if(!matchVerifiedApplicant(owner,application))throw Error('Application identity does not match');
   return deps.rpc('forge_recruitment_save',{p_owner:owner.id,p_email:application.email,p_payload:application});
  },
  async start(token:string,requestId:unknown){
   const owner=await identity(token);if(!uuid(requestId))throw Error('Invalid request key');
   return deps.rpc('forge_recruitment_start',{p_owner:owner.id,p_request:requestId});
  },
  async answer(token:string,attemptId:unknown,input:unknown){
   const owner=await identity(token);if(!uuid(attemptId))throw Error('Invalid attempt');
   if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid answer');
   const answer=input as Record<string,unknown>;
   if(Object.keys(answer).length!==2||!['questionId','optionId'].every(key=>typeof answer[key]==='string'&&/^[a-zA-Z0-9_-]{1,80}$/.test(answer[key] as string)))throw Error('Invalid answer');
   return deps.rpc('forge_recruitment_answer',{p_owner:owner.id,p_attempt:attemptId,p_question:answer.questionId,p_option:answer.optionId});
  },
  async submit(token:string,attemptId:unknown){
   const owner=await identity(token);if(!uuid(attemptId))throw Error('Invalid attempt');
   return deps.rpc('forge_recruitment_submit',{p_owner:owner.id,p_attempt:attemptId});
  }
 };
}
