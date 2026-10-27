begin;
insert into auth.users(id,email,email_confirmed_at) values ('dc010101-0101-4101-8101-010101010101','delivery-admin@invalid.example',now()),('dc020202-0202-4202-8202-020202020202','delivery-outsider@invalid.example',now());
insert into forge_redesign_test.staff_members(email,user_id,role) values ('delivery-admin@invalid.example','dc010101-0101-4101-8101-010101010101','admin');
do $$ declare job uuid;res jsonb;begin
 job:=public.forge_proposal_submit('{"name":"Synthetic delivery","school":"Example test","email":"delivery@invalid.example"}');
 update forge_redesign_test.proposal_notification_outbox set status='failed',first_attempt_at=now(),attempts=6 where id=job;
 res:=public.forge_notification_staff_action('dc020202-0202-4202-8202-020202020202','delivery-outsider@invalid.example','list','{"queue":"proposal"}');if res->>'forbidden' is distinct from 'true' then raise exception 'Outsider delivery access';end if;
 res:=public.forge_notification_staff_action('dc010101-0101-4101-8101-010101010101','delivery-admin@invalid.example','retry',jsonb_build_object('queue','proposal','id',job,'note','Rollback provider review','reviewed',true));if res->>'saved' is distinct from 'true' then raise exception 'Reviewed retry failed';end if;
 if not exists(select 1 from forge_redesign_test.notification_retry_audit where job_id=job and actor_id='dc010101-0101-4101-8101-010101010101') then raise exception 'Retry audit missing';end if;
 res:=public.forge_notification_staff_action('dc010101-0101-4101-8101-010101010101','delivery-admin@invalid.example','retry',jsonb_build_object('queue','proposal','id',job,'note','Second try','reviewed',true));if res->>'locked' is distinct from 'true' then raise exception 'Repeated pending retry accepted';end if;
 if has_function_privilege('authenticated','public.forge_notification_staff_action(uuid,text,text,jsonb)','EXECUTE') or has_table_privilege('anon','forge_redesign_test.notification_retry_audit','SELECT') then raise exception 'Notification evidence public';end if;
end $$;
select 'PASS: private status, reviewed retry, duplicate retry guard, actor audit and no public access; rolled back' as outcome;
rollback;
