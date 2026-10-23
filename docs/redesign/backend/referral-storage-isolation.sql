-- Restrictive scope protects this new bucket even if older permissive storage
-- policies exist. Other buckets evaluate true and keep their existing rules.
create policy forge_referral_review_bucket_isolation on storage.objects
as restrictive for all to anon,authenticated
using(bucket_id <> 'forge-referral-review-agreements')
with check(bucket_id <> 'forge-referral-review-agreements');
