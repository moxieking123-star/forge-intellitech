'use client';
import {useEffect,useRef,useState,type FormEvent} from 'react';
import type {SupabaseClient,Session} from '@supabase/supabase-js';
import {recruitmentAuth} from './client';
import s from './Recruitment.module.css';
import TrainingPathways from './TrainingPathways';

type Entry={token:string;traineeId:string;access:'trainee';expiresAt:number};
export default function TrainingEntry(){
 const [client,setClient]=useState<SupabaseClient|null>(null),[session,setSession]=useState<Session|null>(null),[ready,setReady]=useState(false),[emailEnabled,setEmailEnabled]=useState(false);
 const [email,setEmail]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState(''),[entry,setEntry]=useState<{traineeId:string;expiresAt:number}|null>(null);
 // A separate trainee bearer is kept in memory only; never URL or web storage.
 const credential=useRef<Entry|null>(null),identity=useRef<string|null>(null),mounted=useRef(true);
 useEffect(()=>{let active=true,unsubscribe=()=>{};mounted.current=true;
  recruitmentAuth().then(async auth=>{if(!active)return;setClient(auth.client);setEmailEnabled(auth.emailLoginEnabled);
   const {data}=auth.client.auth.onAuthStateChange((_event,next)=>{if(!active)return;credential.current=null;setEntry(null);identity.current=next?.user.id??null;setSession(next);setReady(true);});unsubscribe=()=>data.subscription.unsubscribe();
   const {data:current,error:failure}=await auth.client.auth.getSession();if(failure)throw failure;
   if(active){identity.current=current.session?.user.id??null;setSession(current.session);setReady(true);}
  }).catch(()=>{if(active){setError('Secure sign-in could not connect. Please reload and try again.');setReady(true);}});
  return()=>{active=false;mounted.current=false;credential.current=null;unsubscribe();};
 },[]);
 useEffect(()=>{if(!entry)return;const timer=setTimeout(()=>{credential.current=null;setEntry(null);setNotice('Your training session has ended. Open your entry again to continue.');},Math.max(0,entry.expiresAt-Date.now()));return()=>clearTimeout(timer);},[entry]);
 async function signIn(event:FormEvent){event.preventDefault();if(!client||!emailEnabled||busy)return;setBusy(true);setError('');setNotice('');
  try{const {error:failure}=await client.auth.signInWithOtp({email:email.trim(),options:{shouldCreateUser:false,emailRedirectTo:window.location.origin+'/join/training'}});if(failure)throw failure;setNotice('If this email has an applicant account, a secure sign-in link is on its way. Use your application email.');}catch{setError('We could not send the sign-in email. Please try again later.');}finally{if(mounted.current)setBusy(false);}
 }
 async function open(){if(!client||busy)return;setBusy(true);setError('');setNotice('');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
  const expired=new Promise<never>((_resolve,reject)=>controller.signal.addEventListener('abort',()=>reject(Error('The training connection took too long. Your email sign-in is kept; please try again.')),{once:true}));
  // Auth state already supplies the token; the server verifies it authoritatively.
  // A second getSession here can wait on the refresh lock before fetch even starts.
  try{if(!session)throw Error('Please sign in again with a fresh email link.');const owner=session.user.id;
   const response=await Promise.race([fetch('/api/recruitment/handoff',{method:'POST',cache:'no-store',signal:controller.signal,headers:{'Content-Type':'application/json',Authorization:'Bearer '+session.access_token},body:'{}'}),expired]);const value=await Promise.race([response.json(),expired]);
   if(!mounted.current||identity.current!==owner)return;
   if(!response.ok)throw Error(value.error||'Training access is being prepared.');
   if(!value||value.access!=='trainee'||typeof value.traineeId!=='string'||!/^TRN-[A-Za-z0-9_-]{1,90}$/.test(value.traineeId)||typeof value.token!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(value.token)||!Number.isSafeInteger(value.expiresAt)||value.expiresAt<=Date.now()||value.expiresAt>Date.now()+7200000)throw Error();
   credential.current=value;setEntry({traineeId:value.traineeId,expiresAt:value.expiresAt});
  }catch(failure){if(mounted.current){credential.current=null;setEntry(null);setError(controller.signal.aborted?'The training connection took too long. Your email sign-in is kept; please try again.':failure instanceof Error&&failure.message?failure.message:'Training access could not be confirmed. Please try again.');}}finally{clearTimeout(timer);if(mounted.current)setBusy(false);}
 }
 async function signOut(){credential.current=null;setEntry(null);setError('');setNotice('');if(client){setBusy(true);const {error:failure}=await client.auth.signOut({scope:'local'});if(failure)setError('Sign-out could not finish. Close this tab and try again.');else{identity.current=null;setSession(null);}setBusy(false);}}
 return <div className={s.page}><div className={s.shell}>
  <header className={s.hero}><p className={s.kicker}>Forge · Instructor preparation</p><h1>{entry?<>A beginning worth<br/><em>building on.</em></>:<>Your next chapter<br/>starts with <em>learning.</em></>}</h1><p>A child’s opportunity to create begins with people willing to keep learning. This is where we prepare for that responsibility, together.</p></header>
  {!ready&&<p role="status">Connecting secure sign-in…</p>}
  {error&&<p className={s.notice} role="alert">{error}</p>}{notice&&<p className={s.notice} role="status">{notice}</p>}
  {ready&&session&&<div className={s.account}><p>Signed in as <strong>{session.user.email}</strong></p><button className={s.secondary} disabled={busy} onClick={signOut}>Sign out</button></div>}
  {ready&&!session&&<section className={s.card}><h2>Use your application email.</h2><p>Passing the assessment opens the way to training. We confirm your profile before granting access.</p><form className={s.form} onSubmit={signIn}><label>Email address<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254}/></label><button className={s.primary} disabled={busy||!emailEnabled}>{busy?'Sending…':'Email my sign-in link'}</button></form>{!emailEnabled&&<p>Email sign-in is being prepared for the private pilot.</p>}</section>}
  {ready&&session&&!entry&&<section className={s.card}><h2>Let’s find your training profile.</h2><p>Your verified application and assessment must match a confirmed trainee profile. Signing in does not grant staff access.</p><button className={s.primary} disabled={busy} onClick={open}>{busy?'Checking your profile…':'Open my training entry'}</button>{busy&&<p role="status">Checking your secure training connection. This check stops within 30 seconds; you won’t need to submit your details again.</p>}</section>}
  {entry&&<><p className={s.notice} role="status">Trainee entry confirmed · {entry.traineeId}. Explore a preparation pathway below.</p><TrainingPathways/></>}
  <p className={s.small}>Instructor preparation is not an offer of employment. School access and placement require Forge’s review. Need help? <a href="mailto:work@forgeintellitech.com">work@forgeintellitech.com</a></p>
 </div></div>;
}
