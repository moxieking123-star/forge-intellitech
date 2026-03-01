import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { GlowCursor } from "../components/GlowCursor";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forgeintellitech.com'),
  title: {
    default: "Forge Intellitech | Technology Built for Africa",
    template: "%s | Forge Intellitech",
  },
  description: "We build technology solutions rooted in African realities. From education to fintech, we create products that understand and serve our continent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider defaultMode="dark" defaultChapter="forge">
          <GlowCursor />
          <Navbar />
          <main className="flex-grow pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-KE1R66TB7V" />
        <Analytics />
      </body>
    </html>
  );
}