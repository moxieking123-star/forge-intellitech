import {backendPublishableKey} from '../backend-runtime.ts';
export function recruitmentAuthConfig(env:Record<string,string|undefined>){
 const key=backendPublishableKey(env);
 if((env.RECRUITMENT_BACKEND_ENABLED!=='true'&&env.TRAINING_SIGN_IN_ENABLED!=='true')||!key)return null;
 return {url:env.NEXT_PUBLIC_SUPABASE_URL||'https://deblssilgleuiccsgdcy.supabase.co',key,emailLoginEnabled:env.RECRUITMENT_EMAIL_LOGIN_ENABLED==='true'};
}
