# Protected preview sign-in check — 4 November 2026

Investigated the reported sign-in failure without changing deployments or shared/live settings.

- Current protected Preview recruitment config returned HTTP 200, correct Supabase project, publishable key present, email sign-in enabled.
- Supabase auth logs show Login at 10:19:34 UTC, then a reused/expired one-time-token failure at 10:20:34 UTC. This identifies the failed verification, but does not prove which browser retained the successful session.
- No training handoff request was found on the current Preview within the inspected two-hour window. The reported attempt did not reach that endpoint on this hostname.
- Sent one authorised fresh owner sign-in email with the current exact Preview return URL. Supabase accepted the request. Delivery/read and successful owner browser sign-in remain unconfirmed.
- Asked the owner for the visible result only; never requested email tokens or codes.
- Six focused callback-recovery and staff-authorisation tests passed.

Original shared tester URL and live site unchanged. No code fix is claimed for an unobserved browser failure.

Deployed Preview round-trip passed using a temporary isolated test session: Day 3 submission through the Preview API, repeated request deduplication, test feedback signed to the isolated Google bridge, then the same feedback read back through the Preview API. HTTP 200. This verifies the deployed trainee path and Google feedback persistence; it does not substitute for the owner's authenticated staff-browser acceptance. Temporary credential config and raw response file were cleared.

