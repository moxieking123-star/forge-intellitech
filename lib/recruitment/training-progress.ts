import type {WorkspaceState,LessonId} from './workspace-client.ts';
export function trainingDayStatus(state:WorkspaceState|null|undefined,lessonId:LessonId){
 const submission=state?.submissions?.find(item=>item.lessonId===lessonId)??(lessonId==='day-1'?state?.submission:null);
 if(submission?.review)return submission.review.status==='needs_changes'?'Changes requested':'Reviewed';
 if(submission)return 'Awaiting review';
 return state?.completed.includes(lessonId)?'Practised':'Not started';
}
export function trainingProgress(state:WorkspaceState){
 const submissions=state.submissions??(state.submission?[state.submission]:[]);
 return {practised:state.completed.length,submitted:submissions.length,reviewed:submissions.filter(item=>item.review?.status==='reviewed').length,needsChanges:submissions.filter(item=>item.review?.status==='needs_changes').length};
}
