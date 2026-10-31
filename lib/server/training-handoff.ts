import 'server-only';
import {createClient} from '@supabase/supabase-js';
import {createTrainingHandoff} from '../recruitment/handoff';
import {trainingBridgeDestination} from '../recruitment/bridge-config';
import {sendProvisionEnvelope} from '../recruitment/transport';
async function measured<T>(stage:string,work:()=>PromiseLike<T>):Promise<T>{
 const started=Date.now();
 try{const value=await work();if(process.env.NODE_ENV==='development')console.info('[training-pilot]',JSON.stringify({stage,elapsedMs:Date.now()-started,completed:true}));return value;}
 catch(error){
  const name=error instanceof Error?error.name:'Unknown';
  const cause=error instanceof Error&&error.cause&&typeof error.cause==='object'&&'code' in error.cause?String(error.cause.code):'';
  const code=/^[A-Z0-9_]{1,80}$/.test(cause)?cause:undefined;
  const known=error instanceof Error&&['Training bridge unavailable','Invalid training redirect','Untrusted training redirect','Too many training redirects'].includes(error.message)?error.message:undefined;
  if(process.env.NODE_ENV==='development')console.info('[training-pilot]',JSON.stringify({stage,elapsedMs:Date.now()-started,completed:false,errorType:name,code,reason:known}));throw error;
 }
}
function backend(signal:AbortSignal){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw Error('Training unavailable');
 return createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false},global:{fetch:(input,init)=>fetch(input,{...init,signal:init?.signal?AbortSignal.any([signal,init.signal]):signal})}});
}
export const trainingHandoff=createTrainingHandoff({
 enabled:process.env.TRAINING_SIGN_IN_ENABLED==='true',secret:process.env.TRAINING_BRIDGE_SIGNING_KEY||'',
 async verify(token,signal){
  const {data,error}=await measured('identity',()=>backend(signal).auth.getUser(token));
  if(error){if(error.status===401||error.status===403)return null;throw Error('Training connection unavailable');}
  if(!data.user)return null;
  return {id:data.user.id,email:data.user.email,emailConfirmedAt:data.user.email_confirmed_at};
 },
 async lookup(owner,signal){
  const {data,error}=await measured('profile',()=>backend(signal).rpc('forge_recruitment_training_identity',{p_owner:owner}));
  if(error)throw Error('Training unavailable');return data;
 },
 async exchange(envelope,signal){
  const destination=trainingBridgeDestination(process.env.TRAINING_BRIDGE_URL);
  if(!destination)throw Error('Training unavailable');
  return measured('google-session',()=>sendProvisionEnvelope(destination,envelope,fetch,signal));
 }
});
