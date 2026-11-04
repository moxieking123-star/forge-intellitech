import { ContactPage } from "@/components/forge/ContentPages";
export const metadata={title:"Contact Forge",alternates:{canonical:"/contact"}};
export default async function Page({searchParams}:{searchParams:Promise<{interest?:string}>}){const {interest}=await searchParams;const selected=["software","all-in","bitebank","trego","dashboard"].includes(interest||"")?"Products & technology":interest==="referral"?"Earn with Forge":interest==="laptop"?"Giving a laptop":undefined;return <ContactPage interest={selected}/>;}
