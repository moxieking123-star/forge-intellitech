import type { Metadata } from "next";
import Link from "next/link";
import s from "@/components/site/Site.module.css";
export const metadata: Metadata = {
  title: "Website terms",
  description:
    "Information about website enquiries, programmes, products and participation at Forge.",
  alternates: { canonical: "/terms" },
};
export default function Page() {
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>Using this website</p>
        <h1>A clear beginning.</h1>
      </header>
      <article className={s.legal}>
        <h2>Information and enquiries</h2>
        <p>
          This website introduces Forge Intellitech Services Ltd and the Forge
          ITs movement. Sending a form expresses interest and starts a review.
          It does not confirm a school programme, job, internship, laptop
          allocation, donation collection or investment arrangement.
        </p>
        <h2>Programme participation</h2>
        <p>
          Eligibility, availability and agreed next steps apply. Student support
          involves school verification and parent or guardian participation. A
          full year of training is part of the laptop support pathway. Programme
          responsibilities, permissions and any device agreement will be
          discussed and documented separately before participation. These
          website terms are not that contract.
        </p>
        <h2>Donor interest and products</h2>
        <p>
          Registering a laptop offer is not an instruction to send a device.
          Forge requests devices against verified student demand and agrees
          delivery arrangements before a handover. Products labelled “In
          development” or “Testing” are work in progress; those labels do not
          promise a release date or public availability.
        </p>
        <h2>Stories, imagery and links</h2>
        <p>
          Historical activity is presented as such. Future editions and planned
          initiatives may change as arrangements develop. Illustrative imagery
          is identified where used. External websites have their own terms and
          privacy practices.
        </p>
        <h2>Responsible use</h2>
        <p>
          Provide accurate information you are entitled to share. Do not submit
          malicious content, private documents or another person’s sensitive
          details through a general enquiry. Contact us if something needs
          correction.
        </p>
        <h2>Questions</h2>
        <p>
          Email{" "}
          <a href="mailto:info@forgeintellitech.com">
            info@forgeintellitech.com
          </a>
          . These terms will be reviewed before live publication. Last updated:
          21 October 2026.
        </p>
        <Link href="/privacy">Read our privacy notice →</Link>
      </article>
    </div>
  );
}
