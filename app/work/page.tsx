import type { Metadata } from "next";
import s from "@/components/site/Site.module.css";
import { Campaign, Rows } from "@/components/site/PageParts";
import ProductRow from "@/components/home/ProductRow";
export const metadata: Metadata = {
  title: "Our work — technology, skills and possibilities",
  description:
    "Explore Forge’s school programmes, products in development and pathways for young people to learn, create and build enterprises.",
  alternates: { canonical: "/work" },
};
export default function Page() {
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>Our work</p>
        <h1>
          Ideas become useful
          <br />
          when we <span className={s.accent}>build them.</span>
        </h1>
        <p className={s.lead}>
          A product that solves a real problem. A lesson that becomes a project.
          An idea that grows into an enterprise. This is where our work begins.
        </p>
      </header>
      <section className={s.section}>
        <h2>Made of possibility.</h2>
        <Rows
          items={[
            {
              title: "Learn to build.",
              body: "ElyTech for primary schools and TechUp for secondary schools connect practical skills, projects and a learning pathway that continues beyond a single lesson.",
              href: "/programmes",
              link: "Explore school programmes",
            },
            {
              title: "Turn an idea into a beginning.",
              body: "Through In-school LaunchPad, we identify ideas among students in TechUp partner schools and explore building an enterprise alongside them.",
              href: "/endless-possibilities/in-school-launchpad",
              link: "Explore In-school LaunchPad",
            },
            {
              title: "Create access to opportunity.",
              body: "Endless Possibilities connects people willing to contribute with practical ways to support learning, enterprise and a young person’s next step.",
              href: "/endless-possibilities",
              link: "Find your place",
            },
          ]}
        />
      </section>
      <section className={s.section} aria-labelledby="product-heading">
        <p className={s.eyebrow}>Products / work in progress</p>
        <h2 id="product-heading">What we’re building.</h2>
        <ProductRow />
      </section>
      <Campaign />
    </div>
  );
}
