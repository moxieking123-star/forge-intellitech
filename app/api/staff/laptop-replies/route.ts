import {sameOrigin} from '@/lib/request-origin';
import {supabaseAdmin} from '@/lib/supabase-admin';
import {readLaptopRecords} from '@/lib/server/laptop-records';
import {enqueueLaptopReply,deliverNextLaptopReply} from '@/lib/server/laptop-replies';
export const maxDuration=30;
export async function POST(request:Request) {
 if(!sameOrigin(request))return Response.json({error:'Invalid origin.'},{status:403});
 const authorization=request.headers.get('authorization');
 if(!supabaseAdmin || !authorization?.startsWith('Bearer ') || authorization.length>8192)return Response.json({error:'Staff sign-in required.'},{status:401});
 try {
  const {data:identity,error}=await supabaseAdmin.auth.getUser(authorization.slice(7));
  const user=identity.user;
  if(error || !user?.email_confirmed_at || !user.email)return Response.json({error:'Staff sign-in required.'},{status:401});
  const {data:access,error:denied}=await supabaseAdmin.rpc('forge_participation_staff_action',{p_user_id:user.id,p_verified_email:user.email,p_action:'list',p_payload:{offset:0,status:'',kind:''}});
  if(denied || access?.forbidden || !Array.isArray(access?.items))return Response.json({error:'Administrator access required.'},{status:403});
  const raw=await request.text();if(raw.length>1000)return Response.json({error:'Invalid action.'},{status:400});
  const {action}=JSON.parse(raw);
  if(action==='dispatch')return Response.json(await deliverNextLaptopReply(),{headers:{'Cache-Control':'no-store'}});
  if(action==='queue-history'){
   const audit=await readLaptopRecords();let queued=0;
   for(const row of audit.records)if(await enqueueLaptopReply(row.id))queued++;
   return Response.json({queued,records:audit.records.length},{headers:{'Cache-Control':'no-store'}});
  }
  return Response.json({error:'Invalid action.'},{status:400});
 }catch {return Response.json({error:'Laptop acknowledgment action could not be completed.'},{status:503});}
}
