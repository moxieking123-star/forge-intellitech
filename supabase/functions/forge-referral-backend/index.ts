import {AGREEMENT_VERSION,MAX_SIGNED_PDF_BYTES,boundedBody,referralIdPattern,validatePayoutProfile,validateSignedPdf} from "./agreement.ts";
import {schoolKey} from "./policy.ts";
import {TEMPLATE_HASH} from "./template.ts";
const bucket="forge-referral-review-agreements";
Deno.serve(async(request:Request)=>{
 const reply=(data:object,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"private, no-store"}});
 if(request.method!=="POST")return reply({error:"Method not allowed."},405);
 const token=request.headers.get("x-forge-user-token");
 if(!token||token.length>8192)return reply({error:"Confirmed email sign-in required."},401);
 const url=Deno.env.get("SUPABASE_URL")!,key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
 const headers={apikey:key,Authorization:`Bearer ${key}`};
 try{
  const auth=await fetch(`${url}/auth/v1/user`,{headers:{...headers,Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000)});
  if(!auth.ok)return reply({error:"Please sign in again."},401);
  const user=await auth.json();if(!user.id||!user.email_confirmed_at)return reply({error:"Confirmed email sign-in required."},401);
  async function rpc(action:string,payload:object={}){
   const res=await fetch(`${url}/rest/v1/rpc/forge_referral_action`,{method:"POST",headers:{...headers,"Content-Type":"application/json"},body:JSON.stringify({p_owner:user.id,p_action:action,p_payload:payload}),signal:AbortSignal.timeout(10000)});
   const result=await res.json();
   if(!res.ok)throw {code:result.code,message:result.message};
   if(result.closed)throw {code:"CLOSED"};
   return result;
  }
  const query=new URL(request.url).searchParams;
  if(query.get("action")==="upload"){
   if(request.headers.get("x-forge-signed-declaration")!=="true")return reply({error:"Confirm that you signed the document externally for this school."},400);
   const referralId=query.get("referralId"),version=query.get("version");
   if(!referralId||!referralIdPattern.test(referralId)||version!==AGREEMENT_VERSION)return reply({error:"Invalid agreement reference or version."},400);
   if(!request.headers.get("content-type")?.startsWith("application/pdf"))return reply({error:"A PDF is required."},415);
   let bytes:Uint8Array;try{bytes=await boundedBody(request,MAX_SIGNED_PDF_BYTES);}catch{return reply({error:"Maximum signed PDF size is 3 MB."},413);}
   if(!validateSignedPdf(bytes))return reply({error:"Export a plain signed PDF without attachments or active content."},400);
   const path=`${user.id}/${referralId}/${crypto.randomUUID()}.pdf`;
   await rpc("_reserve",{referralId,version,path});
   let uploaded=false;
   try{
    const stored=await fetch(`${url}/storage/v1/object/${bucket}/${path}`,{method:"POST",headers:{...headers,"Content-Type":"application/pdf","x-upsert":"false"},body:bytes,signal:AbortSignal.timeout(12000)});
    if(!stored.ok)throw new Error("Storage failed");uploaded=true;
    const digest=await crypto.subtle.digest("SHA-256",bytes),hash=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,"0")).join("");
    return reply(await rpc("_complete",{referralId,path,hash}),201);
   }catch{
    // A timeout may hide a committed receipt. Recover it before any cleanup.
    const receipt=await rpc("_upload_result",{referralId,path}).catch(()=>null);
    if(receipt?.completed)return reply({status:"uploaded_awaiting_review",uploadedAt:receipt.uploadedAt},201);
    // Cancel atomically first. A completed receipt can never be cancelled, so its
    // object cannot be deleted by compensation after an ambiguous response.
    const cancelled=await rpc("_cancel",{referralId,path}).catch(()=>null);
    if(cancelled?.cancelled)await fetch(`${url}/storage/v1/object/${bucket}`,{method:"DELETE",headers:{...headers,"Content-Type":"application/json"},body:JSON.stringify({prefixes:[path]}),signal:AbortSignal.timeout(8000)}).catch(()=>null);
    return reply({error:uploaded?"Upload receipt could not be confirmed. Refresh before retrying; contact Forge if it remains pending.":"The file could not be stored. Refresh before retrying."},503);
   }
  }
  let input;try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,4096)));}catch{return reply({error:"Invalid request."},400);}
  const action=input?.action;let payload=input?.payload??{};
  if(["account","profile"].includes(action))payload={};
  else if(action==="profile_save"){
   payload=validatePayoutProfile(payload);if(!payload)return reply({error:"Enter bank name, account name and a ten-digit Nigerian account number."},400);
  }else if(action==="link_create"){
   if(typeof payload.schoolName!=="string"||!payload.schoolName.trim()||payload.schoolName.length>200||typeof payload.location!=="string"||!payload.location.trim()||payload.location.length>200)return reply({error:"Enter the school name and general location."},400);
   payload={schoolName:payload.schoolName.trim(),location:payload.location.trim(),schoolKey:schoolKey(payload.schoolName,payload.location)};
  }else if(["agreement","download","statement","statement_request"].includes(action)){
   if(typeof payload.referralId!=="string"||!referralIdPattern.test(payload.referralId))return reply({error:"Invalid referral."},400);
   if(action==="download"){
    if(payload.hash!==TEMPLATE_HASH||payload.version!==AGREEMENT_VERSION)return reply({error:"The current agreement version needs to be refreshed."},409);
    payload={referralId:payload.referralId,version:AGREEMENT_VERSION,hash:TEMPLATE_HASH};
   }else payload={referralId:payload.referralId};
  }else return reply({error:"Unknown referral action."},400);
  const result=await rpc(action,payload);
  if(result.profileRequired)return reply({error:"Register your payment details before creating a school referral."},409);
  return reply(result,["link_create","profile_save","statement_request"].includes(action)?201:200);
 }catch(error){
  const failure=error as {code?:string;message?:string};
  if(failure.code==="CLOSED")return reply({error:"This referral account is closed. Contact Forge for assistance."},403);
  if(failure.code==="23505")return reply({error:"This school link or payment profile is already registered. Refresh your records before retrying."},409);
  if(failure.code==="P0001"){
   if(failure.message?.includes("Holiday"))return reply({error:"A reviewed Nigerian holiday calendar is required to confirm the disclosure deadline. Contact Forge for your earnings breakdown."},503);
   if(failure.message?.includes("rate limit"))return reply({error:"Please wait before creating more school links."},429);
   return reply({error:"This referral or upload is unavailable. Check ownership, download the current draft first, and refresh before retrying. Uploaded copies cannot be overwritten."},409);
  }
  return reply({error:"Referral services could not confirm this request. Refresh your records before retrying."},503);
 }
});
