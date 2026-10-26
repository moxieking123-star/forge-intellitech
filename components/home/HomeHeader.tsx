"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, List, X, Newspaper, CaretDown } from "@phosphor-icons/react";
import styles from "./Home.module.css";
import nav from "./Navigation.module.css";

const links = [
  { label: "Company", href: "/about" },
  { label: "School programmes", href: "/programmes" },
  { label: "Products", href: "/products" },
  { label: "Stories", href: "/blog" },
];
const moreLinks=[{label:"The Forge ITs movement",href:"/endless-possibilities"},{label:"Launchpad",href:"/endless-possibilities/launchpad"},{label:"Work with Forge",href:"/join"},{label:"Invest, sponsor or contribute",href:"/partner"},{label:"Earn with Forge",href:"/earn-with-forge"},{label:"School resources",href:"/programmes/resources"},{label:"Our work",href:"/work"},{label:"Get in touch",href:"/contact"}];

export default function HomeHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const more = useRef<HTMLDetailsElement>(null);
  useEffect(()=>{function outside(event:PointerEvent){if(more.current&&!more.current.contains(event.target as Node))more.current.open=false;}function escape(event:KeyboardEvent){if(event.key==='Escape'&&more.current?.open){more.current.open=false;more.current.querySelector('summary')?.focus();}}document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};},[]);

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
      <a className={styles.skipLink} href="#main-content">
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
          <nav className={nav.desktop} aria-label="Main navigation">
            {links.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label==='Stories'&&<Newspaper className={nav.newspaper} size={18} aria-hidden />}{link.label}
              </Link>
            ))}
            <details ref={more} className={nav.more}><summary>Find your place <CaretDown size={13} aria-hidden /></summary><div>{moreLinks.map(link=><Link key={link.href} href={link.href} onClick={()=>{if(more.current)more.current.open=false;}}>{link.label}<ArrowRight size={16} aria-hidden /></Link>)}</div></details>
          </nav>
          <div className={styles.headerActions}>
            <Link
              href="/endless-possibilities/give-a-child-a-laptop#give-device"
              className={styles.donorNav}
            >
              Give a laptop <ArrowRight size={19} aria-hidden />
            </Link>
            <button
              ref={trigger}
              className={`${styles.menuButton} ${nav.menuToggle}`}
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
            {[...links,...moreLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => closeMenu(link.href)}
              >
                {link.label}
                <ArrowRight size={25} aria-hidden />
              </Link>
            ))}
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
