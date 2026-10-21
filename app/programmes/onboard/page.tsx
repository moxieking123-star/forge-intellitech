import type { Metadata } from "next";
import SchoolOnboarding from "@/components/applications/SchoolOnboarding";

export const metadata: Metadata = {
  title: "School onboarding request",
  description:
    "Introduce your school and begin a conversation about ElyTech or TechUp. All school onboarding requests are subject to Forge verification and a contract.",
  alternates: { canonical: "/programmes/onboard" },
};

export default function SchoolOnboardingPage() {
  return <SchoolOnboarding />;
}
