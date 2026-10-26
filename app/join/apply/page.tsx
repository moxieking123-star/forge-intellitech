import type { Metadata } from 'next';
import ApplicationForm from '@/components/applications/ApplicationForm';

export const metadata: Metadata = {
  title: 'Apply or contribute to Forge',
  description: 'Express interest in work, instructor roles, volunteering, donations or partnership with Forge.',
  alternates: { canonical: '/join/apply' },
};

export default function Page() {
  return <ApplicationForm journey="talent" />;
}
