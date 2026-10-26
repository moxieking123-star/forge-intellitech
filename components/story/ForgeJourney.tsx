"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./ForgeJourney.module.css";

const chapters = [
  ["Every beginning starts with someone.", "A builder tries to move a beam alone."],
  ["Some things need another pair of hands.", "A second builder arrives. Together, they lift the beam."],
  ["Someone else sees another possibility.", "A girl brings a wheel and an idea of her own."],
  ["Different ideas. Something we can cross together.", "The team turns their pieces into a bridge."],
  ["Make a way. Someone will find it.", "A builder waves down a vehicle. The driver stops to help."],
  ["Look what we made possible. Together.", "The team reaches a shared Forge workshop and celebrates."],
];

function Person({ x, y=105, color, girl=false, happy=false, effort=false, wave=false, walking=false }: {x:number;y?:number;color:string;girl?:boolean;happy?:boolean;effort?:boolean;wave?:boolean;walking?:boolean}) {
  return <g transform={`translate(${x} ${y})`} className={walking ? styles.walker : undefined}>
    <g className={`${styles.person} ${happy && !walking ? styles.cheer : ""}`} style={{color}}>
      <g className={styles.head}>
        {girl && <path d="M-7-48Q-13-54-11-39M6-49Q14-53 12-39" stroke="currentColor" strokeWidth="3" fill="none"/>}
        <circle cy="-45" r="8" fill="#f4f1e9" stroke="currentColor" strokeWidth="2.4"/>
        <g className={styles.eyes} fill="#10211c"><circle cx="-2.7" cy="-46" r="1"/><circle cx="2.7" cy="-46" r="1"/></g>
        <path d={happy ? "M-3-42Q0-38 4-42" : effort ? "M-3-39Q0-43 4-40M-5-50L-1-48M1-48L5-50" : "M-2-41L2-41"} fill="none" stroke="#10211c" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      <path d="M0-36V-17" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {girl && <path d="M0-30L-9-14H9Z" fill="currentColor"/>}
      <g className={wave ? styles.wave : styles.arms}>
        <path d={wave ? "M0-31L-10-22M0-31L10-43L9-53" : effort ? "M0-30L12-30L16-35M0-30L-8-23" : happy ? "M0-30L-12-42M0-30L12-42" : "M0-31L-10-21M0-31L11-22"} stroke="currentColor" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      </g>
      <path className={styles.leftLeg} d="M0-16L-9 0" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <path className={styles.rightLeg} d="M0-16L10 0" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      {effort && <path className={styles.sweat} d="M13-52l3 5" stroke="#26889a" strokeWidth="2"/>}
    </g>
  </g>;
}

