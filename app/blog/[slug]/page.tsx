import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { stories, legacyStoryRedirects } from "@/lib/stories";
import JournalArticle from "@/components/forge/JournalArticle";
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
export default async function StoryPage({params}:Props){const {slug}=await params;if(legacyStoryRedirects[slug])permanentRedirect(legacyStoryRedirects[slug]);const story=stories.find(item=>item.slug===slug);if(!story)notFound();return <JournalArticle story={story} related={stories.filter(item=>item.slug!==slug).slice(0,3)}/>;}
