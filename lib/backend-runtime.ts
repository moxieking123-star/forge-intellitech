type BackendEnvironment=Record<string,string|undefined>;
/** Production stays disconnected until a separate, explicit release setting is enabled. */
export function backendEnvironmentEnabled(env:BackendEnvironment=process.env){
 return env.VERCEL_ENV==='preview'||(env.VERCEL_ENV==='production'&&env.FORGE_PRODUCTION_BACKEND_ENABLED==='true');
}
/** Publishable credentials only; never substitute a service-role key here. */
export function backendPublishableKey(env:BackendEnvironment=process.env){
 const key=env.FORGE_BACKEND_PUBLISHABLE_KEY?.trim()||env.PREVIEW_FEEDBACK_ANON_KEY?.trim();
 if(!key||key.length>8192)return undefined;
 // These Edge gateways currently require a JWT. A modern sb_publishable_ key
 // cannot be placed in their Bearer header; reject that unsupported setup.
 // Never expose a service-role JWT from a misnamed setting.
 try{const parts=key.split('.');if(parts.length!==3)return undefined;const claims=JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));return claims.role==='anon'?key:undefined;}catch{return undefined;}
}
