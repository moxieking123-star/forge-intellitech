import type { Metadata } from "next";
import { AboutPage } from "@/components/forge/ContentPages";
export const metadata: Metadata = {alternates:{canonical:"/about"},title:"About Forge",description:"A Nigerian technology company building useful solutions, developing people and widening opportunity."};
export default function Page(){return <AboutPage/>;}
