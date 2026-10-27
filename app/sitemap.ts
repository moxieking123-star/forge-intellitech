import type { MetadataRoute } from "next";
import { stories } from "@/lib/stories";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "about",
    "products",
    "partner",
    "join",
    "contact",
    "programmes",
    "programmes/techup",
    "programmes/elytech",
    "programmes/onboard",
    "programmes/resources",
    "earn-with-forge",
    "careers",
    "launchpad",
    "blog",
    "privacy",
    "terms",
    "endless-possibilities",
    ...[
      "give-a-child-a-laptop",
      "in-school-launchpad",
      "intern-with-forge",
      "public-school-seminars",
    ].map((s) => `endless-possibilities/${s}`),
    ...stories.map((s) => `blog/${s.slug}`),
  ];
  return [...new Set(routes)].map((route) => ({
    url: `https://forgeintellitech.com/${route}`,
    changeFrequency: "monthly",
    priority: route ? 0.7 : 1,
  }));
}
