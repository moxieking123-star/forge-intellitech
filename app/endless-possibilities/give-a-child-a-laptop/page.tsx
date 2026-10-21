import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Laptop,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import JoinMovement from "../../../components/movement/JoinMovement";
import styles from "../../../components/movement/Movement.module.css";

export const metadata: Metadata = {
  title: "Give a Child a Laptop | Endless Possibilities",
  description:
    "Someone else's child. Our shared future. Join Forge ITs to match Windows laptops with verified secondary-school students in Nigeria and support a full year of learning.",
  alternates: {
    canonical:
      "https://forgeintellitech.com/endless-possibilities/give-a-child-a-laptop",
  },
  openGraph: {
    title: "Someone else’s child. Our shared future.",
    description:
      "Give a child a laptop. Help them discover what they can create. Endless Possibilities is a Forge ITs movement.",
    url: "https://forgeintellitech.com/endless-possibilities/give-a-child-a-laptop",
    type: "website",
    images: [
      {
        url: "/images/home/orange-beginning.webp",
        alt: "A laptop, a place to begin — Endless Possibilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Endless Possibilities | Forge",
    description: "A device. A year of learning. A different kind of beginning.",
    images: ["/images/home/orange-beginning.webp"],
  },
};

const steps = [
  {
    title: "A student asks.",
    text: "A secondary-school student puts themselves forward, or is identified through a school workshop. Our public-school workshops are being planned; a request is the start of a conversation, not a promise of a device.",
  },
  {
    title: "We verify the need.",
    text: "Forge reviews the student's school, circumstances and intended use: learning to build, or working on a project we have verified and approved. We also confirm readiness for a full year of training.",
  },
  {
    title: "A donor is matched.",
    text: "Only then do we request a suitable device. We discuss the donor's location and preferred area, the learner's needs, and an agreed handover with the family or school.",
  },
  {
    title: "The building begins.",
    text: "The student receives a device and commits to a full year of learning with Forge Intellitech. Training, practice and guidance help turn access into skills they can use.",
  },
];
const faqs = [
  {
    question: "Who can receive a laptop?",
    answer:
      "Secondary-school students in public schools and low-income private schools. Students can put themselves forward, and students will also be identified through planned school workshops. Forge vets eligibility and need before matching a device. A request does not guarantee a laptop.",
  },
  {
    question: "Do you accept used laptops?",
    answer:
      "Yes. We accept new and used Windows laptops with at least a Core i5 processor, 5th generation or newer, 4 GB RAM and a 128 GB SSD. Tell us the specifications and condition when you enquire so we can discuss suitability before handover.",
  },
  {
    question: "Can I choose where my device goes?",
    answer:
      "Tell us your location, the area you would like the receiving student to come from, and your preference for a public school or low-income private school. You can also indicate whether you want to support learning to build or a project Forge has verified and approved. Matching remains subject to verified student need and a suitable device.",
  },
  {
    question: "How does delivery work?",
    answer:
      "We agree on a day and arrangement with you. Options to discuss include collection by Forge, delivery to Forge, or direct delivery to the receiving student's school. We coordinate the handover with the school or family rather than asking you to arrange it alone.",
  },
  {
    question: "Can I speak to the student or receive updates?",
    answer:
      "Yes, you can tell Forge that you would like a call with the receiving student, and sponsors can request progress updates. Any call or handover is coordinated with Forge and the student's school or parent or guardian. Tell us your preferences when you enquire.",
  },
  {
    question: "Can I help with more than a laptop?",
    answer:
      "Yes. You can offer time, teach a practical skill, sponsor learning, become a patron or bring your organisation into the movement. Donors can also offer other financial assistance for a student; discuss the intended support with Forge so the arrangement is clear.",
  },
  {
    question: "What commitment does the student make?",
    answer:
      "Every receiving student must agree to a full year of training with Forge Intellitech. The device is intended for learning and approved project work. Responsibilities for care, resale, loss and damage will be set out and reviewed with the parent or guardian before handover. Formal agreements will be prepared before the programme proceeds to device handovers.",
  },
  {
    question: "Why register interest if no student is waiting?",
    answer:
      "A donor can tell us they are willing to help before a match is available. Registering interest is different from being asked to hand over a device. We request laptops only against verified student need; an expression of interest is not a device collection request.",
  },
];

export default function EndlessPossibilitiesPage() {
  return (
    <div className={styles.page} id="home-content" tabIndex={-1}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/endless-possibilities">Endless Possibilities</Link>
        <span aria-hidden> / </span>
        <span>Give a Child a Laptop</span>
      </nav>
      <section className={styles.hero} aria-labelledby="movement-title">
        <Image
          src="/images/home/orange-beginning.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            Endless Possibilities · a Forge ITs movement
          </p>
          <h1 id="movement-title">
            Someone else’s child.
            <br />
            <span>Our shared future.</span>
          </h1>
          <p className={styles.heroLead}>
            Give a child a laptop. We’ll help them discover what they can build
            with it.
          </p>
          <div className={styles.actions}>
            <a href="#give-device" className={styles.button}>
              Give a child a beginning <ArrowRight size={23} aria-hidden />
            </a>
            <a href="#join-movement" className={styles.textLink}>
              Find your place in the movement
            </a>
            <Link
              href="/contact?interest=student-support"
              className={styles.lightButton}
            >
              Student or parent? Talk to us <ArrowRight size={21} aria-hidden />
            </Link>
          </div>
          <p className={styles.heroNote}>
            A device. A full year of training. An opportunity to create.
          </p>
        </div>
      </section>

      <section className={styles.belief} aria-labelledby="belief-title">
        <p className={styles.eyebrow}>The future we keep waiting for</p>
        <div className={styles.beliefGrid}>
          <h2 id="belief-title">
            What if the missing thing
            <br />
            is an <span>opportunity?</span>
          </h2>
          <div className={styles.prose}>
            <p>
              How many children have grown up believing they are not good
              enough, simply because nobody introduced them to something they
              could be good at?
            </p>
            <p>
              We see young people with ideas, curiosity and the energy to
              create, but too few chances to discover what they can do.
              Sometimes the difference is exposure. Sometimes it is a device
              they can keep learning with after the class is over.
            </p>
            <p>
              A laptop will not solve every problem in a child’s life. But we
              refuse to believe that a meaningful opportunity cannot change its
              direction. A child who discovers a way to build, earn and
              contribute is part of a future that belongs to all of us.
            </p>
            <p>
              That is why someone else’s child matters. The opportunity you
              create today can reach people you may never meet.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>
            Student first. Support that follows through.
          </p>
          <h2 id="process-title">How a beginning happens.</h2>
          <p>
            We start with a young person who needs support. Then we bring the
            device and the learning together.
          </p>
        </div>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.processFoot}>
          <p>
            <CheckCircle size={23} aria-hidden />
            Devices are requested only against verified student need.
          </p>
          <Link
            href="/contact?interest=student-support"
            className={styles.textLink}
          >
            Ask about student support <ArrowRight size={21} aria-hidden />
          </Link>
        </div>
      </section>

      <section
        id="give-device"
        className={styles.devices}
        aria-labelledby="devices-title"
      >
        <div className={styles.deviceIntro}>
          <div>
            <p className={styles.eyebrow}>
              New or used. Ready for a new beginning.
            </p>
            <h2 id="devices-title">
              Your next upgrade could be
              <br />
              <span>their first opportunity.</span>
            </h2>
          </div>
          <Laptop size={74} weight="light" aria-hidden />
        </div>
        <div
          className={styles.specs}
          aria-label="Minimum Windows laptop specifications"
        >
          <div>
            <strong>Core i5</strong>
            <span>5th generation or newer</span>
          </div>
          <div>
            <strong>4 GB</strong>
            <span>RAM or more</span>
          </div>
          <div>
            <strong>128 GB</strong>
            <span>SSD storage or more</span>
          </div>
        </div>
        <div className={styles.deviceBottom}>
          <p>
            We accept Windows laptops, both new and used. A device can support a
            student learning to build or a project Forge has verified and
            approved. Tell us its specifications and condition, and we will
            discuss the right next step.
          </p>
          <Link href="/contact?interest=laptop" className={styles.lightButton}>
            Register donor interest <ArrowRight size={23} aria-hidden />
          </Link>
        </div>
      </section>

      <section className={styles.learning} aria-labelledby="learning-title">
        <figure>
          <div className={styles.learningPicture}>
            <Image
              src="/images/home/studio-beginning.webp"
              alt="Illustrative workspace with a laptop and project sketches, showing tools for learning and creating"
              fill
              sizes="(max-width: 700px) 100vw, 43vw"
            />
          </div>
          <figcaption>
            A vision of the space an opportunity can open.
          </figcaption>
        </figure>
        <div className={styles.learningCopy}>
          <p className={styles.eyebrow}>The handover is the beginning</p>
          <h2 id="learning-title">
            A device opens a door.
            <br />
            Learning gives it
            <br />
            <span>somewhere to lead.</span>
          </h2>
          <p>
            We are interested in what happens after the photograph. A student
            should have the time, guidance and practice to move from using
            technology to creating with it.
          </p>
          <p>
            Every receiving student commits to a full year of training with
            Forge Intellitech. We help them explore problems, develop practical
            skills and put their learning into projects. Sponsors can request
            updates on the learner they support.
          </p>
          <Link href="/programmes" className={styles.textLink}>
            Explore TechUp & ElyTech <ArrowRight size={22} aria-hidden />
          </Link>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title">
        <p className={styles.eyebrow}>The work behind the belief</p>
        <div className={styles.proofHeading}>
          <h2 id="proof-title">
            We have seen what
            <br />a beginning can do.
          </h2>
          <p>
            These are experiences from our work. They are the reason we want to
            create more opportunities, not a promise that every journey will
            look the same.
          </p>
        </div>
        <div className={styles.proofGrid}>
          <article>
            <span>01 / Keep learning</span>
            <h3>A laptop beyond the workshop.</h3>
            <p>
              We have given students laptops so they can keep learning after a
              programme ends. Access should not disappear just when a young
              person is discovering what they can do.
            </p>
          </article>
          <article>
            <span>02 / Keep building</span>
            <h3>An idea worth taking seriously.</h3>
            <p>
              Students in SSS 2 are thinking about businesses they could build.
              We have taught them to speak to a market before developing an
              idea, and offered to support the branding of their ideas.
            </p>
          </article>
          <article>
            <span>03 / Keep going</span>
            <h3>From school to paid internship.</h3>
            <p>
              A recent secondary-school leaver is working with us, earning an
              income and receiving monthly education support throughout his
              internship. Practical experience can open a door to what comes
              next.
            </p>
          </article>
        </div>
        <Link
          href="/endless-possibilities/in-school-launchpad"
          className={styles.textLink}
        >
          Meet our in-school LaunchPad <ArrowRight size={22} aria-hidden />
        </Link>
      </section>

      <JoinMovement focus="laptop" />

      <section className={styles.questions} aria-labelledby="questions-title">
        <div>
          <p className={styles.eyebrow}>Before you begin</p>
          <h2 id="questions-title">
            Good intentions.
            <br />
            Clear next steps.
          </h2>
          <p>
            If your question is not here, ask us. A useful contribution starts
            with an honest conversation.
          </p>
          <Link className={styles.textLink} href="/contact?interest=movement">
            Talk to Forge <ArrowRight size={22} aria-hidden />
          </Link>
        </div>
        <div className={styles.faqs}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <ArrowRight size={22} aria-hidden />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <p className={styles.eyebrow}>We are Nigerians. We can begin here.</p>
        <h2 id="closing-title">
          Who builds the future
          <br />
          if we all keep waiting?
        </h2>
        <p>
          Forge ITs is the movement within Forge Intellitech Services Ltd. We do
          not need to have every answer before we take responsibility for a
          small part of the solution. Bring what you can. Let us turn it into
          something a young person can actually use.
        </p>
        <a className={styles.lightButton} href="#join-movement">
          Let’s create what comes next <ArrowRight size={23} aria-hidden />
        </a>
      </section>
    </div>
  );
}
