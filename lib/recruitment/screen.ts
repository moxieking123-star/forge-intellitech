/** UI convenience only; the database deadline remains authoritative. */
export function deadlineClock(deadlineAt:string,serverNow:string,monotonicStart:number){
 const duration=Date.parse(deadlineAt)-Date.parse(serverNow);
 if(!Number.isFinite(duration)||duration>300000||!Number.isFinite(monotonicStart))throw Error('Invalid assessment clock');
 return (monotonicNow:number)=>Math.max(0,Math.ceil((duration-Math.max(0,monotonicNow-monotonicStart))/1000));
}
export function assessmentOutcome(status:string,correct:number|null){
 if(status==='passed')return 'You passed the first assessment. Your training access is being prepared. This is the beginning of training, and does not confirm employment.';
 if(status==='not_passed')return `You answered ${correct??0} of 30 correctly. The pass mark is 23. Review the basics before using another attempt.`;
 if(status==='abandoned')return 'This attempt ended when you left. A new attempt uses a different set of questions.';
 return 'This attempt ended before submission. Please check your remaining attempts or contact Forge for help.';
}
