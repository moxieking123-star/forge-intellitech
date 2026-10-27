"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Applications.module.css";
type Purpose = "" | "work" | "instructor" | "volunteer" | "donation" | "partnership";
export default function ParticipationForm({donationOnly=false}:{donationOnly?:boolean}={}) {
    const [purpose, setPurpose] = useState<Purpose>(donationOnly ? "donation" : "");
    const [transfer, setTransfer] = useState(false);
    const [copied, setCopied] = useState("");
    const [amount, setAmount] = useState("");
    const [supportPurpose, setSupportPurpose] = useState("");
    const [reviewed, setReviewed] = useState(false);
    useEffect(() => { if(donationOnly)return;const choice = new URLSearchParams(window.location.search).get("purpose"); if (["work", "instructor", "volunteer", "donation", "partnership"].includes(choice || ""))
        setPurpose(choice as Purpose); }, [donationOnly]);
    async function copyAccount() { try {
        await navigator.clipboard.writeText("3001433209");
        setCopied("Account number copied.");
    }
    catch {
        setCopied("Please select and copy the visible account number below.");
    } }
    return <div className={styles.page}><div className={styles.wrap}>
    <Link className={styles.back} href={donationOnly?"/partner":"/join"}>← Back to {donationOnly?"ways to support Forge":"Join Forge"}</Link>
    <p className={styles.eyebrow}>Forge Intellitech Services Ltd</p><h1>{donationOnly?"Make room for a beginning.":"Introduce yourself."}</h1><p className={styles.intro}>{donationOnly?"Choose what you would like to support and view the bank-transfer details. Every useful contribution gives us more room to build.":"Tell us what you can bring, where you are based and how you would like to take part."}</p>
    <Image src="/images/editorial/applications/talent.webp" alt="Creative prototypes, textile swatches and a sketchbook on a worktable" width={1400} height={700} sizes="(max-width:800px) 100vw, 900px" style={{width:'100%',height:'auto',maxHeight:270,objectFit:'cover',borderRadius:5,marginBottom:30}}/>
    <form className={styles.panel} onSubmit={(event) => { event.preventDefault(); if (purpose === "donation")
        setTransfer(true);
    else
        setReviewed(true); }}>
      {!donationOnly&&<div className={styles.field}><label htmlFor="participation-purpose">How would you like to contribute?</label><select required id="participation-purpose" value={purpose} onChange={event => { setPurpose(event.target.value as Purpose); setTransfer(false); setReviewed(false); }}><option value="">Choose a purpose</option><option value="work">Work with Forge</option><option value="instructor">Tech instructor</option><option value="volunteer">Volunteering</option><option value="donation">Donate / contribute funds</option><option value="partnership">Partnership or investment conversation</option></select></div>}
      {purpose === "donation" ? <>
        <div className={styles.field}><label htmlFor="donation-amount">Amount you intend to give (NGN)</label><input id="donation-amount" type="number" min="1" step="0.01" required value={amount} onChange={event => { setAmount(event.target.value); setTransfer(false); }}/></div>
        <div className={styles.field}><label htmlFor="donation-purpose">What would you like to support?</label><select required id="donation-purpose" value={supportPurpose} onChange={event => { setSupportPurpose(event.target.value); setTransfer(false); }}><option value="">Choose a purpose</option><option>Laptop and learning support</option><option>Launchpad 2.0</option><option>Where Forge needs it most</option><option>Another purpose — discuss with Forge</option></select></div>
        {!transfer && <div className={styles.actions}><button type="submit">View bank-transfer instructions →</button></div>}
        {transfer && <section aria-labelledby="transfer-title"><h2 id="transfer-title">Make your transfer through your bank.</h2><p>You intend to give ₦{Number(amount).toLocaleString("en-NG")} for {supportPurpose.toLowerCase()}. These choices are not sent or saved.</p><dl className={styles.review}><div><dt>Bank</dt><dd>GTBank</dd></div><div><dt>Account name</dt><dd>Forge Intellitech Services Ltd.</dd></div><div><dt>Account number</dt><dd><strong style={{ userSelect: "all" }}>3001433209</strong></dd></div></dl><div className={styles.actions}><button type="button" onClick={copyAccount}>Copy account number</button></div><p role="status">{copied}</p><p>On your phone, copy the number, open your bank’s app and choose a bank transfer to GTBank. Check the recipient details before authorising payment. The website cannot open or prefill every banking app.</p><p>Viewing these instructions does not confirm a payment. Forge cannot verify receipt on this page. To discuss a contribution or follow up on a transfer, <a href="mailto:admin@forgeintellitech.com">email Forge</a>; never send your PIN, password or OTP.</p></section>}
      </> : purpose === "partnership" ? <p>Let’s begin with the kind of support you have in mind. <Link href="/partner">Explore investment, sponsorship and partnership →</Link></p> : purpose && <>
        <div className={styles.field}><label htmlFor="participant-name">Your name *</label><input id="participant-name" name="name" autoComplete="name" required/></div>
        <div className={styles.field}><label htmlFor="participant-email">Contact email *</label><input id="participant-email" name="email" type="email" autoComplete="email" required/></div>
        <div className={styles.field}><label htmlFor="participant-location">City, state / region and country *</label><input id="participant-location" name="location" required/><small>No home address needed. Tell us if you would like expansion materials for your state.</small></div>
        <div className={styles.field}><label htmlFor="participant-skills">{purpose === "volunteer" ? "How would you like to volunteer? What skills can you contribute?" : "Your abilities, technical skills and relevant experience"} *</label><textarea id="participant-skills" name="skills" required rows={5} maxLength={4000}/></div>
        {purpose === "instructor" && <div className={styles.field}><label htmlFor="participant-qualification">Your qualification and what you can teach *</label><textarea id="participant-qualification" name="qualification" required rows={3}/><small>Minimum OND and relevant technical skill. Current focus: Lagos, Ibadan in Oyo State, and Ogun State.</small></div>}
        <div className={styles.field}><label htmlFor="participant-availability">Your availability and preferred contribution *</label><textarea id="participant-availability" name="availability" required rows={3}/><small>{purpose === "volunteer" ? "Include your time zone and whether you can support the roughly three-hour Saturday SS1–SS3 track classes through the portal." : "Tell us about your laptop access, possible start period and the work you would like to do."}</small></div>
        <p>Read our <Link href="/privacy">privacy notice</Link> before sharing personal information.</p><div className={styles.actions}><button type="submit">Review next step →</button></div>
        {reviewed && <div role="status"><h2>Ready to start a conversation?</h2><p>This preview cannot send or save your introduction yet. Email your introduction to <a href={purpose === "volunteer" ? "mailto:admin@forgeintellitech.com" : "mailto:work@forgeintellitech.com"}>{purpose === "volunteer" ? "admin@forgeintellitech.com" : "work@forgeintellitech.com"}</a>. No application has been submitted from this page.</p></div>}
      </>}
      <p className={styles.note}>{donationOnly?"The amount and purpose here stay in your browser. To discuss your contribution or confirm a transfer, contact admin@forgeintellitech.com.":"Your entries stay only in this page while it is open. They are not saved when you leave or reload. Online enquiry submission will be connected separately."}</p>
    </form>
  </div></div>;
}
