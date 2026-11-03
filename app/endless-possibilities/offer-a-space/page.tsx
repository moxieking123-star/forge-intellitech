import type { Metadata } from "next";
import ApplicationForm from "@/components/applications/ApplicationForm";
export const metadata: Metadata = {
  title: "Offer a weekend learning space or power — Forge",
  description: "Make room for young people to learn. Offer a weekend space, electricity, a generator or fuel; Forge provides the teaching and reviews arrangements with you.",
  alternates: { canonical: "/endless-possibilities/offer-a-space" },
};
export default function Page() { return <ApplicationForm journey="space" />; }
