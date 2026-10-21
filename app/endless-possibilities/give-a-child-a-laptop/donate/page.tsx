import type { Metadata } from 'next';
import ApplicationForm from '@/components/applications/ApplicationForm';

export const metadata: Metadata = {
  title: 'Register laptop donor interest',
  description: 'Describe your laptop offer and preferences. Forge matches donor interest against vetted secondary-school student need.',
  alternates: { canonical: '/endless-possibilities/give-a-child-a-laptop/donate' },
};

export default function Page() {
  return <ApplicationForm journey="donor" />;
}
