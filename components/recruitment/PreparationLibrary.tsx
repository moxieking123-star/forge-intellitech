'use client';
import {useEffect,useRef,useState} from 'react';
import {dailyRhythm,preparationCourses,preparationResources,preparationJournal,type PreparationProgramme} from '@/lib/recruitment/preparation-curriculum';
import s from './PreparationLibrary.module.css';
import NumberHands from './NumberHands';
import {trainingPath} from '@/lib/recruitment/paths';
export default function PreparationLibrary({programme,onDayChange,busy=false}:{programme:PreparationProgramme;onDayChange?:(day:number)=>void;busy?:boolean}){
 const [day,setDay]=useState(1),[answer,setAnswer]=useState<number|null>(null),[checked,setChecked]=useState(false),[notes,setNotes]=useState<Record<number,string>>({});
 const heading=useRef<HTMLHeadingElement>(null),initial=useRef(true),course=preparationCourses[programme],lesson=course.days[day-1];
 useEffect(()=>{if(initial.current){initial.current=false;return;}heading.current?.focus();},[day]);
 function choose(value:number){onDayChange?.(value);setDay(value);setAnswer(null);setChecked(false);}
 function download(){const blob=new Blob([preparationJournal(programme,day,notes[day]||'')],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`forge-${programme}-day-${day}-practice.txt`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <section className={s.library} aria-label={`${course.title} two-week preparation`}>
  <header className={s.intro}><p className={s.eyebrow}>Your preparation studio · 14 days</p><h2>Make something. Explain it. Help someone try.</h2><p>{course.promise}</p><p>{course.outcome}</p><details><summary>A three-hour day, with room to breathe</summary><ul className={s.rhythm}>{dailyRhythm.map(item=><li key={item.label}><strong>{item.minutes} min</strong><span>{item.label}</span></li>)}</ul><p>Use two short breaks. Spend the learning time on the assigned section, not the whole book. If you finish early, improve the artefact and rehearse a clearer explanation.</p></details></header>
  <div className={s.layout}>
   <nav className={s.navigation} aria-label="Preparation days">{[0,1].map(week=><div key={week}><h3>Week {week+1} · {week===0?'Discover and build':'Explain and improve'}</h3>{course.days.slice(week*7,week*7+7).map(item=><button key={item.day} type="button" disabled={busy} aria-current={day===item.day?'step':undefined} onClick={()=>choose(item.day)}><span>{String(item.day).padStart(2,'0')}</span>{item.title}</button>)}</div>)}</nav>
   <article className={s.lesson}>
    <p className={s.eyebrow}>Day {day} · About 3 hours</p><h3 ref={heading} tabIndex={-1} className={s.title}>{lesson.title}</h3><p className={s.goal}>{lesson.goal}</p>
    <h4>Start with something real.</h4><p>{lesson.explain}</p>
    <div className={s.demonstration}><h4>Watch it in your mind. Then try it.</h4><p>{lesson.demonstrate}</p></div>
    <h4>Your build.</h4><ol>{lesson.build.map(step=><li key={step}>{step}</li>)}</ol>
    {programme==='elytech'&&(day===8||day===9)&&<p className={s.output}><a href={trainingPath('/training/forge-canva-starter-workbook.md')} download>Download Forge’s Canva starter workbook</a> · An original, practical text workbook to keep alongside today’s activity.</p>}
    {programme==='elytech'&&(day===2||day===3)&&<NumberHands key={day}/>}
    <fieldset className={s.game}><legend>A small challenge. A useful habit.</legend><p>{lesson.game.prompt}</p>{lesson.game.options.map((option,index)=><label key={`${day}-${index}`}><input type="radio" name={`${programme}-day-${day}-challenge`} checked={answer===index} onChange={()=>{setAnswer(index);setChecked(false);}}/>{option}</label>)}<button type="button" disabled={answer===null} onClick={()=>setChecked(true)}>Try my answer</button>{checked&&<p role="status" className={s.feedback}><strong>{answer===lesson.game.correct?'You spotted it. ':'A chance to think again. '}</strong>{lesson.game.why} This is practice, not your recruitment score.</p>}</fieldset>
    <h4>Now help somebody understand.</h4><p>{lesson.teachBack}</p><p className={s.output}><strong>Keep this in your portfolio:</strong> {lesson.output}</p>
    <details className={s.resources}><summary>Your short reading shelf</summary><p>Start with the original Forge notes above; you can do today’s starter activity from them. Use the linked resources for a short extension, not the whole book. Books without a link are instructor background, not required trainee reading. Software references open at their original publisher; some may require an account.</p>{lesson.reading.map(ref=>{const resource=preparationResources.find(item=>item.id===ref.id)!;return <section key={ref.id}><h5>{resource.url?<a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title} ↗</a>:resource.title}</h5><p>{resource.author}</p><p><strong>{resource.url?'Read a little further:':'Instructor background:'}</strong> {ref.section}</p><small>{resource.rights}</small>{resource.note&&<p>{resource.note}</p>}</section>;})}</details>
    <div className={s.journal}><h4>Before you leave today.</h4><p>{lesson.reflect}</p><label htmlFor={`${programme}-practice-notes`}>Your personal practice notes</label><textarea id={`${programme}-practice-notes`} rows={5} maxLength={6000} value={notes[day]||''} onChange={event=>setNotes(value=>({...value,[day]:event.target.value}))}/><p className={s.help}>These notes stay in this open page only. Download them before closing, refreshing or changing programmes. Keep real learners’ names, results and private details out. This download is not a staff submission; use the assignment form below to send the selected day to Forge for review.</p><button type="button" onClick={download}>Download Day {day} practice journal</button></div>
    <div className={s.actions}><button type="button" disabled={busy||day===1} onClick={()=>choose(day-1)}>← Previous day</button><span>Day {day} of 14</span><button type="button" disabled={busy||day===14} onClick={()=>choose(day+1)}>Next day →</button></div>
   </article>
  </div>
 </section>;
}
