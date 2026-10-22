"use client";
import { useState } from "react";
import styles from "./SchoolResources.module.css";
const followups = `PARENT FOLLOW-UP TEMPLATES\n\nONBOARDING COMPLETE\nDear parents and guardians, [school name] has completed onboarding for Forge’s technology subject, beginning next term for all students. Please prepare an age-appropriate device; parents arrange laptops from Basic 3 upward. The school will send portal login details when setup is ready. Contact [school contact] with questions.\n\nDEVICE PREPARATION\nAn internet-capable laptop of any specification can support school classes. Learners use their own gadgets. Without a classroom device, learners can later practise guided dashboard activities on a parent’s device when access is activated. Supplier introductions for used laptops below NGN100,000 depend on availability. Suppliers may offer instalments under their own terms.\n`;
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
  const message = `Dear parents and guardians,\n\n${kind === "introduction" ? `${school.trim() || "[School name]"} is introducing Forge’s technology subject next term for all students, to broaden their future opportunities. ElyTech for P1–P6 develops Chisanbop finger arithmetic, touch typing without looking at the keys, Scratch coding logic and Canva design. P1–P3 prioritise typing and Chisanbop; P3–P6 expand across all four skills. TechUp gives JSS1–JSS3 a foundation in design, data, HTML/CSS, cyber citizenship and AI-assisted content work; SS1–SS3 choose Builder, Storyteller or Strategist.` : `${school.trim() || "[School name]"} has completed onboarding for Forge’s technology subject, starting next term for all students. Please prepare an age-appropriate device. Parents arrange laptops from Basic 3 upward. The school will send portal login details when setup is ready; the dashboard is in testing pending onboarding activation.`}\n\n${fee.trim() ? `School fee: ${fee.trim()}. Contact the school for what this covers and the applicable arrangements.` : "Please contact the school for its fee and practical arrangements."}\n\nLearners use their own gadgets. An internet-capable laptop of any specification can support school classes. Forge supplies Chisanbop learning aids and practice keyboards. Without a classroom device, learners can later practise guided dashboard activities on a parent’s device when access is activated.\n\n${device ? "The school can request introductions to suppliers of used laptops below NGN100,000, depending on availability. Suppliers may offer instalments under their terms; availability and approval are not guaranteed.\n\n" : ""}${note.trim() ? `${note.trim()}\n\n` : ""}For preparation and subject questions, contact: ${contact.trim() || "[School contact]"}.\n\n${school.trim() || "[School name]"}`;
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
