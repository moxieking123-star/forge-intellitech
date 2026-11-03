import {schoolBackend,schoolBackendEnabled} from '@/lib/server/school-backend';
import {response} from '@/lib/server/referrals';
import {sameOrigin} from '@/lib/request-origin';
import {boundedBody} from '@/lib/referrals/agreement';
import {parseReviewFilters,feedbackCsv,type ReviewRow} from '@/lib/feedback-review';
export async function POST(request:Request){
 if(!schoolBackendEnabled())return response({error:'Staff review is not connected yet.'},503);
 if(!sameOrigin(request))return response({error:'Invalid request origin.'},403);
 const token=request.headers.get('authorization');
 if(!token?.startsWith('Bearer '))return response({error:'Staff sign-in required.'},401);
 let input;try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,4096)));}catch{return response({error:'Invalid request.'},400);}
 const filters=parseReviewFilters(input?.filters);
 if(!filters||!['list','export'].includes(input?.action))return response({error:'Invalid filters.'},400);
 const result=await schoolBackend('feedback_'+input.action,filters,token);
 if(!result.ok||input.action==='list')return result;
 const data=await result.json() as {items:ReviewRow[];total:number};
 if(data.total>5000)return response({error:'More than 5,000 reviews match. Narrow the filters before exporting.'},422);
 return new Response(feedbackCsv(data.items),{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="forge-feedback.csv"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
}
