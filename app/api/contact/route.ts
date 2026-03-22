import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';
import { contactNotificationEmail } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, inquiryType } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

    // Insert into Supabase - using YOUR exact column names
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          subject: subject || null,
          message,
          inquiry_type: inquiryType || null,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save contact submission', details: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Contact saved successfully:', data);

    // Send email notification
    if (resend) {
      try {
        const emailContent = contactNotificationEmail({ 
          name, 
          email, 
          subject,
          message,
          inquiryType 
        });
        
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: emailContent.subject,
          html: emailContent.html,
        });
        
        console.log('✅ Notification email sent');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!', id: data.id },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}