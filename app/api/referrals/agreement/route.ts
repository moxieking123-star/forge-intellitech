import { readFile } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { referralAccess } from "@/lib/referrals/access";
import { AGREEMENT_VERSION, MAX_SIGNED_PDF_BYTES, boundedBody, referralIdPattern, validateSignedPdf } from "@/lib/referrals/agreement";
import { response, validOrigin } from "@/lib/server/referrals";
const bucket="referral-signed-agreements";
export const runtime="nodejs";
export async function GET(request:Request) {
  try {
    const access=await referralAccess(request); if(access.error) return access.error;
    const id=new URL(request.url).searchParams.get("referralId"); if(!id || !referralIdPattern.test(id)) return response({error:"Invalid referral."},400);
    const {data:referral,error}=await access.service.from("school_referrals").select("id").eq("id",id).eq("referrer_id",access.user.id).neq("stage","cancelled").maybeSingle();
    if(error || !referral) return response({error:"Referral unavailable."},404);
    if(new URL(request.url).searchParams.get("download")!=="1") {
      const result=await access.service.from("referral_agreements").select("version,downloaded_at,uploaded_at,status,school_contract_signed_at").eq("referral_id",id).maybeSingle();
      if(result.error) throw result.error;
      return response({agreement:result.data});
    }
    const bytes=await readFile(path.join(process.cwd(),"public/downloads/forge-referral-agreement-draft.pdf"));
    const hash=createHash("sha256").update(bytes).digest("hex");
    const recorded=await access.service.rpc("record_referral_agreement_download",{p_owner:access.user.id,p_referral:id,p_version:AGREEMENT_VERSION,p_hash:hash});
    if(recorded.error) throw recorded.error;
    return new Response(bytes,{headers:{"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="forge-referral-agreement-draft.pdf"',"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
  } catch {return response({error:"Agreement service unavailable."},503);}
}
export async function POST(request:Request) {
  if(!validOrigin(request)) return response({error:"Invalid origin."},403);
  if(!request.headers.get("content-type")?.startsWith("multipart/form-data")) return response({error:"PDF form required."},415);
  if(Number(request.headers.get("content-length"))>MAX_SIGNED_PDF_BYTES+16384) return response({error:"Maximum file size is 5 MB."},413);
  try {
    const access=await referralAccess(request); if(access.error) return access.error;
    const body=await boundedBody(request,MAX_SIGNED_PDF_BYTES+16384);
    const form=await new Response(body,{headers:{"Content-Type":request.headers.get("content-type")!}}).formData(), id=form.get("referralId"), version=form.get("version"), file=form.get("file");
    if(typeof id!=="string" || !referralIdPattern.test(id) || version!==AGREEMENT_VERSION || !(file instanceof File) || file.type!=="application/pdf" || file.size>MAX_SIGNED_PDF_BYTES || form.get("signedDeclaration")!=="true") return response({error:"Provide your signed PDF, version and signing declaration (maximum 5 MB)."},400);
    const bytes=new Uint8Array(await file.arrayBuffer()); if(!validateSignedPdf(bytes)) return response({error:"This PDF cannot be accepted. Export a plain signed PDF without attachments or active content."},400);
    const objectPath=`${access.user.id}/${id}/${randomUUID()}.pdf`;
    // Reservation locks the referral and enforces ownership, recent versioned download and no prior upload.
    const reserve=await access.service.rpc("reserve_referral_agreement_upload",{p_owner:access.user.id,p_referral:id,p_version:version,p_path:objectPath});
    if(reserve.error) return response({error:"Download the current agreement first. An uploaded agreement cannot be overwritten."},409);
    const uploaded=await access.service.storage.from(bucket).upload(objectPath,bytes,{contentType:"application/pdf",upsert:false});
    if(uploaded.error) {await access.service.rpc("cancel_referral_agreement_upload",{p_owner:access.user.id,p_referral:id,p_path:objectPath});throw uploaded.error;}
    const recorded=await access.service.rpc("complete_referral_agreement_upload",{p_owner:access.user.id,p_referral:id,p_path:objectPath,p_hash:createHash("sha256").update(bytes).digest("hex")});
    if(recorded.error) {await access.service.storage.from(bucket).remove([objectPath]);await access.service.rpc("cancel_referral_agreement_upload",{p_owner:access.user.id,p_referral:id,p_path:objectPath});throw recorded.error;}
    return response({status:"uploaded_awaiting_review",uploadedAt:recorded.data},201);
  }catch{return response({error:"Signed agreement could not be recorded. Refresh before retrying."},503);}
}
