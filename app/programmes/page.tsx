import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "../../components/home/Editorial.module.css";

export const metadata: Metadata = {
  title: "TechUp & ElyTech | School Technology Programmes",
  description:
    "ElyTech for primary schools. TechUp for secondary schools. Forge helps young people in Nigeria learn to create with technology, from first discoveries to practical projects.",
  alternates: { canonical: "https://forgeintellitech.com/programmes" },
};

export default function ProgrammesPage() {
  return (
    <div
      id="home-content"
      tabIndex={-1}
      className={`${styles.page} ${styles.programmes}`}
    >
      <p className={styles.eyebrow}>TechUp & ElyTech · school programmes</p>
      <h1>
        Teach a child to create.
        <br />
        See what comes next.
      </h1>
      <p className={styles.programmeIntro}>
        How does a child discover what they can do if nobody gives them the
        chance to try? We believe our children deserve more than learning how to
        reproduce an answer. They deserve the exposure, guidance and room to
        discover that their own ideas have value.
      </p>
      <div className={styles.programmeGrid}>
        <article>
          <p className={styles.eyebrow}>For primary schools</p>
          <h2>ElyTech</h2>
          <p>
            A place for first discoveries. ElyTech introduces younger learners
            to technology through guided exploration, creativity and
            problem-solving. The beginning is simple: ask questions, try things,
            and discover that you can create.
          </p>
          <ul>
            <li>Build confidence with technology.</li>
            <li>Explore ideas through age-appropriate activities.</li>
            <li>Learn to think, make and work with others.</li>
          </ul>
          <Link className={styles.textLink} href="/contact?interest=schools">
            Bring ElyTech to your school <ArrowRight size={22} aria-hidden />
          </Link>
        </article>
        <article>
          <p className={styles.eyebrow}>For secondary schools</p>
          <h2>TechUp</h2>
          <p>
            Move from using technology to building with it. TechUp helps
            secondary-school students develop practical digital skills, explore
            real problems and bring their ideas into projects. Learning should
            show a young person what they can make possible.
          </p>
          <ul>
            <li>Develop practical technology skills.</li>
            <li>Explore ideas and build projects with guidance.</li>
            <li>Connect classroom learning to real opportunities.</li>
          </ul>
          <Link className={styles.textLink} href="/contact?interest=schools">
            Bring TechUp to your school <ArrowRight size={22} aria-hidden />
          </Link>
        </article>
      </div>
      <div className={styles.programmeNote}>
        <p>
          Access matters too. Through Endless Possibilities, we match eligible
          secondary-school students with devices against verified need and
          support a full year of learning. The movement supports students in
          public schools and low-income private schools.
        </p>
        <div className={styles.actions}>
          <Link className={styles.button} href="/#movement">
            Give a child a laptop <ArrowRight size={22} aria-hidden />
          </Link>
          <Link className={styles.textLink} href="/contact?interest=schools">
            Talk to us about your school
          </Link>
        </div>
      </div>
    </div>
  );
}
