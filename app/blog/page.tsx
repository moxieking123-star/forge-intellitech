import Link from "next/link";
import type { Metadata } from "next";
import { stories } from "@/lib/stories";
import { StoriesCampaign } from "@/components/stories/Campaign";
import s from "@/components/stories/stories.module.css";
export const metadata: Metadata = {
  title: "Stories | Forge Intellitech",
  description:
    "Ideas and reflections on practical learning, useful technology and making opportunity possible in Nigeria.",
  alternates: { canonical: "/blog" },
};
export default function StoriesPage() {
  const featured = stories[0];
  return (
    <div className={s.page} id="home-content">
      <div className={s.wrap}>
        <header className={s.hero}>
          <p className={s.eyebrow}>The Forge journal</p>
          <h1 className={s.title}>
            Possibility,
            <br />
            <span className={s.orange}>put into words.</span>
          </h1>
          <p className={s.intro}>
            What we believe. What learning asks of us. And the practical work of
            giving good ideas a beginning.
          </p>
          <div className={s.links}>
            <Link href="/gallery">From the archive ↗</Link>
            <a href="/rss.xml">Follow by RSS ↗</a>
          </div>
        </header>
        <section className={s.featured} aria-labelledby="featured-story">
          <div className={s.featureArt} aria-hidden="true">
            <span>A place to start</span>
            <strong>
              The future
              <br />
              we can
              <br />
              <i>build here.</i>
            </strong>
            <span>Tools. Skills. Shared responsibility.</span>
          </div>
          <div className={s.featureText}>
            <p className={s.eyebrow}>{featured.category}</p>
            <h2 id="featured-story">
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{featured.excerpt}</p>
            <Link className={s.textLink} href={`/blog/${featured.slug}`}>
              Read the essay{" "}
              <span className={s.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </section>
        <section className={s.grid} aria-label="More from the journal">
          {stories.slice(1).map((story, index) => (
            <article className={s.card} key={story.slug}>
              <p className={s.eyebrow}>
                0{index + 2} / {story.category}
              </p>
              <Link href={`/blog/${story.slug}`}>
                <h2>{story.title}</h2>
                <p>{story.excerpt}</p>
                <span className={s.textLink}>
                  Read the essay{" "}
                  <span className={s.arrow} aria-hidden="true">
                    ↗
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </section>
      </div>
      <StoriesCampaign />
    </div>
  );
}
