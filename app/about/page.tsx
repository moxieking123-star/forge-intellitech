import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import leadership from "./Leadership.module.css";
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
          <Link className={s.button} href="/products">
            See what we’re building →
          </Link>
          <Link href="/contact?interest=partnership">Build with us →</Link>
        </div>
      </header>
      <section className={leadership.gratitude} aria-labelledby="gratitude-title">
        <div>
          <p className={leadership.gratitudeKicker}>Where this began</p>
          <h2 id="gratitude-title">With gratitude to <span>Jehovah.</span></h2>
        </div>
        <div className={leadership.gratitudeMessage}>
          <p>Forge was founded through inspiration from Jehovah. We are grateful that he gave us this beginning, and we hope that what we build, how we work and the care we show people will bring glory to him.</p>
          <span className={leadership.gratitudeSignature}>A beginning we do not take for granted.</span>
        </div>
      </section>
      <section className={s.section}>
        <p className={s.eyebrow}>The people carrying the work forward</p>
        <h2>Leadership, with a responsibility to build.</h2>
        <div className={leadership.people}>
          <figure className={leadership.person}><Image src="/images/team/founder.jpg" alt="Moxie Adeniyi" width={400} height={400} /><figcaption><span>01 / Chief Executive Officer</span><h3>Moxie Adeniyi</h3><a className={leadership.profileLink} href="https://ng.linkedin.com/in/moxie-adeniyi-167460116" target="_blank" rel="noopener noreferrer" aria-label="View Moxie Adeniyi's LinkedIn profile"><svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 .001-4.123 2.062 2.062 0 0 1-.001 4.123zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>LinkedIn <span aria-hidden="true">↗</span></a></figcaption></figure>
          <figure className={leadership.person}><Image src="/images/team/chairman.jpg" alt="Adeola Oyewole" width={400} height={400} /><figcaption><span>02 / Chairman</span><h3>Adeola Oyewole</h3></figcaption></figure>
        </div>
      </section>
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
            src="/images/editorial/forge-shared-ideas.webp"
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
              href: "/products",
              link: "Explore what we’re building",
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
      <section className={s.split}>
        <div><p className={s.eyebrow}>A story you will be able to watch</p><h2>What is Forge?</h2></div>
        <div><p>A documentary about the thinking and people behind Forge is being prepared for YouTube.</p><p><strong>Coming soon.</strong> The title is provisional; we will share the film here when it is ready.</p></div>
      </section>
      <section className={s.section}>
        <h2>Help build something that can outlive us.</h2>
        <p>
          Have a useful skill and a laptop? There may be a place for your contribution here, wherever you are based. We welcome thoughtful work, patient capital,
          practical knowledge or a useful partnership. Tell us what you see,
          what you can contribute and what you would like to build with Forge.
        </p>
        <div className={s.actions}>
          <Link className={s.button} href="/join">
            Work with Forge →
          </Link>
          <Link href="/partner">Partner or invest →</Link>
        </div>
      </section>
      <Campaign />
    </div>
  );
}
