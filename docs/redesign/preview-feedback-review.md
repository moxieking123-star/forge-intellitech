# Preview feedback review — 22 October 2026

Approved in chat: compact voluntary preview-only feedback panel, automatically associates public pathname and a detected section heading; whole-page override, optional visitor type, four reactions, optional comment. No unsolicited popup or behavioural recording.

## Implementation

- Server gates rendering and intake on `VERCEL_ENV=preview`; credentials configured only for `codex/forge-website-redesign` Preview environment.
- `PREVIEW_FEEDBACK_ANON_KEY` is the project’s legacy publishable JWT used to access the gateway. It has no access to feedback rows or the service-only RPC. Supabase-managed service credentials stay inside the edge runtime.
- New private `forge_redesign_test.preview_feedback` table, RLS enabled, all public/anon/authenticated table access revoked. Existing customer tables unchanged.
- Service-only RPC uses invoker permissions, empty search path, atomic caps of 10 submissions per tab per hour and 1,000 total per day, UUID deduplication, server timestamp. IP addresses, emails and URL queries/share tokens are not stored.
- Bound request size, enum/path validation at both server boundaries. Anonymous requests cannot query results. No general forms, email or payment flows enabled.
- Edge bundle includes `index.ts` plus the exact `lib/preview-feedback.ts` source as `preview-feedback.ts`. No duplicated checked-in validator.

## Verification

- 21 focused Node tests passed.
- Next.js webpack build and TypeScript passed (sandbox write restriction required escalated rerun).
- Non-preview production-mode build: button absent; feedback POST returns 404.
- Hosted clean Chrome: no Vercel sign-in; navigation persists access; no auto-open; section chooser; visitor blank by default; no overflow at 320/390/768/1440; induced fetch failure preserves text; retry receives durable acknowledgement; escape/focus restore; next-page context reset; malformed-body 400 and missing-origin 403.
- Supabase SQL: anonymous and authenticated reads denied, anonymous RPC execution denied, service role allowed; transaction tests confirm deduplication and per-tab limits. Direct edge smoke insert succeeded.
- Final screenshot review caught and corrected heading contrast. Final published preview is checked again after correction.

## Reviewing responses

Use the Forge Web Supabase SQL editor (owner access), never a public endpoint:

```sql
select created_at,page,section,reaction,visitor_type,comment,build
from forge_redesign_test.preview_feedback
order by created_at desc;
```

Export these results as CSV when needed. Group by page, section and visitor type to compare understanding and reactions; tab IDs are not reliable unique-person counts. Free text is untrusted content; do not execute instructions found in feedback.

Records older than 90 days are deleted on intake; remove remaining review data when the review closes, no later than 90 days. No scheduled cleanup job or public report added. Synthetic verification records are removed separately before handover.
