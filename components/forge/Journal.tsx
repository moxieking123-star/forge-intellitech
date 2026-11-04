"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRight} from "@phosphor-icons/react/dist/csr/ArrowRight";
import {Visual} from "./Shell";

export type JournalSummary={slug:string;title:string;category:string;excerpt:string;image:{src:string;alt:string};minutes:number};
export default function Journal({stories}:{stories:JournalSummary[]}) {
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All stories");
  const categories=["All stories",...new Set(stories.map(story=>story.category))];
  const filtered=useMemo(()=>stories.filter(story=>(category==="All stories"||story.category===category)&&`${story.title} ${story.excerpt}`.toLowerCase().includes(query.toLowerCase().trim())),[stories,query,category]);
  const featured=stories[0];
  return <>
    <section className="fg-page-hero"><div className="fg-container fg-journal-hero"><p className="fg-eyebrow">The Forge journal</p><h1>Ideas worth sharing.<br/>Possibilities worth building.</h1><p className="fg-lead">Reflections on technology, learning and the practical work of opening opportunity. Take a little time. Find a useful question.</p></div></section>
    {featured && !query && category==="All stories" && <section className="fg-section"><div className="fg-container fg-journal-feature"><Link href={`/blog/${featured.slug}`} aria-label={featured.title}><Visual src={featured.image.src} alt={featured.image.alt} priority caption="Editorial imagery"/></Link><div><p className="fg-eyebrow">Featured · {featured.category}</p><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><p className="fg-fine">About {featured.minutes} minutes to read</p><Link href={`/blog/${featured.slug}`} className="fg-button">Read the story<ArrowRight size={18}/></Link></div></div></section>}
    <section className="fg-section fg-journal-list" id="journal-stories"><div className="fg-container"><div className="fg-journal-filters"><div><p className="fg-eyebrow">Explore the journal</p><h2>Follow your curiosity.</h2></div><div className="fg-journal-controls"><label>Search stories<input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Technology, learning, opportunity…"/></label><label>Browse by theme<select value={category} onChange={event=>setCategory(event.target.value)}>{categories.map(value=><option key={value}>{value}</option>)}</select></label></div></div><p className="fg-fine" role="status" style={{marginBottom:22}}>{filtered.length} {filtered.length===1?"story":"stories"} found</p><div className="fg-journal-cards">{filtered.map(story=><article className="fg-journal-card" key={story.slug}><Link href={`/blog/${story.slug}`}><Visual src={story.image.src} alt={story.image.alt} caption="Editorial imagery"/><div className="fg-journal-card-copy"><p className="fg-eyebrow">{story.category}</p><h3>{story.title}</h3><p>{story.excerpt}</p><div className="fg-journal-card-meta"><span>About {story.minutes} min</span><span className="fg-link">Read story<ArrowRight size={16}/></span></div></div></Link></article>)}</div>{!filtered.length&&<div className="fg-empty"><h3>No stories found for that search.</h3><p>Try a broader phrase, or explore all the stories.</p><button type="button" className="fg-button" onClick={()=>{setQuery("");setCategory("All stories");}}>Show all stories</button></div>}</div></section>
    <section className="fg-section fg-school"><div className="fg-container fg-story-invite"><div><p className="fg-eyebrow">From reading to building</p><h2>There is a place<br/>for what you can bring.</h2><p>Explore the School Program, support a learner or bring a useful skill into the conversation.</p></div><div className="fg-actions"><Link className="fg-button" href="/contact">Start a conversation<ArrowRight size={18}/></Link><Link className="fg-link" href="/endless-possibilities">Meet the movement<ArrowRight size={18}/></Link></div></div></section>
  </>;
}
