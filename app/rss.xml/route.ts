import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = 'https://forgeintellitech.com';
  const siteName = 'Forge Intellitech';
  const siteDescription = 'Insights, stories, and updates from the Forge Intellitech ecosystem — building technology rooted in African realities.';

  // Static RSS feed (will be dynamic once Supabase is connected)
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>${siteName} Blog</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/images/logo.png</url>
      <title>${siteName} Blog</title>
      <link>${siteUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <copyright>© ${new Date().getFullYear()} Forge Intellitech Services Ltd. All rights reserved.</copyright>
    <managingEditor>admin@forgeintellitech.com (Forge Intellitech)</managingEditor>
    <webMaster>admin@forgeintellitech.com (Forge Intellitech)</webMaster>
    <category>Technology</category>
    <category>African Tech</category>
    <category>Startups</category>
    <category>Education</category>
  </channel>
</rss>`;

  return new NextResponse(rssXml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}