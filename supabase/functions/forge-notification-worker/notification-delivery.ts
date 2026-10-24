// @ts-ignore Explicit extension supports the shared Deno and Node TypeScript runtimes.
import { proposalEmail } from "./school-proposal.ts";
export const INTERNAL_RECIPIENTS = ["work@forgeintellitech.com", "programs@forgeintellitech.com", "admin@forgeintellitech.com", "info@forgeintellitech.com"];
export type DeliveryJob = {id:string;queue:string;recipient:string;kind:string;lease_token:string;payload:Record<string,unknown>};
export function deliveryEnabled(env:Record<string,string|undefined>) {
 return env.EMAIL_DELIVERY_ENABLED === "true" && !!env.RESEND_API_KEY && /^[^\s<>@]+@auth\.forgeintellitech\.com$/.test(env.FROM_EMAIL || "");
}
export function deliveryContent(job:DeliveryJob) {
 if(job.queue === "proposal" && job.kind === "school_proposal_requested") {
  const p=job.payload;
  if(typeof p.name!=="string" || typeof p.school!=="string" || p.email!==job.recipient || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(job.recipient)) throw new Error("invalid proposal");
  return proposalEmail({name:p.name,school:p.school,email:job.recipient});
 }
 if(!INTERNAL_RECIPIENTS.includes(job.recipient)) throw new Error("invalid recipient");
 if(!((job.queue==="school" && job.kind==="school_onboarding_received" && job.recipient==="programs@forgeintellitech.com") || (job.queue==="participation" && job.kind==="participation_received"))) throw new Error("invalid template");
 // Untrusted submission values remain plain text. Never accept HTML, destination or links from payload.
 return {subject:job.queue==="school"?"New Forge school onboarding request":"New Forge participation request",text:`A new request is waiting for review.\n\nReference: ${job.id}\n\n${JSON.stringify(job.payload,null,2).slice(0,16000)}`};
}
export function idempotencyKey(job:Pick<DeliveryJob,"queue"|"id">){return `forge-${job.queue}-${job.id}`;}
