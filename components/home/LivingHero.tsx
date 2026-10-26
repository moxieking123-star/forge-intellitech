"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type PointerEvent } from "react";
import styles from "./LivingHero.module.css";

const chapters = [
  { label: 'Our streets', before: '/images/home/nigeria-then-approved.webp', after: '/images/home/nigeria-future-approved.webp' },
  { label: 'Our coastline', before: '/images/home/nigeria-then1.webp', after: '/images/home/nigeria-now2.webp' },
  { label: 'Our everyday journeys', before: '/images/home/nigeria-then3.webp', after: '/images/home/nigeria-now3.webp' },
  { label: 'Our communities', before: '/images/home/nigeria-then4.webp', after: '/images/home/nigeria-now4.webp' },
];

export default function LivingHero() {
  const [paused,setPaused]=useState(false);
  const [scene,setScene]=useState<'auto'|'today'|'possibility'>('auto');
  const [chapter,setChapter]=useState(0);
  useEffect(()=>{
    if(paused || scene!=='auto') return;
    const timer=setInterval(()=>{
      if(matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden || document.documentElement.dataset.forgeMotion==='paused') return;
      setChapter(value=>(value+1)%chapters.length);
    },20000);
    return ()=>clearInterval(timer);
  },[paused,scene,chapter]);
  function resetDepth(element: HTMLElement) {
    element.style.setProperty('--depth-x','0px');
    element.style.setProperty('--depth-y','0px');
  }
  function followPointer(event: PointerEvent<HTMLElement>) {
    if (paused || event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box=event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--depth-x',`${((event.clientX-box.left)/box.width-.5)*14}px`);
    event.currentTarget.style.setProperty('--depth-y',`${((event.clientY-box.top)/box.height-.5)*10}px`);
  }
  return <section id="company" className={styles.hero} data-paused={paused} data-scene={scene} aria-labelledby="home-title" onPointerMove={followPointer} onPointerLeave={event=>resetDepth(event.currentTarget)}>
    <div key={chapter} className={styles.landscape} aria-hidden="true">
      <Image className={styles.today} src={chapters[chapter].before} alt="" fill priority={chapter===0} sizes="100vw"/>
      <Image className={styles.possibility} src={chapters[chapter].after} alt="" fill loading="eager" sizes="100vw"/>
      <div className={styles.sunlight}/>
      <svg className={styles.birds} viewBox="0 0 140 40" fill="none"><path d="M10 18q8-8 16 0 8-8 16 0M60 29q6-6 12 0 6-6 12 0M100 10q6-6 12 0 6-6 12 0" stroke="currentColor" strokeWidth="1.4"/></svg>
    </div>
    <div className={styles.shade}/>
    <div className={styles.copy}>
      <p className={styles.eyebrow}><span/> Nigeria is not a finished story.</p>
      <h1 id="home-title">Why should this<br className={styles.desktopBreak}/> be all<br className={styles.mobileBreak}/> we become?</h1>
      <p className={styles.answer}>We can <em>forge</em><br/>what comes next.</p>
      <p className={styles.lead}>The future will not build itself. But give people the tools, the skills and a place to begin—and watch what we can create together.</p>
      <div className={styles.actions}>
        <Link href="/products" className={styles.primary}>See what we are building <span aria-hidden="true">↗</span></Link>
        <Link href="/endless-possibilities" className={styles.secondary}>Be part of the possibility <span aria-hidden="true">→</span></Link>
      </div>
      <a className={styles.ndeca} href="#ndeca">The bigger picture: NDECA <span aria-hidden="true">↓</span></a>
    </div>
    <div className={styles.bottom}>
      <div className={styles.chapters} role="group" aria-label="Explore the four landscape stories">
        {chapters.map((item,index)=><button key={item.label} aria-pressed={chapter===index} onClick={()=>{setChapter(index);setScene('auto');setPaused(false);}}><span aria-hidden="true">0{index+1}</span> {item.label}</button>)}
      </div>
      <div className={styles.timeline} aria-hidden="true"><span>Where we are</span><i/><span>What we could build</span></div>
      <div className={styles.controls}>
        <button onClick={event=>{resetDepth(event.currentTarget.closest('section')!);if(paused){setScene('auto');setPaused(false);}else setPaused(true);}} aria-pressed={paused} aria-label={paused?'Play the landscape animation':'Pause the landscape animation'}>{paused?'Play scene':'Pause scene'}</button>
        <button onClick={()=>{setScene(value=>value==='possibility'?'today':'possibility');setPaused(true);}}>{scene==='possibility'?'See today':'See the possibility'}</button>
        {scene!=='auto' && <button onClick={()=>{setScene('auto');setPaused(false);}}>Let it unfold</button>}
      </div>
      <p className={styles.disclosure}>Photographs of life today meet illustrated possibilities for tomorrow. These future scenes are ideas, not existing developments.</p>
    </div>
  </section>;
}
