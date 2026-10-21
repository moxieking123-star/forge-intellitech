import type { Metadata } from "next";
import Link from "next/link";
import SchoolResources from "../../../components/programmes/SchoolResources";
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
      </header>
      <SchoolResources />
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
            Request a commercial proposal through school onboarding. Forge will
            discuss your context and share the proposal privately.
          </p>
          <Link href="/programmes/onboard">Start school onboarding →</Link>
        </div>
      </section>
    </div>
  );
}
