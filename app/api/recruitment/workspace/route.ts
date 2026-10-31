import {handleWorkspace,signWorkspace} from '@/lib/recruitment/workspace';
import {sendProvisionEnvelope} from '@/lib/recruitment/transport';
export const dynamic='force-dynamic';
export const maxDuration=30;
export function POST(request:Request){return handleWorkspace(request,{enabled:process.env.TRAINING_SIGN_IN_ENABLED==='true',exchange:(token,command)=>sendProvisionEnvelope(process.env.TRAINING_BRIDGE_URL||'',signWorkspace(process.env.TRAINING_BRIDGE_SIGNING_KEY||'',token,command),fetch,AbortSignal.timeout(25000),16384)});}
