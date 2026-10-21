"use client";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const sync = () => {
      try {
        setEnabled(
          JSON.parse(localStorage.getItem("forge-cookie-consent") || "{}")
            .analytics === true,
        );
      } catch {
        setEnabled(false);
      }
    };
    sync();
    window.addEventListener("forge-consent-change", sync);
    return () => window.removeEventListener("forge-consent-change", sync);
  }, []);
  return enabled ? (
    <>
      <GoogleAnalytics gaId="G-KE1R66TB7V" />
      <Analytics />
      <SpeedInsights />
    </>
  ) : null;
}
