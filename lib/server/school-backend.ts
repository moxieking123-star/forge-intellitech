import {backendEnvironmentEnabled,backendPublishableKey} from "@/lib/backend-runtime";
import "server-only";
import { response } from "./referrals";
export function schoolBackendEnabled() {
  return backendEnvironmentEnabled() && process.env.SCHOOL_BACKEND_ENABLED === "true";
}
export async function schoolBackend(action: string, payload: unknown, authorization?: string | null) {
  const key = backendPublishableKey();
  if (!schoolBackendEnabled() || !key) return response({error:"School services are being connected. Your request has not been sent."},503);
  if (authorization && (!authorization.startsWith("Bearer ") || authorization.length>8192)) return response({error:"Please sign in again."},401);
  try {
    const res=await fetch("https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-school-backend",{
      method:"POST",headers:{"Content-Type":"application/json",apikey:key,Authorization:`Bearer ${key}`,...(authorization?{"x-forge-user-token":authorization.slice(7)}:{})},
      body:JSON.stringify({action,payload}),cache:"no-store",signal:AbortSignal.timeout(12000),
    });
    const result=await res.json();
    return response(result,res.status);
  } catch {return response({error:"We could not confirm the request. Please try again."},503);}
}
