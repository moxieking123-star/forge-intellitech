import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SchoolResources from "../../../components/programmes/SchoolResources";
import ProposalRequestForm from "../../../components/programmes/ProposalRequestForm";
import styles from "../../../components/programmes/SchoolResources.module.css";
export const metadata: Metadata = {
  title: "Parent communication resources | Forge school programmes",
  description:
    "Prepare a clear parent introduction and follow-up for your school's ElyTech or TechUp programme.",
  alternates: {
    canonical: "https://forgeintellitech.com/programmes/resources",
  },
};
export default function ResourcesPage() {
  return (
    <div id="home-content" tabIndex={-1} className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.resourceHeroCopy}>
        <p className={styles.eyebrow}>For school teams · practical resources</p>
        <h1>
          Bring parents into
          <br />
          <span>the conversation.</span>
        </h1>
        <p>
          Prepare an introduction or follow-up in your school’s voice. Review
          the details, then copy, download or share the message yourself.
        </p>
        <Link href="/programmes">← Explore ElyTech & TechUp</Link>
        </div>
        <figure className={styles.resourceHeroFigure}>
          <div><Image src="/images/editorial/school-resource-kit.webp" alt="Cream stationery, a forest-green folder and an orange pencil arranged as a school communication kit" fill priority sizes="(max-width: 700px) 100vw, 43vw" /></div>
          <figcaption>A clear beginning for the conversation</figcaption>
        </figure>
      </header>
      <SchoolResources />
      <ProposalRequestForm />
      <section className={styles.overview}>
        <div>
          <p className={styles.eyebrow}>A useful starting point</p>
          <h2>The programme overview.</h2>
          <p>
            A print-ready introduction to the learning approach, supporting
            tools and school onboarding process. This is an overview, rather
            than a confirmed commercial proposal.
          </p>
          <a href="/downloads/forge-school-programme-overview.html" download>
            Download programme overview ↗
          </a>
        </div>
        <div>
          <h3>Ready to discuss your school?</h3>
          <p>
            Read the proposal with your team, then tell us about your school.
            We’ll work through the practical details together.
          </p>
          <Link href="/programmes/onboard">Start school onboarding →</Link>
        </div>
      </section>
    </div>
  );
}
