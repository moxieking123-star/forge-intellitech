"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./ForgeJourney.module.css";
import Scene from "./CartoonScene";

const chapters = [
  ["Even Tom and Jerry can begin differently.", "Tom chases Jerry. But something stops them."],
  ["A broken fence. A problem bigger than a rivalry.", "Tom and Jerry discover Doggy's broken fence."],
  ["Being strong does not mean doing it alone.", "Tom struggles to lift a fence beam on his own."],
  ["What if we built something instead?", "Jerry draws a plan. Tom begins to listen."],
  ["There is room for another pair of hands.", "Doggy arrives with tools and joins the team."],
  ["Different strengths. A lighter load.", "Tom, Jerry and Doggy carry the beam together."],
  ["Less fighting. More forging.", "The three friends build Doggy's fence together."],
  ["Even Tom and Jerry can work together. So can we.", "Doggy's fence is finished. Everyone celebrates what they forged together."],
];

export default function ForgeJourney() {
  const pathname=usePathname();
  const root=useRef<HTMLDivElement>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const [chapter,setChapter]=useState(0);
  const [paused,setPaused]=useState(false);
  const [hidden,setHidden]=useState(false);
  const [game,setGame]=useState(0);
  const [reduced,setReduced]=useState(false);
  const [formFocus,setFormFocus]=useState(false);
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const change=()=>setReduced(media.matches); change(); media.addEventListener('change',change);
    return ()=>media.removeEventListener('change',change);
  },[]);
  useEffect(()=>{
    const focus=(event:FocusEvent)=>setFormFocus(event.target instanceof Element && !!event.target.closest('input,textarea,select,[contenteditable=true]'));
    document.addEventListener('focusin',focus);
    return ()=>document.removeEventListener('focusin',focus);
  },[]);
  useEffect(()=>{
    if(paused) return;
    let frame=0; let lastY=scrollY;
    const scroll=()=>{
      if(frame) return;
      frame=requestAnimationFrame(()=>{
        const range=Math.max(1,document.documentElement.scrollHeight-innerHeight);
        const progress=Math.max(0,Math.min(1,scrollY/range));
        const introduction=pathname.includes('programmes') ? 2 : pathname.includes('endless') ? 1 : 0;
        setChapter(Math.min(chapters.length-1,introduction+Math.floor(progress*(chapters.length-introduction))));
        root.current?.setAttribute('data-direction',scrollY<lastY?'back':'forward');
        lastY=scrollY; frame=0;
      });
    };
    const pointer=(event:PointerEvent)=>{
      if(reduced) return;
      root.current?.style.setProperty('--look',`${(event.clientX/innerWidth-.5)*2}px`);
    };
    scroll(); window.addEventListener('scroll',scroll,{passive:true}); window.addEventListener('pointermove',pointer,{passive:true});
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('pointermove',pointer);};
  },[pathname,paused,reduced]);
  useEffect(()=>{ if(pathname.includes('programmes')) setChapter(2); else if(pathname.includes('endless')) setChapter(1); },[pathname]);
  const line=chapters[chapter][0];
  if(hidden) return <button className={styles.restore} onClick={()=>setHidden(false)} aria-label="Show the Forge story">↗</button>;
  return <>
    <div ref={root} className={styles.journey} data-forge-journey data-paused={paused||reduced} data-focus={formFocus} data-chapter={chapter}>
      <div className={styles.topline}><span>Even rivals can forge together</span><button onClick={()=>setPaused(value=>!value)} aria-label={paused?'Resume the Forge story':'Pause the Forge story'}>{paused?'▶':'Ⅱ'}</button><button onClick={()=>setHidden(true)} aria-label="Hide the Forge story">×</button></div>
      <button ref={trigger} className={styles.storyButton} onClick={()=>{setGame(0);dialog.current?.showModal();}} aria-label={`Join the Forge story. ${chapters[chapter][1]}`}>
        <div key={chapter} className={styles.chapter}><Scene chapter={chapter}/></div>
        <span className={styles.caption}>{line}</span>
      </button>
      <div className={styles.progress} aria-hidden="true">{chapters.map((_,index)=><i key={index} data-current={index<=chapter}/>)}</div>
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="forge-play-title" onClose={()=>trigger.current?.focus({preventScroll:true})} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}>
      <button className={styles.close} onClick={()=>dialog.current?.close()} aria-label="Close the building activity">×</button>
      <p className={styles.eyebrow}>Now you are part of the story</p>
      <h2 id="forge-play-title">What can we make<br/>with what we have?</h2>
      <div className={styles.gameScene}><Scene chapter={game===0?3:7} game={game}/></div>
      <p role="status">{['Jerry has a plan. Tom cannot carry it alone. Who else could help?','Doggy brings the tools. Suddenly, this is everybody’s project.','Three different strengths carry what one could not.','A plan becomes a fence, one piece at a time.','A fence for Doggy. A beginning for all of us. We forged it, together.'][game]}</p>
      <button autoFocus className={styles.build} onClick={()=>setGame(value=>value===4?0:value+1)}>{['Invite Doggy to help','Share the load','Build the fence together','Celebrate what we forged','Tell the story again'][game]} <span aria-hidden="true">→</span></button>
      <p className={styles.hint}>No score. No hurry. Just something we could not make alone.</p>
    </dialog>
  </>;
}
