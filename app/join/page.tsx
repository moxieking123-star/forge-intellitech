import EditorialVisual from "@/components/site/EditorialVisual";
import type { Metadata } from "next";
import Link from "next/link";
import s from "@/components/site/Site.module.css";
import { Campaign, Rows } from "@/components/site/PageParts";
export const metadata: Metadata = {
  title: "Join Forge — bring what you can",
  description:
    "Work, teach, volunteer, sponsor or partner with Forge. Help build useful technology and practical opportunities for young people in Nigeria.",
  alternates: { canonical: "/join" },
};
export default function Page() {
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>Join us</p>
        <h1>
          Bring what you know.
          <br />
          <span className={s.accent}>Build what matters.</span>
        </h1>
        <p className={s.lead}>
          You do not need to solve everything to be part of a solution. A skill,
          an introduction, a few committed hours or the resources to give an
          idea a fair beginning can all have a place here.
        </p>
        <div className={s.actions}>
          <Link className={s.button} href="/join/apply">
            Introduce yourself →
          </Link>
          <Link href="/partner">
            Discuss a partnership →
          </Link>
        </div>
      </header>
      <EditorialVisual
        src="/images/editorial/join-office-planning.webp"
        alt="Young Nigerian adults discussing plans around laptops in an office"
        caption="An editorial scene about working together; the people shown are not Forge staff."
      />
      <section className={s.split}>
        <div><p className={s.eyebrow}>Actively recruiting</p><h2>Tech instructors who help people build.</h2><p>Have at least an OND and relevant technical skills? Tell us what you can teach and what you have built. Our current focus is Lagos, Ibadan in Oyo State, and Ogun State.</p></div>
        <div><h3>Your contribution can go further.</h3><p>If you have a useful skill and a laptop, tell us where you are based and what you would like to contribute. Teaching is one route; technology, design, operations and other practical skills matter too.</p><p>In another state? Introduce yourself and ask for our expansion materials. We can discuss how you could help bring the Forge movement to your area.</p><Link href="/join/apply">Tell us what you can bring →</Link></div>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>Volunteer from anywhere in the world</p><h2>A few committed hours can help someone build.</h2><p>Our Saturday live classes are for SS1–SS3 learners, follow their chosen track and last about three hours through the student portal. We welcome volunteers who can support practical building, feedback and learning, including students supported with laptops. Tell us your location, skills and availability so we can discuss a useful fit.</p><Link href="/join/apply?purpose=volunteer">Explore volunteering →</Link>
      </section>
      <section className={s.section}>
        <h2>There is more than one way to join.</h2>
        <Rows
          items={[
            {
              title: "Build with the company.",
              body: "Bring your experience in technology, design, education or the work that helps a company grow. Tell us what you can do and where you want to contribute. We review expressions of interest as needs develop.",
              href: "/join/apply",
              link: "Offer your skills",
            },
            {
              title: "Teach. Volunteer. Mentor.",
              body: "Help a learner understand a difficult idea, give useful feedback on a project or support an initiative. Tell us your skills and the time you can realistically commit.",
              href: "/join/apply",
              link: "Contribute your time",
            },
            {
              title: "Sponsor a beginning.",
              body: "Individuals and patrons can support devices, learning and enterprise opportunities. We will discuss a practical contribution around a defined need.",
              href: "/endless-possibilities",
              link: "Explore the movement",
            },
            {
              title: "Build a partnership.",
              body: "Schools, government, businesses and international organisations can bring reach, expertise and resources. Investors can start a conversation about the company and the work in progress.",
              href: "/partner",
              link: "Talk to Forge",
            },
          ]}
        />
      </section>
      <section className={s.split}>
        <h2>Just finished secondary school?</h2>
        <div>
          <p>
            Intern with Forge creates a practical route for recent SSCE leavers
            from participating schools, or public-school learners onboarded through Forge training, whose demonstrated learning fits the opportunity. The pathway combines
            paid work, practical skills and a monthly Education Support Fund
            during the internship.
          </p>
          <Link href="/endless-possibilities/intern-with-forge">
            Understand the internship pathway →
          </Link>
          <p className={s.caption}>
            An expression of interest is not a confirmed vacancy, interview or
            placement.
          </p>
        </div>
      </section>
      <Campaign />
    </div>
  );
}
