'use client';
import {trainingPath} from '@/lib/recruitment/paths';
import {useEffect,useRef,useState} from 'react';
import {workspaceState,type WorkspaceState,type WorkspaceCommand,type LessonId} from '../../lib/recruitment/workspace-client';
import s from './Recruitment.module.css';
import PreparationLibrary from './PreparationLibrary';
import {preparationCourses} from '@/lib/recruitment/preparation-curriculum';
type Programme='elytech'|'techup';
const courses={
 elytech:{name:'ElyTech',audience:'The primary learning pathway',intro:'Help young learners discover Chisanbop, confident keyboard use, Scratch and Canva. Learn to explain, demonstrate and guide a child’s own practice.'},
 techup:{name:'TechUp',audience:'The secondary learning pathway',intro:'Explore design, data, coding, AI, networking, cloud computing, cybersecurity, content and project planning, then rehearse a Builder, Storyteller or Strategist direction.'}
};
export default function TrainingPathways({token}:{token:string}){
 const [programme,setProgramme]=useState<Programme|null>(null);
 const heading=useRef<HTMLHeadingElement>(null);
 const [saved,setSaved]=useState<WorkspaceState|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(''),[draft,setDraft]=useState(''),[notice,setNotice]=useState('');
 const [day,setDay]=useState(1),[drafts,setDrafts]=useState<Record<string,string>>({});
 const lessonId=`day-${day}` as LessonId;
 const currentSubmission=saved?.submissions?.find(item=>item.lessonId===lessonId)||(day===1?saved?.submission:null);
 const multiDayReady=Array.isArray(saved?.submissions);
 function chooseDay(next:number){if(next===day||busy)return;setDrafts(value=>({...value,[lessonId]:draft}));setDay(next);const id=`day-${next}`;setDraft(drafts[id]??saved?.submissions?.find(item=>item.lessonId===id)?.text??(next===1?saved?.submission?.text:'')??'');setNotice('');setError('');}

 const pending=useRef<{key:string;id:string}|null>(null),active=useRef(true);
 async function call(operation:WorkspaceCommand['operation'],choice:Programme|null=null,text=''){
  const base={operation,programme:choice||'' as const,lessonId:operation==='complete'||operation==='submit'?lessonId:'' as const,text};
  const key=JSON.stringify(base);if(pending.current?.key!==key)pending.current={key,id:crypto.randomUUID()};
  const response=await fetch(trainingPath('/api/recruitment/workspace'),{method:'POST',cache:'no-store',signal:AbortSignal.timeout(30000),headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({...base,requestId:pending.current.id})});
  const value=await response.json();if(!response.ok)throw Error(value.error||'The save could not be confirmed. Keep your draft and retry.');const state=workspaceState(value);if(!state)throw Error('The save could not be confirmed. Keep your draft and retry.');pending.current=null;return state;
 }
 async function load(){setBusy(true);setError('');try{const state=await call('read');if(active.current){setSaved(state);setProgramme(state.programme);setDraft(state.submissions?.find(item=>item.lessonId===lessonId)?.text||(day===1?state.submission?.text:'')||'');}}catch{if(active.current)setError('Your saved preparation could not load. Open your training entry again if the session has expired, or retry.');}finally{if(active.current)setBusy(false);}}
 useEffect(()=>{active.current=true;void load();return()=>{active.current=false;};},[token]);
 async function save(operation:'select'|'complete'|'submit',choice:Programme){if(busy)return;setBusy(true);setError('');setNotice('');try{const state=await call(operation,choice,operation==='submit'?draft:'');if(active.current){setSaved(state);if(operation==='select'){setProgramme(state.programme);setDay(1);setDrafts({});setDraft(state.submission?.text||'');}setNotice(operation==='submit'?'Assignment received. It has not been reviewed yet.':operation==='complete'?'Practice progress saved.':'Programme selection saved.');}}catch(failure){if(active.current)setError(failure instanceof Error?failure.message:'The save could not be confirmed. Keep your draft and retry.');}finally{if(active.current)setBusy(false);}}
 const messages=<>{error&&<p className={s.notice} role="alert">{error}</p>}{notice&&<p className={s.notice} role="status">{notice}</p>}{busy&&<p role="status">Connecting your saved preparation...</p>}</>;
 useEffect(()=>{if(programme)heading.current?.focus();},[programme]);
 if(!saved)return <section className={s.card}>{messages}<h2>Your preparation, in one place.</h2><button className={s.primary} disabled={busy} onClick={load}>Retry loading preparation</button></section>;

 if(!programme)return <>{messages}<div className={s.introGrid}>{(['elytech','techup'] as const).map(key=>{const course=courses[key];return <section key={key} className={key==='elytech'?s.card:s.darkCard}><p className={s.kicker}>{course.audience}</p><h2>{course.name}</h2><p>{course.intro}</p><p>If a skill is new to you, preparation is where we work on it together.</p><button className={s.secondary} disabled={busy} onClick={()=>save('select',key)}>Choose {course.name} preparation</button></section>;})}</div></>;
 const course=courses[programme];
 return <section className={s.pathway} aria-labelledby="pathway-heading">
  <div className={s.account}><p className={s.kicker}>Instructor preparation · {course.name}</p><button className={s.secondary} disabled={busy} onClick={()=>{setError('');setNotice('');setProgramme(null);}}>Compare programmes</button></div>
  <h2 id="pathway-heading" ref={heading} tabIndex={-1}>{course.name}: learn it. Explain it. Help someone build.</h2>
  <p className={s.notice}>Your programme selection is saved. Explore your two-week preparation below. Choose a day, practise and send its assignment for staff feedback. Keep a copy of your draft until the save is confirmed.</p>{messages}
  <PreparationLibrary key={programme} programme={programme} onDayChange={chooseDay} busy={busy} workspace={saved}/>
  <div className={s.introGrid}>
   <article className={s.card} aria-label="Daily assignment"><p className={s.kicker}>Your work · Day {day}</p><h3>{preparationCourses[programme].days[day-1].title}</h3><p>{preparationCourses[programme].days[day-1].output}</p><p>{preparationCourses[programme].days[day-1].teachBack}</p>
    {!multiDayReady&&day>1&&<p role="alert" className={s.notice}>The training service needs its multi-day update. Keep your draft and download your journal; this day cannot be submitted yet.</p>}
    <div className={s.history}><p>{saved.completed.includes(lessonId)?`Day ${day} - Practised`:`Day ${day} - Practice not recorded`}</p><button className={s.secondary} disabled={busy||saved.completed.includes(lessonId)||(!multiDayReady&&day>1)} onClick={()=>save('complete',programme)}>Mark Day {day} as practised</button></div>
    <form className={s.form} onSubmit={event=>{event.preventDefault();void save('submit',programme);}}><label>Your Day {day} assignment<textarea aria-label={`Your Day ${day} assignment`} rows={7} minLength={30} maxLength={1200} required value={draft} disabled={busy} onChange={event=>setDraft(event.target.value)} aria-describedby="assignment-help"/></label><p id="assignment-help">Describe your build, demonstration and learning check. Include a shareable work link if useful. 30–1,200 characters. Do not include children's names or private information.</p><button className={s.primary} disabled={busy||draft.trim().length<30||(!multiDayReady&&day>1)}>{currentSubmission?'Submit revised assignment':'Submit assignment'}</button></form>
    {currentSubmission&&<p className={s.notice}>Latest submission received: {new Date(currentSubmission.submittedAt).toLocaleString()}. {currentSubmission.review?currentSubmission.review.status==='needs_changes'?'Changes requested.':'Reviewed.':'Awaiting review.'} No employment or school access is granted by a review.</p>}
    {currentSubmission?.review&&<section aria-label="Staff feedback" className={s.notice}><h3>{currentSubmission.review.status==='needs_changes'?'A next step from Forge.':'Feedback from Forge.'}</h3><p style={{whiteSpace:'pre-wrap'}}>{currentSubmission.review.feedback}</p><p>Reviewed {new Date(currentSubmission.review.reviewedAt).toLocaleString()}</p></section>}
    <button className={s.secondary} disabled={busy||draft!==(currentSubmission?.text||'')} onClick={load}>Refresh feedback</button><p className={s.small}>Submit edited work before refreshing feedback. Unsaved drafts stay only in this open page.</p>
   </article>
   <aside className={s.darkCard} aria-label="Preparation review"><p className={s.kicker}>Keep the work. Keep growing.</p><h3>Something useful to take with you.</h3><p>{preparationCourses[programme].outcome}</p><h3>What a reviewer looks for.</h3><ul><li>A clear, accurate explanation.</li><li>A chance for the learner to act independently.</li><li>A kind response to mistakes.</li><li>A practical low-device alternative.</li><li>An honest account of what needs more practice.</li></ul><p>Preparation supports your growth. Teaching placement follows Forge’s practical review. Finishing a lesson does not grant employment or school access.</p></aside>
  </div>
 </section>;
}
