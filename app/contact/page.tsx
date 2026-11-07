import { ContactPage } from "@/components/forge/ContentPages";
import {contactInterest} from '@/lib/contact-interests';
export const metadata={title:"Contact Forge",alternates:{canonical:"/contact"}};
export default async function Page({searchParams}:{searchParams:Promise<{interest?:string}>}){const {interest}=await searchParams;return <ContactPage interest={contactInterest(interest)}/>;}
