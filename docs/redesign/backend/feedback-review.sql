-- Private redesign test backend only. No grants on feedback tables change.
create or replace function public.forge_staff_feedback(p_user_id uuid,p_verified_email text,p_filters jsonb default '{}',p_export boolean default false)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare staff forge_redesign_test.staff_members%rowtype; result jsonb;
begin
 select * into staff from forge_redesign_test.staff_members
 where email=lower(p_verified_email) and active and role='admin'
 and (user_id is null or user_id=p_user_id) for update;
 if not found or p_user_id is null then return jsonb_build_object('forbidden',true);end if;
 if staff.user_id is null then update forge_redesign_test.staff_members set user_id=p_user_id where email=staff.email;end if;
 if jsonb_typeof(p_filters)<>'object' or coalesce(p_filters->>'offset','0') !~ '^\d{1,7}$'
 or length(coalesce(p_filters->>'page',''))>180 or length(coalesce(p_filters->>'section',''))>160
 or length(coalesce(p_filters->>'search',''))>120 then raise exception 'Invalid filters';end if;
 with matched as materialized (
  select id,created_at,page,section,reaction,visitor_type,comment,build
  from forge_redesign_test.preview_feedback f
  where (coalesce(p_filters->>'page','')='' or page=p_filters->>'page')
   and (coalesce(p_filters->>'section','')='' or section=p_filters->>'section')
   and (coalesce(p_filters->>'reaction','')='' or reaction=case when p_filters->>'reaction'='__empty' then '' else p_filters->>'reaction' end)
   and (coalesce(p_filters->>'visitor','')='' or visitor_type=case when p_filters->>'visitor'='__empty' then '' else p_filters->>'visitor' end)
   and (coalesce(p_filters->>'search','')='' or position(lower(p_filters->>'search') in lower(comment))>0)
 ), paged as (
  select * from matched order by created_at desc,id desc
  limit case when p_export then 5000 else 50 end
  offset case when p_export then 0 else least(coalesce((p_filters->>'offset')::integer,0),1000000) end
 )
 select jsonb_build_object('total',(select count(*) from matched),
  'items',coalesce((select jsonb_agg(to_jsonb(p) order by created_at desc,id desc) from paged p),'[]'::jsonb),
  'pages',coalesce((select jsonb_agg(page order by page) from (select distinct page from forge_redesign_test.preview_feedback) x),'[]'::jsonb),
  'sections',coalesce((select jsonb_agg(section order by section) from (select distinct section from forge_redesign_test.preview_feedback) x),'[]'::jsonb)) into result;
 return result;
end $$;
revoke all on function public.forge_staff_feedback(uuid,text,jsonb,boolean) from public,anon,authenticated;
grant execute on function public.forge_staff_feedback(uuid,text,jsonb,boolean) to service_role;
