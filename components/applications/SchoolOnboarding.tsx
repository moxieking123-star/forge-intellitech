"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./SchoolOnboarding.module.css";

type Answers = {
  schoolName: string;
  level: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  learnerCount: string;
  startPeriod: string;
  context: string;
  note: string;
};
type Field = {
  id: keyof Answers;
  label: string;
  type?: "email" | "tel" | "number" | "textarea";
  hint?: string;
  optional?: boolean;
  options?: string[];
};
const schoolFields: Field[] = [
  { id: "schoolName", label: "School name" },
  {
    id: "level",
    label: "School level",
    options: ["Primary", "Secondary", "Both primary and secondary"],
  },
  {
    id: "location",
    label: "School city or town and state",
    hint: "For example, Ikeja, Lagos. A street address is not needed at this stage.",
  },
  {
    id: "learnerCount",
    label: "Approximate number of learners",
    type: "number",
    hint: "An estimate is fine. Enter a whole number of at least 1.",
  },
  {
    id: "startPeriod",
    label: "Preferred start period",
    hint: "For example, next term, January 2027, or “Let’s discuss”. This is a preference, not a confirmed start date.",
  },
  {
    id: "context",
    label: "Current devices and internet access",
    type: "textarea",
    hint: "Tell us what learners can currently use and any device, electricity or connectivity limitations. “No devices or internet yet” is a useful answer.",
  },
];
const contactFields: Field[] = [
  { id: "name", label: "Contact name" },
  { id: "email", label: "Contact email", type: "email" },
  { id: "phone", label: "Contact phone", type: "tel" },
  { id: "role", label: "Your role at the school" },
  {
    id: "note",
    label: "Anything else we should know? (optional)",
    type: "textarea",
    optional: true,
    hint: "Please leave out student names, private documents and other sensitive personal details.",
  },
];
const fields = [...schoolFields, ...contactFields];
const initialAnswers: Answers = {
  schoolName: "",
  level: "",
  location: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  learnerCount: "",
  startPeriod: "",
  context: "",
  note: "",
};
const referralPattern = /^FRG-[A-Z0-9]{12}$/;

