// app/layout.tsx

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { GlowCursor } from "../components/GlowCursor";
import CookieConsent from "../components/CookieConsent";
import { GoogleAnalytics } from '@next/third-parties/google';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from '../components/StructuredData';

// Heading font - Poppins
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Body font - Open Sans
const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://forgeintellitech.com'),
  
  title: {
    default: "Forge Intellitech | Technology Built for Africa",
    template: "%s | Forge Intellitech",
  },
  
  description: "We build technology solutions rooted in African realities. From education to fintech, we create products that understand and serve our continent. Based in Lagos, Nigeria.",
  
  // Enhanced Keywords
  keywords: [
    'Forge Intellitech',
    'technology solutions Africa',
    'software development Nigeria',
    'African tech company',
    'Lagos tech startup',
    'education technology Africa',
    'fintech Nigeria',
    'TechUp digital skills',
    'LaunchPad startup incubator',
    'digital skills training Nigeria',
    'coding bootcamp Lagos',
    'African software developers',
    'technology for Africa',
    'Nigerian tech innovation',
    'youth empowerment technology',
  ],
  
  // Author & Publisher
  authors: [{ name: 'Forge Intellitech', url: 'https://forgeintellitech.com' }],
  creator: 'Forge Intellitech',
  publisher: 'Forge Intellitech',
  
  // Category
  category: 'Technology',
  
  // Favicon & Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: 'Forge Intellitech | Technology Built for Africa',
    description: 'We build technology solutions rooted in African realities. From education to fintech, we create products that understand and serve our continent.',
    url: 'https://forgeintellitech.com',
    siteName: 'Forge Intellitech',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forge Intellitech - Technology Built for Africa',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Forge Intellitech | Technology Built for Africa',
    description: 'We build technology solutions rooted in African realities. From education to fintech, we create products that understand and serve our continent.',
    site: '@forgeintellitech',
    creator: '@forgeintellitech',
    images: ['/images/og-image.png'],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (add your verification codes)
  verification: {
    google: 'your-google-verification-code', // Get from Search Console
    // yandex: 'your-yandex-code',
    // bing: 'your-bing-code',
  },
  
  // Alternates
  alternates: {
    canonical: 'https://forgeintellitech.com',
    types: {
      'application/rss+xml': 'https://forgeintellitech.com/rss.xml',
    },
  },
  
  // Other
  applicationName: 'Forge Intellitech',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${openSans.variable}`}>
      <head>
        {/* Structured Data / JSON-LD */}
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        
        {/* RSS Feed Link */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Forge Intellitech Blog" 
          href="/rss.xml" 
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('forge-theme-mode');
                  if (mode === 'light' || mode === 'dark') {
                    document.documentElement.setAttribute('data-mode', mode);
                  } else if (mode === 'system' || !mode) {
                    var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
                  }
                  document.documentElement.setAttribute('data-chapter', 'forge');
                } catch (e) {}
              })();
            `,
          }}
        />
        
        {/* Google Analytics Consent Mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });
              
              try {
                var consent = localStorage.getItem('forge-cookie-consent');
                if (consent) {
                  var prefs = JSON.parse(consent);
                  gtag('consent', 'update', {
                    'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                    'ad_storage': prefs.marketing ? 'granted' : 'denied'
                  });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      
      <body className={`${openSans.className} min-h-screen flex flex-col bg-env-bg-primary`}>
        <ThemeProvider defaultMode="dark" defaultChapter="forge">
          <GlowCursor />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
        
        {/* Analytics */}
        <GoogleAnalytics gaId="G-KE1R66TB7V" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}