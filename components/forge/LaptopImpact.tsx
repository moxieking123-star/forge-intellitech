"use client";
import {useEffect,useState} from 'react';
import {deliveredLaptops} from '@/lib/laptop-initiative';

export function LaptopImpact() {
  const [counts,setCounts]=useState<{requests:number;donorOffers:number;requestLocations:{state:string;count:number}[];donorLocations:{state:string;count:number}[]}|null>(null);
  useEffect(()=>{let active=true;const controller=new AbortController();async function refresh(){try{const response=await fetch('/api/laptop-impact',{signal:controller.signal});if(!response.ok)return;const data=await response.json();if(active&&Number.isInteger(data.requests)&&Number.isInteger(data.donorOffers))setCounts(data);}catch{/* Do not turn a failed count request into a misleading zero. */}}void refresh();const timer=setInterval(refresh,60000);return()=>{active=false;controller.abort();clearInterval(timer);};},[]);
  return <section className="fg-section fg-laptop-impact" aria-labelledby="laptop-impact-title"><div className="fg-container">
    <p className="fg-eyebrow">A beginning we can account for</p>
    <h2 id="laptop-impact-title">Three devices.<br/>Three chances to keep building.</h2>
    <p>These laptops have already reached their learners. Every next handover should be another beginning we can stand behind.</p>
    <div className="fg-impact-grid">
      {counts && <><article><strong>{counts.requests}</strong><h3>Student requests received</h3><p>Repeat applications counted once</p></article><article><strong>{counts.donorOffers}</strong><h3>Donors showing interest</h3><p>Offers awaiting review and handover</p></article></>}
      <article><strong>{deliveredLaptops.total}</strong><h3>Laptops handed over</h3><p>Confirmed by Forge</p></article>
      {deliveredLaptops.states.map(item=><article key={item.state}><strong>{item.count}</strong><h3>{item.state} State</h3><p>Completed handovers</p></article>)}
    </div>
    {counts ? <div className="fg-form-grid"><div><h3>Where learners are asking</h3><ul>{counts.requestLocations.map(item=><li key={item.state}>{item.state}: {item.count}</li>)}</ul></div><div><h3>Where donors want to help</h3><ul>{counts.donorLocations.map(item=><li key={item.state}>{item.state}: {item.count}</li>)}</ul></div></div> : <p className="fg-fine">Current request and donor-interest counts are loading or temporarily unavailable. Confirmed handovers remain shown above.</p>}
    <p className="fg-fine">A request is not a confirmed allocation. A donor’s offer is not a completed handover. We keep those stages separate.</p>
  </div></section>;
}
