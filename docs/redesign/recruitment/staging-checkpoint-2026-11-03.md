# Protected instructor staging — 3 November 2026

The owner approved the initial Production-labelled deployment required by Vercel for a new project, restricted to the separate `forge-instructor-training` project. No existing website, operations app, shared tester URL, domain or DNS configuration was changed.

The first build failed because Vercel expected `.next`; the dedicated training build produces `.next-training`. Only the separate project's output directory was corrected. Initial deployment `dpl_AAHbRCXWjXXD9d8JgdjwHKyy65Pq` then reached READY.

The actual isolated Preview is `dpl_CyoQeP18vFyyAUS46g5cuS9RjQej`, READY:

https://forge-instructor-training-h6vrmvdgy-mos-projects-33d336dd.vercel.app/instructor-training/join/training

Vercel Authentication remains enabled. An anonymous request reached the Vercel login page; authenticated CLI access to the training page returned 200. A handoff request without the proper Origin was rejected with 403. Global automation and delivery flags remain disabled; Preview uses only the existing isolated test Google bridge/workbook.

The guarded, owner-only Preview welcome test returned 200 with Resend acceptance ID `01a19f99-24e0-733f-b2e1-52e3ee5a8c61`. Its subject is `[Staging test] Your Forge instructor welcome`; recipient is fixed to the authorised owner mailbox. This is provider acceptance, not proof of inbox delivery. No real assessment invitation was claimed or requeued.

Pending: owner adds the exact Preview training URL to Supabase Auth Redirect URLs, confirms inbox arrival, then completes the real staging email sign-in and programme/profile restoration checks. Do not claim these are completed from page availability alone. Production app-host routing, production bridge activation, automatic welcomes, delivery reconciliation and deferred lesson content remain separate work.

## Owner confirmation and curriculum update

The owner confirmed welcome-email arrival and successful sign-in: both ElyTech and TechUp choices opened. This is the owner's reported result, not an agent-observed authenticated session. The older example lessons remain on the earlier immutable Preview; curriculum commit ff87b82 had only been built locally. A separate Preview update is now being prepared with the new two-week curriculum, using Webpack as validated locally. Days 2–14 server submissions and reviews remain pending; Day 1 retains its existing saved assignment.


Curriculum Preview deployment dpl_HjXneJZNyj88FPsj1kKVHEnQ82LN reached READY with Vercel Authentication enabled. Source commit: ff87b82. URL: https://forge-instructor-training-7owlnicpo-mos-projects-33d336dd.vercel.app/instructor-training/join/training . The isolated staging copy uses a Webpack build override; repository build defaults are unchanged. Supabase must allow this exact return URL before owner sign-in testing on the new deployment. Seven focused curriculum/auth-recovery tests passed again. No live or shared tester deployment was modified.
