import EditorialVisual from "@/components/site/EditorialVisual";
import type { Metadata } from "next";
import Link from "next/link";
import s from "@/components/site/Site.module.css";
export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Forge handles website enquiries, programme requests and visitor choices.",
  alternates: { canonical: "/privacy" },
};
export default function Page() {
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>Your information</p>
        <h1>Privacy notice.</h1>
        <p className={s.lead}>
          A conversation about opportunity should begin with care for the people
          behind it.
        </p>
      </header>
      <EditorialVisual
        src="/images/editorial/privacy-care.webp"
        alt="Illustrative frosted glass sheltering a paper form and a living leaf"
        caption="AI-generated illustration · care for the people behind the information."
      />
      <article className={s.legal}>
        <p>
          Forge Intellitech Services Ltd handles information submitted through
          this website. For privacy questions or requests, email{" "}
          <a href="mailto:info@forgeintellitech.com">
            info@forgeintellitech.com
          </a>
          .
        </p>
        <h2>What you share with us</h2>
        <p>
          General enquiries ask for contact details and a message. Programme and
          contribution forms ask for information relevant to reviewing that
          request: school details, device specifications, skills, availability
          or support preferences. Student support requests also involve a parent
          or guardian. Do not send identity documents, medical details, home
          addresses or other sensitive documents through these forms.
        </p>
        <h2>Why we use it</h2>
        <p>
          We use your information to respond, assess eligibility or suitability,
          discuss a possible match and manage the next steps you request.
          Sending an enquiry does not subscribe you to unrelated marketing. A
          sponsor’s interest does not give them access to a student’s private
          contact details.
        </p>
        <h2>Storage and access</h2>
        <p>
          The submission service is designed to save enquiries in Supabase
          before attempting an email notification through Resend. Access is for
          authorised people handling the request and the service providers
          needed to operate it. These providers may process information outside
          Nigeria. We do not publish applications or sell enquiry information.
        </p>
        <p>
          We retain enquiry information for the purpose of reviewing and
          following up on your request, and for any applicable recordkeeping
          duties. You can ask us about the information held about you or request
          deletion. Before live launch, programme-specific retention periods and
          any additional notices will be confirmed as part of operational
          review.
        </p>
        <h2>Children and programme participation</h2>
        <p>
          A website request begins a review; it does not replace parent or
          guardian participation, school verification or a programme agreement.
          Public stories and progress updates require separate care and
          appropriate permission. Financial responsibilities and device
          agreements are discussed separately before participation.
        </p>
        <h2 id="student-imagery">Student imagery and privacy</h2>
        <p>
          We use AI-generated student imagery to illustrate learning and protect
          the privacy of children in our client schools. These illustrations do
          not show real client students and are labelled as AI-generated.
        </p>
        <p>
          Our policy requires appropriate parent or guardian and school
          permissions, together with applicable data-protection and safeguarding
          checks, before publishing a real student photograph. Historical
          archive photographs are identified separately. Permission for
          programme participation is not treated as blanket permission to
          publish a child's image.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          We store your cookie preference in your browser. Optional analytics
          help us understand website use and performance when enabled. You can
          reopen cookie settings from the footer to change your choice.
          Withdrawing consent stops future optional analytics loading on a fresh
          page load; it may not remove cookies already stored by a provider.
        </p>
        <h2>Your choices</h2>
        <p>
          You may ask about access, correction, deletion, restriction or
          objection where applicable. We may need to verify a request without
          collecting more information than necessary. You can also raise a
          concern with the{" "}
          <a href="https://ndpc.gov.ng/">Nigeria Data Protection Commission</a>.
        </p>
        <p>
          This notice will be reviewed before the redesigned website is
          published. Last updated: 21 October 2026.
        </p>
        <Link href="/contact">Contact Forge →</Link>
      </article>
    </div>
  );
}
