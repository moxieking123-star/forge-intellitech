export type WorkspaceCommand={operation:'read'|'select'|'complete'|'submit';requestId:string;programme:''|'elytech'|'techup';lessonId:''|'day-1';text:string};
export type TrainingFeedback={id:string;status:'needs_changes'|'reviewed';feedback:string;reviewedAt:string};
export function trainingFeedback(value:unknown):value is TrainingFeedback{if(!value||typeof value!=='object')return false;const p=value as TrainingFeedback;return Object.keys(p).sort().join(',')==='feedback,id,reviewedAt,status'&&typeof p.id==='string'&&/^[a-f0-9-]{36}$/.test(p.id)&&['needs_changes','reviewed'].includes(p.status)&&typeof p.feedback==='string'&&p.feedback.length<=1200&&typeof p.reviewedAt==='string'&&Number.isFinite(Date.parse(p.reviewedAt));}
export type WorkspaceState={programme:null|'elytech'|'techup';completed:string[];submission:null|{id:string;text:string;submittedAt:string;review:null|TrainingFeedback}};
export function workspaceState(value:unknown):WorkspaceState|null{
 if(!value||typeof value!=='object')return null;const p=value as WorkspaceState;
 if(Object.keys(p).sort().join(',')!=='completed,programme,submission'||![null,'elytech','techup'].includes(p.programme)||!Array.isArray(p.completed)||p.completed.length>1||p.completed.some(x=>x!=='day-1'))return null;
 if(p.submission!==null){const a=p.submission;if(!a||Object.keys(a).sort().join(',')!=='id,review,submittedAt,text'||typeof a.id!=='string'||!/^[a-f0-9-]{36}$/.test(a.id)||typeof a.text!=='string'||a.text.length>1200||typeof a.submittedAt!=='string'||!Number.isFinite(Date.parse(a.submittedAt))||(a.review!==null&&!trainingFeedback(a.review)))return null;}
 return p;
}
