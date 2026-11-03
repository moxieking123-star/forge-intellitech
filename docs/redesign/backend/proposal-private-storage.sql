begin;
-- Private commercial proposal. Existing buckets and their policies remain unchanged.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('forge-school-proposals','forge-school-proposals',false,8000000,array['application/pdf']);
create policy forge_school_proposal_bucket_isolation on storage.objects as restrictive for all to anon,authenticated using(bucket_id <> 'forge-school-proposals') with check(bucket_id <> 'forge-school-proposals');
commit;
