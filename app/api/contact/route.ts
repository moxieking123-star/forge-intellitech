import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';
import { contactNotificationEmail } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, inquiryType, phone } = body;

    console.log('📧 Contact form received:', { name, email, subject });

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error('❌ Supabase not initialized');
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

    // Build insert object with only existing columns
    const insertData: Record<string, unknown> = {
      name,
      email,
      message,
    };

    // Add optional fields if they have values
    if (subject) insertData.subject = subject;
    if (inquiryType) insertData.inquiry_type = inquiryType;
    if (phone) insertData.phone = phone;

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save submission', details: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Contact saved:', data.id);

    // Send email notification
    if (resend) {
      console.log('📨 Sending email to:', ADMIN_EMAIL);
      console.log('📨 From:', FROM_EMAIL);
      
      try {
        const emailContent = contactNotificationEmail({ 
          name, 
          email, 
          phone,
          subject,
          message,
          inquiryType 
        });
        
        const emailResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: emailContent.subject,
          html: emailContent.html,
        });
        
        console.log('✅ Email result:', emailResult);
        
        if (emailResult.error) {
          console.error('❌ Resend error:', emailResult.error);
        }
      } catch (emailError) {
        console.error('❌ Email failed:', emailError);
      }
    } else {
      console.warn('⚠️ Resend not initialized');
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!', id: data.id },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}