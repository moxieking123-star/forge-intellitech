import { GoogleAnalytics } from '@next/third-parties/google'
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
    <html 
      lang="en" 
      /* 
       * suppressHydrationWarning is needed because we set
       * data-mode on the client to avoid flash. This is a
       * standard pattern for theme implementations.
       */
      suppressHydrationWarning
    >
      <head>
        {/*
          Inline script to set initial theme before paint.
          This prevents the "flash" of wrong theme on load.
          We check localStorage first, then system preference.
        */}
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
                  // Default chapter
                  document.documentElement.setAttribute('data-chapter', 'forge');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider defaultMode="dark" defaultChapter="forge">
          {/* Glow cursor - positioned fixed, doesn't affect layout */}
          <GlowCursor />
          
          <Navbar />
          <main className="flex-grow pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" /> {/* YOUR ID HERE */}
    </html>
  );
}