"use client";
import { useRef, useState } from "react";
import styles from "./HeroPlay.module.css";
const letters = "FORGEITS";
export default function HeroPlay() {
  const stage = useRef<HTMLDivElement>(null);
  const [collected, setCollected] = useState(0);
  const [active, setActive] = useState(false);
  const count = [...letters].filter((_, index) => collected & (1 << index)).length;
  const next = [...letters].findIndex((_, index) => !(collected & (1 << index)));
  const complete = count === letters.length;
  function collect(index = next) {
    if (index < 0) return;
    setActive(true);
    setCollected(value => value | (1 << index));
  }
  return <div className={styles.play}>
    <div ref={stage} className={styles.stage} data-active={active} onPointerMove={event => {
      if (!active || event.pointerType !== "mouse") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      stage.current?.style.setProperty("--x", `${Math.max(30, Math.min(bounds.width - 160, event.clientX - bounds.left))}px`);
    }} onClick={event => { if(event.target === event.currentTarget && active && !complete) collect(); }}>
      <div className={styles.builder} aria-hidden="true">
        <svg viewBox="0 0 70 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <circle cx="35" cy="17" r="10" fill="#f4f1e9" />
          <path d="M35 28V61M35 39L15 54M35 39L55 29M35 61L18 89M35 61L53 89" />
        </svg>
        <span>{[...letters].filter((_, index) => collected & (1 << index)).join(" ")}</span>
      </div>
      {active && [...letters].map((letter, index) => !(collected & (1 << index)) &&
        <button type="button" key={index} className={styles.letter} style={{left:`${8 + index * 11}%`, bottom: `${76 + (index % 3) * 27}px`}} aria-label={`Collect letter ${index + 1}: ${letter}`} onClick={() => collect(index)}>{letter}</button>
      )}
      <button type="button" className={styles.control} onClick={() => { if(complete) { setCollected(0); setActive(false); } else collect(); }}>
        {complete ? "Forge ITs. Build it again" : active ? `Pick up ${letters[next]}` : "A little possibility. Click to play"}
      </button>
    </div>
    <span className={styles.status} role="status">{active ? complete ? "Forge ITs. Every beginning takes a little building." : `${count} of 8 letters collected. Move along the scene and click to collect another letter, or use the button.` : ""}</span>
  </div>;
}
