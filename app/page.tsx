// app/page.tsx

import { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: {
    absolute: "Forge Intellitech | Technology, Skills & Possibility in Nigeria",
  },
  description:
    "Useful technology. Practical skills. Ideas with a beginning. Meet Forge Intellitech, TechUp, ElyTech and the Endless Possibilities laptop movement in Nigeria.",
  keywords: [
    "Forge Intellitech",
    "African tech company",
    "technology solutions Africa",
    "software development Nigeria",
    "TechUp",
    "LaunchPad",
    "digital skills training",
    "Lagos tech startup",
    "Digital education Nigeria",
    "African innovation",
    "EdTech startup",
  ],
  openGraph: {
    title: "The next big thing can be built here | Forge Intellitech",
    description:
      "We build technology solutions rooted in African realities. Through education and innovation, we create products that understand and serve our continent.",
    url: "https://forgeintellitech.com",
    type: "website",
    images: [
      {
        url: "/images/home/studio-beginning.webp",
        alt: "A place to start creating — Forge Intellitech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Intellitech | Technology Built for Africa",
    description: "We build technology solutions rooted in African realities.",
    images: ["/images/home/studio-beginning.webp"],
  },
  alternates: {
    canonical: "https://forgeintellitech.com",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
