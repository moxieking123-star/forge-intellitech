import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import s from "@/components/site/Site.module.css";
import { Campaign, Rows } from "@/components/site/PageParts";
export const metadata: Metadata = {
  title: "About Forge — the future we can build",
  description:
    "Meet Forge Intellitech Services Ltd: building useful technology, practical learning and opportunities for people to create in Nigeria.",
  alternates: { canonical: "/about" },
};
export default function Page() {
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>Our company / Our conviction</p>
        <h1>
          The future needs
          <br />
          <span className={s.accent}>people who build.</span>
        </h1>
        <p className={s.lead}>
          We are Forge Intellitech Services Ltd. We build useful technology,
          teach people to create and back ideas that deserve a beginning.
        </p>
        <div className={s.actions}>
          <Link className={s.button} href="/work">
            See what we’re building →
          </Link>
          <Link href="/contact?interest=partnership">Build with us →</Link>
        </div>
      </header>
      <section className={s.split}>
        <div>
          <h2>What if the talent was always there?</h2>
          <p>
            Think about the child who has never held a laptop, but already finds
            ways to fix things around them. What might happen if someone gave
            that curiosity a place to go?
          </p>
          <p>
            We cannot call people untalented when we have barely given them the
            opportunity to discover what they can do. That question sits behind
            the work we are building at Forge.
          </p>
          <p>
            Technology is part of our answer. So are teaching, patient support
            and the willingness to build alongside someone whose idea is still
            finding its shape.
          </p>
        </div>
        <figure>
          <Image
            className={s.image}
            src="/images/editorial/company-team.webp"
            alt="Illustration of Nigerian adults collaborating on an idea in a creative technology studio"
            width={1024}
            height={1024}
          />
          <figcaption className={s.caption}>
            Illustration of a Nigerian creative team; not a photograph of
            Forge staff.
          </figcaption>
        </figure>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>The company and the movement</p>
        <h2>One conviction. More than one way to act.</h2>
        <Rows
          items={[
            {
              title: "Forge Intellitech",
              body: "The company builds technology and practical learning programmes. Our ambition is to turn an understanding of real problems into things people can actually use.",
              href: "/work",
              link: "Explore our work",
            },
            {
              title: "Forge ITs",
              body: "The movement inside the company creates ways for more people to participate. Endless Possibilities brings together devices, skills, enterprise support and the people willing to contribute them.",
              href: "/endless-possibilities",
              link: "Meet the movement",
            },
          ]}
        />
      </section>
      <section className={s.split}>
        <h2>The future we keep waiting for.</h2>
        <div>
          <p>
            We do not believe that teaching technology will automatically end
            poverty, violence or unemployment. Those problems are more
            complicated than that. But we refuse to believe meaningful
            opportunity cannot change the direction of a life.
          </p>
          <p>
            We want a young Nigerian to look at a problem nearby and begin
            imagining a solution. To understand that their ideas have value. To
            learn through making something, questioning it and trying again.
          </p>
          <p>
            We will make mistakes. Experience will change some of our thinking.
            Still, if everyone who sees a problem waits until they are perfectly
            prepared, who will build the future we keep talking about?
          </p>
          <Link href="/blog/the-future-we-can-start-building">
            Read the thinking behind our work →
          </Link>
        </div>
      </section>
      <section className={s.section}>
        <h2>Help build something that can outlive us.</h2>
        <p>
          We welcome people who can bring thoughtful work, patient capital,
          practical knowledge or a useful partnership. Tell us what you see,
          what you can contribute and what you would like to build with Forge.
        </p>
        <div className={s.actions}>
          <Link className={s.button} href="/join">
            Work with Forge →
          </Link>
          <Link href="/contact?interest=partnership">Partner or invest →</Link>
        </div>
      </section>
      <Campaign />
    </div>
  );
}
