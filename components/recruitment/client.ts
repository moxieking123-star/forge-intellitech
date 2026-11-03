'use client';
import {createClient,type SupabaseClient} from '@supabase/supabase-js';
import {referralSessionCallback,referralSignInFailure} from '@/lib/referrals/signin';
import {trainingPath} from '@/lib/recruitment/paths';
import {completeRecruitmentSignIn} from '@/lib/recruitment/client-recovery';
let pending:Promise<{client:SupabaseClient;emailLoginEnabled:boolean;signInError:string|null}>|null=null;
let callback:ReturnType<typeof referralSessionCallback>=null;
export function recruitmentAuth(){
 if(!pending){
  const failure=referralSignInFailure(window.location.href);
  if(failure){window.history.replaceState(window.history.state,'',failure.cleanUrl);}
  const incoming=referralSessionCallback(window.location.href);
  if(incoming){callback=incoming;sessionStorage.removeItem('forge-recruitment');window.history.replaceState(window.history.state,'',incoming.cleanUrl);}
  pending=fetch(trainingPath('/api/recruitment/config'),{cache:'no-store'}).then(async res=>{
   const config=await res.json();if(!res.ok)throw Error('Secure sign-in is not available yet.');
   const client=createClient(config.url,config.key,{auth:{storage:window.sessionStorage,storageKey:'forge-recruitment',detectSessionInUrl:false}});
   const incomingCallback=callback;callback=null;
   const signInError=await completeRecruitmentSignIn(failure,incomingCallback,session=>client.auth.setSession(session));
   return {client,emailLoginEnabled:config.emailLoginEnabled===true,signInError};
  }).catch(error=>{pending=null;throw error;});
 }
 return pending;
}
