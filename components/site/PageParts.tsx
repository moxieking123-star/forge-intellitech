import Link from "next/link";
import s from "./Site.module.css";
export function Campaign() {
  return (
    <aside className={s.campaign}>
      <p className={s.eyebrow}>Endless Possibilities — a Forge ITs movement</p>
      <h2>
        Someone else’s child.
        <br />
        Our shared future.
      </h2>
      <p>
        Give a child a laptop. We’ll help them learn to build with it. Because
        opportunity should reach beyond the children we already know.
      </p>
      <div className={s.actions}>
        <Link
          className={s.button}
          href="/endless-possibilities/give-a-child-a-laptop"
        >
          Give a child a beginning →
        </Link>
        <Link href="/endless-possibilities">
          Find your place in the movement →
        </Link>
      </div>
    </aside>
  );
}
export function Rows({
  items,
}: {
  items: { title: string; body: string; href: string; link: string }[];
}) {
  return (
    <div className={s.rows}>
      {items.map((i, n) => (
        <article className={s.row} key={i.title}>
          <span className={s.number}>0{n + 1}</span>
          <div>
            <h3>{i.title}</h3>
            <Link href={i.href}>{i.link} →</Link>
          </div>
          <p>{i.body}</p>
        </article>
      ))}
    </div>
  );
}
