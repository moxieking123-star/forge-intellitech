// app/about/page.tsx

import { Metadata } from 'next';
import AboutPageClient from '../AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us - Our Story, Mission & Vision',
  description: 'Learn about Forge Intellitech - a Lagos-based technology company building solutions rooted in African realities. Discover our mission to empower youth, our values, and our vision for Africa\'s tech future.',
  keywords: [
    'about Forge Intellitech',
    'African tech company',
    'Lagos technology startup',
    'Nigerian tech founders',
    'technology for Africa mission',
    'youth empowerment Nigeria',
    'digital skills Africa',
    'TechUp program',
    'LaunchPad incubator',
    'African innovation',
    'tech education Nigeria',
  ],
  openGraph: {
    title: 'About Forge Intellitech - Our Story, Mission & Vision',
    description: 'Learn about Forge Intellitech - building technology solutions rooted in African realities. Empowering youth, transforming communities.',
    url: 'https://forgeintellitech.com/about',
    type: 'website',
    images: [
      {
        url: '/images/about-og.png',
        width: 1200,
        height: 630,
        alt: 'About Forge Intellitech - Technology Built for Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Forge Intellitech',
    description: 'Building technology solutions rooted in African realities. Learn about our mission and team.',
    images: ['/images/about-og.png'],
  },
  alternates: {
    canonical: 'https://forgeintellitech.com/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}