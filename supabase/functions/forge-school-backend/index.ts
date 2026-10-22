import {validateSchool,schoolKey} from "./policy.ts";
import {parseSchoolReview} from "./school-review.ts";
Deno.serve(async(request: Request)=>{
 const reply=(data:object,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"private, no-store"}});
 if(request.method!=="POST")return reply({error:"Method not allowed."},405);
 const reader=request.body?.getReader();if(!reader)return reply({error:"Missing request."},400);
 const chunks:Uint8Array[]=[];let length=0;
 try{
  while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>20000){await reader.cancel();return reply({error:"Request too large."},413);}chunks.push(value);}
  const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const input=JSON.parse(new TextDecoder().decode(bytes));
  const url=Deno.env.get("SUPABASE_URL")!,key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  let user: {id:string;email:string;email_confirmed_at:string}|null=null;
  const requiresUser=input.action!=="submit"||input.payload?.assisted===true;
  if(requiresUser){
   const token=request.headers.get("x-forge-user-token");
   if(!token||token.length>8192)return reply({error:"Verified sign-in required."},401);
   const auth=await fetch(`${url}/auth/v1/user`,{headers:{apikey:key,Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000)});
   if(!auth.ok)return reply({error:"Your session has expired. Please sign in again."},401);
   user=await auth.json();if(!user?.id||!user.email_confirmed_at||!user.email)return reply({error:"Confirmed email required."},401);
  }
  let rpc:string,args:object;
  if(input.action==="submit"){
   const school=validateSchool(input.payload);if(!school)return reply({error:"Please check the school details and permissions."},400);
   rpc="forge_school_intake";args={p_payload:{...school,schoolKey:schoolKey(school.schoolName,school.location)},p_user_id:school.assisted?user!.id:null};
  }else if(input.action==="list"||input.action==="update"){
   let payload;
   if(input.action==="update"){payload=parseSchoolReview(input.payload);if(!payload)return reply({error:"Choose a review status and give a reason."},400);}
   else {const offset=input.payload?.offset??0;if(!Number.isSafeInteger(offset)||offset<0||offset>10000)return reply({error:"Invalid page."},400);payload={offset};}
   rpc="forge_school_staff_action";args={p_user_id:user!.id,p_verified_email:user!.email,p_action:input.action,p_payload:payload};
  }else return reply({error:"Unknown request."},400);
  const res=await fetch(`${url}/rest/v1/rpc/${rpc}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:key,Authorization:`Bearer ${key}`},body:JSON.stringify(args),signal:AbortSignal.timeout(8000)});
  const result=await res.json();
  if(!res.ok){
   if(["23505","P0001"].includes(result.code))return reply({error:"This school or referral already has a request, or the referral cannot be used. Please contact programs@forgeintellitech.com."},409);
   return reply({error:"School records are temporarily unavailable. Please try again."},503);
  }
  if(result.forbidden)return reply({error:"This account is not authorised for staff review."},403);
  if(result.conflict)return reply({error:"Another reviewer has updated this request. Refresh before making a change."},409);
  if(result.locked)return reply({error:"This request has entered the contract workflow and cannot be changed here."},409);
  if(result.missing)return reply({error:"School request not found."},404);
  if(result.limited)return reply({error:"Please wait before submitting more school requests."},429);
  return reply(result,input.action==="submit"?201:200);
 }catch{return reply({error:"Unable to process the request. Please try again."},503);}
});
