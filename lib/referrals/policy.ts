import { createHash } from "node:crypto";
export const REFERRAL_RATE_PERCENT = 15;
export const referralCodePattern = /^FRG-[A-Z0-9]{12}$/;
export function schoolKey(name: string, location: string) {
  const normal = (s: string) =>
    s
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .replace(/\s+/g, " ");
  return createHash("sha256")
    .update(normal(name) + "|" + normal(location))
    .digest("hex");
}
export function commissionKobo(input: {
  schoolPaymentKobo: number;
  internetKobo: number;
  directSchoolOperationsKobo: number;
  taxKobo: number;
}) {
  const numbers = Object.values(input);
  if (numbers.some((n) => !Number.isSafeInteger(n) || n < 0))
    throw new Error("Use non-negative safe integer amounts in kobo");
  const net =
    BigInt(input.schoolPaymentKobo) -
    BigInt(input.internetKobo) -
    BigInt(input.directSchoolOperationsKobo) -
    BigInt(input.taxKobo);
  return Number(
    net > BigInt(0) ? (net * BigInt(15) + BigInt(50)) / BigInt(100) : BigInt(0),
  );
}
export function payableDate(startsOn: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startsOn)) throw new Error("Use an ISO date");
  const date = new Date(startsOn + "T00:00:00Z");
  if (
    !Number.isFinite(date.valueOf()) ||
    date.toISOString().slice(0, 10) !== startsOn
  )
    throw new Error("Invalid start date");
  date.setUTCDate(date.getUTCDate() + 28);
  return date.toISOString().slice(0, 10);
}
export function validateSchool(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const b = input as Record<string, unknown>;
  const lengths: Record<string, number> = {
    schoolName: 200,
    level: 50,
    location: 200,
    name: 200,
    email: 254,
    phone: 25,
    role: 200,
    startPeriod: 200,
    context: 3000,
    note: 3000,
  };
  const out: Record<string, string | number | boolean | null> = {};
  for (const [key, max] of Object.entries(lengths)) {
    const v = b[key];
    if (key === "note" && (v == null || v === "")) {
      out[key] = "";
      continue;
    }
    if (typeof v !== "string" || !v.trim() || v.length > max) return null;
    out[key] = v.trim();
  }
  if (
    !["Primary", "Secondary", "Both primary and secondary"].includes(
      out.level as string,
    ) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email as string) ||
    !/^\+?[\d\s().-]{7,25}$/.test(out.phone as string) ||
    (out.phone as string).replace(/\D/g, "").length < 7 ||
    !Number.isSafeInteger(b.learnerCount) ||
    Number(b.learnerCount) < 1 ||
    Number(b.learnerCount) > 100000 ||
    b.consent !== true
  )
    return null;
  const code = b.referralCode;
  if (
    code != null &&
    code !== "" &&
    (typeof code !== "string" || !referralCodePattern.test(code))
  )
    return null;
  if (b.assisted === true && b.schoolAuthorised !== true) return null;
  return {
    ...out,
    schoolName: out.schoolName as string,
    location: out.location as string,
    name: out.name as string,
    email: out.email as string,
    phone: out.phone as string,
    learnerCount: b.learnerCount as number,
    consent: true,
    referralCode: code || null,
    assisted: b.assisted === true,
    schoolAuthorised: b.schoolAuthorised === true,
  };
}
