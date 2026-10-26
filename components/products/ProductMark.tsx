"use client";
import { useEffect, useRef, useState } from "react";
import type { ProductId } from "@/lib/products";
import s from "./Products.module.css";
/** Original animated emblems developed from the approved product identities. */
export default function ProductMark({id}:{id:ProductId}) {
  const ref=useRef<HTMLSpanElement>(null); const [visible,setVisible]=useState(false);
  useEffect(()=>{const element=ref.current;if(!element)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.2});observer.observe(element);return()=>observer.disconnect();},[]);
  return <span className={s.mark} ref={ref} data-product={id} data-active={visible} aria-hidden="true"><svg viewBox="0 0 200 170" fill="none">
    {id==="bitebank"&&<>
      <path d="M32 153q-3-50 34-57l35 10 18 47" fill="#fa742b"/>
      <g className={s.head}>
        <path d="M54 49q-26 10-15 42l10 12q1 13 16 20l35-10 11-29-16-33z" fill="#b66d40" stroke="#102b2b" strokeWidth="3"/>
        <path d="M42 66q-16-31 23-33 22-36 49-4 7 17-17 21-28-9-35 24" fill="#f87922" stroke="#102b2b" strokeWidth="4"/>
        <path d="M52 78q-11-22 5-28l9 1-9 30" fill="#14262d"/>
        <ellipse cx="81" cy="73" rx="10" ry="13" fill="#fff4d9"/><circle className={s.eye} cx="86" cy="72" r="4" fill="#102b2b"/>
        <path d="M96 75l15 12-13 4" fill="#b66d40" stroke="#102b2b" strokeWidth="3" strokeLinejoin="round"/>
        <g className={s.jaw}><path d="M74 95q13 21 38 7l-8-10z" fill="#182932"/><path d="M77 96l27-2-5 7-16 1" fill="#fff2d5"/><path d="M82 110q8-9 16-5" stroke="#e95c43" strokeWidth="5"/></g>
        <path d="M69 57q9-7 17-1" stroke="#102b2b" strokeWidth="4" strokeLinecap="round"/>
      </g>
      <g className={s.meal}>
        <path d="M100 96q5-37 42-37 33 1 39 37z" fill="#f7a12e" stroke="#102b2b" strokeWidth="3"/>
        <path d="M103 104h75m-72 11h70m-67 12h64" stroke="#528334" strokeWidth="9" strokeLinecap="round"/>
        <path d="M105 134h71l-5 13h-61z" fill="#f7a12e" stroke="#102b2b" strokeWidth="3"/>
        <rect x="119" y="98" width="44" height="43" rx="5" fill="#187b7b" stroke="#102b2b" strokeWidth="3"/>
        <circle cx="141" cy="119" r="13" fill="#374e55" stroke="#fff1d6" strokeWidth="2"/><path d="M141 108v22m-10-11h21" stroke="#fff1d6"/>
        <path d="M124 74l3 2m12-7l3 2m12 3l3 2m8 7l3 2" stroke="#fff5da" strokeWidth="3" strokeLinecap="round"/>
      </g><path className={s.crumbs} d="M111 52l3-5m8 4l4-2m-9 12h5" stroke="#e9792a" strokeWidth="3"/>
    </>}
    {id==="trego"&&<><path d="M15 139h170" stroke="#bbc6ad" strokeWidth="3" strokeDasharray="9 8"/><g className={s.bus}><path d="M29 70q0-13 13-13h96l21 27v43H29z" fill="#fa792b" stroke="#153c30" strokeWidth="4"/><path d="M41 69h33v26H41zm42 0h32v26H83zm41 0h10l18 26h-28z" fill="#d7e6dd" stroke="#153c30" strokeWidth="2"/><path d="M28 107h132" stroke="#153c30" strokeWidth="4"/><circle cx="55" cy="127" r="14" fill="#183b30"/><circle cx="135" cy="127" r="14" fill="#183b30"/><path className={s.wheels} d="M48 127h14m-7-7v14" stroke="#e1e7d1" strokeWidth="3"/><path className={s.wheels} d="M128 127h14m-7-7v14" stroke="#e1e7d1" strokeWidth="3"/><path d="M14 82H2m13 15H7" stroke="#e57b3a" strokeWidth="3"/></g></>}
    {id==="dashboard"&&<><rect x="26" y="30" width="148" height="105" rx="9" fill="#153f32"/><rect x="34" y="39" width="132" height="86" rx="4" fill="#e0e7cf"/><path d="M64 145h72M100 135v10" stroke="#153f32" strokeWidth="5" strokeLinecap="round"/><g className={s.chart}><rect className={s.bar1} x="51" y="86" width="19" height="27" rx="2" fill="#336fe9"/><rect className={s.bar2} x="83" y="67" width="19" height="46" rx="2" fill="#336fe9"/><rect className={s.bar3} x="115" y="47" width="19" height="66" rx="2" fill="#f57a2b"/></g><path className={s.graph} d="M49 76l40-22 36-21m-13 0h14v14" stroke="#153f32" strokeWidth="4" strokeLinejoin="round"/></>}
    {id==="all-in"&&<><g className={s.ringOne}><circle cx="78" cy="86" r="40" stroke="#164132" strokeWidth="17"/></g><g className={s.ringTwo}><circle cx="126" cy="86" r="40" stroke="#f5772c" strokeWidth="17"/></g><path className={s.lock} d="M90 86l8 9 18-21" stroke="#164132" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></>}
  </svg></span>;
}
