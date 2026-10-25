import {backendEnvironmentEnabled,backendPublishableKey} from "@/lib/backend-runtime";
import 'server-only';
import {response} from './referrals';
export const staffAgreementsEnabled=()=>backendEnvironmentEnabled()&&process.env.SCHOOL_BACKEND_ENABLED==='true'&&process.env.STAFF_AGREEMENTS_ENABLED==='true';
export async function staffAgreementRequest(token:string,body:string|Uint8Array,extra:Record<string,string>={},upload=false){
 const key=backendPublishableKey();
 if(!staffAgreementsEnabled()||!key)return response({error:'Agreement review is not connected yet.'},503);
 try{
  const res=await fetch('https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-staff-agreements'+(upload?'?action=contract_upload':''),{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'x-forge-user-token':token.slice(7),'Content-Type':'application/json',...extra},body:body as BodyInit,cache:'no-store',signal:AbortSignal.timeout(40000)});
  if(res.ok&&res.headers.get('content-type')?.startsWith('application/pdf'))return new Response(res.body,{status:200,headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="forge-private-document.pdf"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
  return response(await res.json(),res.status);
 }catch{return response({error:'Could not confirm document review. Refresh before retrying.'},503);}
}
