// app/techup/page.tsx

import { Metadata } from 'next';
import TechUpPageClient from '../TechUpPageClient';

export const metadata: Metadata = {
  title: 'TechUp - Digital Skills Training for Nigerian Secondary Schools',
  description: 'TechUp brings professional tech education directly into Nigerian secondary schools. Six-year curriculum covering coding, design, data literacy, and digital citizenship. Building the next generation of African tech talent.',
  keywords: [
    'TechUp program',
    'digital skills training Nigeria',
    'coding for secondary school students',
    'tech education Lagos',
    'learn to code Nigeria',
    'youth tech training Africa',
    'computer science education Nigeria',
    'student coding bootcamp Lagos',
    'secondary school technology curriculum',
    'digital literacy Nigeria',
    'tech skills for students',
    'African youth empowerment',
    'coding bootcamp Nigeria',
    'school tech partnership',
    'STEM education Africa',
  ],
  openGraph: {
    title: 'TechUp - Digital Skills Training for Nigerian Students',
    description: 'Bringing professional coding, design, and digital skills training directly into secondary schools across Nigeria. Building the next generation of African tech talent.',
    url: 'https://forgeintellitech.com/techup',
    type: 'website',
    images: [
      {
        url: '/images/techup-og.png',
        width: 1200,
        height: 630,
        alt: 'TechUp - Digital Skills for Nigerian Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechUp - Digital Skills Training',
    description: 'Teaching Nigerian students to build with technology. Professional instructors, real skills, lasting impact.',
    images: ['/images/techup-og.png'],
  },
  alternates: {
    canonical: 'https://forgeintellitech.com/techup',
  },
};

export default function TechUpPage() {
  return <TechUpPageClient />;
}