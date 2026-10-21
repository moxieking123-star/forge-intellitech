export const notificationMailboxes = {
  work: "work@forgeintellitech.com",
  programmes: "programs@forgeintellitech.com",
  movement: "admin@forgeintellitech.com",
  general: "info@forgeintellitech.com",
} as const;
export type SubmissionSource =
  | "work"
  | "programmes"
  | "endless-possibilities"
  | "general";
export function isSubmissionSource(value: unknown): value is SubmissionSource {
  return (
    typeof value === "string" &&
    ["work", "programmes", "endless-possibilities", "general"].includes(value)
  );
}
export function notificationRecipient(input: {
  inquiryType?: string;
  subject?: string;
  submissionSource?: SubmissionSource;
}) {
  if (input.submissionSource === "work") return notificationMailboxes.work;
  if (input.submissionSource === "endless-possibilities")
    return notificationMailboxes.movement;
  if (input.submissionSource === "programmes")
    return notificationMailboxes.programmes;
  if (input.inquiryType === "careers") return notificationMailboxes.work;
  if (
    /endless possibilities|give a child a laptop|launchpad|government.school seminar/i.test(
      input.subject || "",
    )
  )
    return notificationMailboxes.movement;
  if (input.inquiryType === "schools") return notificationMailboxes.programmes;
  return notificationMailboxes.general;
}
export function sourceForInterest(interest: string | null): SubmissionSource {
  if (interest === "internship") return "work";
  if (interest === "schools") return "programmes";
  if (
    interest &&
    [
      "launchpad",
      "in-school-launchpad",
      "seminars",
      "volunteer",
      "educator",
      "sponsor",
      "patron",
      "laptop",
      "movement",
      "student-support",
    ].includes(interest)
  )
    return "endless-possibilities";
  return "general";
}
