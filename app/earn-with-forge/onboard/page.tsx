import type { Metadata } from "next";
import SchoolOnboarding from "@/components/applications/SchoolOnboarding";

export const metadata: Metadata = {
  title: "Assist a school with onboarding",
  description:
    "Submit an authorised school onboarding request through your Earn with Forge account. Every request remains subject to Forge review, verification and a contract.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/earn-with-forge/onboard" },
};

export default function AssistedSchoolOnboardingPage() {
  return <SchoolOnboarding assisted />;
}
