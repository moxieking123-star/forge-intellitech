begin;
alter table forge_redesign_test.laptop_reply_outbox drop constraint laptop_reply_outbox_kind_check;
alter table forge_redesign_test.laptop_reply_outbox add constraint laptop_reply_outbox_kind_check check(kind in ('student','adult','donor','enquiry'));
create or replace function public.forge_laptop_reply_enqueue(p_submission_id uuid) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare entry forge_redesign_test.participation_submissions; reply_kind text; contact text; job uuid; doc jsonb; applicant_role text;
begin
 select * into entry from forge_redesign_test.participation_submissions where id=p_submission_id;
 if not found or entry.kind<>'contact' then raise exception 'Invalid laptop submission'; end if;
 if entry.payload->>'subject'='Give a Child a Laptop — donor interest' then reply_kind:='donor';
 elsif entry.payload->>'subject'='Give a Child a Laptop — student support request' then
  begin doc:=(entry.payload->>'message')::jsonb; exception when invalid_text_representation then doc:=null; end;
  applicant_role:=coalesce(doc->'values'->>'role',substring(entry.payload->>'message' from 'I am the: ([^\n\r]+)'));
  reply_kind:=case when applicant_role='Student' then 'student' else 'adult' end;
 elsif coalesce(entry.payload->>'subject','') !~* 'INTERNAL TEST' and coalesce(entry.payload->>'message','') ~* '\m(need|request|ask(ing)?)\M[\s\S]{0,220}\mlaptop\M' then reply_kind:='enquiry';
 else raise exception 'Not a laptop application'; end if;
 contact:=lower(trim(entry.payload->>'email'));
 if contact !~ '^[^[:space:]<>@]+@[^[:space:]<>@]+\.[^[:space:]<>@]+$' then raise exception 'Invalid contact'; end if;
 insert into forge_redesign_test.laptop_reply_outbox(submission_id,recipient,name,kind,dedupe_key)
 values(entry.id,contact,left(entry.payload->>'name',120),reply_kind,pg_catalog.md5(contact || '|' || case when reply_kind='donor' then 'donor' else 'request' end || '|v1'))
 on conflict(dedupe_key) do nothing returning id into job;
 return jsonb_build_object('queued',true,'duplicate',job is null);
end; $$;
commit;
