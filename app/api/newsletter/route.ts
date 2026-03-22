import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { newsletterWelcomeEmail } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection unavailable' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { message: 'You are already subscribed!' },
          { status: 200 }
        );
      } else {
        await supabase
          .from('newsletter_subscribers')
          .update({ status: 'active', unsubscribed_at: null })
          .eq('id', existing.id);

        return NextResponse.json(
          { success: true, message: 'Welcome back! Subscription reactivated.' },
          { status: 200 }
        );
      }
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, name: name || null, status: 'active', source: 'website' }])
      .select()
      .single();

    if (error) {
      console.error('Newsletter subscription error:', error);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    // Send welcome email to subscriber
    if (resend) {
      try {
        const emailContent = newsletterWelcomeEmail(email);
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: emailContent.subject,
          html: emailContent.html,
        });
        console.log('Welcome email sent to:', email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}