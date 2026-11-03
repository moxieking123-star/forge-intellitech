begin;
do $$
declare owner_id uuid:=gen_random_uuid(); app_id uuid; attempt_id uuid; form text; got jsonb;
begin
insert into auth.users(id,email,email_confirmed_at) values(owner_id,owner_id::text||'@example.invalid',now());
insert into forge_recruitment.applications(owner,email,payload,status) values(owner_id,owner_id::text||'@example.invalid','{"consent":true,"name":"Fictional lookup pilot"}','passed') returning id into app_id;
select id into form from forge_recruitment.forms limit 1;
insert into forge_recruitment.attempts(application_id,request_id,form_id,questions,status,correct,started_at,deadline_at,completed_at)
values(app_id,gen_random_uuid(),form,'[]','passed',23,now()-interval '6 minutes',now()-interval '1 minute',now()) returning id into attempt_id;
perform set_config('role','service_role',true);
if public.forge_recruitment_training_identity(owner_id) is not null then raise exception 'Unprovisioned identity admitted'; end if;
insert into forge_recruitment.provisioning_outbox(application_id,receipt_id,payload) values(app_id,attempt_id,jsonb_build_object('eligibility','training','verifiedEmail',owner_id::text||'@example.invalid'));
if public.forge_recruitment_training_identity(owner_id) is not null then raise exception 'Pending identity admitted'; end if;
update forge_recruitment.provisioning_outbox set status='provisioned',trainee_id='TRN-fictional-lookup',provisioned_at=now() where application_id=app_id;
got:=public.forge_recruitment_training_identity(owner_id);
if got->>'traineeId'<>'TRN-fictional-lookup' or (got->>'ownerId')::uuid<>owner_id then raise exception 'Wrong identity returned'; end if;
if public.forge_recruitment_training_identity(gen_random_uuid()) is not null then raise exception 'Foreign identity leaked'; end if;
update forge_recruitment.applications set status='review_required' where id=app_id;
if public.forge_recruitment_training_identity(owner_id) is not null then raise exception 'Revoked pass admitted'; end if;
end $$;
select has_function_privilege('anon','public.forge_recruitment_training_identity(uuid)','execute') as anon_allowed,
has_function_privilege('authenticated','public.forge_recruitment_training_identity(uuid)','execute') as applicant_allowed,
has_function_privilege('service_role','public.forge_recruitment_training_identity(uuid)','execute') as backend_allowed;
rollback;
