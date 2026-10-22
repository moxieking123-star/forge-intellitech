"use client";
import { useEffect, useRef, useState } from "react";
import s from "./ForgeInteractions.module.css";
import "./ForgeCursor.css";
export default function ForgeInteractions(){
  const layer=useRef<HTMLDivElement>(null); const [paused,setPaused]=useState(false);
  useEffect(()=>{document.documentElement.dataset.forgeMotion=paused?'paused':'running';return()=>{delete document.documentElement.dataset.forgeMotion;};},[paused]);
  useEffect(()=>{
    document.documentElement.classList.add('forge-pointer');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');let timer:ReturnType<typeof setTimeout>|undefined;
    function scatter(event:MouseEvent){
      if(paused||reduced.matches||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const target=(event.target as Element).closest<HTMLAnchorElement|HTMLButtonElement>('a,button');
      if(!target||target.hasAttribute('disabled')||target.closest('dialog,[data-forge-journey]')||target.hasAttribute('aria-pressed')||target.hasAttribute('aria-expanded'))return;
      if(target instanceof HTMLAnchorElement && (target.origin!==location.origin||target.getAttribute('href')?.startsWith('#')))return;
      const bounds=target.getBoundingClientRect(),x=event.clientX||bounds.x+bounds.width/2,y=event.clientY||bounds.y+bounds.height/2,container=layer.current;
      if(!container)return;container.replaceChildren();if(timer)clearTimeout(timer);
      for(let i=0;i<12;i++){const shard=document.createElement('i'),angle=i*Math.PI/6,distance=32+Math.random()*38;shard.style.left=`${x}px`;shard.style.top=`${y}px`;shard.style.setProperty('--dx',`${Math.cos(angle)*distance}px`);shard.style.setProperty('--dy',`${Math.sin(angle)*distance}px`);shard.style.setProperty('--turn',`${i*37}deg`);shard.style.setProperty('--tone',i%3===0?'#f57832':i%3===1?'#9bad93':'#1a4b38');container.appendChild(shard);}
      timer=setTimeout(()=>container.replaceChildren(),480);
    }
    document.addEventListener('click',scatter);return()=>{document.removeEventListener('click',scatter);document.documentElement.classList.remove('forge-pointer');if(timer)clearTimeout(timer);layer.current?.replaceChildren();};
  },[paused]);
  return <><div ref={layer} className={s.shards} aria-hidden="true"/><button className={s.pause} onClick={()=>setPaused(value=>!value)} aria-pressed={paused}>{paused?'Resume product & click motion':'Pause product & click motion'}</button></>;
}
