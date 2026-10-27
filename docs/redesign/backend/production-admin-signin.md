# Production staff sign-in and GitHub synchronization — 26 October 2026

The owner approved publishing the local redesign and then syncing the deployed version to GitHub. The exact `15e535a` source was deployed as `dpl_Chznes4Q2EiXcv96xvCPCyoivhtf` and pushed to `codex/forge-website-redesign`.

`main` also contained pre-release security changes, live feedback, a temporary job-application hold, metadata updates and a CEO LinkedIn icon. These are retained in the integration; the Jehovah design, four hero image pairs, student artwork and text-box alignment are preserved.

## Admin sign-in diagnosis

The public `/api/staff/config` returned HTTP503 because the production backend connection had not been enabled. The button was disabled, so repeated clicks did not submit an email request. Supabase confirmed the existing mailbox is verified and its staff membership is active with the admin role; no account or role was created or expanded.

Production settings now include `FORGE_PRODUCTION_BACKEND_ENABLED=true`, `SCHOOL_BACKEND_ENABLED=true`, `STAFF_EMAIL_LOGIN_ENABLED=true` and the project's enabled legacy **anonymous publishable JWT** as `FORGE_BACKEND_PUBLISHABLE_KEY`. No service-role credential was used for the staff configuration. Other feature flags and database permissions were not changed in this fix.

The exact callback `https://www.forgeintellitech.com/admin/feedback` was added to Supabase's redirect allow list. Both existing local callbacks remain. The global Site URL was left unchanged because the sign-in explicitly supplies this approved callback.

The form now explains configuration loading, readiness and unavailability. Sending disables duplicate clicks and displays an in-form status; success and failures appear next to the action rather than above the staff page header. Disabled and pressed states are visually distinct.

## Verification

All 72 Node regression tests passed. Full build, fictional browser sign-in states and staff workflow checks are recorded after completion below. The browser state test intercepts email requests and sends no real email. One controlled real sign-in request to the owner's existing mailbox will be checked after the production deployment is ready; private links/codes are never logged.

Local verification completed: the full 80-page webpack build and TypeScript passed; all 72 Node tests passed; the new sign-in browser check passed ready/sending/success/provider-error/disabled states with no real mail; private finance/enquiry/notification workflow regression and actual HTTP identity/origin-denial checks passed. The main merge preserves the approved public visuals while keeping the newer release safeguards.
