'use client';
import {createClient,type SupabaseClient} from '@supabase/supabase-js';
import {referralSessionCallback,referralSignInFailure} from '@/lib/referrals/signin';
let pending:Promise<{client:SupabaseClient;emailLoginEnabled:boolean}>|null=null;
let callback:ReturnType<typeof referralSessionCallback>=null;
export function recruitmentAuth(){
 if(!pending){
  const failure=referralSignInFailure(window.location.href);
  if(failure){window.history.replaceState(window.history.state,'',failure.cleanUrl);return Promise.reject(Error(failure.message));}
  const incoming=referralSessionCallback(window.location.href);
  if(incoming){callback=incoming;sessionStorage.removeItem('forge-recruitment');window.history.replaceState(window.history.state,'',incoming.cleanUrl);}
  pending=fetch('/api/recruitment/config',{cache:'no-store'}).then(async res=>{
   const config=await res.json();if(!res.ok)throw Error('Secure sign-in is not available yet.');
   const client=createClient(config.url,config.key,{auth:{storage:window.sessionStorage,storageKey:'forge-recruitment',detectSessionInUrl:false}});
   if(callback){const {error}=await client.auth.setSession(callback.session);if(error)throw Error('This sign-in link could not be verified. Please request another.');callback=null;}
   return {client,emailLoginEnabled:config.emailLoginEnabled===true};
  }).catch(error=>{pending=null;throw error;});
 }
 return pending;
}
