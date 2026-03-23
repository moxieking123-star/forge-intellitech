import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { GlowCursor } from "../components/GlowCursor";
import CookieConsent from "../components/CookieConsent";
import GoogleAnalytics from "../components/GoogleAnalytics";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://forgeintellitech.com'),
  title: {
    default: "Forge Intellitech | Technology Built for Africa",
    template: "%s | Forge Intellitech",
  },
  description: "We build technology solutions rooted in African realities. From education to fintech, we create products that understand and serve our continent.",
  
  // Keywords for SEO
  keywords: [
    'technology',
    'software development',
    'Africa',
    'Nigeria',
    'fintech',
    'education technology',
    'LaunchPad',
    'Forge Intellitech'
  ],
  
  // Author info
  authors: [{ name: 'Forge Intellitech' }],
  creator: 'Forge Intellitech',
  publisher: 'Forge Intellitech',
  
  // Favicon & Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Forge Intellitech | Technology Built for Africa',
    description: 'We build technology solutions rooted in African realities. From education to fintech, we create products that understand and serve our continent.',
    url: 'https://forgeintellitech.com',
    siteName: 'Forge Intellitech',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png', // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: 'Forge Intellitech',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Forge Intellitech | Technology Built for Africa',
    description: 'We build technology solutions rooted in African realities.',
    images: ['/images/og-image.png'], // Same image as OpenGraph
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // RSS Feed
  alternates: {
    types: {
      'application/rss+xml': 'https://forgeintellitech.com/rss.xml',
    },
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
        {/* RSS Feed Link */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Forge Intellitech Blog" 
          href="/rss.xml" 
        />
        
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
        
        {/* Google Analytics Consent Mode (before GA loads) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Default consent state (before user choice)
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });
              
              // Check for saved consent
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
          
          {/* Cookie Consent Banner */}
          <CookieConsent />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-KE1R66TB7V" />
<Analytics />
      </body>
    </html>
  );
}