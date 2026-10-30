import {sameOrigin} from '../request-origin.ts';
import {boundedBody} from '../referrals/agreement.ts';
export async function handleTrainingHandoff(request:Request,deps:{enabled:boolean;exchange:(token:string)=>Promise<unknown>}){
 const reply=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
 if(!deps.enabled)return reply({error:'Training sign-in is being prepared.'},503);
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 if(!sameOrigin(request))return reply({error:'Invalid request origin.'},403);
 const authorization=request.headers.get('authorization');
 if(!authorization?.startsWith('Bearer ')||authorization.length>8200||!authorization.slice(7).trim())return reply({error:'Please sign in with your verified email.'},401);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Invalid request.'},400);
 try{const body=JSON.parse(new TextDecoder().decode(await boundedBody(request,128)));if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).length)return reply({error:'Invalid request.'},400);}catch{return reply({error:'Invalid request.'},400);}
 try{return reply(await deps.exchange(authorization.slice(7)));}catch{return reply({error:'Training sign-in could not be completed. Please try again later.'},503);}
}
