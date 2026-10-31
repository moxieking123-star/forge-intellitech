import {createHmac,randomBytes} from 'node:crypto';
import {provisionSigningKeyReady} from './bridge.ts';
import {sameOrigin} from '../request-origin.ts';
import {boundedBody} from '../referrals/agreement.ts';
export type ReviewCommand={operation:'list'|'detail'|'review';requestId:string;submissionId:string;expectedReviewId:string;status:string;feedback:string;offset:number;filter:string};
export const reviewUuid=(v:unknown):v is string=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
export function reviewCommand(value:unknown):ReviewCommand|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;const p=value as ReviewCommand;
 if(Object.keys(p).sort().join(',')!=='expectedReviewId,feedback,filter,offset,operation,requestId,status,submissionId'||!reviewUuid(p.requestId)||!Number.isInteger(p.offset)||p.offset<0||p.offset>10000||typeof p.feedback!=='string'||p.feedback.length>1200||/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(p.feedback))return null;
 if(p.operation==='list')return p.submissionId===''&&p.expectedReviewId===''&&p.status===''&&p.feedback===''&&['all','awaiting_review','needs_changes','reviewed'].includes(p.filter)?p:null;
 if(!reviewUuid(p.submissionId)||p.offset!==0||p.filter!=='all')return null;
 if(p.operation==='detail')return p.expectedReviewId===''&&p.status===''&&p.feedback===''?p:null;
 return p.operation==='review'&&(p.expectedReviewId===''||reviewUuid(p.expectedReviewId))&&['needs_changes','reviewed'].includes(p.status)&&p.feedback.trim().length>=20?p:null;
}
export function canonicalReview(e:{version:1;action:'staff.training';timestamp:number;nonce:string;payload:ReviewCommand&{actorId:string}}){const p=e.payload;return JSON.stringify([e.version,e.action,e.timestamp,e.nonce,p.actorId,p.operation,p.requestId,p.submissionId,p.expectedReviewId,p.status,p.feedback,p.offset,p.filter]);}
export function signReview(secret:string,actorId:string,command:ReviewCommand){if(!provisionSigningKeyReady(secret)||!reviewUuid(actorId)||!reviewCommand(command))throw Error('Invalid training review');const e={version:1 as const,action:'staff.training' as const,timestamp:Math.floor(Date.now()/1000),nonce:randomBytes(24).toString('hex'),payload:{actorId,...command}};return {...e,signature:createHmac('sha256',Buffer.from(secret,'hex')).update(canonicalReview(e)).digest('hex')};}
export async function handleTrainingReview(request:Request,deps:{enabled:boolean;authorize:(token:string,signal:AbortSignal)=>Promise<string|null>;exchange:(actorId:string,command:ReviewCommand,signal:AbortSignal)=>Promise<unknown>}){
 const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
 if(!deps.enabled)return reply({error:'Training review is unavailable.'},503);
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 if(!sameOrigin(request))return reply({error:'Invalid request origin.'},403);
 const auth=request.headers.get('authorization');if(!auth?.startsWith('Bearer ')||auth.length>8200||!auth.slice(7).trim())return reply({error:'Staff sign-in required.'},401);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Invalid request.'},400);
 let command;try{command=reviewCommand(JSON.parse(new TextDecoder().decode(await boundedBody(request,6000))));}catch{return reply({error:'Invalid request.'},400);}if(!command)return reply({error:'Check the review fields. Feedback needs at least 20 characters.'},400);
 const signal=AbortSignal.timeout(25000);
 try{const actor=await deps.authorize(auth.slice(7),signal);if(!actor||!reviewUuid(actor))return reply({error:'Only authorised recruitment administrators can review training assignments.'},403);
 const result=await deps.exchange(actor,command,signal) as Record<string,unknown>;
 if(!result||typeof result!=='object'||result.error)throw Error();
 if(result.conflict)return reply({error:'This assignment or review changed. Reload the assignment before saving feedback.',conflict:true},409);
 if(result.missing)return reply({error:'Assignment not found.'},404);
 return reply(result);
 }catch{return reply({error:'The review could not be confirmed. Keep your feedback and retry; repeated saves are protected against duplicates.'},503);}
}
