"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Field, Journey, journeys } from "./journeys";
import styles from "./Applications.module.css";

const journeyImages: Record<Journey, { file: string; alt: string; caption: string }> = {
  donor: { file: "donor", alt: "A laptop and its care accessories arranged on a desk.", caption: "AI-generated editorial illustration of device care." },
  student: { file: "student", alt: "A fictional Nigerian secondary school student learning with a laptop.", caption: "AI-generated scene with a fictional student; not a programme participant." },
  school: { file: "school-enquiry", alt: "Notebooks and practical project tools on a classroom table.", caption: "AI-generated editorial illustration of practical learning." },
  talent: { file: "talent", alt: "Creative prototypes, textile swatches and a sketchbook on a worktable.", caption: "AI-generated editorial illustration of creative practice." },
};

const consent: Field = {
  id: "contactConsent",
  label:
    "I agree that Forge may use these details to review this enquiry and contact me about it. I have read the privacy notice.",
  type: "checkbox",
};
export default function ApplicationForm({ journey }: { journey: Journey }) {
  const config = journeys[journey];
  const image = journeyImages[journey];
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState("");
  const [success, setSuccess] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const navigated = useRef(false);
  const allFields = [...config.steps.flatMap((item) => item.fields), consent];
  const reviewing = step === config.steps.length;
  useEffect(() => {
    if (navigated.current) heading.current?.focus();
  }, [step, success]);

  function validate(fields: Field[]) {
    const next: Record<string, string> = {};
    fields.forEach((field) => {
      const value = (values[field.id] || "").trim();
      if (!value && !field.optional)
        next[field.id] =
          field.type === "checkbox"
            ? "Please acknowledge this before continuing."
            : "Please complete this field.";
      else if (
        value &&
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        next[field.id] = "Enter a valid email address.";
      else if (
        value &&
        field.type === "tel" &&
        (!/^\+?[\d\s().-]{7,25}$/.test(value) ||
          value.replace(/\D/g, "").length < 7)
      )
        next[field.id] = "Enter a phone number with at least 7 digits.";
      else if (
        value &&
        field.type === "number" &&
        (!Number.isSafeInteger(Number(value)) ||
          Number(value) < (field.min || 1))
      )
        next[field.id] = "Enter a whole number of at least 1.";
      else if (value && field.type === "url") {
        try {
          const url = new URL(value);
          if (
            !["https:", "http:"].includes(url.protocol) ||
            url.username ||
            url.password ||
            !url.hostname.includes(".") ||
            /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(
              url.hostname,
            )
          )
            next[field.id] = "Enter a public http or https website URL.";
        } catch {
          next[field.id] =
            "Enter a complete public website URL, including https://.";
        }
      } else if (field.options && value && !field.options.includes(value))
        next[field.id] = "Choose one of the listed options.";
    });
    setErrors(next);
    if (Object.keys(next).length)
      requestAnimationFrame(() =>
        document.getElementById(Object.keys(next)[0])?.focus(),
      );
    return Object.keys(next).length === 0;
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    if (!reviewing) {
      if (validate(config.steps[step].fields)) {
        navigated.current = true;
        setStep(step + 1);
      }
      return;
    }
    if (!validate(allFields)) {
      const invalidStep = config.steps.findIndex((item) =>
        item.fields.some(
          (field) => !values[field.id]?.trim() && !field.optional,
        ),
      );
      if (invalidStep >= 0) setStep(invalidStep);
      return;
    }
    setSending(true);
    setFailure("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          inquiryType:
            journey === "talent"
              ? values.contribution === "Volunteering"
                ? "support"
                : ["Patronage", "Partnership"].includes(values.contribution)
                  ? "partnership"
                  : "careers"
              : config.inquiryType,
          submissionSource:
            journey === "donor" || journey === "student"
              ? "endless-possibilities"
              : journey === "school"
                ? "programmes"
                : ["Volunteering", "Patronage"].includes(values.contribution)
                  ? "endless-possibilities"
                  : values.contribution === "Partnership"
                    ? "general"
                    : "work",
          subject: config.subject,
          message: [
            config.subject,
            ...allFields.map(
              (field) =>
                `${field.label}: ${values[field.id]?.trim() || "Not provided"}`,
            ),
          ].join("\n\n"),
        }),
      });
      if (response.status !== 201)
        throw new Error(
          "Your enquiry could not be confirmed. Your answers are still here. Please try again, or contact Forge through the contact page.",
        );
      navigated.current = true;
      setSuccess(true);
    } catch {
      setFailure(
        "Your enquiry could not be confirmed. Your answers are still here. Please try again, or contact Forge through the contact page.",
      );
    } finally {
      setSending(false);
    }
  }

  function fieldControl(field: Field) {
    const common = {
      id: field.id,
      name: field.id,
      required: !field.optional,
      "aria-invalid": !!errors[field.id],
      "aria-describedby": `${field.id}-hint ${field.id}-error`,
      disabled: sending,
    };
    const change = (value: string) => {
      setValues((previous) => ({ ...previous, [field.id]: value }));
      setErrors((previous) => ({ ...previous, [field.id]: "" }));
    };
    return (
      <div className={styles.field} key={field.id}>
        <label htmlFor={field.id}>
          {field.type === "checkbox" && (
            <input
              {...common}
              type="checkbox"
              checked={values[field.id] === "Acknowledged"}
              onChange={(event) =>
                change(event.target.checked ? "Acknowledged" : "")
              }
            />
          )}
          {field.label}
          {!field.optional && <span aria-hidden="true"> *</span>}
        </label>
        {field.type !== "checkbox" &&
          (field.options ? (
            <select
              {...common}
              value={values[field.id] || ""}
              onChange={(event) => change(event.target.value)}
            >
              <option value="">Choose an option</option>
              {field.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              {...common}
              rows={5}
              maxLength={4000}
              value={values[field.id] || ""}
              onChange={(event) => change(event.target.value)}
            />
          ) : (
            <input
              {...common}
              type={field.type || "text"}
              min={field.min}
              step={field.type === "number" ? 1 : undefined}
              maxLength={field.type === "number" ? undefined : 300}
              autoComplete={
                ["name", "email"].includes(field.id)
                  ? field.id
                  : field.id === "phone"
                    ? "tel"
                    : undefined
              }
              value={values[field.id] || ""}
              onChange={(event) => change(event.target.value)}
            />
          ))}
        <small id={`${field.id}-hint`}>{field.hint}</small>
        <span className={styles.error} id={`${field.id}-error`}>
          {errors[field.id]}
        </span>
      </div>
    );
  }

  return (
    <div className={styles.page} id="home-content" tabIndex={-1}>
      <div className={styles.wrap}>
        <Link
          className={styles.back}
          href={
            journey === "donor" || journey === "student"
              ? "/endless-possibilities/give-a-child-a-laptop"
              : journey === "school"
                ? "/programmes"
                : "/join"
          }
        >
          ← Back to{" "}
          {journey === "school"
            ? "programmes"
            : journey === "talent"
              ? "Join Forge"
              : "the campaign"}
        </Link>
        <p className={styles.eyebrow}>
          {journey === "donor" || journey === "student"
            ? "Endless Possibilities · Forge ITs"
            : "Forge Intellitech Services Ltd"}
        </p>
        <h1>{config.title}</h1>
        <p className={styles.intro}>{config.intro}</p>
        <figure className={styles.editorial}>
          <Image src={`/images/editorial/applications/${image.file}.webp`} alt={image.alt} width={1440} height={960} sizes="(max-width: 948px) 100vw, 900px" priority />
          <figcaption>{image.caption}</figcaption>
        </figure>
        {success ? (
          <section className={styles.panel} role="status">
            <h2 ref={heading} tabIndex={-1}>
              Enquiry received.
            </h2>
            <p>{config.confirmation}</p>
            <Link href="/">Return to Forge</Link>
          </section>
        ) : (
          <form
            className={styles.panel}
            onSubmit={submit}
            noValidate
            aria-busy={sending}
          >
            <ol className={styles.steps} aria-label="Application progress">
              {[
                ...config.steps.map((item) => item.title),
                "Review and send",
              ].map((title, index) => (
                <li
                  key={title}
                  aria-current={index === step ? "step" : undefined}
                >
                  <span>{index + 1}.</span> {title}
                </li>
              ))}
            </ol>
            <p className={styles.eyebrow}>
              Step {step + 1} of {config.steps.length + 1}
            </p>
            <h2 tabIndex={-1} ref={heading}>
              {reviewing ? "Review your answers." : config.steps[step].title}
            </h2>
            <p className={styles.note}>
              Required fields are marked *. Please share only information
              relevant to this enquiry.
            </p>
            {reviewing ? (
              <>
                <dl className={styles.review}>
                  {allFields
                    .filter((field) => field.id !== consent.id)
                    .map((field) => (
                      <div key={field.id}>
                        <dt>{field.label}</dt>
                        <dd>{values[field.id] || "Not provided"}</dd>
                      </div>
                    ))}
                </dl>
                <p>
                  Forge uses these details to review and follow up on your
                  enquiry. See our <Link href="/privacy">privacy notice</Link>.{" "}
                  {journey === "donor" &&
                    "Optional donor updates are sent through Forge according to your preference."}
                </p>
                {fieldControl(consent)}
              </>
            ) : (
              config.steps[step].fields.map(fieldControl)
            )}
            {failure && (
              <p className={styles.failure} role="alert">
                {failure} <Link href="/contact">Contact Forge</Link>
              </p>
            )}
            <div className={styles.actions}>
              {step > 0 && (
                <button
                  type="button"
                  className={styles.secondary}
                  disabled={sending}
                  onClick={() => {
                    navigated.current = true;
                    setErrors({});
                    setStep(step - 1);
                  }}
                >
                  Previous
                </button>
              )}
              <button type="submit" disabled={sending}>
                {sending
                  ? "Sending…"
                  : reviewing
                    ? "Send enquiry"
                    : step === config.steps.length - 1
                      ? "Review answers"
                      : "Next"}
              </button>
            </div>
            <p className={styles.note}>
              Your answers stay on this page if sending fails. They are not
              saved as a draft if you leave or reload.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
