'use client';
import {useEffect,useRef,useState,type FormEvent} from 'react';
import s from './SchoolReview.module.css';
type Row={id:string;email:string;payload:Record<string,string|boolean>;status:string;version:number;used:number;attempt_allowance:number;created_at:string;attempts:{id:string;status:string;correct:number|null;startedAt:string}[];resets:{reason:string;createdAt:string;previousAllowance:number;nextAllowance:number}[]};
const initial={status:'all',search:'',offset:0};
const statuses=['all','never_started','in_progress','abandoned','expired','not_passed','passed','review_required'];
const date=(value:string)=>new Date(value).toLocaleString('en-NG',{timeZone:'Africa/Lagos'});
export default function RecruitmentReviews({token}:{token:string}){
 const [draft,setDraft]=useState(initial),[filters,setFilters]=useState(initial),[refresh,setRefresh]=useState(0);
 const [data,setData]=useState<{items:Row[];total:number}|null>(null),[selected,setSelected]=useState<string|null>(null),[reason,setReason]=useState('');
 const [busy,setBusy]=useState(false),[saving,setSaving]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 const resetKey=useRef<string|null>(null);
 useEffect(()=>{const controller=new AbortController();setBusy(true);setError('');setData(null);
  fetch('/api/staff/recruitment',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({action:'list',filters}),signal:controller.signal})
  .then(async response=>{const result=await response.json();if(!response.ok)throw Error(result.error||'Applications could not be loaded.');if(!controller.signal.aborted)setData(result);})
  .catch(err=>{if(!controller.signal.aborted)setError(err.message);}).finally(()=>{if(!controller.signal.aborted)setBusy(false);});
  return()=>controller.abort();
 },[token,filters,refresh]);
 const current=data?.items.find(row=>row.id===selected);
 async function reset(event:FormEvent){event.preventDefault();if(!current||saving)return;setSaving(true);setError('');setMessage('');
  if(!resetKey.current)resetKey.current=crypto.randomUUID();
  try{const response=await fetch('/api/staff/recruitment',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({action:'reset',id:current.id,version:current.version,requestId:resetKey.current,reason})});const result=await response.json();if(!response.ok)throw Error(result.error||'Reset could not be confirmed.');setMessage('Three additional attempts granted. Previous attempts and your reason remain in the audit history.');setReason('');resetKey.current=null;setRefresh(value=>value+1);}
  catch(err){setError(err instanceof Error?err.message:'Reset could not be confirmed.');}finally{setSaving(false);}
 }
 return <section aria-label="Instructor recruitment review">
  <p>Follow up with people who could not finish, read their introduction and review assessment history. A reset grants three more attempts and preserves every earlier result.</p>
  <form className={s.toolbar} onSubmit={event=>{event.preventDefault();setSelected(null);setFilters({...draft,offset:0});}}>
   <label>Assessment status<select value={draft.status} onChange={event=>setDraft(old=>({...old,status:event.target.value}))}>{statuses.map(status=><option key={status} value={status}>{status.replaceAll('_',' ')}</option>)}</select></label>
   <label>Find by name, email or location<input type="search" maxLength={100} value={draft.search} onChange={event=>setDraft(old=>({...old,search:event.target.value}))}/></label>
   <button disabled={busy||saving}>Apply filters</button><button type="button" disabled={busy||saving} onClick={()=>{setDraft(initial);setFilters(initial);setSelected(null);}}>Clear filters</button><button type="button" disabled={busy||saving} onClick={()=>setRefresh(value=>value+1)}>Reload applications</button>
  </form>
  {error&&<p role="alert" className={s.error}>{error}</p>}{message&&<p role="status" className={s.message}>{message}</p>}
  <p role="status">{busy?'Loading applications…':`${data?.total??0} matching applications`}</p>
  <div className={s.workspace}><section aria-label="Applications"><h2>People behind the applications</h2>{data&&!data.items.length&&<p>No applications match these filters.</p>}<ul className={s.list}>{data?.items.map(row=><li key={row.id}><button aria-pressed={selected===row.id} disabled={saving} onClick={()=>{setSelected(row.id);setReason('');resetKey.current=null;setMessage('');}}><strong>{String(row.payload.name||row.email)}</strong><span>{row.status.replaceAll('_',' ')} · {row.used}/{row.attempt_allowance} attempts</span><small>{row.email}</small></button></li>)}</ul><div className={s.toolbar}><button disabled={busy||saving||!filters.offset} onClick={()=>setFilters(old=>({...old,offset:Math.max(0,old.offset-25)}))}>Previous applications</button><button disabled={busy||saving||!data||filters.offset+25>=data.total} onClick={()=>setFilters(old=>({...old,offset:old.offset+25}))}>Next applications</button></div></section>
   <section aria-label="Applicant details"><h2>{current?String(current.payload.name||current.email):'Select an applicant'}</h2>{current&&<>
    <dl>{[['Email',current.email],['Phone',current.payload.phone],['Location',current.payload.location],['Experience',current.payload.experience],['Skills',current.payload.skills],['Availability',current.payload.availability],['Motivation',current.payload.motivation]].map(([label,value])=><div key={String(label)}><dt>{label}</dt><dd>{String(value??'Not provided')}</dd></div>)}</dl>
    <h3>Assessment history</h3>{current.attempts.length?<ol>{current.attempts.map((item,i)=><li key={item.id}>Attempt {i+1}: {item.status.replaceAll('_',' ')}{item.correct!==null?` · ${item.correct}/30`:''}<br/><small>{date(item.startedAt)}</small></li>)}</ol>:<p>The assessment has not been started.</p>}
    {current.status==='review_required'&&<form onSubmit={reset}><label htmlFor="recruitment-reset-reason">Reason for another three attempts</label><textarea id="recruitment-reset-reason" required minLength={20} maxLength={1000} rows={4} value={reason} onChange={event=>{setReason(event.target.value);resetKey.current=null;}}/><p className={s.notice}>Record the conversation or technical issue. This action does not change scores, confirm employment or erase history.</p><button disabled={saving||reason.trim().length<20}>{saving?'Recording reset…':'Grant three additional attempts'}</button></form>}
    <h3>Reset history</h3>{current.resets.length?current.resets.map((item,i)=><p key={item.createdAt+i}>{item.reason}<br/>{item.previousAllowance} → {item.nextAllowance} allowed attempts · {date(item.createdAt)}</p>):<p>No staff resets recorded.</p>}
   </>}</section>
  </div>
 </section>;
}
