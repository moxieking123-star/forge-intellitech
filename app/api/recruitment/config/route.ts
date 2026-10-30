import {recruitmentAuthConfig} from '@/lib/recruitment/auth-config';
export const dynamic='force-dynamic';
export function GET(){
 const config=recruitmentAuthConfig(process.env);
 const headers={'Cache-Control':'private, no-store'};
 if(!config)return Response.json({error:'Recruitment sign-in is not connected yet.'},{status:503,headers});
 return Response.json(config,{headers});
}
