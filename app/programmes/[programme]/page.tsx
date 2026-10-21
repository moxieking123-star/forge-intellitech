import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { programmeDetails, type ProgrammeKey } from '@/components/programmes/programme-details';
import ProgrammeJourney from '@/components/programmes/ProgrammeJourney';
import StudentImageNotice from '@/components/StudentImageNotice';
import s from '@/components/programmes/ProgrammeDetail.module.css';
export function generateStaticParams(){return Object.keys(programmeDetails).map(programme=>({programme}));}
function programmeFor(key:string){return Object.hasOwn(programmeDetails,key)?programmeDetails[key as ProgrammeKey]:null;}
export async function generateMetadata({params}:{params:Promise<{programme:string}>}):Promise<Metadata>{
 const {programme}=await params;const detail=programmeFor(programme);if(!detail)return{};
 return {title:`${detail.name} — ${detail.audience} with Forge`,description:detail.lead,alternates:{canonical:`/programmes/${programme}`},openGraph:{title:`${detail.name} | ${detail.question} ${detail.answer}`,description:detail.lead,images:[{url:`/images/programmes/${detail.image}.webp`,alt:detail.imageAlt}]}};
}
export default async function ProgrammePage({params}:{params:Promise<{programme:string}>}){
 const {programme}=await params;const detail=programmeFor(programme);if(!detail)notFound();const key=programme as ProgrammeKey;
 return <div className={s.page} id="home-content">
  <nav className={s.crumbs} aria-label="Breadcrumb"><Link href="/programmes">School programmes</Link><span aria-hidden="true">/</span><span aria-current="page">{detail.name}</span></nav>
  <section className={s.hero} aria-labelledby="programme-title"><div className={s.heroCopy}>
   <p className={s.eyebrow}>{detail.name} · {detail.audience}</p><h1 id="programme-title">{detail.question}<span>{detail.answer}</span></h1><p className={s.lead}>{detail.lead}</p>
   <div className={s.actions}><Link className={s.button} href="/programmes/enquire">Bring {detail.name} to your school <span aria-hidden="true">↗</span></Link><a className={s.textLink} href="#learning">See how learning happens ↓</a></div>
  </div><figure><div className={s.photo}><Image src={`/images/programmes/${detail.image}.webp`} alt={detail.imageAlt} fill priority sizes="(max-width:800px) 100vw,49vw"/></div><figcaption>AI-generated Nigerian learners and instructor · not actual client students</figcaption></figure></section>
  <section className={`${s.section} ${s.conviction}`}><h2>{detail.conviction}</h2><p>{detail.convictionCopy}</p></section>
  <section className={s.section}><p className={s.eyebrow}>Skills with somewhere to go</p><h2>Something to practise.<br/>Something to make their own.</h2><div className={s.skills}>{detail.skills.map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  <section id="learning" className={`${s.section} ${s.dark}`}><p className={s.eyebrow}>See the approach</p><h2>{detail.example}</h2><p className={s.sectionLead}>Explore a simple example of how guidance becomes practice, and practice becomes something a learner can explain.</p><ProgrammeJourney programme={key}/><p className={s.note}>An illustrative activity, not a fixed curriculum promise. Specific activities, equipment and project depth are agreed with your school.</p></section>
  <section className={`${s.section} ${s.dark}`}><p className={s.eyebrow}>The support around the lesson</p><h2>Make room for learning<br/>to keep going.</h2><ProgrammeJourney programme={key} kind="support"/></section>
  <section className={`${s.section} ${s.next}`}><h2>{detail.nextTitle}</h2><div><p>{detail.nextCopy}</p><div className={s.actions}><Link className={s.textLink} href={detail.nextHref}>{detail.nextLink} →</Link>{key==='techup'&&<Link className={s.textLink} href="/endless-possibilities/intern-with-forge">See the post-SSCE pathway →</Link>}</div></div></section>
  <section className={`${s.section} ${s.faq}`}><div><p className={s.eyebrow}>Before we begin</p><h2>Start with the<br/>questions that matter.</h2></div><div>{detail.faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  <StudentImageNotice/>
  <section className={`${s.section} ${s.closing}`}><p className={s.eyebrow}>Your school’s next beginning</p><h2>What could your learners<br/>discover about themselves?</h2><p>Tell us where they are starting. We will work through the programme, practical arrangements and next steps with your school.</p><div className={s.actions}><Link className={s.button} href="/programmes/onboard">Begin school onboarding ↗</Link><Link className={s.textLink} href="/programmes/resources">Get the parent resource kit →</Link><Link className={s.textLink} href="/programmes/enquire">Request the proposal privately →</Link></div></section>
 </div>;
}
