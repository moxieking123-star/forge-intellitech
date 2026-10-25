"use client";
import {createClient,type SupabaseClient} from "@supabase/supabase-js";
import {referralSessionCallback} from "./signin";
let pending:Promise<{client:SupabaseClient;emailLoginEnabled:boolean}>|null=null;
let callback:ReturnType<typeof referralSessionCallback>=null;
export function referralAuth(){
 if(!pending){
 const incoming=referralSessionCallback(window.location.href);
 if(incoming){
  callback=incoming;
  // A new email sign-in must never fall back to an older referrer's cached account.
  for(const key of ["forge-referrer-preview","forge-referrer-preview-user","forge-referrer-preview-code-verifier"])window.sessionStorage.removeItem(key);
 }
 // Keep credentials in memory only, including across a transient connection retry.
 if(callback)window.history.replaceState(window.history.state,"",callback.cleanUrl);
 pending=fetch("/api/referrals/config",{cache:"no-store"}).then(async res=>{
  const config=await res.json();if(!res.ok)throw new Error(config.error||"Referral sign-in is unavailable.");
  const client=createClient(config.url,config.key,{auth:{storage:window.sessionStorage,storageKey:"forge-referrer-preview",detectSessionInUrl:false}});
  if(callback){
   const {data,error}=await client.auth.setSession(callback.session);
   if(error||!data.session){await client.auth.stopAutoRefresh();throw new Error("This sign-in link could not be verified. Request a new link.");}
   callback=null;
  }
  return {client,emailLoginEnabled:config.emailLoginEnabled===true};
 }).catch(error=>{pending=null;throw error;});
 }
 return pending;
}
