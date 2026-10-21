import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import LearningStages from "../../components/programmes/LearningStages";
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
      "For younger learners, confidence comes from having a go. ElyTech introduces technology through guided, age-appropriate exploration, with room to ask questions, make choices and discover how an idea becomes something you can show.",
    skills: [
      "Build practical confidence with digital tools through purposeful activities.",
      "Explore coding foundations through sequences, patterns and problem-solving.",
      "Use design and simple projects to express an idea and explain the choices behind it.",
    ],
    teaching:
      "Teaching starts with clear demonstrations and supported practice. Learners try for themselves, share what they notice and build on each discovery.",
  },
  {
    id: "techup",
    name: "TechUp",
    level: "Secondary schools",
    title: "Practical skills. Ideas with somewhere to go.",
    intro:
      "TechUp helps secondary-school students move from using technology to creating with it. Learners connect coding foundations, design and practical digital skills to problems they can recognise, then develop projects that make their thinking visible.",
    skills: [
      "Practise digital tools and the logic behind coding.",
      "Design with a purpose: consider who a project is for and what it should do.",
      "Break a problem down, build a first version, test it and improve it with feedback.",
    ],
    teaching:
      "Guided instruction leads into practice and project work. Students learn to explain their decisions as well as demonstrate what they have made.",
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
            A child’s first encounter with technology can be the beginning of
            something much bigger.
          </p>
          <p>
            Forge helps schools make room for that beginning: practical learning
            that gives young people the confidence to explore, solve problems
            and bring their own ideas to life.
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
              src="/images/home/studio-beginning.webp"
              alt="A laptop and notebook in a sunlit creative workspace"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 47vw"
            />
          </div>
          <figcaption>
            Illustrative workspace · room for an idea to begin
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
              <h2>{offer.name}</h2>
              <p className={styles.tagline}>{offer.title}</p>
            </div>
            <div>
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
            </div>
          </article>
        ))}
      </section>
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
                The programme connects with the Forge dashboard to bring student
                learning records and project work into the learning journey.
                Access and the school’s setup are covered during onboarding.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>A Saturday live class</h3>
              <p>
                A live Saturday class creates another opportunity for guided
                learning and questions. The joining arrangements and relevant
                learner group are confirmed with the school.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className={styles.portfolio}>
        <p className={styles.eyebrow}>Something to carry forward</p>
        <h2>
          Leave school with more
          <br />
          than a memory of the lesson.
        </h2>
        <div className={styles.portfolioGrid}>
          <p>
            A student’s progress should belong to their story. Downloadable
            student records and projects help learners leave school with a
            portfolio: a way to look back at what they explored, show what they
            made and explain how their thinking developed.
          </p>
          <div>
            <h3>Work they can point to.</h3>
            <p>
              Not just “I studied technology,” but “Here is what I tried. Here
              is what I built. Here is what I would improve next.”
            </p>
            <p className={styles.note}>
              Portfolio downloads and record access are discussed as part of the
              school’s dashboard setup.
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
              The Give a Child a Laptop campaign is a separate initiative within
              Forge ITs. It supports eligible secondary-school students through
              verification and matching; a school programme enquiry does not
              guarantee a device.
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
            Start your school’s onboarding, request the proposal privately and
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
