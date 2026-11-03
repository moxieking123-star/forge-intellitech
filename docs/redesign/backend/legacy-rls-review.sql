-- REVIEW ONLY. Do not apply until existing live callers have been audited and server access is ready.
-- This fixes visibility by denying public access; applying it alone may break existing live form routes.
begin;
do $$begin
 if current_setting('forge.approved_release',true) is distinct from 'true' then raise exception 'Apply only during the explicitly approved website cutover';end if;
end $$;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.launchpad_applications enable row level security;
alter table public.blog_posts enable row level security;
alter table public.student_applications enable row level security;
alter table public.launchpad_submissions enable row level security;
alter table public.sponsor_inquiries enable row level security;
revoke all on public.contact_submissions,public.newsletter_subscribers,public.launchpad_applications,public.student_applications,public.launchpad_submissions,public.sponsor_inquiries,public.blog_posts from public,anon,authenticated;
do $$begin
 if to_regprocedure('public.rls_auto_enable()') is not null then execute 'revoke all on function public.rls_auto_enable() from public,anon,authenticated';end if;
end $$;
-- Application routes must use narrowly scoped server-only access before the grants change.
-- Redesigned blog content is rendered from versioned local editorial sources.
-- No ordinary-user write permission is retained merely for being signed in.
commit;
