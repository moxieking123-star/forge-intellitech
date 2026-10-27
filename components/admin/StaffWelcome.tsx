"use client";
import type {PointerEvent} from "react";
import s from "./SchoolReview.module.css";

export default function StaffWelcome(){
 function light(event:PointerEvent<HTMLElement>){
  if(event.pointerType!=="mouse"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const bounds=event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--welcome-x",`${event.clientX-bounds.left}px`);
  event.currentTarget.style.setProperty("--welcome-y",`${event.clientY-bounds.top}px`);
 }
 return <aside className={s.welcome} onPointerMove={light} aria-label="A workspace built around people">
  <p className={s.welcomeKicker}>GOOD WORK STARTS WITH CARE</p>
  <h2>A little care.<br/><span>A bigger possibility.</span></h2>
  <p>Behind every request is someone hoping we will take the next step with them. This is where we do.</p>
  <div className={s.careOrbit} aria-hidden="true">
   <div className={s.careRing}/><div className={s.careRingTwo}/>
   <span className={s.careListen}>Listen</span><span className={s.careConnect}>Connect</span><span className={s.careBuild}>Build</span>
   <svg viewBox="0 0 100 100"><path d="M50 78C40 69 18 53 18 35C18 16 42 12 50 30C58 12 82 16 82 35C82 53 60 69 50 78Z" fill="currentColor"/><path d="m37 45 10 11 20-24" fill="none" stroke="#173c2e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
  <p className={s.welcomeFoot}>People. Ideas. A future worth showing up for.</p>
 </aside>;
}
