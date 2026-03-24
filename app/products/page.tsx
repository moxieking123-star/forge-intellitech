// app/products/page.tsx

import { Metadata } from 'next';
import ProductsPageClient from '../ProductsPageClient';

export const metadata: Metadata = {
  title: 'Our Products - Technology Solutions Built for Africa',
  description: 'Explore Forge Intellitech products: TechUp for digital education, LaunchPad for youth entrepreneurship, BiteBank for food security, and Trego for urban mobility. Real solutions for African communities.',
  keywords: [
    'Forge Intellitech products',
    'African tech solutions',
    'TechUp digital education',
    'LaunchPad startup incubator',
    'BiteBank meal planning',
    'Trego urban transport',
    'Nigerian technology products',
    'African software solutions',
    'education technology Africa',
    'fintech Nigeria',
    'mobility solutions Africa',
    'food security technology',
  ],
  openGraph: {
    title: 'Our Products - Technology Solutions Built for Africa',
    description: 'Real products solving real African problems. Education, entrepreneurship, food security, and urban mobility.',
    url: 'https://forgeintellitech.com/products',
    type: 'website',
    images: [
      {
        url: '/images/products-og.png',
        width: 1200,
        height: 630,
        alt: 'Forge Intellitech Products - Technology Built for Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Products - Technology for Africa',
    description: 'TechUp, LaunchPad, BiteBank, Trego — real solutions for African communities.',
    images: ['/images/products-og.png'],
  },
  alternates: {
    canonical: 'https://forgeintellitech.com/products',
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}