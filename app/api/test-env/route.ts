import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  return NextResponse.json({
    supabaseUrl: supabaseUrl ? '✅ Found' : '❌ Missing',
    supabaseUrlValue: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NOT SET',
    supabaseKey: supabaseKey ? '✅ Found' : '❌ Missing',
    resendKey: resendKey ? '✅ Found' : '❌ Missing',
    nodeEnv: process.env.NODE_ENV,
  });
}