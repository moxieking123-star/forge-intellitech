"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageMotion.module.css";

export default function PageMotion() {
  const pathname=usePathname();
  useEffect(()=>{
    const main=document.querySelector('main');
    if(!main || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    main.classList.add(styles.motionRoot);
    const sections=[...main.querySelectorAll('section')].filter(section=>section.id!=='company' && section.getBoundingClientRect().top>innerHeight*.95 && !section.parentElement?.closest('section'));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.setAttribute('data-reveal','seen');observer.unobserve(entry.target);}
    }),{threshold:.06,rootMargin:'0px 0px 40px 0px'});
    sections.forEach(section=>{section.setAttribute('data-reveal','waiting');observer.observe(section);});
    const focus=(event:FocusEvent)=>{if(event.target instanceof Element)event.target.closest('[data-reveal=waiting]')?.setAttribute('data-reveal','seen');};
    main.addEventListener('focusin',focus);
    return ()=>{observer.disconnect();main.removeEventListener('focusin',focus);main.classList.remove(styles.motionRoot);sections.forEach(section=>section.removeAttribute('data-reveal'));};
  },[pathname]);
  return null;
}
