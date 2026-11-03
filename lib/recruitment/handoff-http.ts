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
 try{return reply(await deps.exchange(authorization.slice(7)));}catch(error){
  const message=error instanceof Error?error.message:'';
  if(message==='Verified identity required')return reply({error:'Your email sign-in has expired. Please sign out and request a fresh sign-in link.',code:'sign_in'},401);
  if(message==='Training profile is not ready')return reply({error:'Your email is signed in, but your training profile is not ready yet. Contact work@forgeintellitech.com if you expected access.',code:'not_ready'},409);
  if(message==='Training sign-in timed out')return reply({error:'The training connection took too long. Your email sign-in is kept; please try opening your profile again.',code:'timeout'},503);
  return reply({error:'The training service could not connect. Your email sign-in is kept; please try again shortly.',code:'unavailable'},503);
 }
}
