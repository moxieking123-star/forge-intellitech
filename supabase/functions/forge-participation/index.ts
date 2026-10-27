import {parseParticipation,parseParticipationReview,participationStatuses} from './participation.ts';
Deno.serve(async(request:Request)=>{
 const reply=(data:object,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store'}});
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 try{
  const reader=request.body?.getReader();if(!reader)return reply({error:'Missing enquiry.'},400);
  const chunks:Uint8Array[]=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>26000){await reader.cancel();return reply({error:'Enquiry too large.'},413);}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const input=JSON.parse(new TextDecoder().decode(bytes)),url=Deno.env.get('SUPABASE_URL')!,key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  let rpc:string,args:object;
  if(input.action==='submit'){
   const payload=parseParticipation(input.payload,input.kind);if(!payload)return reply({error:'Invalid enquiry details.'},400);
   const canonical=JSON.stringify([input.kind,Object.keys(payload).sort().map(k=>[k,payload[k]])]);
   const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(canonical));
   const fingerprint=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
   rpc='forge_participation_intake';args={p_kind:input.kind,p_payload:payload,p_fingerprint:fingerprint};
  }else if(['list','update'].includes(input.action)){
   const token=request.headers.get('x-forge-user-token');if(!token||token.length>8192)return reply({error:'Staff sign-in required.'},401);
   const auth=await fetch(`${url}/auth/v1/user`,{headers:{apikey:key,Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000)});if(!auth.ok)return reply({error:'Staff sign-in required.'},401);
   const user=await auth.json();if(!user.id||!user.email||!user.email_confirmed_at)return reply({error:'Confirmed staff sign-in required.'},401);
   let payload;
   if(input.action==='update'){payload=parseParticipationReview(input.payload);if(!payload)return reply({error:'Invalid review.'},400);}
   else{const {offset=0,status='',kind=''}=input.payload||{};if(!Number.isSafeInteger(offset)||offset<0||offset>10000||(status&&!participationStatuses.includes(status))||(kind&&!['contact','sponsor'].includes(kind)))return reply({error:'Invalid filters.'},400);payload={offset,status,kind};}
   rpc='forge_participation_staff_action';args={p_user_id:user.id,p_verified_email:user.email,p_action:input.action,p_payload:payload};
  }else return reply({error:'Unknown action.'},400);
  const res=await fetch(`${url}/rest/v1/rpc/${rpc}`,{method:'POST',headers:{'Content-Type':'application/json',apikey:key,Authorization:`Bearer ${key}`},body:JSON.stringify(args),signal:AbortSignal.timeout(8000)});
  if(!res.ok)return reply({error:'Enquiry service temporarily unavailable.'},503);
  const result=await res.json();if(result.forbidden)return reply({error:'Administrator access required.'},403);if(result.conflict)return reply({error:'This enquiry changed. Refresh before reviewing.'},409);if(result.missing)return reply({error:'Enquiry not found.'},404);if(result.limited)return reply({error:'Please wait before sending another enquiry.'},429);
  return reply(result,input.action==='submit'?201:200);
 }catch{return reply({error:'We could not confirm receipt. Please retry the same enquiry.'},503);}
});
