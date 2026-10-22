import { schoolBackend,schoolBackendEnabled } from "@/lib/server/school-backend";
import { response } from "@/lib/server/referrals";
import { sameOrigin } from "@/lib/request-origin";
import { boundedBody } from "@/lib/referrals/agreement";
import { parseSchoolReview } from "@/lib/school-review";
export async function POST(request: Request) {
  if(!schoolBackendEnabled())return response({error:"Staff review is not connected yet."},503);
  if(!sameOrigin(request))return response({error:"Invalid request origin."},403);
  const authorization=request.headers.get("authorization");
  if(!authorization?.startsWith("Bearer "))return response({error:"Staff sign-in required."},401);
  let input;
  try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,8192)));}catch{return response({error:"Invalid request."},400);}
  if(input?.action==="update"){
    const review=parseSchoolReview(input.payload);
    if(!review)return response({error:"Choose a review status and provide a short reason."},400);
    return schoolBackend("update",review,authorization);
  }
  const offset=input?.payload?.offset??0;
  if(input?.action!=="list"||!Number.isSafeInteger(offset)||offset<0||offset>10000)return response({error:"Invalid request."},400);
  return schoolBackend("list",{offset},authorization);
}
