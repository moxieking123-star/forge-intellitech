-- Additive review-only storage. No access to existing customer tables.
create table forge_redesign_test.preview_feedback (
  id uuid primary key,
  session_id uuid not null,
  page text not null check (length(page) <= 180),
  section text not null check (length(section) between 1 and 160),
  reaction text not null check (reaction in ('','Curious','Inspired','Confused','Unconvinced')),
  visitor_type text not null check (length(visitor_type) <= 60),
  comment text not null check (length(comment) <= 1200),
  build text not null check (length(build) <= 40),
  created_at timestamptz not null default now()
);
create index preview_feedback_created_idx on forge_redesign_test.preview_feedback(created_at);
create index preview_feedback_session_idx on forge_redesign_test.preview_feedback(session_id,created_at);
alter table forge_redesign_test.preview_feedback enable row level security;
revoke all on forge_redesign_test.preview_feedback from public, anon, authenticated;
grant usage on schema forge_redesign_test to service_role;
grant select,insert,delete on forge_redesign_test.preview_feedback to service_role;

create function public.forge_preview_record_feedback(p_feedback jsonb, p_build text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
begin
  -- Serialize the small review stream so concurrent requests cannot evade caps.
  perform pg_catalog.pg_advisory_xact_lock(2201022, 918);
  delete from forge_redesign_test.preview_feedback where created_at < now() - interval '90 days';
  if exists(select 1 from forge_redesign_test.preview_feedback where id=(p_feedback->>'requestId')::uuid) then
    return '{"saved":true}'::jsonb;
  end if;
  if (select count(*) from forge_redesign_test.preview_feedback where created_at > now()-interval '1 day') >= 1000
    or (select count(*) from forge_redesign_test.preview_feedback where session_id=(p_feedback->>'sessionId')::uuid and created_at > now()-interval '1 hour') >= 10 then
    return '{"limited":true}'::jsonb;
  end if;
  insert into forge_redesign_test.preview_feedback(id,session_id,page,section,reaction,visitor_type,comment,build)
  values((p_feedback->>'requestId')::uuid,(p_feedback->>'sessionId')::uuid,p_feedback->>'page',p_feedback->>'section',p_feedback->>'reaction',p_feedback->>'visitorType',p_feedback->>'comment',p_build);
  return '{"saved":true}'::jsonb;
end; $$;
revoke all on function public.forge_preview_record_feedback(jsonb,text) from public, anon, authenticated;
grant execute on function public.forge_preview_record_feedback(jsonb,text) to service_role;

-- Owner review (dashboard SQL editor only):
-- select created_at,page,section,reaction,visitor_type,comment,build
-- from forge_redesign_test.preview_feedback order by created_at desc;
-- Delete remaining feedback at the close of review (at most 90 days).
