"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GlowCursor } from "./GlowCursor";
import CookieConsent from "./CookieConsent";
import WatchForge from "./WatchForge";
import HomeHeader from "./home/HomeHeader";
import HomeFooter from "./home/HomeFooter";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const homepage = !pathname.startsWith("/admin");
  return (
    <>
      {!homepage && <GlowCursor />}
      {homepage ? <HomeHeader /> : <Navbar />}
      <main id="main-content" tabIndex={-1} className="flex-grow">
        {children}
      </main>
      {homepage && <WatchForge />}
      {homepage ? <HomeFooter /> : <Footer />}
      <CookieConsent />
    </>
  );
}
