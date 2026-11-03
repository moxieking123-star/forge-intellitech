import EditorialVisual from "@/components/site/EditorialVisual";
import type { Metadata } from "next";
import Link from "next/link";
import ReferralAccount from "@/components/referrals/ReferralAccount";
import {referralBackendEnabled} from "@/lib/server/referral-backend";
import s from "@/components/referrals/Referrals.module.css";

// Account availability follows the reviewed runtime configuration, not build-time flags.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Earn with Forge | Introduce a school",
  description:
    "Introduce schools to practical technology education. Understand Forge’s referral process, payment conditions and your next step.",
  alternates: { canonical: "https://forgeintellitech.com/earn-with-forge" },
};

export default function EarnWithForgePage() {
  const enabled = referralBackendEnabled() || process.env.REFERRALS_ENABLED === "true";
  return (
    <div className={s.page} id="home-content">
      <header className={`${s.wrap} ${s.hero}`}>
        <p className={s.eyebrow}>Earn with Forge</p>
        <h1>
          A good introduction.
          <br />
          <span>A useful beginning.</span>
        </h1>
        <p className={s.lead}>
          You may know a school ready to give its learners more practical
          experience with technology. Help make that conversation happen. When
          it becomes teaching, there is a place for you in the value created.
        </p>
        <div className={s.actions}>
          <a className={s.button} href="#account">
            Start with your account ↗
          </a>
          <Link className={s.textLink} href="/programmes">
            Understand the school programmes
          </Link>
        </div>
      </header>
      <div className={s.wrap}>
        <EditorialVisual
          src="/images/editorial/referral-connections.webp"
          alt="Illustrative school model connected to several distinct paths"
          caption="Useful introductions, new beginnings."
        />
      </div>
      <section
        className={`${s.wrap} ${s.steps}`}
        aria-labelledby="how-it-works"
      >
        <div>
          <p className={s.eyebrow}>An introduction with follow-through</p>
          <h2 id="how-it-works">
            Bring the right school.
            <br />
            Let’s do the work properly.
          </h2>
        </div>
        <ol>
          <li>
            <strong>Create your account.</strong>
            <p>
              Use your email to sign in securely. Your account gives you a
              referral number and a place to follow each school introduction.
              Register your bank details after signing in.
            </p>
          </li>
          <li>
            <strong>Help the school begin.</strong>
            <p>
              Make a school-specific link for an authorised representative to
              enquire. If the school needs help with internet access or the
              form, you can complete the same onboarding enquiry together from
              your account, with the introduction attributed to you.
            </p>
          </li>
          <li>
            <strong>Follow the real progress.</strong>
            <p>
              Forge reviews the school enquiry and coordinates the programme
              conversation. Submitting details does not mean the school is
              approved. Your account shows recorded progress towards teaching.
            </p>
          </li>
        </ol>
      </section>
      <section className={s.forest} aria-labelledby="referral-payment">
        <div className={`${s.wrap} ${s.payment}`}>
          <div>
            <p className={s.eyebrow}>Clear terms before you begin</p>
            <h2 id="referral-payment">
              15% of the net full
              <br />
              first school contract value.
            </h2>
          </div>
          <div>
            <p>
              Your referral amount is calculated after internet provision,
              direct school operation expenses and tax are deducted from the full
              first school contract value. Salaries are excluded from these deductions.
            </p>
            <p>
              Commission is paid once, when Forge receives the school’s first
              deposit in the fourth week of resumption.
              An introduction alone does not create earnings.
            </p>
            <p>
              Each school has its own agreement. Download it, sign externally
              and upload the signed PDF. It takes effect once the signed copy is
              uploaded and the school has signed its contract to commence.
            </p>
            <p>
              Amounts stay marked “Pending cost review” until confirmed.
              Payments require manual approval; the account records progress
              rather than promising an automatic bank transfer.
            </p>
            <p>
              Your role is a truthful, authorised introduction. You have no
              duty or liability for delivery, teaching, collections, support
              or performance guarantees. Do not commit Forge to unauthorised terms.
            </p>
            <p>
              Request your earnings and actual expense and tax deductions from
              your account. Forge must disclose them within five working days,
              excluding weekends and Nigerian public holidays. Full correct
              payment ends that school’s agreement while preserving accrued
              claims and other unpaid referrals.
            </p>
            <a className={s.textLink} href="/downloads/forge-referral-agreement-draft.pdf" download>
              Read the agreement draft ↗
            </a>
            <p>For a school-specific download and upload record, use your signed-in account.</p>
          </div>
        </div>
      </section>
      <section
        id="account"
        className={`${s.wrap} ${s.accountSection}`}
        aria-labelledby="account-title"
      >
        <p className={s.eyebrow}>Your referral account</p>
        <h2 id="account-title">
          Keep every introduction
          <br />
          connected to you.
        </h2>
        <ReferralAccount enabled={enabled} />
      </section>
      <section className={`${s.wrap} ${s.closing}`}>
        <h2>Start with an honest conversation.</h2>
        <p>
          Help the school understand the teaching, ask its questions and decide
          whether the programme fits. Share an invitation, without promising
          places, dates or income that Forge has not confirmed.
        </p>
        <div className={s.actions}>
          <Link className={s.textLink} href="/programmes">
            Explore school programmes ↗
          </Link>
          <Link className={s.textLink} href="/contact?interest=referral">
            Talk to Forge about referrals ↗
          </Link>
          <Link className={s.textLink} href="/blog">
            Read the Forge journal ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
