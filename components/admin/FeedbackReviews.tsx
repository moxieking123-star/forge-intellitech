"use client";
import {useEffect,useState} from 'react';
import {reactions,visitorTypes} from '@/lib/preview-feedback';
import type {ReviewFilters,ReviewRow} from '@/lib/feedback-review';
import s from './FeedbackReviews.module.css';
const initial:ReviewFilters={offset:0,page:'',section:'',reaction:'',visitor:'',search:''};
export default function FeedbackReviews({token}:{token:string}){
 const [draft,setDraft]=useState(initial),[filters,setFilters]=useState(initial),[refresh,setRefresh]=useState(0);
 const [data,setData]=useState<{items:ReviewRow[];total:number;pages:string[];sections:string[]}|null>(null);
 const [busy,setBusy]=useState(false),[exporting,setExporting]=useState(false),[error,setError]=useState('');
 useEffect(()=>{
  const controller=new AbortController();setBusy(true);setError('');setData(null);
  fetch('/api/staff/feedback',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({action:'list',filters}),signal:controller.signal})
   .then(async res=>{const body=await res.json();if(!res.ok)throw new Error(body.error||'Unable to load reviews.');if(!controller.signal.aborted)setData(body);})
   .catch(err=>{if(!controller.signal.aborted)setError(err.message);}).finally(()=>{if(!controller.signal.aborted)setBusy(false);});
  return()=>controller.abort();
 },[token,filters,refresh]);
 async function download(){
  setExporting(true);setError('');try{
   const res=await fetch('/api/staff/feedback',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({action:'export',filters:{...filters,offset:0}})});
   if(!res.ok){const body=await res.json();throw new Error(body.error||'Export unavailable.');}
   const url=URL.createObjectURL(await res.blob()),a=document.createElement('a');a.href=url;a.download=`forge-feedback-${new Date().toISOString().slice(0,10)}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }catch(err){setError(err instanceof Error?err.message:'Export unavailable.');}finally{setExporting(false);}
 }
 const change=(key:keyof ReviewFilters,value:string)=>setDraft(x=>({...x,[key]:value,...(key==='page'?{section:''}:{})}));
 return <section className={s.root} aria-label="Tester feedback"><p>Read what people felt, what made sense and what needs work. These are responses, not a count of unique visitors. Times are shown in Lagos.</p>
  <form className={s.filters} onSubmit={e=>{e.preventDefault();setFilters({...draft,offset:0});}}>
   <label>Page<select value={draft.page} onChange={e=>change('page',e.target.value)}><option value="">All pages</option>{data?.pages.map(x=><option key={x}>{x}</option>)}</select></label>
   <label>Section<select value={draft.section} onChange={e=>change('section',e.target.value)}><option value="">All sections</option>{data?.sections.map(x=><option key={x}>{x}</option>)}</select></label>
   <label>Reaction<select value={draft.reaction} onChange={e=>change('reaction',e.target.value)}><option value="">All reactions</option><option value="__empty">Not specified</option>{reactions.map(x=><option key={x}>{x}</option>)}</select></label>
   <label>Visitor type<select value={draft.visitor} onChange={e=>change('visitor',e.target.value)}><option value="">All visitor types</option><option value="__empty">Not specified</option>{visitorTypes.map(x=><option key={x}>{x}</option>)}</select></label>
   <label className={s.search}>Find words in a comment<input type="search" maxLength={120} value={draft.search} onChange={e=>change('search',e.target.value)} placeholder="For example: navigation"/></label>
   <div className={s.actions}><button disabled={busy}>Apply filters</button><button type="button" disabled={busy} onClick={()=>{setDraft(initial);setFilters(initial);}}>Clear</button></div>
  </form>
  <div className={s.actions}><button disabled={busy} onClick={()=>setRefresh(n=>n+1)}>Refresh reviews</button><button disabled={busy||exporting||!data?.total} onClick={download}>{exporting?'Preparing CSV…':'Export filtered CSV'}</button></div>
  {error&&<p role="alert">{error}</p>}<p role="status">{busy?'Loading reviews…':data?`${data.total} matching response${data.total===1?'':'s'}`:''}</p>
  {!busy&&data&&!data.items.length&&<p>No reviews match these filters. Try clearing them.</p>}
  <div className={s.reviews}>{data?.items.map(row=><article key={row.id}><div className={s.meta}><strong>{row.reaction||'Reaction not specified'}</strong><time dateTime={row.created_at}>{new Date(row.created_at).toLocaleString('en-NG',{timeZone:'Africa/Lagos'})}</time></div><h2>{row.section}</h2><p className={s.meta}>{row.page} · {row.visitor_type||'Visitor type not specified'}</p><p className={s.comment}>{row.comment||'No written comment.'}</p><small>Preview build: {row.build||'Not recorded'}</small></article>)}</div>
  <nav className={s.actions} aria-label="Review pages"><button disabled={busy||!filters.offset} onClick={()=>setFilters(x=>({...x,offset:Math.max(0,x.offset-50)}))}>Previous</button><span>{data?.total?`${filters.offset+1}–${Math.min(filters.offset+50,data.total)} of ${data.total}`:'0 responses'}</span><button disabled={busy||!data||filters.offset+50>=data.total} onClick={()=>setFilters(x=>({...x,offset:x.offset+50}))}>Next</button></nav>
 </section>;
}
