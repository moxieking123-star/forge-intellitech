import type { Metadata } from "next";
import SchoolReview from "@/components/admin/SchoolReview";
export const metadata:Metadata={title:"Staff school review",robots:{index:false,follow:false}};
export default function AdminPage(){return <SchoolReview/>;}
