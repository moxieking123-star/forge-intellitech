-- REVIEW ONLY. Do not apply until existing live callers have been audited and server access is ready.
-- This fixes visibility by denying public access; applying it alone may break existing live form routes.
begin;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.launchpad_applications enable row level security;
alter table public.blog_posts enable row level security;
alter table public.student_applications enable row level security;
alter table public.launchpad_submissions enable row level security;
alter table public.sponsor_inquiries enable row level security;
revoke all on public.contact_submissions,public.newsletter_subscribers,public.launchpad_applications,public.student_applications,public.launchpad_submissions,public.sponsor_inquiries from anon,authenticated;
-- Application routes must use narrowly scoped server-only access before the grants change.
-- Published blog content needs a reviewed publication-specific SELECT policy, not application access.
commit;
