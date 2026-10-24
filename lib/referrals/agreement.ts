export const AGREEMENT_VERSION = "draft-2026-10-22-v1";
export const MAX_SIGNED_PDF_BYTES = 3 * 1024 * 1024;
export const referralIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function boundedBody(request: Pick<Request,'body'>, maximum: number) {
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader(), chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.length;
      if (size > maximum) { await reader.cancel(); throw new Error("Request too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}
export function validatePayoutProfile(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const b = input as Record<string, unknown>;
  if (typeof b.bankName !== "string" || typeof b.accountName !== "string" || typeof b.accountNumber !== "string") return null;
  const bankName = b.bankName.trim(), accountName = b.accountName.trim(), accountNumber = b.accountNumber.trim();
  if (!bankName || bankName.length > 120 || !accountName || accountName.length > 200 || !/^\d{10}$/.test(accountNumber)) return null;
  if (/[\x00-\x1f]/.test(bankName + accountName)) return null;
  return { bank_name: bankName, account_name: accountName, account_number: accountNumber };
}
export function maskAccountNumber(value: string) { return "••••••" + value.slice(-4); }
export function validateSignedPdf(bytes: Uint8Array) {
  if (!bytes.length || bytes.length > MAX_SIGNED_PDF_BYTES) return false;
  const content = new TextDecoder("latin1").decode(bytes);
  // Conservative rejection only; this is not a malware scanner or signature verifier.
  if (!content.startsWith("%PDF-") || !/%%EOF\s*$/.test(content)) return false;
  const blocked = /^(?:JavaScript|JS|Launch|EmbeddedFile|Filespec|OpenAction|AA|RichMedia|XFA|SubmitForm|ImportData|GoToR|GoToE|URI|Rendition|Movie|Sound|3D|Encrypt|ObjStm)$/i;
  // Decode PDF name escapes, rather than treating random #xx in font streams as actions.
  for (const match of content.matchAll(/\/([^\s()<>{}\[\]/%]+)/g)) {
    const name = match[1].replace(/#([0-9a-f]{2})/gi, (_, hex: string) => String.fromCharCode(parseInt(hex,16)));
    if (blocked.test(name)) return false;
  }
  return true;
}
export function fifthWorkingDay(start: string, holidays: readonly string[], coveredThrough: string) {
  const date = new Date(start + "T00:00:00Z");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !Number.isFinite(date.valueOf()) || date.toISOString().slice(0,10) !== start) throw new Error("Invalid date");
  let count = 0;
  while (count < 5) {
    date.setUTCDate(date.getUTCDate() + 1);
    const day = date.toISOString().slice(0, 10);
    if (day > coveredThrough) throw new Error("Holiday calendar requires review");
    if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6 && !holidays.includes(day)) count++;
  }
  return date.toISOString().slice(0, 10);
}
