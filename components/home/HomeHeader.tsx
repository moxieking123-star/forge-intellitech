"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import styles from "./Home.module.css";

const links = [
  { label: "Our work", href: "/#work" },
  { label: "Schools", href: "/techup" },
  { label: "The movement", href: "/#movement" },
  { label: "Stories", href: "/#stories" },
];

export default function HomeHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function closeMenu(destination?: string) {
    dialog.current?.close();
    setOpen(false);
    if (destination?.startsWith("/#")) {
      requestAnimationFrame(() => {
        const target = document.getElementById(destination.slice(2));
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    }
  }

  return (
    <>
      <a className={styles.skipLink} href="#home-content">
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" aria-label="Forge home" className={styles.logo}>
            <Image
              src="/images/brand/forge-wordmark.png"
              alt="Forge"
              width={2045}
              height={769}
              sizes="150px"
              priority
            />
          </Link>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {links.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.headerActions}>
            <Link href="/#movement" className={styles.donorNav}>
              Give a laptop <ArrowRight size={19} aria-hidden />
            </Link>
            <Link
              href="/join"
              className={`${styles.button} ${styles.headerCta}`}
            >
              Build with us <ArrowRight size={19} aria-hidden />
            </Link>
            <button
              ref={trigger}
              className={styles.menuButton}
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="home-menu"
              aria-haspopup="dialog"
              onClick={() => {
                dialog.current?.showModal();
                setOpen(true);
              }}
            >
              <List size={30} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <dialog
        id="home-menu"
        ref={dialog}
        className={styles.menuDialog}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        aria-label="Main navigation"
      >
        <div className={styles.menuContent}>
          <div className={styles.menuTop}>
            <span>Find your place.</span>
            <button
              autoFocus
              className={styles.menuButton}
              onClick={() => closeMenu()}
              aria-label="Close navigation"
            >
              <X size={28} aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => closeMenu(link.href)}
              >
                {link.label}
                <ArrowRight size={25} aria-hidden />
              </Link>
            ))}
            <Link href="/join" onClick={() => closeMenu()}>
              Build with us
              <ArrowRight size={25} aria-hidden />
            </Link>
            <Link href="/contact" onClick={() => closeMenu()}>
              Get in touch
              <ArrowRight size={25} aria-hidden />
            </Link>
          </nav>
          <p>
            A technology company. A movement of people.
            <br />A future worth building.
          </p>
        </div>
      </dialog>
    </>
  );
}
