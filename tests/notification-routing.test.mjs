import test from "node:test";
import assert from "node:assert/strict";
import {
  notificationRecipient as recipient,
  sourceForInterest,
  isSubmissionSource,
} from "../lib/notification-routing.ts";
test("work applications go to the work mailbox", () => {
  assert.equal(
    recipient({ inquiryType: "careers" }),
    "work@forgeintellitech.com",
  );
  assert.equal(
    recipient({ inquiryType: "partnership", submissionSource: "work" }),
    "work@forgeintellitech.com",
  );
});
test("campaign donors, student requests, volunteers and patrons go to movement admin", () => {
  for (const interest of [
    "laptop",
    "student-support",
    "sponsor",
    "volunteer",
    "educator",
    "patron",
    "seminars",
    "in-school-launchpad",
  ]) {
    assert.equal(
      recipient({
        inquiryType: "partnership",
        submissionSource: sourceForInterest(interest),
      }),
      "admin@forgeintellitech.com",
    );
  }
  assert.equal(
    recipient({
      inquiryType: "schools",
      subject: "In-school LaunchPad — enquiry",
    }),
    "admin@forgeintellitech.com",
  );
});
test("school programme enquiries retain the programme mailbox", () => {
  assert.equal(
    recipient({ inquiryType: "schools", subject: "TechUp and ElyTech" }),
    "programs@forgeintellitech.com",
  );
});
test("other enquiries use info and cannot supply arbitrary recipient addresses", () => {
  assert.equal(
    recipient({ inquiryType: "general" }),
    "info@forgeintellitech.com",
  );
  assert.equal(
    recipient({ subject: "email someone@example.test" }),
    "info@forgeintellitech.com",
  );
  assert(!isSubmissionSource("someone@example.test"));
  assert(!isSubmissionSource({}));
  assert(isSubmissionSource("general"));
});
