// app/page.tsx

import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Forge Intellitech | Technology Built for Africa',
  description: 'We build technology solutions rooted in African realities. Through education and innovation, we create products that understand and serve our continent. Based in Lagos, Nigeria.',
  keywords: [
    'Forge Intellitech',
    'African tech company',
    'technology solutions Africa',
    'software development Nigeria',
    'TechUp',
    'LaunchPad',
    'digital skills training',
    'Lagos tech startup',
  ],
  openGraph: {
    title: 'Forge Intellitech | Technology Built for Africa',
    description: 'We build technology solutions rooted in African realities. Through education and innovation, we create products that understand and serve our continent.',
    url: 'https://forgeintellitech.com',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forge Intellitech - Technology Built for Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forge Intellitech | Technology Built for Africa',
    description: 'We build technology solutions rooted in African realities.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://forgeintellitech.com',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}