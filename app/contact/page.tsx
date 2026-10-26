import EditorialVisual from "@/components/site/EditorialVisual";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import s from "@/components/site/Site.module.css";
export const metadata: Metadata = {
  title: "Contact Forge — start a useful conversation",
  description:
    "Talk to Forge about school programmes, partnerships, investment or contributing to the Endless Possibilities movement.",
  alternates: { canonical: "/contact" },
};
export default function Page() {
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>Contact / Partnerships</p>
        <h1>
          Let’s begin with
          <br />
          <span className={s.accent}>a conversation.</span>
        </h1>
        <p className={s.lead}>
          Tell us what you have in mind, where you see a need and how you would
          like to build with Forge.
        </p>
        <a href="mailto:info@forgeintellitech.com">info@forgeintellitech.com</a>
      </header>
      <EditorialVisual
        src="/images/editorial/contact-conversation.webp"
        alt="Illustrative sculptural forms connected by an open paper bridge"
        caption="A place to begin a conversation."
      />
      <section className={s.split}>
        <div>
          <h2>A useful place to start.</h2>
          <p>
            For a school programme, laptop offer, student request or opportunity
            to work with us, the dedicated forms help us ask the right
            questions.
          </p>
          <div className={s.actions}>
            <Link href="/programmes/enquire">School programmes →</Link>
            <Link href="/endless-possibilities/give-a-child-a-laptop/donate">
              Offer a laptop →
            </Link>
            <Link href="/endless-possibilities/give-a-child-a-laptop/request-support">
              Student support →
            </Link>
            <Link href="/join/apply">Join Forge →</Link>
          </div>
          <dl>
            <dt>Work with Forge</dt>
            <dd>
              <a href="mailto:work@forgeintellitech.com">
                work@forgeintellitech.com
              </a>
            </dd>
            <dt>School programmes</dt>
            <dd>
              <a href="mailto:programs@forgeintellitech.com">
                programs@forgeintellitech.com
              </a>
            </dd>
            <dt>Endless Possibilities</dt>
            <dd>
              <a href="mailto:admin@forgeintellitech.com">
                admin@forgeintellitech.com
              </a>
            </dd>
          </dl>
          <p>
            Please keep private documents, identity numbers and sensitive
            student details out of a general enquiry.
          </p>
        </div>
        <div className={s.form}>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
