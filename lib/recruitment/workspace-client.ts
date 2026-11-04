export type LessonId=`day-${1|2|3|4|5|6|7|8|9|10|11|12|13|14}`;
export const validLessonId=(v:unknown):v is LessonId=>typeof v==='string'&&/^day-([1-9]|1[0-4])$/.test(v);
export type WorkspaceCommand={operation:'read'|'select'|'complete'|'submit';requestId:string;programme:''|'elytech'|'techup';lessonId:''|LessonId;text:string};
export type TrainingFeedback={id:string;status:'needs_changes'|'reviewed';feedback:string;reviewedAt:string};
export function trainingFeedback(value:unknown):value is TrainingFeedback{if(!value||typeof value!=='object')return false;const p=value as TrainingFeedback;return Object.keys(p).sort().join(',')==='feedback,id,reviewedAt,status'&&typeof p.id==='string'&&/^[a-f0-9-]{36}$/.test(p.id)&&['needs_changes','reviewed'].includes(p.status)&&typeof p.feedback==='string'&&p.feedback.length<=1200&&typeof p.reviewedAt==='string'&&Number.isFinite(Date.parse(p.reviewedAt));}
export type TrainingSubmission={id:string;text:string;submittedAt:string;review:null|TrainingFeedback};
export type WorkspaceState={programme:null|'elytech'|'techup';completed:string[];submission:null|TrainingSubmission;submissions?:Array<TrainingSubmission&{lessonId:LessonId}>};
function validSubmission(a:TrainingSubmission){return !!a&&typeof a.id==='string'&&/^[a-f0-9-]{36}$/.test(a.id)&&typeof a.text==='string'&&a.text.length<=1200&&typeof a.submittedAt==='string'&&Number.isFinite(Date.parse(a.submittedAt))&&(a.review===null||trainingFeedback(a.review));}
export function workspaceState(value:unknown):WorkspaceState|null{
 if(!value||typeof value!=='object')return null;const p=value as WorkspaceState;
 const keys=Object.keys(p).sort().join(',');
 if(!['completed,programme,submission','completed,programme,submission,submissions'].includes(keys)||![null,'elytech','techup'].includes(p.programme)||!Array.isArray(p.completed)||p.completed.length>14||new Set(p.completed).size!==p.completed.length||p.completed.some(x=>!validLessonId(x)))return null;
 if(p.submission!==null&&(!validSubmission(p.submission)||Object.keys(p.submission).sort().join(',')!=='id,review,submittedAt,text'))return null;
 if(p.submissions!==undefined&&(!Array.isArray(p.submissions)||p.submissions.length>14||new Set(p.submissions.map(x=>x?.lessonId)).size!==p.submissions.length||p.submissions.some(x=>!validSubmission(x)||!validLessonId(x.lessonId)||Object.keys(x).sort().join(',')!=='id,lessonId,review,submittedAt,text')))return null;
 return p;
}
