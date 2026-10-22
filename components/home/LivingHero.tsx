"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./LivingHero.module.css";

export default function LivingHero() {
  const [paused,setPaused]=useState(false);
  const [scene,setScene]=useState<'auto'|'today'|'possibility'>('auto');
  return <section id="company" className={styles.hero} data-paused={paused} data-scene={scene} aria-labelledby="home-title">
    <div className={styles.landscape} aria-hidden="true">
      <Image className={styles.today} src="/images/home/nigeria-today.webp" alt="" fill priority sizes="100vw"/>
      <Image className={styles.possibility} src="/images/home/nigeria-possibility.webp" alt="" fill sizes="100vw"/>
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
      <div className={styles.timeline} aria-hidden="true"><span>Where we are</span><i/><span>What we could build</span></div>
      <div className={styles.controls}>
        <button onClick={()=>{if(paused){setScene('auto');setPaused(false);}else setPaused(true);}} aria-pressed={paused} aria-label={paused?'Play the landscape animation':'Pause the landscape animation'}>{paused?'Play scene':'Pause scene'}</button>
        <button onClick={()=>{setScene(value=>value==='possibility'?'today':'possibility');setPaused(true);}}>{scene==='possibility'?'See today':'See the possibility'}</button>
        {scene!=='auto' && <button onClick={()=>{setScene('auto');setPaused(false);}}>Let it unfold</button>}
      </div>
      <p className={styles.disclosure}>An imagined Nigerian neighbourhood and future. A vision to work towards.</p>
    </div>
  </section>;
}
