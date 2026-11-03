-- Applied and verified on forge-web on 27 October 2026.
-- Retain the event trigger itself; ordinary callers have no reason to execute it.
begin;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
alter function public.update_updated_at_column() set search_path = pg_catalog;
commit;
-- Verify: both false; no function body, staff role or stored record changed.
select has_function_privilege('anon','public.rls_auto_enable()','EXECUTE') as anonymous_can_execute,
       has_function_privilege('authenticated','public.rls_auto_enable()','EXECUTE') as member_can_execute;
