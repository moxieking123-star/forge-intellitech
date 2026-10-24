import 'server-only';
import {response} from './referrals';
export const referralFinanceEnabled=()=>process.env.VERCEL_ENV==='preview'&&process.env.SCHOOL_BACKEND_ENABLED==='true'&&process.env.REFERRAL_FINANCE_ENABLED==='true';
export async function referralFinanceRequest(token:string,action:string,payload:Record<string,unknown>,owner=false){
 const key=process.env.PREVIEW_FEEDBACK_ANON_KEY?.trim();if(!referralFinanceEnabled()||!key)return response({error:'Referral finance is not connected yet.'},503);
 try{const res=await fetch('https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-referral-finance',{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'x-forge-user-token':token.slice(7),'Content-Type':'application/json'},body:JSON.stringify({action,payload,owner}),cache:'no-store',signal:AbortSignal.timeout(20000)});return response(await res.json(),res.status);}catch{return response({error:'Could not confirm finance result. Refresh before retrying with the same receipt.'},503);}
}
