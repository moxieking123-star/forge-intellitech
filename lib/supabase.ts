import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we're in a browser or server environment
const isBrowser = typeof window !== 'undefined';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client initialized');
} else {
  console.error('❌ Supabase environment variables missing:', {
    url: supabaseUrl ? 'Found' : 'MISSING',
    key: supabaseAnonKey ? 'Found' : 'MISSING',
  });
}

export { supabase };

// Helper to check if database is connected
export const isDatabaseConnected = (): boolean => {
  return supabase !== null;
};