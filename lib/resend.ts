import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// AFTER domain verification, use your domain:
export const FROM_EMAIL =
  process.env.FROM_EMAIL || "Forge Intellitech <programs@forgeintellitech.com>";

// Your Zoho email
export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "info@forgeintellitech.com";
