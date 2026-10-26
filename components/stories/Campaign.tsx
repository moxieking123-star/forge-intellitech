import Link from "next/link";
import styles from "./stories.module.css";

export function StoriesCampaign() {
  return (
    <section
      className={styles.campaign}
      aria-labelledby="stories-campaign-title"
    >
      <div className={`${styles.wrap} ${styles.campaignInner}`}>
        <div>
          <p
            className={styles.eyebrow}
            style={{ color: "#ff9d78", marginBottom: 18 }}
          >
            Endless Possibilities · A Forge ITs movement
          </p>
          <h2 id="stories-campaign-title">
            Someone else’s child.
            <br />
            Our shared future.
          </h2>
          <p>
            A useful device. Guided learning. A place to begin. Help make the
            next practical opportunity possible.
          </p>
        </div>
        <Link
          className={styles.button}
          href="/endless-possibilities/give-a-child-a-laptop"
        >
          Give a child a laptop <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
