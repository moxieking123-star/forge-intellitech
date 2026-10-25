import {backendEnvironmentEnabled} from "@/lib/backend-runtime";
// ============================================
// LAUNCHPAD APPLICATION API ROUTE
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  if(backendEnvironmentEnabled())return NextResponse.json({error:"This older endpoint is retired in the redesign. Please use the current website form."},{status:410,headers:{"Cache-Control":"no-store"}});
  try {

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Full name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Insert into database
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from('launchpad_applications')
      .insert([
        {
          full_name: body.fullName,
          email: body.email,
          phone: body.phone,
          gender: body.gender || null,
          school_name: body.schoolName || null,
          school_level: body.schoolLevel || null,
          parent_name: body.parentName || null,
          parent_phone: body.parentPhone || null,
          business_category: body.businessCategory || null,
          business_title: body.businessTitle || null,
          problem_statement: body.problemStatement || null,
          solution: body.solution || null,
          ai_integration: body.aiIntegration || null,
          why_join: body.whyJoin || null,
          parent_consent: body.parentConsent || false,
          terms_accepted: body.termsAccepted || false,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    console.log('✅ LaunchPad application submitted:', data.id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        id: data.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}