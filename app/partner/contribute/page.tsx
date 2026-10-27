import type {Metadata} from 'next';
import ParticipationForm from '@/components/applications/ParticipationForm';
export const metadata:Metadata={title:'Contribute to a beginning — Forge',description:'View Forge’s bank-transfer instructions to support practical learning and new beginnings.',alternates:{canonical:'/partner/contribute'}};
export default function Page(){return <ParticipationForm donationOnly/>;}
