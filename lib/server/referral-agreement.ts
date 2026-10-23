import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import path from "node:path";
import {AGREEMENT_VERSION,MAX_SIGNED_PDF_BYTES,boundedBody,referralIdPattern,validateSignedPdf} from "@/lib/referrals/agreement";
import {referralBackendFetch} from "./referral-backend";
import {response,validOrigin} from "./referrals";
export async function reviewAgreementGet(request:Request){
 const params=new URL(request.url).searchParams,id=params.get("referralId");
 if(!id||!referralIdPattern.test(id))return response({error:"Invalid referral."},400);
 if(params.get("download")!=="1")return referralBackendFetch(request,"agreement",{referralId:id});
 try{
  const bytes=await readFile(path.join(process.cwd(),"public/downloads/forge-referral-agreement-draft.pdf"));
  const result=await referralBackendFetch(request,"download",{referralId:id,version:AGREEMENT_VERSION,hash:createHash("sha256").update(bytes).digest("hex")});
  if(!result.ok)return result;
  if(!(await result.json()).recorded)return response({error:"Download receipt could not be confirmed."},503);
  return new Response(bytes,{headers:{"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="forge-referral-agreement-draft.pdf"',"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
 }catch{return response({error:"The current agreement could not be served."},503);}
}
export async function reviewAgreementPost(request:Request){
 if(!validOrigin(request))return response({error:"Invalid origin."},403);
 if(!request.headers.get("authorization")?.startsWith("Bearer "))return response({error:"Sign-in required."},401);
 const contentType=request.headers.get("content-type");
 if(!contentType?.startsWith("multipart/form-data"))return response({error:"PDF form required."},415);
 try{
  const bytes=await boundedBody(request,MAX_SIGNED_PDF_BYTES+16384);
  const form=await new Response(bytes,{headers:{"Content-Type":contentType}}).formData();
  const id=form.get("referralId"),file=form.get("file");
  if(typeof id!=="string"||!referralIdPattern.test(id)||form.get("version")!==AGREEMENT_VERSION||form.get("signedDeclaration")!=="true"||!(file instanceof File)||file.type!=="application/pdf"||file.size>MAX_SIGNED_PDF_BYTES)return response({error:"Provide the signed PDF, current version and signing declaration. Maximum 3 MB."},400);
  const pdf=new Uint8Array(await file.arrayBuffer());
  if(!validateSignedPdf(pdf))return response({error:"Export a plain signed PDF without attachments or active content."},400);
  return referralBackendFetch(request,"upload",{referralId:id,version:AGREEMENT_VERSION},pdf);
 }catch{return response({error:"The signed PDF could not be accepted. Maximum 3 MB; refresh before retrying."},400);}
}
