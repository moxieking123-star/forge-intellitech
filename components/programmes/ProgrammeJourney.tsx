"use client";
import { useState } from 'react';
import type { ProgrammeKey } from './programme-details';
import { programmeDetails } from './programme-details';
import s from './ProgrammeDetail.module.css';
const support=[
  ['In the classroom','An instructor. A question. A beginning.','Guided demonstrations lead into practice and project work. Activities are adapted to the learner group, with room to ask questions and try again.'],
  ['Stay connected','The lesson needs room to continue.','Internet provision supports digital learning activities. Connectivity needs and practical arrangements are reviewed with the school before delivery begins.'],
  ['Saturday live','Another chance to ask and explore.','The live Saturday class creates a further opportunity for guidance and questions. Learner groups, joining details and timing are agreed with the school.'],
  ['Carry it forward','Their work becomes part of their story.','The dashboard direction brings learning records and projects together, with downloadable work for a portfolio. The dashboard is in testing; access and availability are confirmed during onboarding.'],
];
export default function ProgrammeJourney({programme,kind='activity'}:{programme:ProgrammeKey;kind?:'activity'|'support'}){
  const [active,setActive]=useState(0);
  const detail=programmeDetails[programme];
  const items=kind==='activity'?detail.exampleSteps:support;
  const id=`${programme}-${kind}-panel`;
  return <div className={s.explorer}>
    <div className={s.choices} aria-label={kind==='activity'?'Explore an example learning activity':'Explore programme support'}>
      {items.map((item,index)=><button key={item[0]} type="button" aria-pressed={active===index} aria-controls={id} onClick={()=>setActive(index)}><span>0{index+1}</span>{kind==='activity'?['Discover','Make','Improve'][index]:item[0]}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id={id} className={s.panel}>
      <div key={active} className={s.panelCopy} aria-live="polite" aria-atomic="true"><p className={s.eyebrow}>{kind==='activity'?'An illustrative activity':'Around the lesson'}</p><h3>{items[active][kind==='activity'?0:1]}</h3><p>{items[active][kind==='activity'?1:2]}</p></div>
      <div className={s.visual} data-step={active}>
        <svg viewBox="0 0 360 240" role="img" aria-label={kind==='support'?['Guided classroom learning','A connection extending learning','A live class connecting learners','Projects collected in a portfolio'][active]:programme==='techup'?['A question becomes a sketch','Pieces become a first prototype','A prototype is tested and improved'][active]:['An arrow sequence through a maze','A new route is tried','A character reaches its destination'][active]}>
          <rect x="12" y="12" width="336" height="216" rx="10" fill="#e8e3d5"/>
          {kind==='activity' && programme==='techup' && <><path d="M70 177h218" stroke="#7b8b78"/><rect x="85" y="143" width="76" height="33" rx="4" fill="#d38651"/><path d="M121 143v-42m0 21q-30 0-28-22 26-1 28 22m0-8q27-2 25-25-24 2-25 25" stroke="#477d4d" strokeWidth="4" fill="#7b9e69"/>{active>0&&<><rect x="218" y="123" width="45" height="54" rx="5" fill="#254b3c"/><path d="M218 142h-35v-27h-57" stroke="#eb6b2d" strokeWidth="4" className={s.signal}/><circle cx="240" cy="142" r="7" fill="#f6b93d"/></>}{active===2&&<><path d="M127 116q48-25 92 15" stroke="#2f96ad" strokeWidth="3" strokeDasharray="5 6" className={s.signal}/><path d="M268 70l10 10 21-24" stroke="#477d4d" strokeWidth="5"/><circle className={s.drop} cx="123" cy="134" r="3" fill="#2f96ad"/></>}<path d="M68 56h83m-83 12h59" stroke="#a2ad99" strokeWidth="3"/></>}
          {kind==='activity' && programme==='elytech' && <><path d="M62 172V70h79v69h82V70h72v104" stroke="#b9c2ae" strokeWidth="20" strokeLinejoin="round"/><path d={active===0?'M62 172V70h79':active===1?'M62 172V70h79v69h82':'M62 172V70h79v69h82V70h72v104'} stroke="#e97b32" strokeWidth="6" strokeDasharray="6 8" fill="none" className={s.signal}/><g transform={`translate(${active===0?141:active===1?223:295} ${active===0?70:active===1?139:174})`} className={s.mascot}><circle cy="-18" r="10" fill="#f4b934" stroke="#836728"/><path d="M-4-18h1m6 0h1m-8 5q4 4 8 0M0-7v15m0-8L-12-4m12 4 12-4M0 8l-9 13m9-13 9 13" stroke="#214b3a" strokeWidth="2.5" strokeLinecap="round"/></g>{active===2&&<path d="M278 45l6 6 12-14" stroke="#477d4d" strokeWidth="4"/>}</>}
          {kind==='support' && <><rect x="76" y="58" width="208" height="132" rx="8" fill="#173f31"/><rect x="85" y="68" width="190" height="105" rx="3" fill="#f4f1e9"/><path d="M57 194h246" stroke="#728b76" strokeWidth="8" strokeLinecap="round"/>{active===0&&<><circle cx="141" cy="105" r="15" fill="#e68c51"/><path d="M115 151q26-43 52 0" fill="#b5cba7"/><path d="M190 96h57m-57 17h42m-42 17h51" stroke="#a3b89a" strokeWidth="5"/></>}{active===1&&<g fill="none" stroke="#e97b32" strokeWidth="5" className={s.pulse}><path d="M135 110q45-35 90 0M151 127q29-24 58 0M168 144q12-10 24 0"/><circle cx="180" cy="156" r="3" fill="#e97b32"/></g>}{active===2&&<>{[0,1,2].map(i=><g key={i} transform={`translate(${105+i*51} 88)`}><rect width="44" height="62" rx="4" fill={i===1?'#f3be49':'#cfdec4'}/><circle cx="22" cy="22" r="9" fill="#9c6743"/><path d="M8 52q14-28 28 0" fill="#51785d"/></g>)}</>}{active===3&&<><path d="M110 91h140v67H110z" fill="#e9bd6e"/><path d="M110 91V82h56l13 9" fill="#e9bd6e"/><path d="M164 112v26m-10-10 10 10 10-10" stroke="#214b3a" strokeWidth="4"/><path d="M205 118l8 8 14-20" stroke="#477d4d" strokeWidth="4"/></>}</>}
        </svg>
        <p>Illustration of the learning journey · not a live dashboard</p>
      </div>
    </div>
  </div>;
}
