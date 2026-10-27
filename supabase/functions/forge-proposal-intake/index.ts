// @ts-nocheck Deno Edge runtime.
import {parseProposalRequest} from './school-proposal.ts';
import {boundedBody} from './agreement.ts';
Deno.serve(async(request)=>{
 const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
 if(request.method!=='POST')return reply({error:'Method not allowed'},405);
 try{
  const details=parseProposalRequest(JSON.parse(new TextDecoder().decode(await boundedBody(request,4096))));
  if(!details)return reply({error:'Check your proposal request and consent.'},400);
  const url=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const res=await fetch(`${url}/rest/v1/rpc/forge_proposal_submit`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({p_payload:details}),signal:AbortSignal.timeout(10000)});
  const data=await res.json();if(!res.ok)return reply({error:'Unable to queue another proposal request. Please wait or contact programmes.'},res.status===400?429:503);
  return reply({queued:true,id:data},202);
 }catch{return reply({error:'Proposal request could not be confirmed.'},503);}
});
