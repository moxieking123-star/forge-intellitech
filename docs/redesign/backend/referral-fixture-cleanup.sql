-- Exact synthetic users created for authenticated API/browser verification.
-- Storage objects must first be deleted through Storage API, not raw SQL.
begin;
delete from auth.sessions where user_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202');
delete from forge_redesign_test.school_notification_outbox where request_id in (select id from forge_redesign_test.school_onboarding_requests where submitted_by_referrer in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202') or referral_id in (select id from forge_redesign_test.school_referrals where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202')));
delete from forge_redesign_test.school_review_audit where request_id in (select id from forge_redesign_test.school_onboarding_requests where submitted_by_referrer in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202') or referral_id in (select id from forge_redesign_test.school_referrals where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202')));
delete from forge_redesign_test.school_onboarding_requests where submitted_by_referrer in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202') or referral_id in (select id from forge_redesign_test.school_referrals where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202'));
delete from forge_redesign_test.referral_statement_requests where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202');
delete from forge_redesign_test.referral_agreement_downloads where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202');
delete from forge_redesign_test.referral_agreements where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202');
delete from forge_redesign_test.referrer_payout_profiles where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202');
delete from forge_redesign_test.school_referrals where referrer_id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202');
delete from forge_redesign_test.referrer_accounts where id in ('a1010101-0101-4101-8101-010101010101','a2020202-0202-4202-8202-020202020202');
delete from auth.users where (id='a1010101-0101-4101-8101-010101010101' and email='referral-http-a@invalid.example') or (id='a2020202-0202-4202-8202-020202020202' and email='referral-http-b@invalid.example');
commit;
