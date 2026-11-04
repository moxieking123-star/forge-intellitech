// Explicitly enabled for visual reviews. Production uses the existing form API.
export const frontendPreview = process.env.NEXT_PUBLIC_FORGE_PREVIEW === "true";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  inquiryType: "general" | "partnership" | "schools" | "support";
  submissionSource: "general" | "programmes" | "endless-possibilities";
  subject: string;
  message: string;
};

export async function sendContact(payload: ContactPayload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.status !== 201) {
    throw new Error("We could not confirm your enquiry. Your answers are still here. Please try again or email info@forgeintellitech.com.");
  }
}
