import {backendEnvironmentEnabled,backendPublishableKey} from "@/lib/backend-runtime";
import 'server-only';
import type {ProposalRequest} from '@/lib/school-proposal';
export async function queueProposal(details:ProposalRequest) {
 const key=backendPublishableKey();
 if(!backendEnvironmentEnabled()||!key)throw new Error('Proposal storage unavailable');
 const response=await fetch('https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-proposal-intake',{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({...details,consent:'yes'}),cache:'no-store',signal:AbortSignal.timeout(12000)});
 const data=await response.json();if(!response.ok||!data.id)throw new Error('Proposal storage unavailable');return data.id as string;
}
