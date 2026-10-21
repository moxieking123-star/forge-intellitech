import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import HeroPlay from "../components/home/HeroPlay";
import ProductRow from "../components/home/ProductRow";
import styles from "../components/home/Editorial.module.css";

const work = [
  {
    title: "Learn to build.",
    subtitle: "TechUp & ElyTech",
    description: "Practical technology education for real opportunities.",
    href: "/programmes",
  },
  {
    title: "Turn an idea into a beginning.",
    subtitle: "In-school LaunchPad",
    description: "Support for promising ideas, right where young people are.",
    href: "/endless-possibilities/in-school-launchpad",
  },
  {
    title: "Build solutions for life here.",
    subtitle: "Our products",
    description: "Technology designed for real needs in Nigeria.",
    href: "#products",
  },
];
const stories = [
  {
    title: "From school to paid internship",
    copy: "Finishing secondary school should open a door. Our intern is gaining practical experience, earning an income and receiving monthly support towards his education throughout his internship. A beginning should give you somewhere to go.",
  },
  {
    title: "Ideas taking shape in school",
    copy: "Students in SSS 2 are already thinking about the businesses they could build. We have taught them to speak to a market before developing an idea, and offered to support the branding of their ideas. Their questions today could become solutions tomorrow.",
  },
  {
    title: "What a laptop makes possible",
    copy: "We have given students laptops so learning can continue beyond a workshop. The device is only the beginning. With time, guidance and the chance to practise, a young person can move from watching what others build to creating something of their own.",
  },
];
export default function HomePageClient() {
  return (
    <div className={styles.page} id="home-content" tabIndex={-1}>
      <section
        id="company"
        className={styles.hero}
        aria-labelledby="home-title"
      >
        <div className={styles.heroCopy}>
          <h1 id="home-title">
            The next
            <br />
            big thing
            <br />
            can be
            <br />
            built <span>here.</span>
          </h1>
          <p>
            We are Forge Intellitech Services Ltd.
            <br />
            Building useful technology. Teaching people to create. Backing ideas
            that deserve
            <br className={styles.desktopBreak} /> a beginning.
          </p>
          <div className={styles.actions}>
            <a href="#work" className={styles.button}>
              Explore what we’re building <ArrowRight size={24} aria-hidden />
            </a>
            <Link href="/join" className={styles.textLink}>
              Work with Forge
            </Link>
          </div>
        </div>
        <figure className={styles.heroPicture}>
          <div className={styles.heroImage}>
            <HeroPlay />
            <Image
              src="/images/home/studio-beginning.webp"
              alt="An illustrative Nigerian workspace with a laptop, ideas on paper and a view towards the city"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 52vw"
            />
          </div>
          <figcaption>Tools. Skills. Ideas. A place to start.</figcaption>
        </figure>
      </section>
      <p className={styles.manifesto}>Made of possibility.</p>
      <section id="work" className={styles.work} aria-label="Our work">
        {work.map((item, index) => (
          <Link key={item.title} href={item.href} className={styles.workRow}>
            <span className={styles.number}>0{index + 1}</span>
            <div>
              <h2>{item.title}</h2>
              <span className={styles.subtitle}>{item.subtitle}</span>
            </div>
            <p>{item.description}</p>
            <ArrowRight size={31} weight="light" aria-hidden />
          </Link>
        ))}
      </section>
      <ProductRow />
      <section
        id="movement"
        className={styles.movement}
        aria-labelledby="movement-title"
      >
        <Image
          src="/images/home/orange-beginning.webp"
          alt=""
          fill
          sizes="100vw"
          className={styles.movementImage}
        />
        <div className={styles.movementCopy}>
          <p className={styles.eyebrow}>
            Endless Possibilities — a Forge ITs movement
          </p>
          <h2 id="movement-title">
            Someone else’s child.
            <br />
            <span>Our shared future.</span>
          </h2>
          <p className={styles.movementLead}>
            Give a child a laptop. We’ll help them learn to build with it.
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href="/endless-possibilities">
              Discover Endless Possibilities{" "}
              <ArrowRight size={24} aria-hidden />
            </Link>
            <Link
              href="/endless-possibilities#join-movement"
              className={styles.textLink}
            >
              Volunteer your time
            </Link>
          </div>
        </div>
      </section>
      <section
        id="stories"
        className={styles.newsroom}
        aria-labelledby="stories-title"
      >
        <p className={styles.eyebrow}>From our newsroom</p>
        <div className={styles.newsGrid}>
          <h2 id="stories-title">
            Proof,
            <br />
            <span>told properly.</span>
          </h2>
          {stories.map((story) => (
            <article key={story.title}>
              <details>
                <summary>
                  <h3>{story.title}</h3>
                  <ArrowRight size={27} weight="light" aria-hidden />
                </summary>
                <p>{story.copy}</p>
              </details>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.nextChapter} aria-labelledby="ndeca-title">
        <div>
          <p className={styles.eyebrow}>A bigger possibility · NDECA</p>
          <h2 id="ndeca-title">Build it here.<br /><span>Make room for scale.</span></h2>
        </div>
        <div>
          <p>What if the things we are building could reach beyond the schools and communities we can serve on our own?</p>
          <p>That is the thinking behind NDECA. We are developing something designed to scale, with governance through a public–private partnership. We are preparing to present it to the appropriate authorities. The proposal is still in development; no partnership has been approved.</p>
          <Link href="/contact?interest=partnership" className={styles.textLink}>Talk to us about partnership <ArrowRight size={22} aria-hidden /></Link>
        </div>
      </section>
      <section className={styles.community} aria-labelledby="community-title">
        <p className={styles.eyebrow}>There is room for you here</p>
        <h2 id="community-title">We do not have all the answers.<br /><span>But we can forge it. Together.</span></h2>
        <p>We do not think we are perfect. Some ideas will need to change. Some things will take more work than we imagined. That is why we want a community of people who can see a problem, bring what they know, and help us build something useful.</p>
        <p>You do not need to arrive with everything. Bring a skill, a question, a little time, or the willingness to begin.</p>
        <div className={styles.actions}>
          <Link href="/join" className={styles.button}>Find your place at Forge <ArrowRight size={22} aria-hidden /></Link>
          <Link href="/earn-with-forge" className={styles.textLink}>Introduce us to a school</Link>
        </div>
      </section>
      <details className={styles.movementDetails}>
        <summary>
          There is a place for what you can give.{" "}
          <ArrowRight size={24} aria-hidden />
        </summary>
        <section id="movement-details" aria-labelledby="possibilities-title">
          <div className={styles.movementIntro}>
            <div>
              <p className={styles.eyebrow}>Endless Possibilities</p>
              <h2 id="possibilities-title">
                We are Nigerians.
                <br />
                We can create what comes next.
              </h2>
            </div>
            <div>
              <p>
                How many children have grown up believing they are not good
                enough, simply because nobody introduced them to something they
                could be good at? Sometimes what is missing is not intelligence.
                It is exposure, a useful tool, and someone willing to stay long
                enough to help them learn.
              </p>
              <p>
                A laptop will not solve every problem in a child’s life. But we
                refuse to believe that a meaningful opportunity cannot change
                its direction. Someone else’s child is part of our future too.
                Give them a device, and we will help them discover what they can
                create with it.
              </p>
              <p>
                Forge ITs is the movement within Forge Intellitech Services Ltd.
                We are Nigerians. We do not have to be perfectly prepared to
                begin taking responsibility for what comes next. Join as a
                volunteer, educator, sponsor or patron. Government, companies,
                communities and international organisations: bring the device,
                the skill, the time or the support you can give. Let us turn
                what we believe is possible into something a young person can
                actually use.
              </p>
            </div>
          </div>
          <ol className={styles.steps}>
            <li>
              <span>01</span>
              <h3>A student asks.</h3>
              <p>
                A secondary-school student applies or is identified through a
                school workshop.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Forge verifies.</h3>
              <p>
                We review their school, need and readiness for a full year of
                training.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>A donor is matched.</h3>
              <p>
                We agree on a suitable device and coordinate the handover with
                the family or school.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>A year of building.</h3>
              <p>
                The student receives a device, structured learning and guidance
                to keep creating.
              </p>
            </li>
          </ol>
          <p className={styles.requirements}>
            New or used Windows laptops: Core i5, 5th generation or newer, at
            least 4 GB RAM and a 128 GB SSD. For students in public secondary
            schools and low-income private secondary schools. Devices are
            requested only against verified student need.
          </p>
          <div className={styles.actions}>
            <Link
              className={styles.button}
              href="/endless-possibilities/give-a-child-a-laptop/donate"
            >
              Register donor interest <ArrowRight size={22} aria-hidden />
            </Link>
            <Link
              className={styles.textLink}
              href="/endless-possibilities/give-a-child-a-laptop/request-support"
            >
              Request student support
            </Link>
            <Link
              className={styles.textLink}
              href="/contact?interest=partnership"
            >
              Partner or invest
            </Link>
          </div>
        </section>
      </details>
    </div>
  );
}
