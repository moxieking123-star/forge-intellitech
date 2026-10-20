import Link from "next/link";
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
          <Link href="/#work">Our work</Link>
          <Link href="/techup">Schools</Link>
          <Link href="/#movement">The movement</Link>
          <Link href="/#stories">Stories</Link>
          <Link href="/contact">Contact</Link>
        </nav>
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
