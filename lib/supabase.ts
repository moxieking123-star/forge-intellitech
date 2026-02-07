import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ============================================
// FORGE INTELLITECH - SUPABASE CLIENT
// ============================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Validates that environment variables are properly configured.
 * Supabase anon keys are JWTs and always start with 'eyJ'.
 */
const isValidSupabaseConfig = (): boolean => {
  return Boolean(
    supabaseUrl?.startsWith("https://") &&
    supabaseUrl?.includes(".supabase.co") &&
    supabaseAnonKey?.startsWith("eyJ")
  );
};

/**
 * Check if Supabase is properly configured.
 * Use this before making database calls to provide better UX.
 * 
 * @example
 * if (!isSupabaseReady()) {
 *   return { error: 'Database not available' };
 * }
 */
export const isSupabaseReady = (): boolean => isValidSupabaseConfig();

/**
 * The main Supabase client instance.
 */
let supabase: SupabaseClient;

if (isValidSupabaseConfig()) {
  supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
} else {
  // Log warning only on client-side to avoid build log noise
  if (typeof window !== "undefined") {
    console.warn(
      "⚠️ Forge: Supabase not configured. Database features disabled.\n" +
      "   Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
    );
  }

  // Create placeholder client with dummy JWT structure
  supabase = createClient(
    "https://placeholder.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwbGFjZWhvbGRlciJ9.placeholder"
  );
}

export { supabase };

/**
 * Safe wrapper for Supabase queries.
 * Returns null instead of throwing if Supabase isn't configured.
 */
export async function safeQuery<T>(
  query: PromiseLike<{ data: T | null; error: Error | null }>
): Promise<{ data: T | null; error: string | null }> {
  if (!isSupabaseReady()) {
    return {
      data: null,
      error: "Database connection not available. Please try again later.",
    };
  }

  try {
    const { data, error } = await query;
    return {
      data,
      error: error?.message || null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

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

// ============================================
// DATABASE TABLE TYPES
// ============================================

export type Tables = {
  contact_messages: ContactMessage;
  blog_posts: BlogPost;
  launchpad_applications: LaunchPadApplication;
  sponsor_inquiries: SponsorInquiry;
};