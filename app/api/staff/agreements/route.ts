import {staffAgreementsEnabled,staffAgreementRequest} from '@/lib/server/staff-agreements';
import {response} from '@/lib/server/referrals';
import {sameOrigin} from '@/lib/request-origin';
import {parseAgreementAction,parseContractEvidence} from '@/lib/staff-agreements';
import {boundedBody,MAX_SIGNED_PDF_BYTES,validateSignedPdf} from '@/lib/referrals/agreement';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!staffAgreementsEnabled())return response({error:'Agreement review is not connected yet.'},503);
 if(!sameOrigin(request))return response({error:'Invalid request origin.'},403);
 const token=request.headers.get('authorization');if(!token?.startsWith('Bearer ')||token.length>8192)return response({error:'Staff sign-in required.'},401);
 const type=request.headers.get('content-type')||'';
 if(type.startsWith('multipart/form-data')){
  let body;try{body=await boundedBody(request,MAX_SIGNED_PDF_BYTES+16384);}catch{return response({error:'Maximum PDF size is 3 MB.'},413);}
  try{
   const form=await new Response(body,{headers:{'Content-Type':type}}).formData();
   const evidence=parseContractEvidence(JSON.parse(String(form.get('evidence')))),file=form.get('file');
   if(!evidence||!(file instanceof File)||file.type!=='application/pdf'||file.size>MAX_SIGNED_PDF_BYTES)return response({error:'Check the signed PDF, date, school version and review declaration.'},400);
   const bytes=new Uint8Array(await file.arrayBuffer());if(!validateSignedPdf(bytes))return response({error:'A plain signed PDF without attachments or active content is required.'},400);
   return staffAgreementRequest(token,bytes,{'Content-Type':'application/pdf','x-forge-evidence':encodeURIComponent(JSON.stringify(evidence))},true);
  }catch{return response({error:'Invalid contract evidence.'},400);}
 }
 let input;try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,4096)));}catch{return response({error:'Invalid request.'},400);}
 const payload=parseAgreementAction(input?.action,input?.payload??{});if(!payload)return response({error:'Invalid document review request.'},400);
 return staffAgreementRequest(token,JSON.stringify({action:input.action,payload}));
}
