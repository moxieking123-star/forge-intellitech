import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import styles from "../components/home/Home.module.css";

const work = [
  {
    title: "Learn to build.",
    description: (
      <>
        ElyTech for primary schools.
        <br />
        TechUp for secondary schools.
      </>
    ),
    href: "/techup",
    label: "Explore our school programmes",
  },
  {
    title: "Give an idea a beginning.",
    description: (
      <>
        In-school LaunchPad.
        <br />
        Practical enterprise learning.
      </>
    ),
    href: "/launchpad",
    label: "Explore LaunchPad",
  },
  {
    title: "Build for life here.",
    description: (
      <>
        Products in development.
        <br />
        Solutions rooted in African realities.
      </>
    ),
    href: "/products",
    label: "Explore our products",
  },
];

export default function HomePageClient() {
  return (
    <div className={styles.page} id="home-content" tabIndex={-1}>
      <section className={styles.hero} aria-labelledby="home-title">
        <Image
          className={styles.heroImage}
          src="/images/home/lagos-future.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 id="home-title">
              Africa can
              <br />
              create this.
              <br />
              <span>Let’s forge it.</span>
            </h1>
            <p>
              We build useful technology, teach practical skills, and back ideas
              born here.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.button} href="/join">
                Build with us <ArrowRight size={23} aria-hidden />
              </Link>
              <a className={styles.heroSecondary} href="#work">
                Explore our work <ArrowRight size={21} aria-hidden />
              </a>
            </div>
          </div>
          <p className={styles.visionCaption}>A vision of what we can build.</p>
        </div>
      </section>

      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Forge Intellitech Services Ltd</p>
          <div className={styles.companyIntro}>
            <h2 id="work-title">
              The next big thing
              <br className={styles.desktopBreak} /> can be built here.
            </h2>
            <p>
              We are a technology company building African solutions. Forge ITs
              is the movement within it: people creating what our future needs.
            </p>
          </div>
          <div className={styles.workRows}>
            {work.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={styles.workRow}
                aria-label={item.label}
              >
                <span className={styles.rowNumber}>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ArrowRight
                  className={styles.rowArrow}
                  size={29}
                  weight="light"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="movement"
        className={styles.campaign}
        aria-labelledby="movement-title"
      >
        <div className={`${styles.container} ${styles.campaignInner}`}>
          <div className={styles.campaignCopy}>
            <p className={styles.eyebrow}>
              Endless Possibilities <span>· A Forge ITs movement</span>
            </p>
            <h2 id="movement-title">
              Give a child
              <br />a <span>laptop.</span>
            </h2>
            <p className={styles.campaignLead}>
              Someone else’s child. Our shared future.
              <br />
              You provide a device. We provide a year of training.
            </p>
          </div>
          <div className={styles.campaignPicture}>
            <Image
              src="/images/home/laptop-opportunity.webp"
              alt="A laptop ready to become a tool for learning and creating"
              fill
              sizes="(max-width: 700px) 100vw, 55vw"
            />
          </div>
          <div className={styles.campaignBottom}>
            <div className={styles.campaignActions}>
              <a href="#movement-details" className={styles.button}>
                Explore the movement <ArrowRight size={23} aria-hidden />
              </a>
              <Link href="/contact?interest=laptop" className={styles.textLink}>
                Register donor interest <ArrowRight size={20} aria-hidden />
              </Link>
            </div>
            <p className={styles.eligibility}>
              For secondary-school students in public and low-income private
              schools.
              <br />
              Devices are requested only against verified student need.
            </p>
          </div>
        </div>
      </section>

      <details className={styles.movementAccordion}>
        <summary>
          <span>
            How a beginning happens
            <small>Devices, eligibility and a year of learning</small>
          </span>
          <Plus size={24} aria-hidden />
        </summary>
        <section
          id="movement-details"
          className={styles.movementDetails}
          aria-labelledby="beginning-title"
        >
          <div className={styles.container}>
            <div className={styles.movementIntro}>
              <p className={styles.eyebrow}>A device is a beginning</p>
              <h2 id="beginning-title">
                The possibility is
                <br />
                what happens next.
              </h2>
              <p>
                Giving a child the means to create can change a future we all
                share. We match devices to vetted students, then help them
                learn, build and keep going.
              </p>
            </div>
            <ol className={styles.steps}>
              <li>
                <span>01</span>
                <h3>A student asks.</h3>
                <p>
                  A secondary-school student applies or is identified through a
                  workshop.
                </p>
              </li>
              <li>
                <span>02</span>
                <h3>Forge verifies.</h3>
                <p>
                  We review their school, need and readiness for a year of
                  training.
                </p>
              </li>
              <li>
                <span>03</span>
                <h3>A donor is matched.</h3>
                <p>We agree on a suitable device and a supported handover.</p>
              </li>
              <li>
                <span>04</span>
                <h3>A year of building.</h3>
                <p>
                  Training and guidance help the learner turn access into
                  practical skills.
                </p>
              </li>
            </ol>
            <div className={styles.movementNote}>
              <p>
                New or used Windows laptops: Core i5, 5th generation or newer,
                at least 4 GB RAM and a 128 GB SSD.
              </p>
              <Link
                className={styles.textLink}
                href="/contact?interest=movement"
              >
                Offer a device, time or support{" "}
                <ArrowRight size={21} aria-hidden />
              </Link>
            </div>
            <p className={styles.processNote}>
              Forge coordinates eligibility, matching and delivery with students
              and their parents or schools. A request does not guarantee a
              device.{" "}
              <Link href="/contact?interest=student-support">
                Ask about student support.
              </Link>
            </p>
          </div>
        </section>
      </details>

      <section
        id="stories"
        className={styles.stories}
        aria-labelledby="stories-title"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>Stories from the movement</p>
          <h2 id="stories-title">A beginning changes what comes next.</h2>
          <div className={styles.storyGrid}>
            <article className={styles.story}>
              <div className={styles.storyPicture}>
                <Image
                  src="/images/home/ideas-in-motion.webp"
                  alt="Illustrative project notebook and tools in a sunlit workspace"
                  fill
                  sizes="(max-width: 700px) 28vw, 170px"
                />
              </div>
              <div>
                <h3>From school to paid internship</h3>
                <p>
                  A first job, practical experience and support for the
                  education still ahead.
                </p>
                <details className={styles.storyDetails}>
                  <summary>
                    Read the story <Plus size={18} aria-hidden />
                  </summary>
                  <p>
                    One of our interns joined Forge after secondary school.
                    Alongside paid work, he receives a monthly education support
                    fund through the internship. It is one way we are helping a
                    young person keep learning while gaining real experience.
                  </p>
                </details>
              </div>
            </article>
            <article className={styles.story}>
              <div className={styles.storyPicture}>
                <Image
                  src="/images/home/laptop-opportunity.webp"
                  alt="An illustrative laptop for continued learning"
                  fill
                  sizes="(max-width: 700px) 28vw, 170px"
                />
              </div>
              <div>
                <h3>Learning continues beyond the laptop</h3>
                <p>
                  A device opens a door. Guidance gives a learner a reason to
                  keep going.
                </p>
                <details className={styles.storyDetails}>
                  <summary>
                    Read the story <Plus size={18} aria-hidden />
                  </summary>
                  <p>
                    We have provided laptops to students so they can continue
                    learning. The device is part of a longer commitment:
                    practical skills, support and the confidence to turn an idea
                    into something useful.
                  </p>
                </details>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.invitation} aria-labelledby="invitation-title">
        <div className={`${styles.container} ${styles.invitationInner}`}>
          <h2 id="invitation-title">
            There is work
            <br />
            worth doing <span>here.</span>
          </h2>
          <div className={styles.invitationLinks}>
            <Link href="/techup">
              <GraduationCap size={35} weight="light" aria-hidden />
              <span>
                Bring Forge to your school<small>Explore the programmes</small>
              </span>
              <ArrowRight size={22} aria-hidden />
            </Link>
            <Link href="/join#talent">
              <Briefcase size={33} weight="light" aria-hidden />
              <span>
                Work with Forge<small>Find your place</small>
              </span>
              <ArrowRight size={22} aria-hidden />
            </Link>
            <Link href="/contact?interest=partnership">
              <Lightbulb size={35} weight="light" aria-hidden />
              <span>
                Partner or invest<small>Start a conversation</small>
              </span>
              <ArrowRight size={22} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
