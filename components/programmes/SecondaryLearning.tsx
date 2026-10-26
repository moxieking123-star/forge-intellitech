import styles from './Programmes.module.css';

export default function SecondaryLearning() {
  return <section className={styles.secondaryLearning} aria-labelledby="secondary-learning-title">
    <p className={styles.eyebrow}>TechUp · one foundation, room to grow</p>
    <h2 id="secondary-learning-title">What do they actually learn?</h2>
    <div className={styles.secondaryColumns}>
      <article><h3>Junior Secondary · JSS1–JSS3</h3><p>Students explore design with Canva and Figma, organise information in Excel, explore data with Power BI and build web foundations with HTML and CSS. They connect logic, research and communication to small useful projects: a page that organises revision links, for example.</p><p>Every learner explores AI: what it is, how people develop it using data and models, and why human judgement matters when checking results and deciding what to build. Digital citizenship includes privacy, respectful communication and recognising online risks.</p></article>
      <article><h3>Senior Secondary · SS1–SS3</h3><p>Students build on those foundations through a track. They plan, make, test and explain their work, with AI understanding and responsible use across all three tracks.</p><dl><dt>The Builder</dt><dd>Websites, software, automations, data tools and prototypes. A first project might organise revision materials into a working website.</dd><dt>The Storyteller</dt><dd>Graphic design, writing, video, branding and presentations. A first project might explain how classmates can use that revision website.</dd><dt>The Strategist</dt><dd>Research, data analysis, product thinking, digital marketing and planning. A first project might investigate why classmates struggle to find useful revision materials.</dd></dl><p>Senior learners also explore Nigeria’s <a href="https://www.wipo.int/wipolex/en/legislation/details/22696">Cybercrimes (Prohibition, Prevention, etc.) Act, 2015</a> and the <a href="https://www.wipo.int/wipolex/en/legislation/details/22699">2024 Amendment Act</a>, connecting online choices with responsibility.</p></article>
    </div>
    <p>Both programmes are 70% practical and 30% theory. The point is to build useful things with the tools and resources available here, and understand the thinking behind the work.</p>
  </section>;
}
