import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Type for our database tables
export type FormSubmission = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string | null
  form_type: string
  status: string
  notes: string | null
  created_at: string
  updated_at: string
}

// Create Supabase client for server-side use
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createSupabaseClient(supabaseUrl, supabaseKey)
}