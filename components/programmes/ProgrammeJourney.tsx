"use client";
import { useState } from 'react';
import type { ProgrammeKey } from './programme-details';
import { programmeDetails } from './programme-details';
import s from './ProgrammeDetail.module.css';
const support=[
  ['In the classroom','An instructor. A question. A beginning.','Guided demonstrations lead into practice and project work. Activities are adapted to the learner group, with room to ask questions and try again.'],
  ['Stay connected','The lesson needs room to continue.','Internet provision supports digital learning activities. Connectivity needs and practical arrangements are reviewed with the school before delivery begins.'],
  ['Saturday live','Another chance to ask and explore.','SS1–SS3 learners join their track’s live class through the portal for about three hours on Saturdays. This is practical building time, including for eligible students supported with laptops.'],
  ['Carry it forward','Their work becomes part of their story.','The Forge Dashboard is already used by schools, with access included in programme onboarding. Students log in for assignments and submissions; parents log in to follow progress. By SS3, project work can be downloaded and assembled into a portfolio. Future professional profiles, including LinkedIn or suitable freelance platforms, depend on their age and eligibility rules; work and earnings are not guaranteed.'],
];
export default function ProgrammeJourney({programme,kind='activity'}:{programme:ProgrammeKey;kind?:'activity'|'support'}){
  const [active,setActive]=useState(0);
  const detail=programmeDetails[programme];
  const supportItems=programme==='elytech'?support.filter(item=>item[0]!=='Saturday live'):support;
  const items=kind==='activity'?detail.exampleSteps:supportItems;
  const id=`${programme}-${kind}-panel`;
  const visualStep=kind==='support'&&programme==='elytech'&&active===2?3:active;
  return <div className={s.explorer}>
    <div className={s.choices} aria-label={kind==='activity'?'Explore an example learning activity':'Explore programme support'}>
      {items.map((item,index)=><button key={item[0]} type="button" aria-pressed={active===index} aria-controls={id} onClick={()=>setActive(index)}><span>0{index+1}</span>{kind==='activity'?['Discover','Make','Improve'][index]:item[0]}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id={id} className={s.panel}>
      <div key={active} className={s.panelCopy} aria-live="polite" aria-atomic="true"><p className={s.eyebrow}>{kind==='activity'?'An illustrative activity':'Around the lesson'}</p><h3>{items[active][kind==='activity'?0:1]}</h3><p>{items[active][kind==='activity'?1:2]}</p></div>
      <div className={s.visual} data-step={active}>
        <svg viewBox="0 0 360 240" role="img" aria-label={kind==='support'?['Guided classroom learning','A connection extending learning','A live class connecting learners','Projects collected in a portfolio'][visualStep]:programme==='techup'?['A website plan and HTML code','HTML and CSS beside a website preview','A website is tested and improved'][active]:['A keyboard and Chisanbop practice','Scratch logic and Canva design','A learner explains a completed creation'][active]}>
          <rect x="12" y="12" width="336" height="216" rx="10" fill="#e8e3d5"/>
          {kind==='activity' && <>
            <rect x="36" y="40" width="288" height="158" rx="8" fill="#173f31"/>
            <rect x="46" y="52" width="268" height="130" rx="4" fill="#f4f1e9"/>
            {programme==='techup' ? <>
              <rect x="56" y="65" width="117" height="101" rx="4" fill="#254b3c"/>
              <text x="66" y="86" fill="#f5ba69" fontSize="12" fontFamily="monospace">&lt;html&gt;</text>
              <text x="72" y="107" fill="#d4e2cc" fontSize="11" fontFamily="monospace">&lt;h1&gt;Hello&lt;/h1&gt;</text>
              <text x="66" y="132" fill="#f5ba69" fontSize="11" fontFamily="monospace">color: forest;</text>
              <path d="M191 76h103v20H191z" fill="#ed7939"/><path d="M191 106h69m-69 10h96" stroke="#a6b29c" strokeWidth="4"/>
              <rect x="191" y="132" width={active===0?45:103} height="27" rx="3" fill="#c8d7bb"/>
              {active===2&&<path d="M264 143l8 8 15-20" stroke="#254b3c" strokeWidth="4" fill="none"/>}
            </> : <>
              <rect x="57" y="65" width="108" height="69" rx="4" fill="#ecd6ae"/>
              {[0,1,2].map(row=><g key={row}>{[0,1,2,3,4,5].map(col=><rect key={col} x={64+col*15} y={74+row*15} width="11" height="10" rx="2" fill={row===1?'#e97b32':'#fff9ec'}/>)}</g>)}
              <text x="61" y="153" fill="#254b3c" fontSize="10">TOUCH TYPING</text>
              <path d="M191 67h78v20h-8v7h-62v-7h-8zM191 99h92v20h-8v7h-76v-7h-8z" fill={active===0?'#d6aa4f':'#e97b32'}/>
              <text x="201" y="81" fill="#173f31" fontSize="9">when clicked</text><text x="201" y="113" fill="#173f31" fontSize="9">move 10 steps</text>
              <circle cx="211" cy="151" r="12" fill="#f1be54"/><path d="M238 141h44v23h-44z" fill="#b3c7a1"/>
              <text x="72" y="174" fill="#254b3c" fontSize="9">Chisanbop + Scratch + Canva</text>
            </>}
            <path d="M23 205h314" stroke="#8d9f85" strokeWidth="7" strokeLinecap="round"/>
          </>}
          {kind==='support' && <><rect x="76" y="58" width="208" height="132" rx="8" fill="#173f31"/><rect x="85" y="68" width="190" height="105" rx="3" fill="#f4f1e9"/><path d="M57 194h246" stroke="#728b76" strokeWidth="8" strokeLinecap="round"/>{active===0&&<><circle cx="141" cy="105" r="15" fill="#e68c51"/><path d="M115 151q26-43 52 0" fill="#b5cba7"/><path d="M190 96h57m-57 17h42m-42 17h51" stroke="#a3b89a" strokeWidth="5"/></>}{active===1&&<g fill="none" stroke="#e97b32" strokeWidth="5" className={s.pulse}><path d="M135 110q45-35 90 0M151 127q29-24 58 0M168 144q12-10 24 0"/><circle cx="180" cy="156" r="3" fill="#e97b32"/></g>}{visualStep===2&&<>{[0,1,2].map(i=><g key={i} transform={`translate(${105+i*51} 88)`}><rect width="44" height="62" rx="4" fill={i===1?'#f3be49':'#cfdec4'}/><circle cx="22" cy="22" r="9" fill="#9c6743"/><path d="M8 52q14-28 28 0" fill="#51785d"/></g>)}</>}{visualStep===3&&<><path d="M110 91h140v67H110z" fill="#e9bd6e"/><path d="M110 91V82h56l13 9" fill="#e9bd6e"/><path d="M164 112v26m-10-10 10 10 10-10" stroke="#214b3a" strokeWidth="4"/><path d="M205 118l8 8 14-20" stroke="#477d4d" strokeWidth="4"/></>}</>}
        </svg>
        <p>Illustration of the learning journey · not a live dashboard</p>
      </div>
    </div>
  </div>;
}
