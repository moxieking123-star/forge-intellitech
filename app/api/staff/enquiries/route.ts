import {participationBackend,participationBackendEnabled} from '@/lib/server/participation';
import {response} from '@/lib/server/referrals';
import {sameOrigin} from '@/lib/request-origin';
import {boundedBody} from '@/lib/referrals/agreement';
import {parseParticipationReview,participationStatuses} from '@/lib/participation';
export async function POST(request:Request){
 if(!participationBackendEnabled())return response({error:'Enquiry review is not connected.'},503);
 if(!sameOrigin(request))return response({error:'Invalid request origin.'},403);
 const token=request.headers.get('authorization');if(!token?.startsWith('Bearer '))return response({error:'Staff sign-in required.'},401);
 let input;try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,8192)));}catch{return response({error:'Invalid request.'},400);}
 if(input?.action==='update'){const payload=parseParticipationReview(input.payload);return payload?participationBackend('update',payload,token):response({error:'Choose a status and provide a review note.'},400);}
 const {offset=0,status='',kind=''}=input?.payload||{};
 if(input?.action!=='list'||!Number.isSafeInteger(offset)||offset<0||offset>10000||(status&&!participationStatuses.includes(status))||(kind&&!['contact','sponsor'].includes(kind)))return response({error:'Invalid filters.'},400);
 return participationBackend('list',{offset,status,kind},token);
}
