# Staff email sign-in setup — 23 October 2026

- User saved Resend SMTP credentials directly in Supabase. Verified in dashboard: custom SMTP enabled, host smtp.resend.com, port 465, sender name Forge Secure Sign-in, stored password hidden. No SMTP secret copied into source or chat.
- Resend auth.forgeintellitech.com verified.
- User explicitly approved administrator invitation and local redirect. Added exact allowed redirect `http://localhost:3009/admin/feedback`; existing Site URL `http://localhost:3000` unchanged.
- Supabase invitation created Auth account admin@forgeintellitech.com. Auth account visible in Users list.
- Local server started on port 3009 with preview-only school backend and STAFF_EMAIL_LOGIN_ENABLED=true. Config endpoint confirmed enabled; only publishable key exposed.
- Requested fresh passwordless sign-in from local feedback dashboard. Supabase accepted the request without error. User must open the latest sign-in email on this computer (not the earlier invitation, whose default redirect uses port 3000), or enter its code locally if supplied.
- Inbox receipt, completed sign-in and real administrator feedback read remain awaiting user interaction. Do not describe end-to-end login as verified yet.
- No Vercel deployment, production promotion, shared URL/protection changes, Zoho DNS/inbox changes or Git push.
- Local flag exists only in the running server process. Restart with the same preview-only configuration if needed; SMTP credentials remain in Supabase.
