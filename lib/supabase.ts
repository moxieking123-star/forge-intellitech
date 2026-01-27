import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our tables
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