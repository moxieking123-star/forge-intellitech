import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { initiatives } from "../../../components/movement/initiatives";
import styles from "../../../components/movement/Movement.module.css";
type Props = { params: Promise<{ initiative: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return initiatives
    .filter((i) => i.slug !== "give-a-child-a-laptop")
    .map((i) => ({ initiative: i.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { initiative } = await params;
  const item = initiatives.find((i) => i.slug === initiative);
  if (!item) return {};
  return {
    title: `${item.name} | Endless Possibilities`,
    description: item.card,
    alternates: {
      canonical: `https://forgeintellitech.com/endless-possibilities/${item.slug}`,
    },
    openGraph: {
      title: `${item.name} | Forge`,
      description: item.card,
      url: `https://forgeintellitech.com/endless-possibilities/${item.slug}`,
      type: "website",
      images: [{ url: item.image, alt: item.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} | Forge`,
      description: item.card,
      images: [item.image],
    },
  };
}
export default async function InitiativePage({ params }: Props) {
  const { initiative } = await params;
  const item = initiatives.find((i) => i.slug === initiative);
  if (!item) notFound();
  return (
    <div id="home-content" tabIndex={-1} className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/endless-possibilities">Endless Possibilities</Link>
        <span aria-hidden> / </span>
        <span>{item.name}</span>
      </nav>
      <section
        className={styles.initiativeHero}
        aria-labelledby="initiative-title"
      >
        <div>
          <p className={styles.eyebrow}>{item.label}</p>
          <h1 id="initiative-title">
            {item.name}
            <span>{item.headline}</span>
          </h1>
          <p>{item.intro}</p>
          <Link
            className={styles.button}
            href={`/contact?interest=${item.interest}`}
          >
            {item.action}
            <ArrowRight size={22} aria-hidden />
          </Link>
        </div>
        <figure>
          <div>
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority
              sizes="(max-width:700px) 100vw, 48vw"
            />
          </div>
          <figcaption>{item.caption}</figcaption>
        </figure>
      </section>
      <section
        className={styles.initiativeStory}
        aria-label={`About ${item.name}`}
      >
        {item.sections.map((section, index) => (
          <article key={section.title}>
            <span>0{index + 1}</span>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>
      {initiative === "launchpad" && (
        <section className={styles.archive} aria-labelledby="archive-title">
          <p className={styles.eyebrow}>From the original event</p>
          <h2 id="archive-title">
            LaunchPad 2025.
            <br />
            The beginning we build from.
          </h2>
          <div className={styles.archiveFacts}>
            <div>
              <strong>4 July 2025</strong>
              <span>Ikosi-Isheri LCDA Council Hall</span>
            </div>
            <div>
              <strong>2 winners</strong>
              <span>₦100,000 awarded to each</span>
            </div>
            <div>
              <strong>Launchpad 2.0</strong>
              <span>Coming soon</span>
            </div>
          </div>
          <p className={styles.smallPrint}>
            Historical details reflect the first edition and Forge’s follow-up
            records. The next edition’s dates and entry arrangements will be
            announced when confirmed.
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href="/partner?interest=sponsorship&initiative=launchpad">
              Sponsor Launchpad 2.0 <ArrowRight size={22} aria-hidden />
            </Link>
            <Link className={styles.textLink} href="/contact?interest=patron">
              Become a patron <ArrowRight size={22} aria-hidden />
            </Link>
          </div>
        </section>
      )}
      <section
        className={styles.eligibility}
        aria-labelledby="eligibility-title"
      >
        <div>
          <p className={styles.eyebrow}>Who this is for</p>
          <h2 id="eligibility-title">A clear place to begin.</h2>
          <p>{item.eligibility}</p>
          <Link href="/programmes" className={styles.textLink}>
            Explore our school programmes
            <ArrowRight size={22} aria-hidden />
          </Link>
        </div>
        <div>
          <p className={styles.eyebrow}>Help make it possible</p>
          <h3>{item.support}</h3>
          <p>
            Bring the contribution you can make. We will discuss the need, the
            arrangement and what happens next before anything is agreed.
          </p>
          <Link
            className={styles.button}
            href={`/contact?interest=${item.interest}`}
          >
            {item.action}
            <ArrowRight size={22} aria-hidden />
          </Link>
        </div>
      </section>
      <section
        className={styles.otherInitiatives}
        aria-labelledby="other-title"
      >
        <p className={styles.eyebrow}>Part of a bigger possibility</p>
        <h2 id="other-title">
          There is more than one way
          <br />
          to create an opportunity.
        </h2>
        <nav aria-label="Other Endless Possibilities initiatives">
          {initiatives
            .filter((i) => i.slug !== initiative)
            .map((i) => (
              <Link key={i.slug} href={`/endless-possibilities/${i.slug}`}>
                {i.name}
                <ArrowRight size={21} aria-hidden />
              </Link>
            ))}
        </nav>
        <Link
          className={styles.textLink}
          href="/endless-possibilities#join-movement"
        >
          Find your place in the movement
          <ArrowRight size={22} aria-hidden />
        </Link>
      </section>
    </div>
  );
}
