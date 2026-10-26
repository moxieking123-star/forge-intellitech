"use client";
import {createClient,type SupabaseClient} from "@supabase/supabase-js";
let pending:Promise<{client:SupabaseClient;emailLoginEnabled:boolean}>|null=null;
export function referralAuth(){
 if(!pending)pending=fetch("/api/referrals/config",{cache:"no-store"}).then(async res=>{
  const config=await res.json();if(!res.ok)throw new Error(config.error||"Referral sign-in is unavailable.");
  return {client:createClient(config.url,config.key,{auth:{storage:window.sessionStorage,storageKey:"forge-referrer-preview",detectSessionInUrl:true}}),emailLoginEnabled:config.emailLoginEnabled===true};
 }).catch(error=>{pending=null;throw error;});
 return pending;
}
