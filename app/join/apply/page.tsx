import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/site/Site.module.css';
import Application from '@/components/recruitment/Application';
import {EnquiryForm} from '@/components/forge/Forms';
export const dynamic='force-dynamic';

export const metadata: Metadata = {
  title: 'Apply to work with Forge',
  description: 'Introduce yourself, take Forge’s five-minute instructor assessment and begin your preparation to teach.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/join/apply' },
};

export default async function Page({searchParams}:{searchParams:Promise<{purpose?:string}>}) {
  const {purpose}=await searchParams;
  if(purpose==='volunteer')return <div className="fg-container fg-section"><p className="fg-eyebrow">Volunteer with Forge</p><h1>A little time.<br/>A real beginning.</h1><p className="fg-lead">Tell us what you can share and when you can make time. This is a volunteer introduction; paid instructor applications follow their own assessment and training journey.</p><EnquiryForm initialInterest="Volunteering or partnering"/></div>;
  if(process.env.RECRUITMENT_BACKEND_ENABLED==='true')return <Application />;
  return (
    <div className={s.page} id="home-content">
      <header className={s.hero}>
        <p className={s.eyebrow}>Work with Forge</p>
        <h1>
          Applications are
          <br />
          <span className={s.accent}>temporarily unavailable.</span>
        </h1>
        <p className={s.lead}>
          Please check back shortly to introduce yourself and take the instructor
          assessment. If you need help with an existing application, contact our team.
        </p>
        <p><a href="mailto:work@forgeintellitech.com">work@forgeintellitech.com</a></p>
        <div className={s.actions}>
          <Link className={s.button} href="/join">
            Back to Work with Forge →
          </Link>
        </div>
      </header>
    </div>
  );
}
