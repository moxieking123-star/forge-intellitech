import type { Metadata } from 'next';
import ApplicationForm from '@/components/applications/ApplicationForm';

export const metadata: Metadata = {
  title: 'Apply or contribute to Forge',
  description: 'Express interest in employment, instruction, volunteering, patronage or partnership with Forge.',
  alternates: { canonical: '/join/apply' },
};

export default function Page() {
  return <ApplicationForm journey="talent" />;
}
