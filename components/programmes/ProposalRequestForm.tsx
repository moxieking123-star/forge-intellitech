"use client";
import { useState, type FormEvent } from "react";
import s from "./ProposalRequestForm.module.css";

export default function ProposalRequestForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/programmes/proposal", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setMessage(result.queued ? "Your proposal request is saved. We’ll email your copy once delivery is confirmed. Please check your inbox and spam folder." : "Your proposal is on its way. Look for a message from the Forge programmes team, and check your spam folder too.");
      form.reset();
    } catch (error) { setMessage(error instanceof Error ? error.message : "We could not send the proposal. Please try again."); }
    finally { setBusy(false); }
  }
  return <section className={s.panel} id="proposal" aria-labelledby="proposal-title">
    <div><p className={s.kicker}>A beginning worth discussing</p><h2 id="proposal-title">The full picture.<br />In your inbox.</h2><p>Our school proposal explains the learning journey, devices, support and term fees in plain language. Leave your email and we’ll send you a copy to read with your team.</p><p>Schools can join for next term until <strong>31 December 2026</strong>.</p></div>
    <form onSubmit={submit} className={s.form}>
      <label>Your name<input name="name" autoComplete="name" maxLength={100} required /></label>
      <label>School name<input name="school" autoComplete="organization" maxLength={160} required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label className={s.trap} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className={s.consent}><input name="consent" type="checkbox" value="yes" required /><span>Email me the proposal and respond to this school enquiry. This does not subscribe me to a newsletter.</span></label>
      <button disabled={busy}>{busy ? "Sending your proposal…" : "Email me the school proposal →"}</button>
      <p role="status" aria-live="polite">{message}</p>
      <p className={s.small}>Need a conversation first? <a href="mailto:programs@forgeintellitech.com">programs@forgeintellitech.com</a>. <a href="/privacy">How we handle your information</a>.</p>
    </form>
  </section>;
}
