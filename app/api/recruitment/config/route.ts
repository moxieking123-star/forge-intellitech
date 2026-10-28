import {backendPublishableKey} from '@/lib/backend-runtime';
export const dynamic='force-dynamic';
export function GET(){
 const key=backendPublishableKey();
 const headers={'Cache-Control':'private, no-store'};
 if(process.env.RECRUITMENT_BACKEND_ENABLED!=='true'||!key)return Response.json({error:'Recruitment sign-in is not connected yet.'},{status:503,headers});
 return Response.json({url:process.env.NEXT_PUBLIC_SUPABASE_URL||'https://deblssilgleuiccsgdcy.supabase.co',key,emailLoginEnabled:process.env.RECRUITMENT_EMAIL_LOGIN_ENABLED==='true'},{headers});
}
