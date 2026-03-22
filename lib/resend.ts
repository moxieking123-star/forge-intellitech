import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('RESEND_API_KEY not found - emails will not be sent');
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const FROM_EMAIL = 'info@forgeintellitech.com'; // Change to your verified domain later
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@forgeintellitech.com';