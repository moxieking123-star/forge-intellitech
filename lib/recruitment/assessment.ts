/** Server-side recruitment rules. Persistent identity/locking belong to the service adapter. */
export const assessmentRules=Object.freeze({questionCount:30,durationMs:300000,passPercent:75,passCorrect:23,maxAttempts:3});
export const topicCounts=Object.freeze({'foundations':5,'security':6,'nigerian-law':3,'ai':4,'design':5,'web-data':7});
type Topic=keyof typeof topicCounts;
export type Question={id:string;topic:Topic;prompt:string;options:{id:string;text:string}[];correctOptionId:string;rationale?:string;source?:string};
export type Attempt={id:string;requestId:string;setId:string;status:'in_progress'|'passed'|'not_passed'|'abandoned'|'expired';startedAt:number;deadlineAt:number};
export type SavedAnswer={questionId:string;optionId:string;savedAt:number};
const bounded=(v:unknown,max:number):v is string=>typeof v==='string'&&!!v.trim()&&v.length<=max&&!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(v);
export function validateQuestionSet(value:unknown):value is Question[]{
 if(!Array.isArray(value)||value.length!==assessmentRules.questionCount)return false;
 const ids=new Set<string>(),counts:Record<string,number>={};
 for(const q of value){
  if(!q||!bounded(q.id,100)||ids.has(q.id)||!Object.hasOwn(topicCounts,q.topic)||!bounded(q.prompt,500)||!Array.isArray(q.options)||q.options.length!==4)return false;
  ids.add(q.id);counts[q.topic]=(counts[q.topic]||0)+1;
  const choices=new Set<string>(),texts=new Set<string>();
  for(const option of q.options){if(!option||!bounded(option.id,80)||choices.has(option.id)||!bounded(option.text,250)||texts.has(option.text.trim().toLowerCase()))return false;choices.add(option.id);texts.add(option.text.trim().toLowerCase());}
  if(!choices.has(q.correctOptionId))return false;
 }
 return Object.entries(topicCounts).every(([topic,count])=>counts[topic]===count);
}
export function candidateQuestions(questions:Question[]){
 if(!validateQuestionSet(questions))throw Error('Invalid question form');
 return questions.map(q=>({id:q.id,prompt:q.prompt,options:q.options.map(o=>({id:o.id,text:o.text}))}));
}
function timing(attempt:Attempt){
 if(!Number.isSafeInteger(attempt.startedAt)||!Number.isSafeInteger(attempt.deadlineAt)||attempt.deadlineAt-attempt.startedAt!==assessmentRules.durationMs)throw Error('Invalid server timing');
}
export function scoreAttempt(attempt:Attempt,questions:Question[],answers:SavedAnswer[],now:number){
 timing(attempt);if(!Number.isSafeInteger(now)||now<attempt.startedAt||!validateQuestionSet(questions)||!Array.isArray(answers)||answers.length>30)throw Error('Invalid marking input');
 const bank=new Map(questions.map(q=>[q.id,q])),seen=new Set<string>();let answered=0,correct=0;
 for(const a of answers){
  const q=bank.get(a?.questionId);
  if(!q||seen.has(a.questionId)||!q.options.some(o=>o.id===a.optionId)||!Number.isSafeInteger(a.savedAt)||a.savedAt<attempt.startedAt||a.savedAt>now)throw Error('Invalid saved answer');
  seen.add(a.questionId);if(a.savedAt>attempt.deadlineAt)continue;
  answered++;if(a.optionId===q.correctOptionId)correct++;
 }
 return {correct,answered,total:30,percent:Math.round(correct/30*10000)/100,passed:correct>=assessmentRules.passCorrect};
}
/**
 * Call only with rows loaded for the verified applicant under an atomic database
 * lock. This pure decision function does not allocate a persistent attempt.
 * selectionIndex must originate from server randomness, never a client field.
 */
export function planAttemptStart(attempts:Attempt[],availableSetIds:string[],requestId:string,now:number,selectionIndex:number){
 if(!bounded(requestId,100)||!Number.isSafeInteger(now)||!Array.isArray(attempts)||!Array.isArray(availableSetIds)||availableSetIds.some(id=>!bounded(id,100))||new Set(availableSetIds).size!==availableSetIds.length)throw Error('Invalid attempt request');
 for(const a of attempts)timing(a);
 const replay=attempts.find(a=>a.requestId===requestId);if(replay)return {replay:true as const,attempt:replay};
 if(attempts.some(a=>a.status==='passed'))throw Error('Assessment already passed');
 if(attempts.length>=assessmentRules.maxAttempts)throw Error('Further attempts require staff review');
 if(attempts.some(a=>a.status==='in_progress'&&a.deadlineAt>now))throw Error('An attempt is already in progress');
 const used=new Set(attempts.map(a=>a.setId)),unused=availableSetIds.filter(id=>!used.has(id));
 if(!unused.length)throw Error('No unused assessment form is available');
 if(!Number.isSafeInteger(selectionIndex)||selectionIndex<0||selectionIndex>=unused.length)throw Error('Invalid form selection');
 return {replay:false as const,setId:unused[selectionIndex],startedAt:now,deadlineAt:now+assessmentRules.durationMs,attemptNumber:attempts.length+1};
}
