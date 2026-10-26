import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Server-only client for trusted API routes. Never import into client components. */
export const supabaseAdmin = url && serviceRoleKey
  ? createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;
