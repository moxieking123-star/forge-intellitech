// app/page.tsx

import { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Forge Intellitech | Technology Built for Africa",
  description:
    "We build technology solutions rooted in African realities. Through education and innovation, we create products that understand and serve our continent. Based in Lagos, Nigeria.",
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
    title: "Forge Intellitech | Technology Built for Africa",
    description:
      "We build technology solutions rooted in African realities. Through education and innovation, we create products that understand and serve our continent.",
    url: "https://forgeintellitech.com",
    type: "website",
    images: [
      {
        url: "/images/home/lagos-future.webp",
        width: 1672,
        height: 941,
        alt: "Forge Intellitech - Technology Built for Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Intellitech | Technology Built for Africa",
    description: "We build technology solutions rooted in African realities.",
    images: ["/images/home/lagos-future.webp"],
  },
  alternates: {
    canonical: "https://forgeintellitech.com",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
