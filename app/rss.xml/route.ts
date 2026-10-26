import { stories } from "@/lib/stories";
const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
export async function GET() {
  const site = "https://forgeintellitech.com";
  const items = stories
    .map(
      (story) =>
        `<item><title>${escapeXml(story.title)}</title><link>${site}/blog/${story.slug}</link><guid isPermaLink="true">${site}/blog/${story.slug}</guid><description>${escapeXml(story.excerpt)}</description><category>${escapeXml(story.category)}</category></item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Forge Stories</title><link>${site}/blog</link><description>Practical learning, useful technology and shared possibility.</description><language>en-NG</language><atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
