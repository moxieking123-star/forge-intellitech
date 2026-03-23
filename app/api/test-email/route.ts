import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';

export async function GET() {
  // Check environment variables
  const envCheck = {
    RESEND_API_KEY: process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing',
    RESEND_API_KEY_PREVIEW: process.env.RESEND_API_KEY 
      ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` 
      : 'NOT SET',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'NOT SET',
    FROM_EMAIL: FROM_EMAIL,
    ADMIN_EMAIL_USED: ADMIN_EMAIL,
    resendInitialized: resend ? '✅ Yes' : '❌ No',
  };

  // Try sending a test email
  if (resend) {
    try {
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: '🧪 Test Email from Forge Intellitech',
        html: `
          <h1>Test Email</h1>
          <p>If you receive this, email notifications are working!</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        `,
      });

      return NextResponse.json({
        ...envCheck,
        emailTest: '✅ Email sent successfully!',
        emailResult: result,
      });
    } catch (error) {
      return NextResponse.json({
        ...envCheck,
        emailTest: '❌ Email failed',
        emailError: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return NextResponse.json({
    ...envCheck,
    emailTest: '❌ Resend not initialized - check API key',
  });
}