function Scene({ chapter, game=0 }: {chapter:number;game?:number}) {
  const building=game>0;
  const home=chapter===5||game>=3;
  return <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className={styles.scene}>
    <defs><pattern id={building?"game-hatch":"journey-hatch"} width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="#ce672d" strokeWidth=".6"/></pattern></defs>
    <path d="M12 107H308" stroke="#66776c" strokeWidth="1" strokeDasharray="2 5"/>
    {!building && chapter===0 && <g className={styles.struggle}><path d="M105 83L177 70L180 81L108 94Z" fill="#b87544" stroke="#724b32"/><path d="M115 85L168 76" stroke="#e7be83"/><Person x={88} color="#ef5726" effort/><path d="M68 45q-7-10-12-2" stroke="#ef5726" strokeWidth="1.4"/><text x="54" y="37" fill="#273c32" fontSize="14">?</text></g>}
    {!building && chapter===1 && <g className={styles.carry}><Person x={105} color="#ef5726" walking happy/><Person x={213} color="#268b9a" walking happy/><rect x="110" y="70" width="99" height="9" rx="3" fill="#b87544" stroke="#724b32"/><path d="M119 73H198" stroke="#e7be83"/></g>}
    {!building && chapter===2 && <><Person x={86} color="#ef5726" wave/><Person x={147} color="#268b9a" happy/><g className={styles.arrival}><Person x={232} color="#8755ad" girl walking happy/><g className={styles.wheel}><circle cx="208" cy="94" r="12" fill="#f5b929" stroke="#9e6415" strokeWidth="2"/><path d="M196 94h24M208 82v24" stroke="#9e6415"/></g></g><path className={styles.idea} d="M242 28v-5m8 8 4-3m-21 1-4-3" stroke="#c78811" strokeWidth="2"/></>}
    {((!building && chapter>=3) || building) && <>
      {(!building || game>=1) && <g className={styles.bridge}><path d="M99 105V84L126 64H192L221 84V105" stroke="#268b9a" strokeWidth="5" strokeLinejoin="round"/><path d="M94 85H227" stroke="#bd7542" strokeWidth="9" strokeLinecap="round"/><path d="M126 65V81M159 65V81M192 65V81" stroke="#f3b32c" strokeWidth="3"/></g>}
      {(!building || game>=2) && <><Person x={home?43:73} color="#ef5726" happy={chapter!==4} wave={chapter===4}/><Person x={home?77:242} color="#8755ad" girl happy/><Person x={home?109:279} color="#268b9a" happy/></>}
      {((!building && chapter>=4) || game>=3) && <g className={chapter===5 || game>=3 ? styles.driveHome : styles.vehicle}>
        <path d="M129 91V67q0-5 5-5h42l14 14v15Z" fill="#f3b32c" stroke="#7d5c26" strokeWidth="1.5"/><path d="M163 66h11l10 11h-21Z" fill="#e2eee5"/><rect x="136" y="67" width="19" height="10" rx="2" fill="#e2eee5"/><circle cx="141" cy="91" r="7" fill="#17372b"/><circle cx="179" cy="91" r="7" fill="#17372b"/><circle cx="141" cy="91" r="2" fill="#f4f1e9"/><circle cx="179" cy="91" r="2" fill="#f4f1e9"/>
      </g>}
      {((!building && chapter===5) || game>=3) && <><g className={styles.workshop}><path d="M200 59l35-23 39 23v47h-74Z" fill="#e9dfc5" stroke="#214b3a" strokeWidth="2"/><path d="M222 106V75h28v31" fill="#214b3a"/><path d="M205 62h62" stroke="#f4511e" strokeWidth="3"/><text x="216" y="58" fill="#214b3a" fontSize="10" fontWeight="800">FORGE</text></g><g className={styles.confetti} strokeWidth="3"><path d="M65 27l-4-5M95 36l5-5" stroke="#f4511e"/><path d="M265 20l3-7M285 35l7-2" stroke="#8755ad"/><path d="M148 27v-6M182 19l4-5" stroke="#268b9a"/></g></>}
    </>}
  </svg>;
}

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
        setChapter(Math.min(5,introduction+Math.floor(progress*(6-introduction))));
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
  const line=pathname.includes('programmes') && chapter===2 ? 'A new skill. A new way to see it.' : chapters[chapter][0];
  if(hidden) return <button className={styles.restore} onClick={()=>setHidden(false)} aria-label="Show the Forge story">↗</button>;
  return <>
    <div ref={root} className={styles.journey} data-forge-journey data-paused={paused||reduced} data-focus={formFocus} data-chapter={chapter}>
      <div className={styles.topline}><span>A little story of possibility</span><button onClick={()=>setPaused(value=>!value)} aria-label={paused?'Resume the Forge story':'Pause the Forge story'}>{paused?'▶':'Ⅱ'}</button><button onClick={()=>setHidden(true)} aria-label="Hide the Forge story">×</button></div>
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
      <div className={styles.gameScene}><Scene chapter={game===0?0:game===3?5:3} game={game}/></div>
      <p role="status">{['A beam. An idea. It needs somewhere to begin.','A bridge! Now it needs people to bring it to life.','Different hands. Different skills. A way forward.','You made a way. Together, we built a beginning.'][game]}</p>
      <button autoFocus className={styles.build} onClick={()=>setGame(value=>value===3?0:value+1)}>{['Give the idea a foundation','Bring the team together','Make a way for the journey','Create another beginning'][game]} <span aria-hidden="true">→</span></button>
      <p className={styles.hint}>No score. No hurry. Just something we could not make alone.</p>
    </dialog>
  </>;
}
