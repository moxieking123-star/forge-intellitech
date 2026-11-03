"use client";
import { usePathname } from "next/navigation";
import ForgeShell from "./forge/Shell";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GlowCursor } from "./GlowCursor";
import CookieConsent from "./CookieConsent";
export default function SiteFrame({children}:{children:React.ReactNode}){const path=usePathname();return path.startsWith("/admin")?<><GlowCursor/><Navbar/><main id="main-content" tabIndex={-1}>{children}</main><Footer/><CookieConsent/></>:<ForgeShell><div className={["/","/about","/programmes","/programmes/enquire","/products","/endless-possibilities","/contact"].includes(path)||path.startsWith("/blog")||path.startsWith("/products/")||path.startsWith("/endless-possibilities/give-a-child-a-laptop")?"":"fg-legacy"}>{children}</div></ForgeShell>;}
