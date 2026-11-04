# Give a Child a Laptop — confirmed delivery baseline

Confirmed by the founder on 4 November 2026:

| State | Laptops handed over |
| --- | ---: |
| Ogun | 1 |
| Lagos | 2 |
| **Total** | **3** |

These are historical completed handovers, not requests or donor pledges. Preserve this baseline when implementing public counters. Add future completed handovers only after staff confirmation; do not increment delivered totals when someone merely submits an application or donor offer.

The founder's earlier statement of two in Ogun was corrected by this confirmation. No recipient names or other personal information belong in the public counter.

## Implementation scope agreed

- Guided SS1–SS3 student applications and a separate adult-on-behalf journey.
- Capture location, device condition preference, learning/project motivation, existing skills, and parent awareness.
- Donor journey covering devices, financial/other support, preferred recipient location, parent-approved contact, and progress updates.
- Separate public aggregates for requests, donor interest and verified handovers, with location breakdowns that protect children’s identities.
- Acknowledgments and guidance, plus compatibility suggestions reviewed by Forge before any contact or handover.
- Historical email requests must be reviewed and deduplicated before importing; no email-derived totals have yet been verified.
- Keep current images and the existing shared tester URL. Production release is authorised once the expanded work is complete and tested.

## Build checkpoint — 4 November

Implemented locally: expanded student/adult wizard, donor questions, structured intake endpoint using the existing participation inbox, confirmed-delivery section, validation and compatibility helpers. TypeScript checks and four focused tests pass.

Supabase connector calls returned “not available” in this session. A read-only audit through the existing authorised inbox RPC and historical contact table found 18 student submissions representing 15 distinct applicants and one genuine donor. The founder confirmed that historical donor row `5e19a83e-b10c-4fed-bfdd-4f206fec18b8`, offering nine devices, was a test; it is explicitly excluded. Three repeat applications are counted once each. Connected mail search was unavailable; these figures describe saved website submissions, not every independently emailed enquiry.

Request locations: Lagos 6; Anambra 2; Abia, Akwa Ibom, Enugu, Gombe, Kaduna, Kwara and Rivers 1 each. Donor preferred location: Lagos 1. Some older forms supplied only towns, so recognised towns are mapped to their state; these are submitted locations, not verified addresses.

The public count route reads live saved submissions server-side and exposes aggregates only, cached for up to one minute. It does not expose names, contact details, schools or child stories. A failed count read is shown as unavailable, not zero.

The founder approved all three acknowledgment templates on 4 November and reported successful installation of the private queue SQL. The real batch then returned provider acceptance for all 16 acknowledgments (15 applicants, one donor); recipients and provider IDs are retained privately, not in this document. Acceptance is not proof of inbox delivery. The next production deployment is configured with `LAPTOP_AUTOREPLY_ENABLED=true`.

Queue SQL passed local database tests for deduplication, exclusive claims, receipt ownership, accepted-message suppression and private privileges. The full 207-test unit suite passed. The production build passed. Desktop route checks passed; a 4px mobile Join-page campaign overflow was found and corrected, awaiting the complete browser rerun. Production publication remains pending browser verification. Matching helper tests do not constitute an operational staff matching service.
