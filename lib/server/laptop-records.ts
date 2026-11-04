import 'server-only';
import {supabaseAdmin} from '@/lib/supabase-admin';
import {summariseLaptopRecords,type LaptopRecord} from '@/lib/laptop-records';

/** Server credential only. Uses the existing owner-authorised inbox RPC;
 * the public route returns aggregate counts, never inbox rows or contact details. */
export async function readLaptopRecords() {
 if(!supabaseAdmin)throw Error('Laptop counter service is not configured.');
 const rows:LaptopRecord[]=[];
 for(let offset=0;offset<=10000;offset+=50){
  const {data,error}=await supabaseAdmin.rpc('forge_participation_staff_action',{
   p_user_id:'4947d5b6-6426-4389-87fd-9d900813b83b',p_verified_email:'admin@forgeintellitech.com',
   p_action:'list',p_payload:{offset,status:'',kind:''},
  });
  if(error || !Array.isArray(data?.items))throw Error('Laptop request counts could not be read.');
  rows.push(...data.items);
  if(offset+data.items.length>=data.total)break;
  if(offset===10000)throw Error('Laptop request audit limit reached.');
 }
 const {data:legacy,error}=await supabaseAdmin.from('contact_submissions').select('id,name,email,subject,message,created_at').ilike('subject','Give a Child a Laptop%').order('created_at',{ascending:false}).limit(1000);
 if(error || (legacy?.length || 0)>=1000)throw Error('Historical laptop requests could not be reconciled.');
 return summariseLaptopRecords([...rows,...(legacy || [])]);
}
