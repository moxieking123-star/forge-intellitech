import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ============================================
// SUPABASE CLIENT
// ============================================
// 
// We use a placeholder during build if env vars are missing.
// This prevents build failures while still working at runtime.
// 
// IMPORTANT: Make sure to add these environment variables in Vercel:
// - NEXT_PUBLIC_SUPABASE_URL
// - NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  // Normal case: environment variables are available
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Build time or missing env vars: create a placeholder client
  // This will fail gracefully at runtime if actually used
  console.warn(
    "⚠️ Supabase environment variables not found. Database features will not work."
  );
  
  // Create a dummy client that won't crash the build
  // It uses placeholder values that will fail at runtime (which is fine)
  supabase = createClient(
    "https://placeholder.supabase.co",
    "placeholder-anon-key"
  );
}

export { supabase };

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  organization?: string;
  category: string;
  message: string;
  status?: "new" | "read" | "replied" | "archived";
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  category: string;
  tags?: string[];
  cover_image?: string;
  published?: boolean;
  featured?: boolean;
  read_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LaunchPadApplication {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  schoolName: string;
  schoolLevel: string;
  parentName: string;
  parentPhone: string;
  businessCategory: string;
  businessTitle: string;
  problemStatement: string;
  solution: string;
  aiIntegration: string;
  whyJoin?: string;
  parentConsent: boolean;
  termsAccepted: boolean;
  submittedAt: string;
  created_at?: string;
}

export interface SponsorInquiry {
  id?: string;
  organizationName: string;
  organizationType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  tier: string;
  sponsorshipGoals?: string;
  termsAccepted: boolean;
  submittedAt: string;
  created_at?: string;
}