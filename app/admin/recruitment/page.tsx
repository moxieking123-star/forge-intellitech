import type {Metadata} from 'next';
import SchoolReview from '@/components/admin/SchoolReview';
export const metadata:Metadata={title:'Instructor applications',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default function Page(){return <SchoolReview recruitment/>;}
