"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { reactions, visitorTypes } from "@/lib/preview-feedback";
import s from "./PreviewFeedback.module.css";

type Section = { value: string; label: string };
export default function PreviewFeedback() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null), trigger = useRef<HTMLButtonElement>(null);
  const requestId = useRef("");
  const [sections, setSections] = useState<Section[]>([]);
  const [section, setSection] = useState("Whole page"), [reaction, setReaction] = useState("");
  const [visitorType, setVisitorType] = useState(""), [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const close = () => { dialog.current?.close(); trigger.current?.focus(); };
  useEffect(() => { dialog.current?.close(); setStatus("idle"); setComment(""); setReaction(""); requestId.current = ""; }, [pathname]);

  function open() {
    const headings = Array.from(document.querySelectorAll<HTMLElement>("#main-content h1, #main-content h2"));
    const found: Section[] = [], seen = new Set<string>();
    let closest = "Whole page", distance = Infinity;
    for (const h of headings) {
      if (!h.getClientRects().length) continue;
      const label = (h.innerText || "").replace(/\s+/g, " ").trim().slice(0, 160);
      if (!label || seen.has(label)) continue;
      seen.add(label); found.push({ value: label, label });
      const block = h.closest("section") || h.parentElement;
      const rect = block?.getBoundingClientRect();
      if (rect && rect.bottom > 0 && rect.top < innerHeight) {
        const d = Math.abs(h.getBoundingClientRect().top - innerHeight / 3);
        if (d < distance) { closest = label; distance = d; }
      }
    }
    setSections(found); setSection(closest); setStatus("idle"); setError("");
    requestId.current = crypto.randomUUID();
    dialog.current?.showModal();
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending"); setError("");
    try {
      let sessionId: string;
      try {
        sessionId = sessionStorage.getItem("forge-preview-feedback-tab") || crypto.randomUUID();
        sessionStorage.setItem("forge-preview-feedback-tab", sessionId);
      } catch { sessionId = crypto.randomUUID(); }
      const response = await fetch("/api/preview-feedback", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: requestId.current, sessionId, page: pathname, section, reaction, visitorType, comment }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || !result.saved) throw new Error(result.error || "Your feedback wasn’t saved. Please try again.");
      setStatus("sent"); setComment(""); setReaction("");
    } catch (err) { setStatus("error"); setError(err instanceof Error && err.name !== "TimeoutError" ? err.message : "The connection took too long. Please try again."); }
  }

  if (/^\/(?:admin|auth|account|referrer|api)(?:\/|$)/.test(pathname)) return null;
  return <>
    <button ref={trigger} className={s.trigger} onClick={open} aria-haspopup="dialog">Help us forge this <span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className={s.dialog} aria-labelledby="feedback-title" onCancel={close} onClose={() => trigger.current?.focus()}>
      <button type="button" className={s.close} onClick={close} aria-label="Close feedback">×</button>
      <span className={s.eyebrow}>Your voice helps shape Forge</span>
      <h2 id="feedback-title">Help us forge this.</h2>
      {status === "sent" ? <div role="status" className={s.success}><h3>We’ve saved your feedback.</h3><p>Thank you for taking the time. This is how we make it better, together.</p><button className={s.send} onClick={close}>Keep exploring →</button></div> : <form onSubmit={submit}>
        <p className={s.intro}>What makes you curious? What isn’t working? Tell us as yourself.</p>
        <p className={s.page}>About <strong>{pathname === "/" ? "Homepage" : pathname}</strong></p>
        <label className={s.label} htmlFor="feedback-section">Which part?</label>
        <select id="feedback-section" value={section} onChange={e => setSection(e.target.value)} disabled={status === "sending"}>
          <option>Whole page</option>{sections.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}
        </select>
        <fieldset disabled={status === "sending"} className={s.feelings}><legend>How does it leave you feeling? <span>(optional)</span></legend><div>{reactions.map(r => <button key={r} type="button" aria-pressed={reaction === r} onClick={() => setReaction(reaction === r ? "" : r)}>{r}</button>)}</div></fieldset>
        <label className={s.label} htmlFor="feedback-comment">Anything we should understand or change? <span>(optional)</span></label>
        <textarea id="feedback-comment" rows={3} maxLength={1200} value={comment} disabled={status === "sending"} onChange={e => setComment(e.target.value)} placeholder="I expected… / I couldn’t find… / This made me think…" />
        <label className={s.label} htmlFor="feedback-visitor">I’m visiting as… <span>(optional)</span></label>
        <select id="feedback-visitor" value={visitorType} disabled={status === "sending"} onChange={e => setVisitorType(e.target.value)}><option value="">Prefer not to say</option>{visitorTypes.map(v => <option key={v}>{v}</option>)}</select>
        <p className={s.privacy}>No name or email is required. We save your feedback, the page and section, the site version and a temporary tab ID so the team can review it. Please leave out sensitive personal details.</p>
        {error && <p role="alert" className={s.error}>{error}</p>}
        <button className={s.send} type="submit" disabled={status === "sending" || (!reaction && !comment.trim())}>{status === "sending" ? "Saving your feedback…" : "Send honest feedback →"}</button>
        <p role="status" aria-live="polite" className={s.sr}>{status === "sending" ? "Saving your feedback" : ""}</p>
      </form>}
    </dialog>
  </>;
}
