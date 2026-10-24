import {referralFinanceEnabled,referralFinanceRequest} from '@/lib/server/referral-finance';
import {response} from '@/lib/server/referrals';
import {sameOrigin} from '@/lib/request-origin';
import {parseFinanceAction} from '@/lib/referral-finance';
import {boundedBody} from '@/lib/referrals/agreement';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!referralFinanceEnabled())return response({error:'Referral finance is not connected yet.'},503);
 if(!sameOrigin(request))return response({error:'Invalid request origin.'},403);
 const token=request.headers.get('authorization');if(!token?.startsWith('Bearer ')||token.length>8192)return response({error:'Sign-in required.'},401);
 let input;try{input=JSON.parse(new TextDecoder().decode(await boundedBody(request,262144)));}catch{return response({error:'Invalid request.'},400);}
 const payload=parseFinanceAction(input?.action,input?.payload??{});if(!payload)return response({error:'Invalid finance request.'},400);
 return referralFinanceRequest(token,input.action,payload);
}
