import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import LearningStages from "../../components/programmes/LearningStages";
import ProgrammeOfferVisual from "../../components/programmes/ProgrammeOfferVisual";
import SecondaryLearning from "../../components/programmes/SecondaryLearning";
import styles from "../../components/programmes/Programmes.module.css";

export const metadata: Metadata = {
  title: "TechUp & ElyTech | School Technology Programmes",
  description:
    "ElyTech for primary schools. TechUp for secondary schools. Practical digital confidence, coding foundations, design and projects with Forge.",
  alternates: { canonical: "https://forgeintellitech.com/programmes" },
};
const offers = [
  {
    id: "elytech",
    name: "ElyTech",
    level: "Primary schools",
    title: "Small discoveries. A bigger sense of possibility.",
    intro:
      "ElyTech is the technology subject for all P1–P6 pupils. Four connected skills give children practical ways to calculate, type, code and communicate.",
    skills: [
      "P1–P3 prioritise Chisanbop finger arithmetic and touch typing without looking at the keys.",
      "P3 is the transition: P3–P6 expand across typing, Chisanbop, Scratch coding logic and Canva design.",
      "Forge supplies Chisanbop learning aids and practice keyboards for guided practice.",
    ],
    teaching:
      "70% practical, 30% theory. From P1, digital citizenship introduces safe, respectful choices online. Children practise mental maths with Chisanbop, build keyboard fluency to enter instructions, give Scratch sprites actions through programming logic, and design Canva work they can see in print.",
  },
  {
    id: "techup",
    name: "TechUp",
    level: "Secondary schools",
    title: "Practical skills. Ideas with somewhere to go.",
    intro:
      "TechUp is a technology subject for all secondary students, with a shared JSS foundation and three senior pathways to develop different interests.",
    skills: [
      "JSS1–JSS3: Canva/Figma design, organising data with Excel, Power BI and HTML/CSS coding.",
      "Every JSS and SS learner explores what AI is, how it is developed, and how human thinking and judgement guide what we build with it.",
      "SS1–SS3 choose Builder, Storyteller or Strategist, supported by Saturday live classes.",
    ],
    teaching:
      "70% practical, 30% theory. Coding fundamentals and logic support useful projects, rather than years of syntax without making things. Students learn to explain their decisions as well as demonstrate what they have made.",
  },
];
export default function ProgrammesPage() {
  return (
    <div id="home-content" tabIndex={-1} className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ElyTech & TechUp · school programmes</p>
          <h1>
            From “I can use it” to <span>“I made it.”</span>
          </h1>
          <p className={styles.lead}>
            This is a school subject programme, not an in-school club.
          </p>
          <p>
            Forge complements your school’s digital education provision with practical skills students can demonstrate. We work alongside the curriculum: learners use resources available here in Nigeria to explore, solve problems and build useful things.
          </p>
          <Link className={styles.button} href="/programmes/enquire">
            Bring Forge to your school <ArrowRight size={21} aria-hidden />
          </Link>
          <nav
            className={styles.jumpLinks}
            aria-label="Choose a school programme"
          >
            <a href="#elytech">Primary school · ElyTech ↓</a>
            <a href="#techup">Secondary school · TechUp ↓</a>
          </nav>
        </div>
        <figure>
          <div className={styles.picture}>
            <Image
              src="/images/editorial/nigerian-student-tech-class.webp"
              alt="Fictional Nigerian students exploring technology together in a classroom"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 47vw"
            />
          </div>
          <figcaption>
            AI-generated Nigerian students · not actual client students
          </figcaption>
        </figure>
      </section>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>More than knowing the right answer</p>
        <div className={styles.introGrid}>
          <h2>
            What if the next question was:
            <br />
            <span>“What could you build?”</span>
          </h2>
          <p>
            Technology education should give a learner something to do with what
            they know. We connect digital confidence with coding foundations,
            design and problem-solving, then give those skills a purpose through
            projects. The starting point changes with the learner. The
            invitation stays the same: try, make, learn and improve.
          </p>
        </div>
      </section>
      <section className={styles.programmes} aria-label="Our school programmes">
        {offers.map((offer, index) => (
          <article id={offer.id} className={styles.programme} key={offer.id}>
            <div>
              <p className={styles.eyebrow}>
                0{index + 1} / {offer.level}
              </p>
              <h2>{offer.name}</h2>{offer.id === "elytech" && <span id="chisanbop" />}
              <p className={styles.tagline}>{offer.title}</p>
            </div>
            <div>
              <ProgrammeOfferVisual programme={offer.id as "elytech" | "techup"} />
              <p>{offer.intro}</p>
              <ul>
                {offer.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <p>{offer.teaching}</p>
              <Link className={styles.textLink} href="/programmes/enquire">
                Talk to us about {offer.name}{" "}
                <ArrowRight size={20} aria-hidden />
              </Link>
              <p><Link className={styles.textLink} href={`/programmes/${offer.id}`}>Explore the {offer.name} learning journey <ArrowRight size={20} aria-hidden /></Link></p>
            </div>
          </article>
        ))}
      </section>
      <SecondaryLearning />
      <section className={styles.learning}>
        <p className={styles.eyebrow}>How learning becomes making</p>
        <h2>
          A little guidance.
          <br />
          <span>A lot to discover.</span>
        </h2>
        <p className={styles.sectionLead}>
          Explore the approach behind both programmes. Activities and project
          depth are adapted to the learners’ age and starting point.
        </p>
        <LearningStages />
      </section>
      <section className={styles.support}>
        <div>
          <p className={styles.eyebrow}>The support around the lesson</p>
          <h2>
            Give learning
            <br />
            room to continue.
          </h2>
          <p>
            Good teaching needs practical support. Our school offer brings the
            learning experience and its supporting tools into the same
            conversation.
          </p>
        </div>
        <div className={styles.supportRows}>
          <article>
            <span>01</span>
            <div>
              <h3>Internet provision</h3>
              <p>
                Internet provision supports the programme’s digital learning
                activities. We discuss the school’s setting and connectivity
                needs during onboarding so the arrangements are clear before
                delivery begins.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Dashboard integration</h3>
              <p>
                The Forge Dashboard is already deployed and used by schools. Access comes with programme onboarding. Students log in for assignments and project submissions; parents receive portal logins to follow their child’s progress.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>A Saturday live class</h3>
              <p>
                For SS1–SS3 only: track-based live classes run for about three hours on Saturdays through the portal. Students build, ask questions and improve their work, including eligible students supported with laptops.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className={styles.portfolio}>
        <p className={styles.eyebrow}>Something to carry forward</p>
        <h2>
          By SS3, show the work.
          <br />
          Tell the story behind it.
        </h2>
        <div className={styles.portfolioGrid}>
          <p>
            Assignments and submitted projects record a student’s learning journey. By SS3, learners can download their work and assemble a portfolio: what they explored, what they built and how their thinking developed.
          </p>
          <div>
            <h3>Work they can point to.</h3>
            <p>
              Not just “I studied technology,” but “Here is what I tried. Here
              is what I built. Here is what I would improve next.”
            </p>
            <p className={styles.note}>
              Over time, this work can support applications and professional profiles such as LinkedIn or, where suitable, Upwork and Fiverr. Each platform has its own age and eligibility rules; a portfolio does not guarantee work or earnings.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.questions}>
        <div>
          <p className={styles.eyebrow}>Before we begin</p>
          <h2>A programme that starts with your school.</h2>
          <p>
            Tell us about your learners and what you want technology education
            to make possible. We’ll discuss the relevant programme and practical
            next steps.
          </p>
        </div>
        <div className={styles.faqs}>
          <details>
            <summary>Can a school enquire about both programmes?</summary>
            <p>
              Yes. ElyTech is for primary schools and TechUp is for secondary
              schools. If your school serves both, tell us in your enquiry so we
              can discuss each learner group.
            </p>
          </details>
          <details>
            <summary>What should we include in our enquiry?</summary>
            <p>
              Share your school name, location, whether you teach primary or
              secondary learners, and a contact person. A little context about
              your learners and existing technology setup will help us start a
              useful conversation.
            </p>
          </details>
          <details>
            <summary>How are timing and delivery agreed?</summary>
            <p>
              The school conversation covers learner groups, teaching
              arrangements, internet provision, dashboard access and the
              Saturday live class. Specific timing and commercial details are
              agreed during that process.
            </p>
          </details>
          <details>
            <summary>Is laptop support part of school enrolment?</summary>
            <p>
              Learners use their own gadgets; parents arrange laptops from Basic 3 upward. An internet-capable laptop of any specification can support school classes. A learner without a classroom device can later practise guided dashboard activities on a parent’s device when access is activated. Supplier introductions for used laptops below NGN100,000 depend on availability; suppliers may offer instalments under their terms.
            </p>
            <Link
              className={styles.textLink}
              href="/endless-possibilities/give-a-child-a-laptop"
            >
              Explore laptop support <ArrowRight size={18} aria-hidden />
            </Link>
          </details>
        </div>
      </section>
      <section className={styles.questions} aria-labelledby="school-next-steps">
        <div>
          <p className={styles.eyebrow}>Your school’s next step</p>
          <h2 id="school-next-steps">Make the beginning practical.</h2>
          <p>
            Onboarding for next term is open through 31 December 2026. Start your school’s onboarding, request the proposal privately and
            prepare a clear introduction for parents. Your school chooses the
            fee it communicates to parents; the agreement with Forge is
            discussed separately.
          </p>
        </div>
        <div className={styles.faqs}>
          <article>
            <h3>Begin school onboarding.</h3>
            <p>
              Share your school’s details and a contact person. Forge will
              review the request and discuss the proposal and delivery
              arrangements before teaching begins.
            </p>
            <Link className={styles.textLink} href="/programmes/onboard">
              Onboard your school →
            </Link>
          </article>
          <article>
            <h3>Give parents a clear picture.</h3>
            <p>
              Download a programme overview, customise parent introductions and
              follow-ups, then copy, download or share the message through
              WhatsApp.
            </p>
            <Link className={styles.textLink} href="/programmes/resources">
              Open the school resource kit →
            </Link>
          </article>
          <article>
            <h3>Know a school that could benefit?</h3>
            <p>
              Earn with Forge connects a useful introduction with a practical
              school programme. Referrers can also help an authorised school
              complete onboarding.
            </p>
            <Link className={styles.textLink} href="/earn-with-forge">
              Explore Earn with Forge →
            </Link>
          </article>
        </div>
      </section>
      <section className={styles.closing}>
        <p className={styles.eyebrow}>Let’s begin with your learners</p>
        <h2>
          What could your students
          <br />
          <span>make possible?</span>
        </h2>
        <p>
          Bring us your questions, your school’s context and your ambition for
          the young people in your care. Let’s work out the right beginning
          together.
        </p>
        <Link className={styles.lightButton} href="/programmes/enquire">
          Start a school conversation <ArrowRight size={21} aria-hidden />
        </Link>
        <Link className={styles.movementLink} href="/endless-possibilities">
          Discover the Forge ITs movement <ArrowRight size={18} aria-hidden />
        </Link>
      </section>
    </div>
  );
}
