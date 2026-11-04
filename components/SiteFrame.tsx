"use client";
import { usePathname } from "next/navigation";
import ForgeShell from "./forge/Shell";
import Link from "next/link";
import Image from "next/image";
import adminFrame from "./admin/AdminFrame.module.css";
import CookieConsent from "./CookieConsent";
import {trainingBasePath,trainingPath} from "@/lib/recruitment/paths";

export default function SiteFrame({children}:{children:React.ReactNode}) {
  const path=usePathname();
  if(trainingBasePath()) return <><header className={adminFrame.header}><a href="https://www.forgeintellitech.com" className={adminFrame.brand}><img src={trainingPath('/images/brand/forge-wordmark.png')} alt="Forge" width={120} height={45}/><span>Instructor preparation</span></a><a href="https://app.forgeintellitech.com" className={adminFrame.back}>Operations dashboard</a></header><main id="main-content" tabIndex={-1}>{children}</main><footer className={adminFrame.footer}>Forge Intellitech Services Ltd. · Instructor preparation</footer></>;
  if(path.startsWith("/admin")) return <><header className={adminFrame.header}><Link href="/" className={adminFrame.brand}><Image src="/images/brand/forge-wordmark.png" alt="Forge" width={120} height={45}/><span>Private workspace</span></Link><Link href="/" className={adminFrame.back}>Back to the website</Link></header><main id="main-content" tabIndex={-1}>{children}</main><footer className={adminFrame.footer}>Forge Intellitech Services Ltd. · Private staff workspace</footer><CookieConsent/></>;
  const redesigned=["/","/about","/programmes","/programmes/enquire","/products","/endless-possibilities","/contact"].includes(path)||path.startsWith("/blog")||path.startsWith("/products/")||path.startsWith("/endless-possibilities/give-a-child-a-laptop");
  return <><ForgeShell><div className={redesigned?"":"fg-legacy"}>{children}</div></ForgeShell><CookieConsent/></>;
}
