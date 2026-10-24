import {parseAgreementAction,parseContractEvidence} from './staff-agreements.ts';
import {boundedBody,MAX_SIGNED_PDF_BYTES,validateSignedPdf} from './agreement.ts';
const bucket='forge-referral-review-agreements';
const digest=async(bytes:Uint8Array)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
Deno.serve(async(request:Request)=>{
 const reply=(body:object,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 const token=request.headers.get('x-forge-user-token');if(!token||token.length>8192)return reply({error:'Staff sign-in required.'},401);
 const url=Deno.env.get('SUPABASE_URL')!,key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,headers={apikey:key,Authorization:`Bearer ${key}`};
 try{
  const auth=await fetch(`${url}/auth/v1/user`,{headers:{...headers,Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000)});
  if(!auth.ok)return reply({error:'Please sign in again.'},401);
  const user=await auth.json();if(!user.id||!user.email||!user.email_confirmed_at)return reply({error:'Confirmed staff email required.'},401);
  async function rpc(action:string,payload:object={}){
   const res=await fetch(`${url}/rest/v1/rpc/forge_staff_agreement_action`,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({p_user_id:user.id,p_verified_email:user.email,p_action:action,p_payload:payload}),signal:AbortSignal.timeout(10000)});
   const data=await res.json();if(!res.ok)throw {status:503,message:'Document review could not be confirmed. Refresh before retrying.'};
   if(data.forbidden)throw {status:403,message:'Administrator access required.'};
   if(data.missing)throw {status:404,message:'Document or linked school not found.'};
   if(data.conflict)throw {status:409,message:'The record changed or already has contract evidence. Refresh before retrying.'};
   if(data.locked)throw {status:409,message:'This record is locked or its prerequisites are incomplete. Review the school and account first.'};
   return data;
  }
  // Authorise before accepting a large body or accessing Storage.
  await rpc('authorize');
  if(new URL(request.url).searchParams.get('action')==='contract_upload'){
   if(!request.headers.get('content-type')?.startsWith('application/pdf'))return reply({error:'PDF required.'},415);
   const encoded=request.headers.get('x-forge-evidence');if(!encoded||encoded.length>16000)return reply({error:'Invalid evidence details.'},400);
   let evidence;try{evidence=parseContractEvidence(JSON.parse(decodeURIComponent(encoded)));}catch{return reply({error:'Invalid evidence details.'},400);}
   if(!evidence)return reply({error:'Check the signing date, current school version, note and review declaration.'},400);
   let bytes:Uint8Array;try{bytes=await boundedBody(request,MAX_SIGNED_PDF_BYTES);}catch{return reply({error:'Maximum PDF size is 3 MB.'},413);}
   if(!validateSignedPdf(bytes))return reply({error:'Export a plain PDF without attachments or active content.'},400);
   const hash=await digest(bytes),path=`contracts/${evidence.schoolId}/${evidence.receiptId}.pdf`,payload={...evidence,hash,path};
   const preflight=await rpc('contract_check',payload);
   if(preflight.saved)return reply(preflight,200);
   const stored=await fetch(`${url}/storage/v1/object/${bucket}/${path}`,{method:'POST',headers:{...headers,'Content-Type':'application/pdf','x-upsert':'false'},body:bytes,signal:AbortSignal.timeout(12000)});
   if(!stored.ok)return reply({error:'The PDF could not be stored. Refresh and inspect existing evidence before retrying.'},503);
   try{return reply(await rpc('contract_record',payload),201);}
   catch{
    // Repeat the identical receipt once: a committed transaction returns its original receipt.
    // Never delete after an ambiguous result; a referenced signed document must survive.
    try{return reply(await rpc('contract_record',payload),201);}catch{return reply({error:'The PDF was stored but its receipt could not be confirmed. Refresh before retrying; staff reconciliation may be needed.'},503);}
   }
  }
  let input;try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,4096)));}catch{return reply({error:'Invalid request.'},400);}
  const payload=parseAgreementAction(input?.action,input?.payload??{});if(!payload)return reply({error:'Invalid document review request.'},400);
  const result=await rpc(input.action,payload);
  if(input.action==='document'||input.action==='contract_document'){
   if(typeof result.path!=='string'||result.path.includes('..')||!/^[a-zA-Z0-9/.-]+$/.test(result.path))return reply({error:'Document unavailable.'},503);
   const file=await fetch(`${url}/storage/v1/object/authenticated/${bucket}/${result.path}`,{headers,signal:AbortSignal.timeout(12000)});
   if(!file.ok)return reply({error:'Private document is unavailable.'},503);
   const bytes=await boundedBody(file,MAX_SIGNED_PDF_BYTES);
   if(await digest(bytes)!==result.hash)return reply({error:'Document integrity check failed. Contact the administrator.'},409);
   return new Response(bytes,{headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="forge-reviewed-document.pdf"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
  }
  return reply(result);
 }catch(error){const e=error as {status?:number;message?:string};return reply({error:e.message||'Document service is temporarily unavailable.'},e.status||503);}
});
