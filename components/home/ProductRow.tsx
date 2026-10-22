import Link from "next/link";
import { products } from "@/lib/products";
import ProductMark from "../products/ProductMark";
import s from "../products/Products.module.css";
export default function ProductRow(){return <section id="products" className={s.row} aria-label="Forge products">{products.map(product=><Link key={product.id} href={`/products#${product.id}`} aria-label={`Know more about ${product.name}`}><ProductMark id={product.id}/><strong>{product.name}</strong><small>Know more ↗</small></Link>)}</section>;}
