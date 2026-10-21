import type { Metadata } from "next";
import ApplicationForm from "@/components/applications/ApplicationForm";

export const metadata: Metadata = {
  title: "Enquire about school programmes",
  description:
    "Talk to Forge about ElyTech for primary schools and TechUp for secondary schools.",
  alternates: { canonical: "/programmes/enquire" },
};

export default function Page() {
  return <ApplicationForm journey="school" />;
}