export default function SchoolOnboarding({
  assisted = false,
}: {
  assisted?: boolean;
}) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [schoolAuthorised, setSchoolAuthorised] = useState(false);
  const [authState, setAuthState] = useState<
    "checking" | "ready" | "signedOut" | "unavailable"
  >(assisted ? "checking" : "ready");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [ignoredReferral, setIgnoredReferral] = useState(false);
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState("");
  const [saved, setSaved] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!assisted) return;
    const client = supabase;
    if (!client) {
      setAuthState("unavailable");
      return;
    }
    let active = true;
    client.auth
      .getUser()
      .then(({ data, error }) => {
        if (active) setAuthState(!error && data.user ? "ready" : "signedOut");
      })
      .catch(() => {
        if (active) setAuthState("signedOut");
      });
    return () => {
      active = false;
    };
  }, [assisted]);

  useEffect(() => {
    const supplied = new URLSearchParams(window.location.search).get("ref");
    if (supplied && referralPattern.test(supplied)) setReferralCode(supplied);
    else if (supplied) setIgnoredReferral(true);
  }, []);

  useEffect(() => {
    if (shouldFocus.current) title.current?.focus();
  }, [step, saved]);

  function goTo(next: number) {
    shouldFocus.current = true;
    setStep(next);
  }

  function validate(visible: Field[], includeConsent = false) {
    const nextErrors: Record<string, string> = {};
    visible.forEach((field) => {
      const value = answers[field.id].trim();
      if (!value && !field.optional)
        nextErrors[field.id] = "Please complete this field.";
      else if (
        value &&
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        nextErrors[field.id] = "Enter a valid contact email address.";
      else if (
        value &&
        field.type === "tel" &&
        (!/^\+?[\d\s().-]{7,25}$/.test(value) ||
          value.replace(/\D/g, "").length < 7)
      )
        nextErrors[field.id] = "Enter a phone number with at least 7 digits.";
      else if (
        value &&
        field.type === "number" &&
        (!Number.isSafeInteger(Number(value)) ||
          Number(value) < 1 ||
          Number(value) > 100000)
      )
        nextErrors[field.id] =
          "Enter a whole number of learners between 1 and 100,000.";
      else if (value && field.options && !field.options.includes(value))
        nextErrors[field.id] = "Choose a school level from the list.";
      else if (value.length > (field.type === "textarea" ? 3000 : 200))
        nextErrors[field.id] = "Please shorten this answer.";
    });
    if (includeConsent && !consent)
      nextErrors.consent =
        "Please acknowledge how Forge will use your details before sending.";
    if (includeConsent && assisted && !schoolAuthorised)
      nextErrors.schoolAuthorised =
        "Please confirm that the school has authorised this submission and follow-up.";
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      if (step === 2 && !["consent", "schoolAuthorised"].includes(firstError))
        goTo(schoolFields.some((field) => field.id === firstError) ? 0 : 1);
      requestAnimationFrame(() =>
        document.getElementById(`onboard-${firstError}`)?.focus(),
      );
    }
    return !firstError;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    if (step < 2) {
      if (validate(step === 0 ? schoolFields : contactFields)) goTo(step + 1);
      return;
    }
    if (!validate(fields, true)) return;
    inFlight.current = true;
    setSending(true);
    setFailure("");
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (assisted) {
        if (!supabase) {
          setAuthState("unavailable");
          return;
        }
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError || !userData.user) {
          setAuthState("signedOut");
          return;
        }
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (
          sessionError ||
          !sessionData.session?.access_token ||
          sessionData.session.user.id !== userData.user.id
        ) {
          setAuthState("signedOut");
          return;
        }
        headers.Authorization = `Bearer ${sessionData.session.access_token}`;
      }
      const clean = Object.fromEntries(
        Object.entries(answers).map(([key, value]) => [key, value.trim()]),
      );
      const response = await fetch("/api/schools/onboard", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...clean,
          learnerCount: Number(answers.learnerCount),
          referralCode,
          consent: true,
          ...(assisted ? { assisted: true, schoolAuthorised: true } : {}),
        }),
      });
      if (response.status !== 201) throw new Error("Not saved");
      shouldFocus.current = true;
      setSaved(true);
    } catch {
      setFailure(
        "We could not confirm that your request was saved. Your answers are still here. Please try again, or contact Forge before submitting another request if you are unsure whether it reached us.",
      );
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  function renderField(field: Field) {
    const control = {
      id: `onboard-${field.id}`,
      name: field.id,
      value: answers[field.id],
      required: !field.optional,
      disabled: sending,
      "aria-invalid": Boolean(errors[field.id]),
      "aria-describedby": [
        `onboard-${field.id}-hint`,
        errors[field.id] ? `onboard-${field.id}-error` : "",
      ]
        .filter(Boolean)
        .join(" "),
      onChange: (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) => {
        const value = event.target.value;
        setAnswers((previous) => ({ ...previous, [field.id]: value }));
        setErrors((previous) => ({ ...previous, [field.id]: "" }));
      },
    };
    return (
      <div className={styles.field} key={field.id}>
        <label htmlFor={control.id}>
          {field.label}
          {!field.optional && <span aria-hidden="true"> *</span>}
        </label>
        {field.options ? (
          <select {...control}>
            <option value="">Choose a level</option>
            {field.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea {...control} rows={4} maxLength={3000} />
        ) : (
          <input
            {...control}
            type={field.type || "text"}
            min={field.type === "number" ? 1 : undefined}
            step={field.type === "number" ? 1 : undefined}
            inputMode={field.type === "number" ? "numeric" : undefined}
            maxLength={field.type === "number" ? undefined : 200}
            autoComplete={
              field.id === "name"
                ? "name"
                : field.id === "email"
                  ? "email"
                  : field.id === "phone"
                    ? "tel"
                    : field.id === "schoolName"
                      ? "organization"
                      : undefined
            }
          />
        )}
        <small id={`onboard-${field.id}-hint`}>{field.hint}</small>
        {errors[field.id] && (
          <span className={styles.error} id={`onboard-${field.id}-error`}>
            {errors[field.id]}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={styles.page} id="home-content" tabIndex={-1}>
      <div className={styles.wrap}>
        <Link className={styles.back} href="/programmes">
          ← Explore school programmes
        </Link>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            {assisted ? "Assisted school onboarding" : "School onboarding"} ·
            Forge Intellitech Services Ltd
          </p>
          <h1>
            A practical next step.
            <br />
            <span>For your school.</span>
          </h1>
          <p className={styles.intro}>
            Tell us where your learners are starting and what your school needs.
            We’ll use this request to begin the conversation about ElyTech for
            primary schools, TechUp for secondary schools, or both.
          </p>
          {assisted && (
            <p className={styles.small}>
              Helping a school get started? Submit with the school’s
              authorisation, using its actual contact details. Your request goes
              into the same Forge onboarding review; submission does not
              activate a programme. Referral attribution is determined by Forge
              from your signed-in account and verification.
            </p>
          )}
        </header>
        <div className={styles.layout}>
          <aside className={styles.aside} aria-label="What happens next">
            <span className={styles.marker}>Start here</span>
            <h2>
              A request.
              <br />
              Then a conversation.
            </h2>
            <p>
              Forge reviews your school’s details and practical needs before
              discussing verification, arrangements and a contract.
            </p>
            <p>
              Sending this form does not activate a service, confirm acceptance
              or reserve a start date.
            </p>
            <Link href="/programmes/resources">
              Programme overview & parent templates ↗
            </Link>
            <p className={styles.small}>
              Share school and contact information only. No student records or
              private documents are needed.
            </p>
          </aside>
          {assisted && authState !== "ready" ? (
            <section className={styles.panel} aria-live="polite">
              <h2>
                {authState === "checking"
                  ? "Checking your account…"
                  : authState === "unavailable"
                    ? "Assisted onboarding is unavailable."
                    : "Sign in to assist a school."}
              </h2>
              <p>
                {authState === "checking"
                  ? "Please wait while we confirm you are signed in."
                  : authState === "unavailable"
                    ? "Account access is not configured in this environment. Assisted requests cannot be submitted here."
                    : "We could not confirm a signed-in account. Sign in to Earn with Forge, then return here to submit an authorised school request."}
              </p>
              {authState !== "checking" && (
                <Link href="/earn-with-forge#account">
                  Go to Earn with Forge account ↗
                </Link>
              )}
            </section>
          ) : saved ? (
            <section className={styles.panel} role="status">
              <p className={styles.eyebrow}>Request received</p>
              <h2 ref={title} tabIndex={-1}>
                Your onboarding request is saved.
              </h2>
              <p>
                Thank you for introducing your school. Your request is subject
                to Forge’s verification and a contract before any programme can
                begin. This confirmation does not activate a service or confirm
                acceptance.
              </p>
              {referralCode && (
                <p>
                  Your referral reference was included for review. Attribution
                  remains provisional until Forge validates it and checks for an
                  existing school record.
                </p>
              )}
              <Link href="/programmes/resources">
                Explore programme resources ↗
              </Link>
            </section>
          ) : (
            <form
              className={styles.panel}
              onSubmit={handleSubmit}
              noValidate
              aria-busy={sending}
            >
              <ol className={styles.progress} aria-label="Onboarding progress">
                {["School", "Contact", "Review"].map((label, index) => (
                  <li
                    key={label}
                    aria-current={index === step ? "step" : undefined}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </li>
                ))}
              </ol>
              <p className={styles.eyebrow}>Step {step + 1} of 3</p>
              <h2 ref={title} tabIndex={-1}>
                {
                  [
                    "Your school, as it is today.",
                    "Who should we speak with?",
                    "Check the details.",
                  ][step]
                }
              </h2>
              <p className={styles.small}>
                {step === 2
                  ? "Review your answers before sending. Use Previous to make changes."
                  : "Required fields are marked *. A clear estimate is more useful than a perfect answer."}
              </p>
              {step < 2 ? (
                (step === 0 ? schoolFields : contactFields).map(renderField)
              ) : (
                <>
                  <dl className={styles.review}>
                    {fields.map((field) => (
                      <div key={field.id}>
                        <dt>{field.label}</dt>
                        <dd>{answers[field.id].trim() || "Not provided"}</dd>
                      </div>
                    ))}
                  </dl>
                  <section
                    className={styles.referral}
                    aria-label="Referral reference"
                  >
                    <h3>Referral reference</h3>
                    <p>
                      {referralCode ? (
                        <>
                          <code>{referralCode}</code>
                          <br />
                          Captured from the link you opened. This reference is
                          included for Forge to validate; it is not a confirmed
                          referral.
                        </>
                      ) : ignoredReferral ? (
                        "The reference in this link did not match the required format and will not be submitted."
                      ) : (
                        "No referral reference was included in your link."
                      )}
                    </p>
                    <p>
                      Referral attribution is provisional until Forge validates
                      the reference and checks for an existing school record.
                    </p>
                  </section>
                  <p className={styles.small}>
                    Forge will use these details to review your school’s request
                    and contact you about onboarding. Read our{" "}
                    <Link href="/privacy">privacy notice</Link>.
                  </p>
                  <div className={styles.consent}>
                    <label htmlFor="onboard-consent">
                      <input
                        id="onboard-consent"
                        name="consent"
                        type="checkbox"
                        checked={consent}
                        required
                        disabled={sending}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={
                          errors.consent ? "onboard-consent-error" : undefined
                        }
                        onChange={(event) => {
                          setConsent(event.target.checked);
                          setErrors((previous) => ({
                            ...previous,
                            consent: "",
                          }));
                        }}
                      />
                      I agree that Forge may use these details to review this
                      request and contact me about school onboarding. *
                    </label>
                    {errors.consent && (
                      <span className={styles.error} id="onboard-consent-error">
                        {errors.consent}
                      </span>
                    )}
                  </div>
                  {assisted && (
                    <div className={styles.consent}>
                      <label htmlFor="onboard-schoolAuthorised">
                        <input
                          id="onboard-schoolAuthorised"
                          name="schoolAuthorised"
                          type="checkbox"
                          checked={schoolAuthorised}
                          required
                          disabled={sending}
                          aria-invalid={Boolean(errors.schoolAuthorised)}
                          aria-describedby={
                            errors.schoolAuthorised
                              ? "onboard-schoolAuthorised-error"
                              : undefined
                          }
                          onChange={(event) => {
                            setSchoolAuthorised(event.target.checked);
                            setErrors((previous) => ({
                              ...previous,
                              schoolAuthorised: "",
                            }));
                          }}
                        />
                        The school has authorised me to submit these details and
                        receive follow-up about this request. *
                      </label>
                      {errors.schoolAuthorised && (
                        <span
                          className={styles.error}
                          id="onboard-schoolAuthorised-error"
                        >
                          {errors.schoolAuthorised}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
              {failure && (
                <p role="alert" className={styles.failure}>
                  {failure} <Link href="/contact">Contact Forge</Link>
                </p>
              )}
              <div className={styles.actions}>
                {step > 0 && (
                  <button
                    className={styles.secondary}
                    type="button"
                    disabled={sending}
                    onClick={() => {
                      setErrors({});
                      goTo(step - 1);
                    }}
                  >
                    Previous
                  </button>
                )}
                <button type="submit" disabled={sending}>
                  {sending
                    ? "Saving request…"
                    : step === 2
                      ? "Send onboarding request"
                      : step === 1
                        ? "Review answers"
                        : "Next"}
                </button>
              </div>
              <p className={styles.small}>
                Your answers remain here if sending fails. They are not saved as
                a draft when you leave or reload this page.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
