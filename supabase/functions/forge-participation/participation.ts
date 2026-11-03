export const participationStatuses = ['new','reviewing','contacted','closed'] as const;
export function parseParticipation(value: unknown, kind: string): Record<string,string> | null {
 if (!value || typeof value !== 'object' || Array.isArray(value) || !['contact','sponsor'].includes(kind)) return null;
 const input=value as Record<string,unknown>;
 const bounds:Record<string,number>=kind==='contact'?{name:120,email:254,phone:80,subject:250,message:20000,inquiryType:40,submissionSource:40}:{companyName:200,contactName:120,email:254,phone:80,sponsorshipType:100,message:20000};
 const output:Record<string,string>={};
 for(const [key,v] of Object.entries(input)){if(!(key in bounds)||typeof v!=='string'||v.length>bounds[key]||v.includes('\u0000'))return null;output[key]=v.trim();}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(output.email||'') || !(kind==='contact'?output.name&&output.message:output.companyName&&output.contactName))return null;
 if(kind==='contact'&&((output.inquiryType&&!['general','partnership','schools','careers','press','support'].includes(output.inquiryType))||(output.submissionSource&&!['work','programmes','endless-possibilities','general'].includes(output.submissionSource))))return null;
 output.email=output.email.toLowerCase();return output;
}
export function participationRecipient(payload:Record<string,string>,kind:string){
 if(kind==='sponsor'||payload.submissionSource==='endless-possibilities')return 'admin@forgeintellitech.com';
 if(payload.submissionSource==='work'||payload.inquiryType==='careers')return 'work@forgeintellitech.com';
 if(payload.submissionSource==='programmes'||payload.inquiryType==='schools')return 'programs@forgeintellitech.com';
 if(/endless possibilities|give a child a laptop|launchpad|government.school seminar|volunteer/i.test(payload.subject||''))return 'admin@forgeintellitech.com';
 return 'info@forgeintellitech.com';
}
export function parseParticipationReview(value:unknown){
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const v=value as Record<string,unknown>;
 if(typeof v.id!=='string'||! /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v.id)||!Number.isSafeInteger(v.version)||Number(v.version)<1||!participationStatuses.includes(v.status as typeof participationStatuses[number])||typeof v.note!=='string'||!v.note.trim()||v.note.length>1000)return null;
 return {id:v.id,version:v.version,status:v.status,note:v.note.trim()};
}
