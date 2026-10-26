import Link from "next/link";
import styles from "./StudentImageNotice.module.css";
const explanation = (
  <>
    We use AI-generated student images to illustrate learning while protecting
    the privacy of children in our client schools. The children in these
    illustrations are fictional.
  </>
);
const permissions = (
  <>
    Our policy requires the appropriate parent or guardian and school
    permissions, together with applicable data-protection and safeguarding
    checks, before a real student photograph is published.
  </>
);
export default function StudentImageNotice({
  compact = false,
}: {
  compact?: boolean;
}) {
  return compact ? (
    <details className={`${styles.notice} ${styles.compact}`}>
      <summary>About our student imagery</summary>
      <p>{explanation}</p>
      <p>
        {permissions}{" "}
        <Link href="/privacy#student-imagery">Read our imagery policy →</Link>
      </p>
    </details>
  ) : (
    <aside className={styles.notice} aria-label="Student image privacy notice">
      <h2>Their learning matters. So does their privacy.</h2>
      <p>{explanation}</p>
      <p>
        {permissions}{" "}
        <Link href="/privacy#student-imagery">Read our imagery policy →</Link>
      </p>
    </aside>
  );
}
