const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const hash=/^[a-f0-9]{64}$/;
const object=(v:unknown):Record<string,unknown>|null=>v&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:null;
const only=(v:Record<string,unknown>,keys:string[])=>Object.keys(v).every(k=>keys.includes(k));
const version=(v:unknown)=>Number.isSafeInteger(v)&&Number(v)>0&&Number(v)<2147483647;
const note=(v:unknown)=>typeof v==='string'&&v.trim().length>0&&v.length<=1000&&!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(v);
export type AgreementReview={referralId:string;version:number;hash:string;decision:'approved'|'changes_requested';note:string;reviewed:true};
export type ContractEvidence={schoolId:string;receiptId:string;schoolVersion:number;signedOn:string;note:string;reviewed:true};
export function parseAgreementAction(action:unknown,value:unknown):Record<string,unknown>|null{
 const v=object(value);if(!v)return null;
 if(action==='list')return only(v,['offset'])&&Number.isSafeInteger(v.offset??0)&&Number(v.offset??0)>=0&&Number(v.offset??0)<=100000?{offset:v.offset??0}:null;
 if(action==='document'||action==='contract_document')return only(v,['referralId'])&&typeof v.referralId==='string'&&uuid.test(v.referralId)?{referralId:v.referralId}:null;
 if(action==='review'&&only(v,['referralId','version','hash','decision','note','reviewed'])&&typeof v.referralId==='string'&&uuid.test(v.referralId)&&version(v.version)&&typeof v.hash==='string'&&hash.test(v.hash)&&['approved','changes_requested'].includes(String(v.decision))&&note(v.note)&&v.reviewed===true)return {...v,note:(v.note as string).trim()};
 return null;
}
export function lagosToday(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Lagos',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function parseContractEvidence(value:unknown,today=lagosToday()):ContractEvidence|null{
 const v=object(value);if(!v||!only(v,['schoolId','receiptId','schoolVersion','signedOn','note','reviewed']))return null;
 if(typeof v.schoolId!=='string'||!uuid.test(v.schoolId)||typeof v.receiptId!=='string'||!uuid.test(v.receiptId)||!version(v.schoolVersion)||!note(v.note)||v.reviewed!==true||typeof v.signedOn!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v.signedOn))return null;
 const d=new Date(v.signedOn+'T00:00:00Z');if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==v.signedOn||v.signedOn>today||v.signedOn<'2000-01-01')return null;
 return {...v,note:(v.note as string).trim()} as ContractEvidence;
}
