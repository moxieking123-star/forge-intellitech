"use client";
import { useState } from "react";
import styles from "./SchoolResources.module.css";
const followups = `PARENT FOLLOW-UP TEMPLATES\n\nQUESTIONS WELCOME\nDear parents and guardians, following our introduction to the school's technology programme, please contact [school contact] with any questions about learning activities, arrangements or the parent-facing fee communicated by the school.\n\nPRACTICAL REMINDER\nDear parents and guardians, please review the programme information shared by [school name]. For confirmed joining arrangements and any next steps, contact [school contact].\n\nDEVICE QUESTIONS\nIf you would like to explore a device purchase, the school can request an introduction to a laptop supplier to discuss available options, including whether instalments may be available under the supplier's terms. Purchasing a device is a separate decision. Programme enrolment does not guarantee a laptop.\n`;
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
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [kind, setKind] = useState("introduction");
  const [device, setDevice] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const message = `Dear parents and guardians,\n\n${kind === "introduction" ? `${school.trim() || "[School name]"} would like to introduce Forge's school technology programmes: ElyTech for primary learners and TechUp for secondary learners. Through age-appropriate guidance and practical projects, students explore digital confidence, coding foundations, design and problem-solving.` : `Following our introduction to Forge's school technology programmes at ${school.trim() || "[School name]"}, we welcome your questions about the learning experience and the school's joining arrangements.`}\n\n${fee.trim() ? `Parent-facing fee communicated by our school: ${fee.trim()}. Please contact the school to clarify what this covers and the applicable arrangements.` : "Please contact the school for confirmed parent-facing fees and arrangements."}\n\n${device ? "If you would like to explore purchasing a device, we can request an introduction to a laptop supplier to discuss options, including whether instalments may be available, subject to the supplier's terms. A device purchase is a separate decision. Enrolment does not guarantee a laptop.\n\n" : ""}${note.trim() ? `${note.trim()}\n\n` : ""}Please ask any questions before making a decision. Contact: ${contact.trim() || "[School contact]"}.\n\n${school.trim() || "[School name]"}`;
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
          placeholder="Include the currency and period, if applicable"
        />
        <p className={styles.help}>
          Use only the fee your school intends to communicate to parents. Leave
          blank to invite parents to ask the school.
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
