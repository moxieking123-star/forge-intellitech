import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/forge/ContentPages";
const names:Record<string,string>={"all-in":"Forge All-In",dashboard:"Forge Dashboard",bitebank:"BiteBank",trego:"Trego"};
export function generateStaticParams(){return Object.keys(names).map(product=>({product}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{product:string}>}){const {product}=await params;return {title:names[product]||"Products",alternates:{canonical:"/products/"+product}};}
export default async function Page({params}:{params:Promise<{product:string}>}){const {product}=await params;if(!names[product])notFound();return <ProductDetail id={product}/>;}
