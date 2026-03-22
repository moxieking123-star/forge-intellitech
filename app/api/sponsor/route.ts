import { NextRequest, NextResponse } from 'next/server';
import { supabase, isDatabaseConnected } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Check database connection first
    if (!isDatabaseConnected() || !supabase) {
      console.error('Database not connected - check environment variables');
      return NextResponse.json(
        { 
          error: 'Database configuration error',
          details: 'Please check server environment variables'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Received sponsor inquiry:', body);

    const {
      companyName,
      contactName,
      email,
      phone,
      website,
      sponsorshipType,
      budgetRange,
      message
    } = body;

    // Validation
    if (!companyName || !contactName || !email) {
      return NextResponse.json(
        { error: 'Company name, contact name, and email are required' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('sponsor_inquiries')
      .insert([
        {
          company_name: companyName,
          contact_name: contactName,
          email,
          phone: phone || null,
          website: website || null,
          sponsorship_type: sponsorshipType || null,
          budget_range: budgetRange || null,
          message: message || null,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save sponsor inquiry', details: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Sponsor inquiry saved:', data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Sponsor inquiry submitted successfully!', 
        id: data.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Sponsor API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}