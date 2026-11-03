import type {Metadata} from 'next';
import SchoolReview from '@/components/admin/SchoolReview';
export const metadata:Metadata={title:'Private agreement review',robots:{index:false,follow:false}};
export default function Page(){return <SchoolReview agreements/>;}
