import Link from "next/link";
import CookieSettings from "../CookieSettings";
import SocialIcons from "./SocialIcons";
import Image from "next/image";
import styles from "./Home.module.css";

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Link href="/" aria-label="Forge home" className={styles.logo}>
          <Image
            src="/images/brand/forge-wordmark.png"
            alt="Forge"
            width={2045}
            height={769}
            sizes="150px"
          />
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/work">Our work</Link>
          <Link href="/programmes">School programmes</Link>
          <Link href="/endless-possibilities">The movement</Link>
          <Link href="/blog">Stories</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/products">Products</Link>
          <Link href="/partner">Invest or support</Link>
          <Link href="/earn-with-forge">Earn with Forge</Link>
          <Link href="/programmes/resources">School resources</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <CookieSettings />
        </nav>
        <SocialIcons />
        <div className={styles.footerIdentity}>
          <p>Forge Intellitech Services Ltd.</p>
          <span>Building technology. People. Possibilities.</span>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>Forged in Nigeria. Built for what comes next.</span>
        <span>
          © {new Date().getFullYear()} Forge Intellitech Services Ltd.
        </span>
      </div>
    </footer>
  );
}
