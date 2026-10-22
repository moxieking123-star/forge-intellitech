export const reviewStatuses = ["pending", "reviewing", "proposal_shared", "declined"] as const;
export type ReviewStatus = typeof reviewStatuses[number];
export function parseSchoolReview(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const b = input as Record<string, unknown>;
  if (typeof b.id !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(b.id)) return null;
  if (typeof b.status !== "string" || !reviewStatuses.includes(b.status as ReviewStatus)) return null;
  if (!Number.isSafeInteger(b.version) || Number(b.version) < 1) return null;
  if (typeof b.note !== "string" || !b.note.trim() || b.note.length > 1000) return null;
  return { id: b.id, version: b.version as number, status: b.status as ReviewStatus, note: b.note.trim() };
}
