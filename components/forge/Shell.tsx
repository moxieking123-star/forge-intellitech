"use client";
import { frontendPreview } from "@/lib/frontend-preview";

import Image from "next/image";
import {socialChannels,whatsappUrl,whatsappNumber} from "@/lib/public-channels";
import CookieSettings from "../CookieSettings";
import PreviewFeedback from "../feedback/PreviewFeedback";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { WhatsappLogo } from "@phosphor-icons/react/dist/csr/WhatsappLogo";
import { Feather } from "@phosphor-icons/react/dist/csr/Feather";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";

const LightContext = createContext(false);
export function Visual({ src, alt, className = "", priority = false, caption = "" }: {src: string; alt: string; className?: string; priority?: boolean; caption?: string}) {
  const light = useContext(LightContext);
  return <figure className={`fg-visual ${className}`}>{light ? <div className="fg-light-placeholder"><Feather size={26}/><span>{alt}</span><small>Images paused in data-light mode</small></div> : <Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 60vw, 800px" priority={priority} quality={75}/>}{caption && <figcaption>{caption}</figcaption>}</figure>;
}

const primary = [{label:"Company",href:"/about"},{label:"School Program",href:"/programmes"},{label:"Products",href:"/products"},{label:"Movement",href:"/endless-possibilities"},{label:"Stories",href:"/blog"}];
const secondary = [{label:"LaunchPad",href:"/endless-possibilities/launchpad"},{label:"Earn with Forge",href:"/earn-with-forge"},{label:"Request a laptop",href:"/endless-possibilities/give-a-child-a-laptop/request-support"},{label:"Give a laptop",href:"/endless-possibilities/give-a-child-a-laptop/donate"},{label:"Work with Forge",href:"/join"},{label:"Partners & supporters",href:"/partner"},{label:"School resources",href:"/programmes/resources"}];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { dialog.current?.close();setOpen(false); }, [path]);
  useEffect(() => { if (!open) return;const previous = document.body.style.overflow;document.body.style.overflow = "hidden";return () => {document.body.style.overflow = previous;}; }, [open]);
  return <>
    <a className="fg-skip" href="#main-content">Skip to content</a>
    {frontendPreview && <div className="fg-preview"><span>Forge / The next chapter</span><span>Frontend preview — no submissions are sent</span></div>}
    <header className="fg-header"><div className="fg-container fg-header-inner">
      <Link href="/" aria-label="Forge home" className="fg-logo"><Image src="/images/brand/forge-wordmark.png" width={2045} height={769} sizes="110px" alt="Forge" priority/></Link>
      <nav className="fg-desktop-nav" aria-label="Main navigation">{primary.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined}>{item.label}</Link>)}<details className="fg-more"><summary>More <CaretDown size={12}/></summary><div>{secondary.map(item => <Link key={item.href} href={item.href} onClick={e => e.currentTarget.closest("details")?.removeAttribute("open")}>{item.label}<ArrowRight size={16}/></Link>)}</div></details></nav>
      <div className="fg-header-actions"><Link className="fg-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Forge on WhatsApp"><WhatsappLogo size={21}/> <span>WhatsApp</span></Link><Link className="fg-button fg-header-cta" href="/contact">Get in touch<ArrowRight size={17}/></Link><button className="fg-menu-toggle" ref={trigger} type="button" aria-label="Open navigation" aria-controls="forge-menu" aria-expanded={open} onClick={()=>{dialog.current?.showModal();setOpen(true);}}><List size={28}/></button></div>
    </div></header>
    <dialog ref={dialog} id="forge-menu" className="fg-menu" aria-label="Website navigation" onClose={()=>{setOpen(false);trigger.current?.focus();}} onClick={e=>{if(e.target === e.currentTarget) dialog.current?.close();}}><div className="fg-menu-top"><span className="fg-wordmark">Forge<span>.</span></span><button type="button" aria-label="Close navigation" onClick={()=>dialog.current?.close()}><X size={28}/></button></div><nav aria-label="Mobile navigation">{[...primary,...secondary].map(item=><Link key={item.href} href={item.href} onClick={()=>dialog.current?.close()}>{item.label}<ArrowRight size={20}/></Link>)}</nav><p>Technology. People. Possibilities.</p></dialog>
  </>;
}

export default function ForgeShell({ children }: {children: React.ReactNode}) {
  const [light, setLight] = useState(false);
  const [notice, setNotice] = useState(false);
  const path = usePathname();
  useEffect(()=>{try{setLight(localStorage.getItem("forge-data-light") === "true");}catch{}},[]);
  useEffect(()=>{setNotice(false);},[path]);
  return <LightContext.Provider value={light}><div className={`forge-site${light ? " fg-data-light" : ""}`}>
    <SiteHeader/>
    <main id="main-content" tabIndex={-1} onSubmitCapture={e=>{if(frontendPreview && !(e.target as HTMLFormElement).hasAttribute("data-forge-form")){e.preventDefault();e.stopPropagation();setNotice(true);}}}>{children}</main>
    {notice && <div role="status" className="fg-preview-toast"><p>Preview only. This form is not connected; no details were sent or saved.</p><button type="button" onClick={()=>setNotice(false)} aria-label="Dismiss preview notice"><X size={20}/></button></div>}
    <footer className="fg-footer"><div className="fg-container"><div className="fg-footer-top"><div><Link href="/" className="fg-wordmark">Forge<span>.</span></Link><p>Technology. People. Possibilities.</p><a className="fg-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={18}/>{whatsappNumber}</a><p className="fg-fine">Forge Intellitech Services Ltd.<br/>Lagos, Nigeria</p><a className="fg-link" href="mailto:info@forgeintellitech.com"><EnvelopeSimple size={18}/>info@forgeintellitech.com</a></div><div><h2>Explore Forge</h2><Link href="/about">Company & leadership</Link><Link href="/programmes">School Program</Link><Link href="/products">Products & technology</Link><Link href="/endless-possibilities">The movement</Link><Link href="/blog">Stories & journal</Link></div><div><h2>Find your place</h2><Link href="/endless-possibilities/give-a-child-a-laptop/donate">Give a laptop</Link><Link href="/endless-possibilities/give-a-child-a-laptop/request-support">Request a laptop</Link><Link href="/earn-with-forge">Earn with Forge</Link><Link href="/join">Work with Forge</Link><Link href="/contact">Get in touch</Link></div><div className="fg-footer-note"><p>Forged in Nigeria.<br/><strong>Built for what comes next.</strong></p><button className="fg-data-toggle" type="button" role="switch" aria-checked={light} onClick={()=>{const next=!light;setLight(next);try{localStorage.setItem("forge-data-light",String(next));}catch{}}}><span className="fg-toggle-track"><span/></span>Data-light mode</button><p className="fg-fine">Pause decorative images while you explore.</p></div></div><nav className="fg-socials" aria-label="Forge social channels">{socialChannels.filter(channel=>/^https:\/\//.test(channel.url)).map(channel=><a key={channel.label} href={channel.url} target="_blank" rel="noopener noreferrer">{channel.label}</a>)}</nav><div className="fg-footer-bottom"><span>Copyright {new Date().getFullYear()} Forge Intellitech Services Ltd.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/policy">Policy proposals</Link><Link href="/contact?interest=feedback">Feedback</Link></div><CookieSettings/><PreviewFeedback inline/></div></div></footer>
  </div></LightContext.Provider>;
}
