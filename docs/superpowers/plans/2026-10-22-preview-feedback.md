# Preview feedback implementation plan

User approved the unobtrusive feedback panel design in this chat. Continue on the existing redesign branch; preview deployment only.

**Goal:** collect voluntary reactions, comments, page and section context, and optional visitor type without interrupting browsing.

**Architecture:** native accessible dialog, opened only by a compact lower-left button. Discover section headings when opened, default to the most visible section, allow “whole page”. Submit only pathname (never share tokens/query strings), heading label, reaction, optional visitor type, comment, random per-tab ID, request ID and build identifier. No behavioural recording or contact details. A preview-only Next endpoint validates, bounds and forwards to a dedicated JWT-protected Supabase edge function; private test-schema storage and service-only RPC enforce atomic limits and deduplication. No activation of other backend flows.

- [ ] Add shared strict feedback validator and meaningful malformed/context/length tests.
- [ ] Add private table and service-only write RPC with atomic per-session/global caps, request deduplication and server timestamp. Verify anonymous reads/writes denied and rollback SQL fixtures.
- [ ] Add edge function using Supabase-managed service credentials; publishable JWT remains server-side in Vercel Preview env only.
- [ ] Add preview-gated endpoint and compact dialog with native focus trapping, escape/close, optional context, loading/error/retry/success states. Never report success before durable receipt.
- [ ] Build and browser-test desktop/mobile, section selection, navigation, storage acknowledgement, failed send, and production gate. Delete synthetic smoke feedback.
- [ ] Commit/push branch, verify READY exact SHA, create temporary share URL, verify fresh browser access. Production unchanged.

**Review/export:** owner retrieves private feedback through Supabase SQL, grouped by page/section/visitor/reaction, or exports CSV from the dashboard. Keep review data for 90 days; purge expired data during collection and at close of review. Do not create an anonymously readable feedback report. No automatic popup, survey prompt, WhatsApp number guessing, passive analytics, or incentives.
