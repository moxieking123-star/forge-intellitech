import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { stories, legacyStoryRedirects } from "@/lib/stories";
import { StoriesCampaign } from "@/components/stories/Campaign";
import s from "@/components/stories/stories.module.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return [
    ...stories.map(({ slug }) => ({ slug })),
    ...Object.keys(legacyStoryRedirects).map((slug) => ({ slug })),
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  return story
    ? {
        title: `${story.title} | Forge Stories`,
        description: story.excerpt,
        alternates: { canonical: `/blog/${story.slug}` },
        openGraph: {
          title: story.title,
          description: story.excerpt,
          type: "article",
          images: [{ url: story.image.src, alt: story.image.alt }],
        },
      }
    : { title: "Stories | Forge Intellitech" };
}
export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  if (legacyStoryRedirects[slug]) permanentRedirect(legacyStoryRedirects[slug]);
  const story = stories.find((item) => item.slug === slug);
  if (!story) notFound();
  const related = stories.filter((item) => item.slug !== slug).slice(0, 2);
  return (
    <div className={s.page} id="home-content">
      <article>
        <header className={`${s.wrap} ${s.articleHead}`}>
          <Link className={s.textLink} href="/blog">
            ← All stories
          </Link>
          <p className={s.eyebrow} style={{ marginTop: 36 }}>
            {story.category}
          </p>
          <h1 className={s.title}>{story.title}</h1>
          <p className={s.intro}>{story.excerpt}</p>
          <p className={s.byline}>Forge editorial · Perspective</p>
        </header>
        <figure className={`${s.wrap} ${s.editorialFigure} ${s.articleImage}`}>
          <Image src={story.image.src} alt={story.image.alt} width={1440} height={960} priority sizes="(max-width: 1230px) 100vw, 1180px" />
          <figcaption>AI-generated illustration · An editorial interpretation, not a record of a Forge programme.</figcaption>
        </figure>
        <div className={`${s.wrap} ${s.articleGrid}`}>
          <aside className={s.aside} aria-label="In this essay">
            <p>In this essay</p>
            {story.sections.map((section, index) => (
              <a key={section.title} href={`#section-${index + 1}`}>
                {section.title}
              </a>
            ))}
            <a href="#sources">Sources & context</a>
          </aside>
          <div className={s.prose}>
            {story.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                ))}
              </section>
            ))}
            <section id="sources" className={s.sources}>
              <h2>Sources & context</h2>
              <p>
                This is Forge’s editorial perspective. External sources inform
                the context; they do not imply a partnership or endorsement.
              </p>
              {story.sources.map((source) => (
                <p key={source.url}>
                  <a href={source.url}>{source.title} ↗</a>
                  <br />
                  {source.note}
                </p>
              ))}
              <p>
                <Link href={story.cta.href}>{story.cta.label} →</Link>
              </p>
            </section>
          </div>
        </div>
      </article>
      <StoriesCampaign />
      <section
        className={`${s.wrap} ${s.related}`}
        aria-labelledby="keep-reading"
      >
        <h2 id="keep-reading">Keep thinking with us.</h2>
        <div className={s.relatedList}>
          {related.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`}>
              {item.title}{" "}
              <span className={s.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
