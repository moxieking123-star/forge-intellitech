import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import JoinMovement from "../../components/movement/JoinMovement";
import { initiatives } from "../../components/movement/initiatives";
import styles from "../../components/movement/Movement.module.css";
export const metadata: Metadata = {
  title: "Endless Possibilities | A Forge ITs Movement",
  description:
    "We are Nigerians. We can create what comes next. Discover LaunchPad, laptops for learners, school enterprise, paid internships and creativity seminars with Forge ITs.",
  alternates: {
    canonical: "https://forgeintellitech.com/endless-possibilities",
  },
  openGraph: {
    title: "Who builds the future if we all keep waiting?",
    description:
      "Five ways to create an opportunity. One belief in what our young people can build.",
    url: "https://forgeintellitech.com/endless-possibilities",
    type: "website",
    images: [
      {
        url: "/images/editorial/movement-beginnings.webp",
        alt: "Tools, ideas and a place to begin — Endless Possibilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Endless Possibilities | Forge ITs",
    description:
      "An opportunity to discover. A reason to create. A future we build together.",
    images: ["/images/editorial/movement-beginnings.webp"],
  },
};
export default function EndlessPossibilitiesPage() {
  return (
    <div className={styles.page} id="home-content" tabIndex={-1}>
      <section className={styles.hubHero} aria-labelledby="hub-title">
        <div>
          <p className={styles.eyebrow}>
            Endless Possibilities · a Forge ITs movement
          </p>
          <h1 id="hub-title">
            The future we
            <br />
            keep waiting for.
            <br />
            <span>Let’s build it.</span>
          </h1>
          <p>
            What if the next great idea is already here, in a young person who
            has never been given the chance to discover what they can do?
          </p>
          <div className={styles.actions}>
            <a href="#initiatives" className={styles.button}>
              Explore the initiatives
              <ArrowRight size={23} aria-hidden />
            </a>
            <a href="#join-movement" className={styles.textLink}>
              Bring what you can
            </a>
          </div>
        </div>
        <figure>
          <div>
            <Image
              src="/images/editorial/movement-beginnings.webp"
              alt="Illustrative stepping forms, a growing plant and practical tools leading towards an open doorway"
              fill
              priority
              sizes="(max-width:700px) 100vw, 48vw"
            />
          </div>
          <figcaption>
            Different beginnings, a shared possibility.
          </figcaption>
        </figure>
      </section>
      <section className={styles.belief} aria-labelledby="belief-title">
        <p className={styles.eyebrow}>Our belief</p>
        <div className={styles.beliefGrid}>
          <h2 id="belief-title">
            People are more than
            <br />
            the opportunities
            <br />
            <span>they have been given.</span>
          </h2>
          <div className={styles.prose}>
            <p>
              How many children have grown up believing they are not good
              enough, simply because nobody introduced them to something they
              could be good at?
            </p>
            <p>
              We see young Nigerians with intelligence, creativity and energy.
              But a talent cannot develop in a vacuum. An idea needs someone
              willing to listen. A skill needs practice. Sometimes a young
              person needs a device, a first work experience, or the confidence
              to believe that their own thinking has value.
            </p>
            <p>
              Endless Possibilities exists to create those beginnings. It is
              part of Forge ITs, the movement within Forge Intellitech Services
              Ltd. We bring learning, access, enterprise and practical support
              together so young people can participate in building the future we
              keep talking about.
            </p>
            <p>
              We do not believe any one programme will solve every problem. We
              believe that meaningful opportunities can change the direction of
              a life, and that each of us can take responsibility for creating
              one.
            </p>
          </div>
        </div>
      </section>
      <section
        id="initiatives"
        className={styles.initiatives}
        aria-labelledby="initiatives-title"
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>
            One purpose. Different places to begin.
          </p>
          <h2 id="initiatives-title">
            Find the opportunity
            <br />
            you want to help create.
          </h2>
          <p>
            Explore an initiative to understand who it is for, what it makes
            possible and how you can take part.
          </p>
        </div>
        <div className={styles.initiativeRows}>
          {initiatives.map((item, index) => (
            <Link
              href={`/endless-possibilities/${item.slug}`}
              key={item.slug}
              className={styles.initiativeRow}
            >
              <span className={styles.initiativeNumber}>0{index + 1}</span>
              <div>
                <p className={styles.eyebrow}>{item.label}</p>
                <h3>{item.name}</h3>
                <p className={styles.initiativeAudience}>{item.audience}</p>
              </div>
              <p>{item.card}</p>
              <ArrowRight size={32} weight="light" aria-hidden />
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.sharedFuture} aria-labelledby="shared-title">
        <p className={styles.eyebrow}>
          Someone else’s child. Our shared future.
        </p>
        <h2 id="shared-title">
          The opportunity you create
          <br />
          can reach people
          <br />
          <span>you may never meet.</span>
        </h2>
        <p>
          A young person who discovers how to solve a problem can improve a
          community. A student who sees another way to live can begin to imagine
          a different future. We cannot predict every outcome. We can choose to
          make a useful beginning possible.
        </p>
        <p>
          That is the spirit behind this movement. We are Nigerians. We can do
          more than describe what is wrong. In our own capacity, we can create
          something that helps put it right.
        </p>
      </section>
      <JoinMovement />
      <section className={styles.closing} aria-labelledby="closing-title">
        <p className={styles.eyebrow}>A place for every useful contribution</p>
        <h2 id="closing-title">
          We do not need to
          <br />
          have everything to begin.
        </h2>
        <p>
          Volunteers, educators, sponsors, patrons, schools, government,
          companies and international organisations: bring your time, your
          skill, your reach, a weekend learning space, power or your resources. Choose an initiative. Help us
          turn what we believe is possible into something a young person can
          actually use.
        </p>
        <a href="#initiatives" className={styles.lightButton}>
          Choose your beginning
          <ArrowRight size={23} aria-hidden />
        </a>
      </section>
    </div>
  );
}
