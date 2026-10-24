"use client";
import {useEffect,useState} from "react";
import {createClient,type SupabaseClient,type Session} from "@supabase/supabase-js";
import {reviewStatuses} from "@/lib/school-review";
import s from "./SchoolReview.module.css";
import Link from "next/link";
import {useRouter} from "next/navigation";
import ReferralFinance from "./ReferralFinance";
import NotificationReviews from "./NotificationReviews";
import ParticipationReviews from "./ParticipationReviews";
import FeedbackReviews from "./FeedbackReviews";
import AgreementReviews from "./AgreementReviews";
type Row={id:string;school_name:string;status:string;version:number;created_at:string;payload:Record<string,string|number|boolean|null>;notification_status:string;referral_id:string|null;submitted_by_referrer:string|null;history:{previousStatus:string;nextStatus:string;note:string;createdAt:string}[]};
export default function SchoolReview({feedback=false,agreements=false,finance=false,enquiries=false,notifications=false}:{feedback?:boolean;agreements?:boolean;finance?:boolean;enquiries?:boolean;notifications?:boolean}){
 const router=useRouter();
 const destination=notifications?"/admin/notifications":finance?"/admin/finance":enquiries?"/admin/enquiries":agreements?"/admin/agreements":feedback?"/admin/feedback":"/admin";

 const [client,setClient]=useState<SupabaseClient|null>(null),[session,setSession]=useState<Session|null>(null);
 const [emailEnabled,setEmailEnabled]=useState(false),[email,setEmail]=useState(""),[code,setCode]=useState("");
 const [message,setMessage]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 const [items,setItems]=useState<Row[]>([]),[selected,setSelected]=useState<string|null>(null),[total,setTotal]=useState(0),[offset,setOffset]=useState(0),[refresh,setRefresh]=useState(0);
 const [status,setStatus]=useState("reviewing"),[note,setNote]=useState("");
 useEffect(()=>{if(!session)return;try{const raw=localStorage.getItem("forge-staff-return");if(!raw)return;localStorage.removeItem("forge-staff-return");const next=JSON.parse(raw);if(["/admin","/admin/feedback","/admin/agreements","/admin/finance","/admin/enquiries","/admin/notifications"].includes(next.path)&&Number.isFinite(next.expires)&&next.expires>Date.now()&&next.path!==destination)router.replace(next.path);}catch{/* Ignore invalid navigation preferences. */}},[session,destination,router]);
 useEffect(()=>{
  let active=true,unsubscribe=()=>{};
  (async()=>{try{
   const res=await fetch('/api/staff/config',{cache:'no-store'}),config=await res.json();if(!res.ok)throw new Error(config.error);
   if(!active)return;
   const auth=createClient(config.url,config.key,{auth:{storage:window.sessionStorage,storageKey:'forge-staff-preview',detectSessionInUrl:true}});
   setClient(auth);setEmailEnabled(config.emailLoginEnabled);
   const {data}=auth.auth.onAuthStateChange((_event,next)=>{if(active){setSession(next);setItems([]);setSelected(null);setTotal(0);}});unsubscribe=()=>data.subscription.unsubscribe();
   const {data:current}=await auth.auth.getSession();if(active)setSession(current.session);
  }catch(err){if(active)setError(err instanceof Error?err.message:'Staff sign-in is being connected.');}})();
  return()=>{active=false;unsubscribe();};
 },[]);
 useEffect(()=>{
  if(!session||feedback||agreements||finance||enquiries||notifications)return;
  const controller=new AbortController();
  setError('');setBusy(true);setItems([]);setSelected(null);setTotal(0);
  fetch('/api/staff/schools',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({action:'list',payload:{offset}}),signal:controller.signal})
   .then(async res=>{const body=await res.json();if(!res.ok)throw new Error(body.error);if(!controller.signal.aborted){setItems(body.items);setTotal(body.total);}})
   .catch(err=>{if(!controller.signal.aborted)setError(err.message||'Unable to load requests.');})
   .finally(()=>{if(!controller.signal.aborted)setBusy(false);});
  return()=>controller.abort();
 },[session,offset,refresh,feedback,agreements,finance,enquiries,notifications]);
 async function login(e:React.FormEvent){e.preventDefault();if(!client||!emailEnabled||busy)return;setBusy(true);setError('');setMessage('');
  try{if(!code)localStorage.setItem("forge-staff-return",JSON.stringify({path:destination,expires:Date.now()+15*60*1000}));const result=code?await client.auth.verifyOtp({email:email.trim(),token:code.trim(),type:'email'}):await client.auth.signInWithOtp({email:email.trim(),options:{shouldCreateUser:false,emailRedirectTo:window.location.origin+'/admin/feedback'}});if(result.error)throw result.error;setMessage(code?'Signed in.':'If this is a provisioned staff account, check your email for your sign-in link or code.');}
  catch{setError('Unable to sign in. Check your details or ask the administrator to verify email setup.');}finally{setBusy(false);}
 }
 async function update(e:React.FormEvent){e.preventDefault();const row=items.find(r=>r.id===selected);if(!session||!row||busy)return;setBusy(true);setError('');setMessage('');
  try{const res=await fetch('/api/staff/schools',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({action:'update',payload:{id:row.id,version:row.version,status,note}})});const result=await res.json();if(!res.ok)throw new Error(result.error);setNote('');setMessage('Review saved with an audit record.');setRefresh(n=>n+1);}
  catch(err){setError(err instanceof Error?err.message:'Review was not saved.');}finally{setBusy(false);}
 }
 const current=items.find(r=>r.id===selected);
 return <div className={s.root}><header><p className={s.eyebrow}>Forge / Private staff workspace</p><h1>{notifications?"Email delivery.":finance?"Referral finance.":enquiries?"Community enquiries.":agreements?"Agreement review.":feedback?"Tester feedback.":"School onboarding."}</h1><p>{notifications?"Keep delivery visible, accountable and safe to retry.":finance?"Record what was earned, explain every deduction and verify payment.":enquiries?"Give every person who reaches out a clear next step.":agreements?"Keep signed evidence and decisions clear.":feedback?"Listen to the people helping us forge this.":"Review school requests and keep the next step clear."}</p><nav aria-label="Staff workspace"><Link href="/admin">School onboarding</Link> / <Link href="/admin/feedback">Tester feedback</Link> / <Link href="/admin/agreements">Agreements</Link> / <Link href="/admin/finance">Referral finance</Link> / <Link href="/admin/enquiries">Enquiries</Link> / <Link href="/admin/notifications">Email delivery</Link></nav></header>
  {error&&<p role="alert" className={s.error}>{error}</p>}{message&&<p role="status" className={s.message}>{message}</p>}
  {!session?<section className={s.login}><h2>Staff sign-in</h2><p>Only authorised, verified staff accounts can open private records.</p>
   {!emailEnabled&&<p className={s.notice}>Email sign-in is awaiting secure mail configuration. No private records are shown before sign-in.</p>}
   <form onSubmit={login}><label htmlFor="staff-email">Staff email</label><input id="staff-email" type="email" autoComplete="email" value={email} required onChange={e=>setEmail(e.target.value)}/><label htmlFor="staff-code">Email code (if your email includes one)</label><input id="staff-code" autoComplete="one-time-code" inputMode="numeric" value={code} onChange={e=>setCode(e.target.value)} maxLength={12}/><button disabled={!client||!emailEnabled||busy}>{busy?'Please wait…':code?'Verify code':'Email sign-in link'}</button></form></section>:
  <><div className={s.toolbar}><p>Signed in: {session.user.email}</p>{!feedback&&!agreements&&!finance&&!enquiries&&!notifications&&<button disabled={busy} onClick={()=>setRefresh(n=>n+1)}>Refresh</button>}<button onClick={async()=>{setItems([]);setSelected(null);setSession(null);setMessage('');setError('');await client?.auth.signOut({scope:'local'});}}>Sign out</button></div>
   {notifications?<NotificationReviews key={session.user.id} token={session.access_token}/>:finance?<ReferralFinance key={session.user.id} token={session.access_token}/>:enquiries?<ParticipationReviews key={session.user.id} token={session.access_token}/>:agreements?<AgreementReviews key={session.user.id} token={session.access_token}/>:feedback?<FeedbackReviews key={session.user.id} token={session.access_token}/>:<><p aria-live="polite">{busy?'Loading…':`${total} school request${total===1?'':'s'}`}</p><div className={s.workspace}><section aria-label="School requests"><h2>Review queue</h2>{!busy&&!items.length&&<p>No requests available on this page.</p>}
    <ul className={s.list}>{items.map(row=><li key={row.id}><button aria-pressed={selected===row.id} onClick={()=>{setSelected(row.id);setStatus(reviewStatuses.includes(row.status as typeof reviewStatuses[number])?row.status:'reviewing');setNote('');}}><strong>{row.school_name}</strong><span>{String(row.payload.location)} · {row.status.replaceAll('_',' ')}</span><small>{new Date(row.created_at).toLocaleDateString('en-NG',{timeZone:'Africa/Lagos'})}</small></button></li>)}</ul>
    <div className={s.toolbar}><button disabled={!offset||busy} onClick={()=>setOffset(n=>Math.max(0,n-50))}>Previous</button><button disabled={offset+50>=total||busy} onClick={()=>setOffset(n=>n+50)}>Next</button></div>
   </section><section aria-label="Request details"><h2>{current?current.school_name:'Select a school'}</h2>{current&&<><p className={s.reference}>Reference: {current.id}</p><dl>{[['Contact',current.payload.name],['Email',current.payload.email],['Phone',current.payload.phone],['Role',current.payload.role],['Location',current.payload.location],['School level',current.payload.level],['Learners',current.payload.learnerCount],['Preferred start',current.payload.startPeriod],['Devices and connectivity',current.payload.context],['Additional note',current.payload.note],['Submission',current.submitted_by_referrer?'Authorised referrer':'School'],['Referral',current.referral_id?'Linked':'None'],['Email notification',current.notification_status||'Not queued']].map(([label,value])=><div key={String(label)}><dt>{label}</dt><dd>{String(value??'—')||'—'}</dd></div>)}</dl>
    {reviewStatuses.includes(current.status as typeof reviewStatuses[number])?<form onSubmit={update}><label htmlFor="school-review-status">Next review status</label><select id="school-review-status" value={status} onChange={e=>setStatus(e.target.value)}>{reviewStatuses.map(x=><option key={x} value={x}>{x.replaceAll('_',' ')}</option>)}</select><label htmlFor="school-review-note">Reason / follow-up note</label><textarea id="school-review-note" required maxLength={1000} rows={3} value={note} onChange={e=>setNote(e.target.value)}/><button disabled={busy||!note.trim()}>Save review</button><p className={s.notice}>Acceptance and teaching start require the separate contract workflow. Updating this review does not activate a programme or approve commission.</p></form>:<p>Contract workflow in progress. Early review changes are locked.</p>}
    <h3>Review history</h3>{current.history.length?current.history.map((h,i)=><p key={h.createdAt+i}>{h.previousStatus.replaceAll('_',' ')} → {h.nextStatus.replaceAll('_',' ')}<br/>{h.note}<br/><small>{new Date(h.createdAt).toLocaleString('en-NG',{timeZone:'Africa/Lagos'})}</small></p>):<p>No staff changes yet.</p>}
   </>}</section></div></>}</>}
 </div>;
}
