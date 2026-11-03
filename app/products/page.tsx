import type { Metadata } from "next";
import { ProductsPage } from "@/components/forge/ContentPages";
export const metadata: Metadata = {alternates:{canonical:"/products"},title:"Products & Technology",description:"Explore Forge All-In, Forge Dashboard, BiteBank and Trego, with development and concept stages clearly distinguished."};
export default function Page(){return <ProductsPage/>;}
