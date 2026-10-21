"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GlowCursor } from "./GlowCursor";
import CookieConsent from "./CookieConsent";
import HomeHeader from "./home/HomeHeader";
import HomeFooter from "./home/HomeFooter";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const homepage =
    pathname === "/" ||
    pathname === "/programmes" ||
    pathname.startsWith("/endless-possibilities");
  return (
    <>
      {!homepage && <GlowCursor />}
      {homepage ? <HomeHeader /> : <Navbar />}
      <main className="flex-grow">{children}</main>
      {homepage ? <HomeFooter /> : <Footer />}
      <CookieConsent />
    </>
  );
}
