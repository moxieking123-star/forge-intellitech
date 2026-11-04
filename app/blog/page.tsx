import type { Metadata } from "next";
import { stories } from "@/lib/stories";
import Journal from "@/components/forge/Journal";
export const metadata:Metadata={title:"The Forge journal",description:"Ideas and reflections on practical learning, useful technology and widening opportunity.",alternates:{canonical:"/blog"}};
export default function Page(){return <Journal stories={stories.map(story=>({slug:story.slug,title:story.title,category:story.category,excerpt:story.excerpt,image:story.image,minutes:Math.max(1,Math.ceil(story.sections.flatMap(section=>section.paragraphs).join(" ").split(/\s+/).length/200))}))}/>;}
