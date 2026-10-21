import type { MetadataRoute } from "next";
import { stories } from "@/lib/stories";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "about",
    "work",
    "join",
    "contact",
    "programmes",
    "programmes/onboard",
    "programmes/resources",
    "earn-with-forge",
    "blog",
    "gallery",
    "privacy",
    "terms",
    "endless-possibilities",
    ...[
      "launchpad",
      "give-a-child-a-laptop",
      "in-school-launchpad",
      "intern-with-forge",
      "public-school-seminars",
    ].map((s) => `endless-possibilities/${s}`),
    ...stories.map((s) => `blog/${s.slug}`),
  ];
  return routes.map((route) => ({
    url: `https://forgeintellitech.com/${route}`,
    changeFrequency: "monthly",
    priority: route ? 0.7 : 1,
  }));
}
