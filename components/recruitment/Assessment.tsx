'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {deadlineClock,assessmentOutcome} from '@/lib/recruitment/screen';
import type {CandidateAttempt,CandidateRequest} from './types';
import s from './Recruitment.module.css';

export default function Assessment({attempt,request,token,ownerId,onFinish}:{attempt:CandidateAttempt;request:CandidateRequest;token:string;ownerId:string;onFinish:()=>void}){
 const [index,setIndex]=useState(0),[answers,setAnswers]=useState<Record<string,string>>({});
 const [unsaved,setUnsaved]=useState<string[]>([]),[seconds,setSeconds]=useState(300),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const [result,setResult]=useState<{status:string;correct:number}|null>(null);
 const pending=useRef(new Map<string,string>()),queue=useRef(Promise.resolve()),finished=useRef(false),submitting=useRef(false),automatic=useRef(false);
 const leaveTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const question=attempt.questions[index];
 const save=useCallback((questionId:string,optionId:string)=>{
  pending.current.set(questionId,optionId);setUnsaved([...pending.current.keys()]);
  queue.current=queue.current.then(async()=>{
   if(finished.current)return;
   try{await request({action:'answer',attemptId:attempt.id,answer:{questionId,optionId}});if(pending.current.get(questionId)===optionId)pending.current.delete(questionId);}
   catch{setMessage('Some answers have not reached Forge. Keep this page open and retry saving.');}
   setUnsaved([...pending.current.keys()]);
  });
 },[attempt.id,request]);
 const submit=useCallback(async(expired=false)=>{
  if(submitting.current||finished.current)return;
  submitting.current=true;setBusy(true);setMessage('');
  await queue.current;
  if(!expired&&pending.current.size){setMessage('Please retry saving your answers before submitting.');submitting.current=false;setBusy(false);return;}
  try{const outcome=await request({action:'submit',attemptId:attempt.id});finished.current=true;setResult(outcome);}
  catch(error){setMessage(error instanceof Error?error.message:'Your submission could not be checked. Please retry.');}
  finally{submitting.current=false;setBusy(false);}
 },[attempt.id,request]);
 useEffect(()=>{
  let remaining:(now:number)=>number;
  try{remaining=deadlineClock(attempt.deadlineAt,attempt.serverNow,performance.now());}
  catch{setMessage('The assessment timer could not be checked. Please return to your application.');setSeconds(0);return;}
  const tick=()=>{const value=remaining(performance.now());setSeconds(value);if(value===0&&!automatic.current){automatic.current=true;void submit(true);}};
  tick();const interval=setInterval(tick,250);return()=>clearInterval(interval);
 },[attempt,submit]);
 useEffect(()=>{
  if(leaveTimer.current)clearTimeout(leaveTimer.current);
  const leave=()=>{if(finished.current)return;try{sessionStorage.setItem('forge-recruitment-leaving:'+ownerId,attempt.id);}catch{}void fetch('/api/recruitment',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({action:'abandon',attemptId:attempt.id})}).catch(()=>{});};
  const returnFromCache=(event:PageTransitionEvent)=>{if(event.persisted&&!finished.current)onFinish();};
  window.addEventListener('pagehide',leave);window.addEventListener('pageshow',returnFromCache);
  return()=>{window.removeEventListener('pagehide',leave);window.removeEventListener('pageshow',returnFromCache);leaveTimer.current=setTimeout(leave,0);};
 },[attempt.id,token,ownerId,onFinish]);
 useEffect(()=>{document.getElementById('question-title')?.focus();},[index]);
 if(result)return <section className={s.card} aria-labelledby="assessment-result"><p className={s.kicker}>First step recorded</p><h2 id="assessment-result">{result.status==='passed'?'A beginning worth building on.':'There is room to learn.'}</h2><p>{assessmentOutcome(result.status,result.correct)}</p><p className={s.score}>{result.correct} / 30</p><button className={s.primary} onClick={onFinish}>Back to my application</button></section>;
 return <section className={s.assessment} aria-label="Technology assessment">
  <div className={s.testBar}><div><p className={s.kicker}>Your first Forge challenge</p><h2>Show us the basics.</h2></div><div className={`${s.timer} ${seconds<=60?s.urgent:''}`} role="timer" aria-label="Time remaining"><span>{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</span><small>remaining</small></div></div>
  <p className={s.saveStatus} role="status">{Object.keys(answers).length} of 30 answered · {unsaved.length?`${unsaved.length} waiting to save`:'All selected answers saved'}</p>
  {message&&<div className={s.notice} role="alert">{message}{unsaved.length>0&&seconds>0&&<button className={s.secondary} onClick={()=>{setMessage('');for(const [id,option] of pending.current)save(id,option);}}>Retry saving</button>}</div>}
  <div className={s.testGrid}><nav className={s.navigator} aria-label="Question navigator">{attempt.questions.map((q,i)=><button key={q.id} type="button" aria-label={`Question ${i+1}${answers[q.id]?', answered':''}`} aria-current={i===index?'step':undefined} data-answered={!!answers[q.id]} onClick={()=>setIndex(i)}>{i+1}</button>)}</nav>
  <div className={s.card}><p className={s.kicker}>Question {index+1} of 30</p><h3 id="question-title" tabIndex={-1}>{question.prompt}</h3><fieldset className={s.options} disabled={busy||seconds===0}><legend className={s.srOnly}>Choose one answer</legend>{question.options.map(option=><label key={option.id} data-selected={answers[question.id]===option.id}><input type="radio" name={question.id} value={option.id} checked={answers[question.id]===option.id} onChange={()=>{setAnswers(old=>({...old,[question.id]:option.id}));save(question.id,option.id);}}/><span>{option.text}</span></label>)}</fieldset>
   <div className={s.actions}><button className={s.secondary} disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button>{index<29?<button className={s.primary} onClick={()=>setIndex(i=>i+1)}>Next question →</button>:<button className={s.primary} disabled={busy} onClick={()=>void submit(seconds===0)}>{busy?'Submitting…':'Submit assessment'}</button>}</div>
  </div></div>
  {seconds===0&&<button className={s.primary} disabled={busy} onClick={()=>void submit(true)}>{busy?'Checking saved answers…':'Retry submission'}</button>}
  <p className={s.small}>The server keeps time. Only answers received before your deadline count. Leaving or refreshing ends this attempt; another attempt uses a different set.</p>
 </section>;
}
