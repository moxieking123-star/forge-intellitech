// app/launchpad/page.tsx

import { Metadata } from 'next';
import LaunchPadPageClient from '../LaunchPadPageClient';

export const metadata: Metadata = {
  title: 'LaunchPad 2026 - Zero-Equity Business Grants for Nigerian Students',
  description: 'LaunchPad is a youth entrepreneurship program providing business grants, mentorship, and training to Nigerian SSS3 students. ₦10M+ in projected grants. No equity taken. Apply for free.',
  keywords: [
    'LaunchPad Nigeria',
    'youth entrepreneurship Nigeria',
    'business grants for students',
    'zero equity incubator',
    'Nigerian student startup program',
    'youth business funding Lagos',
    'SSS3 student entrepreneurship',
    'Forge Intellitech LaunchPad',
    'startup funding Nigeria',
    'young entrepreneurs Nigeria',
    'student pitch competition',
    'business mentorship Nigeria',
    'free business training Lagos',
    'Nigerian youth empowerment',
  ],
  openGraph: {
    title: 'LaunchPad 2026 - ₦10M+ in Business Grants for Nigerian Students',
    description: 'Apply for free. Get business grants, mentorship, and training. No equity taken. Open to all Lagos SSS3 students.',
    url: 'https://forgeintellitech.com/launchpad',
    type: 'website',
    images: [
      {
        url: '/images/launchpad-og.png',
        width: 1200,
        height: 630,
        alt: 'LaunchPad 2026 - Youth Entrepreneurship Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaunchPad 2026 - Business Grants for Nigerian Students',
    description: 'Zero-equity business grants and mentorship for young Nigerian entrepreneurs. Apply free!',
    images: ['/images/launchpad-og.png'],
  },
  alternates: {
    canonical: 'https://forgeintellitech.com/launchpad',
  },
};

export default function LaunchPadPage() {
  return <LaunchPadPageClient />;
}