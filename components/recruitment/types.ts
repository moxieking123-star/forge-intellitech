export type CandidateQuestion={id:string;prompt:string;options:{id:string;text:string}[]};
export type CandidateAttempt={id:string;status:string;startedAt:string;deadlineAt:string;serverNow:string;questions:CandidateQuestion[]};
export type AttemptSummary={id:string;status:string;correct:number|null;startedAt:string;deadlineAt:string};
export type ApplicationState={application:null|{id:string;status:string;fields:Record<string,string|boolean>};attempts:AttemptSummary[];remaining:number;serverNow:string};
export type CandidateRequest=(body?:Record<string,unknown>)=>Promise<any>;
