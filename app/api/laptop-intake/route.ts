import { parseLaptopIntake } from '@/lib/laptop-initiative';
import { sameOrigin } from '@/lib/request-origin';
import { boundedBody } from '@/lib/referrals/agreement';
import { participationBackend } from '@/lib/server/participation';
import {enqueueLaptopReply,deliverNextLaptopReply} from '@/lib/server/laptop-replies';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({error:'Invalid request origin.'},{status:403});
  let raw: unknown;
  try { raw=JSON.parse(new TextDecoder().decode(await boundedBody(request,16000))); }
  catch { return Response.json({error:'Please check the application details.'},{status:400}); }
  const intake=parseLaptopIntake(raw);
  if (!intake) return Response.json({error:'Please check the required application details.'},{status:400});
  const v=intake.values;
  const response=await participationBackend('submit', {
    name: (intake.kind==='student'?v.applicantName:v.name), email:v.email,
    phone:v.phone || '', inquiryType:'support', submissionSource:'endless-possibilities',
    subject:`Give a Child a Laptop — ${intake.kind==='student'?'student support request':'donor interest'}`,
    message:JSON.stringify({initiative:'give-a-child-a-laptop',version:1,...intake}),
  },null,'contact');
  if(response.status!==201)return response;
  const receipt=await response.clone().json();
  // A queue outage must not turn a successfully saved application into a false failure.
  let acknowledgmentQueued=false;
  if(typeof receipt.id==='string'){
    try {acknowledgmentQueued=await enqueueLaptopReply(receipt.id);if(acknowledgmentQueued)await deliverNextLaptopReply();}catch{/* Staff can reconcile from the saved submission. */}
  }
  return Response.json({...receipt,acknowledgmentQueued},{status:201,headers:{'Cache-Control':'no-store'}});
}
