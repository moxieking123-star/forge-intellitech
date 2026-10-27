"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import adminFrame from "./admin/AdminFrame.module.css";
import CookieConsent from "./CookieConsent";
import WatchForge from "./WatchForge";
import HomeHeader from "./home/HomeHeader";
import HomeFooter from "./home/HomeFooter";
import ForgeJourney from "./story/ForgeJourney";
import PageMotion from "./PageMotion";
import ForgeInteractions from "./motion/ForgeInteractions";
import PreviewFeedback from "./feedback/PreviewFeedback";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const homepage = !pathname.startsWith("/admin");
  return (
    <>
      {homepage ? <HomeHeader /> : <header className={adminFrame.header}><Link href="/" className={adminFrame.brand} aria-label="Forge home"><Image src="/images/brand/forge-wordmark.png" alt="Forge" width={2045} height={769} sizes="120px"/><span>Private workspace</span></Link><Link href="/" className={adminFrame.back}>Back to the website ↗</Link></header>}
      <main id="main-content" tabIndex={-1} className="flex-grow">
        {children}
      </main>
      {homepage && <WatchForge />}
      {homepage ? <HomeFooter /> : <footer className={adminFrame.footer}>Forge Intellitech Services Ltd. · Private staff workspace</footer>}
      {homepage && <ForgeJourney />}
      {homepage && <PageMotion />}
      {homepage && <ForgeInteractions />}
      <CookieConsent />
      {homepage && <PreviewFeedback />}
    </>
  );
}
