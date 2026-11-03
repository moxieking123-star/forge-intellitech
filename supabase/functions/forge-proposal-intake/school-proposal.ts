export const SCHOOL_PROPOSAL_VERSION = "2026-10-22-v1";
export type ProposalRequest = { name: string; school: string; email: string };
export function parseProposalRequest(value: unknown): ProposalRequest | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (body.consent !== "yes" || (body.website !== "" && body.website !== undefined)) return null;
  if (typeof body.name !== "string" || !body.name.trim() || body.name.length > 100 || /[\r\n\x00]/.test(body.name)) return null;
  if (typeof body.school !== "string" || !body.school.trim() || body.school.length > 160 || /[\r\n\x00]/.test(body.school)) return null;
  if (typeof body.email !== "string" || body.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(body.email)) return null;
  return { name: body.name.trim(), school: body.school.trim(), email: body.email.trim().toLowerCase() };
}
function escape(value: string) { return value.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]!)); }
export function proposalEmail(request: ProposalRequest) {
  const paragraphs = [
    `Hello ${request.name},`,
    `Thank you for making room for this conversation at ${request.school}. I think one of the most important things we can give a child is the opportunity to discover what they are capable of creating.`,
    "That is the thinking behind ElyTech and TechUp. We want learning to move beyond knowing the right answer to asking a useful question, trying an idea and building something with it.",
    "Your school proposal is attached. It explains the subject, the learning journey, what we provide, the device arrangements and the fees. Take your time with it, share it with your team, and bring us the questions that matter to your school.",
    "We do not pretend to have every answer. We would rather build a thoughtful relationship with your school, listen properly and do the work together. If this feels like a future you want your students to take part in, reply to this email. We would love to talk.",
    "Schools can onboard for next term until 31 December 2026.",
    "Let’s give them somewhere to begin.\nThe Forge programmes team\nprograms@forgeintellitech.com",
  ];
  return { subject: "A beginning worth building — your Forge school proposal", text: paragraphs.join("\n\n"), html: `<div style="background:#f4f1e9;padding:32px 16px;font-family:Arial,sans-serif;color:#10211d"><div style="max-width:600px;margin:auto"><p style="letter-spacing:3px;font-weight:bold">FORGE</p><h1 style="font-size:32px;line-height:1.15">A child’s next possibility<br>can begin at your school.</h1>${paragraphs.map(p=>`<p style="font-size:16px;line-height:1.75;white-space:pre-line">${escape(p)}</p>`).join("")}<hr><p style="font-size:12px;line-height:1.6">You received this because you requested the school proposal. This is not a newsletter subscription. <a href="https://forgeintellitech.com/privacy">Privacy information</a></p></div></div>` };
}
