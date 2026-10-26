export const reactions = ["Curious", "Inspired", "Confused", "Unconvinced"] as const;
export const visitorTypes = ["Student", "School leader / educator", "Employed", "Looking for work", "Business / corporate", "Trader / business owner", "Social media / creative", "Parent / guardian", "Other"] as const;
export type Feedback = { requestId: string; sessionId: string; page: string; section: string; reaction: string; visitorType: string; comment: string };
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export function parseFeedback(input: unknown): Feedback | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const b = input as Record<string, unknown>;
  if (Object.keys(b).some(k => !["requestId", "sessionId", "page", "section", "reaction", "visitorType", "comment"].includes(k))) return null;
  if (!["requestId", "sessionId", "page", "section", "reaction", "visitorType", "comment"].every(k => typeof b[k] === "string")) return null;
  const f = b as Feedback;
  if (!uuid.test(f.requestId) || !uuid.test(f.sessionId)) return null;
  // Only public pathnames: never save queries, preview access tokens or account URLs.
  if (f.page.length > 180 || !/^\/(?:[a-z0-9-]+\/?)*$/.test(f.page) || /^\/(?:api|admin|auth|account|referrer)(?:\/|$)/.test(f.page)) return null;
  if (!f.section.trim() || f.section.length > 160 || /[\x00-\x1f]/.test(f.section)) return null;
  if (!reactions.includes(f.reaction as typeof reactions[number]) && f.reaction !== "") return null;
  if (!visitorTypes.includes(f.visitorType as typeof visitorTypes[number]) && f.visitorType !== "") return null;
  if (f.comment.length > 1200 || (!f.reaction && !f.comment.trim())) return null;
  return { ...f, section: f.section.trim(), comment: f.comment.trim() };
}
