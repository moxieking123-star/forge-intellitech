export const deliveredLaptops = { total: 3, states: [{state: "Lagos", count: 2}, {state: "Ogun", count: 1}] } as const;

export function parseLaptopIntake(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const source = input as Record<string, unknown>;
  if (!['student','donor'].includes(String(source.kind))) return null;
  if (!source.values || typeof source.values !== 'object' || Array.isArray(source.values)) return null;
  const fields: Record<string,string> = {};
  const allowed = source.kind === 'student'
    ? ['role','applicantName','email','phone','teacherSchool','studentName','school','class','location','schoolCategory','guardianName','guardianContact','purpose','conditionPreference','skills','parentAwareness','donorConversation','access','project','source','sourceDetail']
    : ['name','email','phone','supporterType','organisation','donorLocation','recipientLocation','offer','condition','purpose','schoolPreference','deliveryPreference','conversation','updates','additionalSupport','device','consent'];
  for (const [key,value] of Object.entries(source.values)) {
    const limit=['project','device'].includes(key) ? 3000 : ['skills','additionalSupport'].includes(key) ? 1000 : ['name','applicantName'].includes(key) ? 120 : key==='phone' ? 80 : 254;
    if (!allowed.includes(key) || typeof value !== 'string' || value.includes('\0') || value.length > limit) return null;
    fields[key] = value.trim();
  }
  const required = source.kind === 'student'
    ? ['role','applicantName','email','studentName','school','class','location','schoolCategory','guardianName','guardianContact','purpose','conditionPreference','skills','parentAwareness','donorConversation','access','project','source']
    : ['name','email','supporterType','donorLocation','recipientLocation','offer','condition','purpose','schoolPreference','deliveryPreference','conversation','updates','device'];
  if (required.some(key=>!fields[key]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return null;
  if (source.kind === 'student' && (!['SS1','SS2','SS3'].includes(fields.class) || !['Public secondary school','Low-income private secondary school'].includes(fields.schoolCategory))) return null;
  fields.email = fields.email.toLowerCase();
  return {kind: source.kind as 'student'|'donor', values: Object.fromEntries(Object.entries(fields).sort(([a],[b])=>a.localeCompare(b)))};
}

// Suggestions never authorise contact or a device handover.
export function compatibleLaptopOffer(student: {location:string;condition:'any'|'new'|'used';purpose:string}, donor: {location:string;condition:'new'|'used';purpose:string}) {
  const normalise=(value:string)=>value.trim().toLowerCase().replace(/\s+/g,' ');
  return (normalise(donor.location)==='anywhere in nigeria' || normalise(student.location)===normalise(donor.location))
    && (student.condition==='any' || student.condition===donor.condition)
    && (donor.purpose==='any' || student.purpose===donor.purpose);
}
