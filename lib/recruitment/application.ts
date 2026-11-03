/** Applicant fields only. Employment/payroll/permissions are separate staff actions. */
export type InstructorApplication={name:string;email:string;phone:string;location:string;experience:string;skills:string;availability:string;motivation:string;consent:true};
const limits={name:120,email:254,phone:40,location:200,experience:2000,skills:2000,availability:1000,motivation:2000} as const;
export function parseInstructorApplication(value:unknown):InstructorApplication|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const input=value as Record<string,unknown>;
 if(input.consent!==true||Object.keys(input).some(key=>key!=='consent'&&!Object.hasOwn(limits,key)))return null;
 const result:Record<string,string|boolean>={consent:true};
 for(const [key,max] of Object.entries(limits)){
  const raw=input[key];if(typeof raw!=='string'||!raw.trim()||raw.length>max||/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(raw))return null;
  result[key]=raw.trim();
 }
 if(!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(String(result.email))||!/^\+?[\d\s().-]{7,40}$/.test(String(result.phone))||String(result.phone).replace(/\D/g,'').length<7||/[\r\n]/.test(String(result.name)))return null;
 result.email=String(result.email).toLowerCase();
 return result as InstructorApplication;
}
/** Identity must be obtained from server-side Auth validation, not request JSON. */
export function matchVerifiedApplicant(identity:unknown,application:InstructorApplication|null):{id:string;email:string}|null{
 if(!identity||typeof identity!=='object'||Array.isArray(identity)||!application)return null;
 const user=identity as Record<string,unknown>;
 if(typeof user.id!=='string'||!user.id.trim()||typeof user.email!=='string'||typeof user.emailConfirmedAt!=='string'||!Number.isFinite(Date.parse(user.emailConfirmedAt)))return null;
 const email=user.email.trim().toLowerCase();return email===application.email?{id:user.id,email}:null;
}
