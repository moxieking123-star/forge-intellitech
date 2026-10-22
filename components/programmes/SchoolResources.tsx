"use client";
import { useState } from "react";
import styles from "./SchoolResources.module.css";
const followups = `Dear parents and guardians,\n\n[School name] will begin Forge’s technology subject on [Confirmed start date]. Student and parent portal login details will be sent to you.\n\nFor questions, contact [School contact].`;
function download(text: string, name: string) {
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function SchoolResources() {
  const [school, setSchool] = useState("");
  const [fee, setFee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [kind, setKind] = useState("introduction");
  const [device, setDevice] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const schoolName = school.trim() || "[School name]";
  const schoolContact = contact.trim() || "[School contact]";
  const message = kind === "followup"
    ? `Dear parents and guardians,\n\n${schoolName} will begin Forge’s technology subject on ${startDate.trim() || "[Confirmed start date]"}. Student and parent portal login details will be sent to you.\n\nFor questions, contact ${schoolContact}.`
    : `Dear parents and guardians,\n\nWhen our children finish SS3, what will they be able to do with what they have learned? And beyond university, what useful skills will they carry with them? These are questions we care about at ${schoolName}.\n\nThat is why we have partnered with Forge to make practical technology learning a school subject for all students, not an optional club. Teaching happens in school, with 70% practical work and 30% theory.\n\nElyTech helps P1–P6 pupils connect Chisanbop mental maths, keyboard fluency, Scratch programming and Canva designs they can see in print. TechUp gives JSS learners foundations in design, data and coding; SS1–SS3 learners develop as Builders, Storytellers or Strategists. Digital citizenship begins in P1. All secondary learners explore how AI is developed and how human thinking guides its use.\n\nStudents receive portal logins for assignments and project submissions. Parents receive their own logins to follow progress. For SS1–SS3 only, Saturday live classes follow each learner’s track: about three hours of practical building through the portal, including eligible students supported with laptops. By SS3, students can download their project work and assemble a portfolio.\n\nThe school fee is ${fee.trim() || "[School fee amount]"} per child, per term.\n\nPlease begin budgeting for a laptop from Basic 3 upward. It is a learning tool, not a luxury. Forge supplies Chisanbop aids and practice keyboards for the early foundations. An internet-capable laptop can support class activities; the school and Forge can guide you on a suitable device. A child without a classroom laptop can practise dashboard activities later on a parent’s device.\n\n${device ? "We can request introductions to suppliers of used laptops below NGN100,000, depending on availability. Any instalment arrangement is subject to the supplier’s terms and approval.\n\n" : ""}${note.trim() ? `${note.trim()}\n\n` : ""}Let us give our children room to discover what they can build. For questions and preparation, contact ${schoolContact}.\n\n${schoolName}`;
  function validate() {
    setStatus("");
    if (!school.trim() || !contact.trim()) {
      setError(
        "Enter your school name and a contact parents can use before preparing a message.",
      );
      return false;
    }
    setError("");
    return true;
  }
  async function copy() {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Message copied. Review it before sending.");
    } catch {
      setError(
        "Copy is unavailable in this browser. Select and copy the preview text below, or download the text file.",
      );
    }
  }
  return (
    <section className={styles.builder} aria-label="Prepare a parent message">
      <form
        onSubmit={(event) => event.preventDefault()}
        className={styles.form}
      >
        <p className={styles.eyebrow}>01 / Make it yours</p>
        <h2>
          A clear message.
          <br />
          Your school’s details.
        </h2>
        <p>
          School name and contact are required. These details stay in this page;
          sharing opens WhatsApp so you can choose a recipient and send.
        </p>
        <label htmlFor="school-name">School name *</label>
        <input
          id="school-name"
          value={school}
          onChange={(event) => setSchool(event.target.value)}
          maxLength={120}
          required
          autoComplete="organization"
        />
        <label htmlFor="school-contact">Contact for parent questions *</label>
        <input
          id="school-contact"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          maxLength={180}
          required
          placeholder="School office phone or email"
        />
        <label htmlFor="parent-fee">
          Parent-facing fee chosen by your school (optional)
        </label>
        <input
          id="parent-fee"
          value={fee}
          onChange={(event) => setFee(event.target.value)}
          maxLength={160}
          placeholder="[School fee amount] — include the currency"
        />
        <p className={styles.help}>
          Use only the fee your school intends to communicate to parents. Leave
          blank to keep the visible [School fee amount] placeholder. The message always states per child, per term.
        </p>
        <label htmlFor="message-kind">Message</label>
        <select
          id="message-kind"
          value={kind}
          onChange={(event) => setKind(event.target.value)}
        >
          <option value="introduction">Parent introduction</option>
          <option value="followup">Parent follow-up</option>
        </select>
        <label htmlFor="programme-start-date">Confirmed start date (for the follow-up)</label>
        <input id="programme-start-date" value={startDate} onChange={(event) => setStartDate(event.target.value)} maxLength={80} placeholder="[Confirmed start date]" />
        <label htmlFor="school-note">
          Your school’s additional note (optional)
        </label>
        <textarea
          id="school-note"
          rows={4}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={800}
        />
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={device}
            onChange={(event) => setDevice(event.target.checked)}
          />
          <span>Include optional laptop supplier introduction</span>
        </label>
        <p className={styles.help}>
          The supplier decides availability and terms. No purchase or instalment
          approval is promised.
        </p>
      </form>
      <div className={styles.preview}>
        <p className={styles.eyebrow}>02 / Review before sharing</p>
        <h2>Your parent message.</h2>
        <p className={styles.help}>
          Check your school’s details and any fee before using this draft.
        </p>
        <div
          className={styles.message}
          role="region"
          aria-label="Live parent message preview"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={0}
        >
          {message}
        </div>
        <p className={styles.error} role="alert">
          {error}
        </p>
        <p className={styles.status} role="status">
          {status}
        </p>
        <div className={styles.actions}>
          <button type="button" onClick={copy}>
            Copy text
          </button>
          <button
            type="button"
            onClick={() => {
              if (validate()) download(message, "school-parent-message.txt");
            }}
          >
            Download personalised text
          </button>
          <button
            type="button"
            onClick={() => {
              if (validate())
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(message)}`,
                  "_blank",
                  "noopener,noreferrer",
                );
            }}
          >
            Share via WhatsApp ↗
          </button>
        </div>
        <p className={styles.help}>
          WhatsApp opens with your draft. You choose who receives it and send it
          manually.
        </p>
        <button
          className={styles.templateButton}
          type="button"
          onClick={() =>
            download(followups, "school-parent-follow-up-templates.txt")
          }
        >
          Download follow-up templates ↓
        </button>
      </div>
    </section>
  );
}
