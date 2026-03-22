import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { GlowCursor } from "../components/GlowCursor";
import CookieConsent from "../components/CookieConsent";

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
      </body>
    </html>
  );
}