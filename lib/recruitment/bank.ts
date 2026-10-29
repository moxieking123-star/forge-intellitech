import {validateQuestionSet} from './assessment.ts';
/** Validation reports contain metadata only. The bank itself must stay private. */
export function validateRecruitmentBank(input:unknown){
 const fail=(code:string)=>({valid:false,code,formCount:0,questionCount:0});
 if(!input||typeof input!=='object'||Array.isArray(input))return fail('invalid_bank');
 const bank=input as Record<string,unknown>;
 if(typeof bank.version!=='string'||!/^[a-zA-Z0-9_-]{1,80}$/.test(bank.version)||!Array.isArray(bank.forms)||bank.forms.length<10||bank.forms.length>100)return fail('invalid_manifest');
 const formIds=new Set<string>(),ids=new Set<string>(),stems=new Set<string>();
 for(const form of bank.forms){
  if(!form||typeof form.id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(form.id)||formIds.has(form.id)||!validateQuestionSet(form.questions))return fail('invalid_form');
  formIds.add(form.id);
  for(const q of form.questions){
   const stem=q.prompt.trim().toLowerCase().replace(/\s+/g,' ');
   if(!/^[a-zA-Z0-9_-]{1,80}$/.test(q.id)||ids.has(q.id)||stems.has(stem)||q.options.some((o:{id:string})=>!/^[a-zA-Z0-9_-]{1,80}$/.test(o.id)))return fail('duplicate_or_unsafe_item');
   if(typeof q.rationale!=='string'||q.rationale.trim().length<15||q.rationale.length>1500||typeof q.source!=='string'||q.source.length>1000)return fail('missing_review_evidence');
   try{const source=new URL(q.source);if(source.protocol!=='https:'||source.username||source.password)throw Error();}catch{return fail('invalid_reference');}
   ids.add(q.id);stems.add(stem);
  }
 }
 return {valid:true,code:'valid',formCount:formIds.size,questionCount:ids.size};
}
