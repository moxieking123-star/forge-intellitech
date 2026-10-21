import type { Metadata } from "next";
import ApplicationForm from "@/components/applications/ApplicationForm";

export const metadata: Metadata = {
  title: "Request student laptop support",
  description:
    "Request laptop and learning support for a secondary-school student, with parent or guardian involvement and school verification.",
  alternates: {
    canonical: "/endless-possibilities/give-a-child-a-laptop/request-support",
  },
};

export default function Page() {
  return <ApplicationForm journey="student" />;
}
