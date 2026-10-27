import {backendEnvironmentEnabled,backendPublishableKey} from "@/lib/backend-runtime";
import "server-only";
import {response} from "./referrals";
export function referralBackendEnabled(){return backendEnvironmentEnabled()&&process.env.REFERRAL_BACKEND_ENABLED==="true";}
export async function referralBackendFetch(request:Request,action:string,payload:unknown={},bytes?:Uint8Array){
 const key=backendPublishableKey(),auth=request.headers.get("authorization");
 if(!referralBackendEnabled()||!key)return response({error:"Referral services are being connected."},503);
 if(!auth?.startsWith("Bearer ")||auth.length>8192)return response({error:"Please sign in with a confirmed email."},401);
 try{
  const headers:Record<string,string>={apikey:key,Authorization:`Bearer ${key}`,"x-forge-user-token":auth.slice(7)};
  let url="https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-referral-backend",body:BodyInit;
  if(bytes){const p=payload as {referralId:string;version:string};url+=`?action=upload&referralId=${encodeURIComponent(p.referralId)}&version=${encodeURIComponent(p.version)}`;headers["Content-Type"]="application/pdf";headers["x-forge-signed-declaration"]="true";body=new Blob([Uint8Array.from(bytes)]);}
  else {headers["Content-Type"]="application/json";body=JSON.stringify({action,payload});}
  const res=await fetch(url,{method:"POST",headers,body,cache:"no-store",signal:AbortSignal.timeout(bytes?25000:12000)});
  return response(await res.json(),res.status);
 }catch{return response({error:"We could not confirm the request. Refresh your records before trying again."},503);}
}
