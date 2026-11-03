// @ts-nocheck Deno runtime; pinned SDK matches the tested installed version.
import {Resend} from 'npm:resend@6.34.1';
import {handleNotificationWebhook} from './notification-webhook.ts';
const resend=new Resend('webhook-verification-only');
Deno.serve(request=>handleNotificationWebhook(request,{
 RESEND_WEBHOOK_SECRET:Deno.env.get('RESEND_WEBHOOK_SECRET'),
 SUPABASE_URL:Deno.env.get('SUPABASE_URL'),
 SUPABASE_SERVICE_ROLE_KEY:Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
},(payload,headers,webhookSecret)=>resend.webhooks.verify({payload,headers,webhookSecret})));
