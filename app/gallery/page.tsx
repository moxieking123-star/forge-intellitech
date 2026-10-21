import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { StoriesCampaign } from "@/components/stories/Campaign";
import s from "@/components/stories/stories.module.css";
export const metadata: Metadata = {
  title: "Gallery | The Forge archive",
  description:
    "Photographs from LaunchPad 2025 at Ikosi-Isheri. A record of one beginning, and an invitation to help shape what comes next.",
  alternates: { canonical: "/gallery" },
};
const photographs = [
  {
    src: "/images/movement/launchpad-2025-group.webp",
    alt: "LaunchPad attendees gathered on stage with a presentation cheque",
    caption: "A shared moment on stage · LaunchPad 2025",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/movement/launchpad-2025-pitch.webp",
    alt: "A LaunchPad participant holding a microphone on stage",
    caption: "An idea meets the room · LaunchPad 2025",
    width: 1439,
    height: 1750,
  },
  {
    src: "/images/movement/launchpad-2025-award.webp",
    alt: "Attendees standing together behind a presentation cheque dated 4 July 2025",
    caption: "The award presentation · LaunchPad 2025",
    width: 1600,
    height: 1200,
  },
];
export default function GalleryPage() {
  return (
    <div className={s.page} id="home-content">
      <div className={s.wrap}>
        <header className={s.hero}>
          <p className={s.eyebrow}>The Forge archive</p>
          <h1 className={s.title}>
            A beginning,
            <br />
            <span className={s.orange}>remembered.</span>
          </h1>
          <p className={s.intro}>
            LaunchPad 2025. Ikosi-Isheri. A room for ideas, and people willing
            to listen.
          </p>
          <div className={s.links}>
            <Link href="/endless-possibilities/launchpad">
              Read the LaunchPad story ↗
            </Link>
            <Link href="/blog">Explore the journal ↗</Link>
          </div>
        </header>
        <section className={s.gallery} aria-label="LaunchPad 2025 photographs">
          {photographs.map((photo) => (
            <figure key={photo.src}>
              <a href={photo.src} aria-label={`Open photograph: ${photo.alt}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 760px) 100vw, 1180px"
                />
              </a>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </section>
        <div className={s.archiveNote}>
          <p className={s.eyebrow}>
            4 July 2025 · Ikosi-Isheri LCDA Council Hall
          </p>
          <p>
            These photographs come from Forge’s existing LaunchPad event
            archive. They record the gathering and presentation, rather than
            claiming what happened to each idea afterwards.
          </p>
          <p>
            The work continues through practical learning, mentorship and
            opportunities to build. Explore the annual LaunchPad story and the
            separate in-school initiative to see how you can take part.
          </p>
          <Link
            className={s.textLink}
            href="/endless-possibilities/in-school-launchpad"
          >
            Discover in-school LaunchPad →
          </Link>
        </div>
      </div>
      <StoriesCampaign />
    </div>
  );
}
