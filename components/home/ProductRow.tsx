"use client";
import { useRef, useState } from "react";
import { X, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import styles from "./Editorial.module.css";
const products = [
  { name: "BiteBank", status: "In development", image: "bitebank" },
  {
    name: "Forge TechUp Dashboard",
    status: "Testing",
    image: "techup-dashboard",
  },
  { name: "Trego", status: "In development", image: "trego" },
  { name: "Forge All-In", status: "In development", image: "all-in" },
];
export default function ProductRow() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState(products[0]);
  return (
    <section
      id="products"
      className={styles.products}
      aria-label="Forge products"
    >
      <div className={styles.productRow}>
        {products.map((product) => (
          <button
            key={product.name}
            type="button"
            aria-label={product.name}
            aria-haspopup="dialog"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(product);
              dialog.current?.showModal();
            }}
          >
            <Image
              src={`/images/products/${product.image}.webp`}
              alt={product.name}
              width={400}
              height={130}
              sizes="(max-width: 700px) 40vw, 21vw"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={styles.productDialog}
        aria-labelledby="product-title"
        onClose={() => trigger.current?.focus({ preventScroll: true })}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div>
          <button
            autoFocus
            className={styles.closeButton}
            aria-label="Close product details"
            onClick={() => dialog.current?.close()}
          >
            <X size={25} aria-hidden />
          </button>
          <p className={styles.eyebrow}>Made at Forge</p>
          <h2 id="product-title">{selected.name}</h2>
          <p className={styles.productStatus}>{selected.status}</p>
          <p>
            {selected.status === "Testing"
              ? "The Forge TechUp Dashboard is in its testing phase. It is not publicly available yet."
              : "We’re building this. It is not publicly available yet."}
          </p>
          <a href="/contact?interest=partnership" className={styles.textLink}>
            Start a conversation <ArrowRight size={20} aria-hidden />
          </a>
        </div>
      </dialog>
    </section>
  );
}
