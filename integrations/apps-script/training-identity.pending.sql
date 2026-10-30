-- Pending branch SQL, NOT applied. Review/test in isolation before enabling sign-in.
-- Auth.getUser must run first; p_owner comes from the verified server identity.
create function public.forge_recruitment_training_identity(p_owner uuid)
returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('ownerId',a.owner,'verifiedEmail',o.payload->>'verifiedEmail',
 'applicantId',a.id,'assessmentReceiptId',o.receipt_id,'traineeId',o.trainee_id,'status',o.status)
 from forge_recruitment.applications a
 join forge_recruitment.provisioning_outbox o on o.application_id=a.id
 join forge_recruitment.attempts t on t.id=o.receipt_id and t.application_id=a.id
 where a.owner=p_owner and a.status='passed' and t.status='passed'
 and o.status='provisioned' and o.trainee_id is not null;
$$;
revoke all on function public.forge_recruitment_training_identity(uuid) from public,anon,authenticated;
grant execute on function public.forge_recruitment_training_identity(uuid) to service_role;
