import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/site/Site.module.css';

export const metadata: Metadata = {
  title: 'Work with Forge — experience in development',
  description: 'Forge is preparing a better way for people to share their skills and journey with us.',
  alternates: { canonical: '/join/apply' },
};

export default function Page() {
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>A new way to join is taking shape</p>
        <h1>
          We’re forging a better way
          <br />
          <span className={s.accent}>to journey with us.</span>
        </h1>
        <p className={s.lead}>
          The Work with Forge experience is being developed. We’re building a
          thoughtful way for people to share what they can bring and discover
          where they might fit.
        </p>
        <p>We plan to reopen this experience on 28 October 2026.</p>
        <div className={s.actions}>
          <Link className={s.button} href="/join">
            Back to Work with Forge →
          </Link>
        </div>
      </header>
    </div>
  );
}
