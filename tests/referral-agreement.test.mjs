import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validatePayoutProfile, maskAccountNumber, validateSignedPdf, fifthWorkingDay, boundedBody } from "../lib/referrals/agreement.ts";
test("payment profile rejects non-Nigerian-length and nonnumeric accounts",()=>{
 const valid={bankName:"Example Bank",accountName:"Example Referrer",accountNumber:"0123456789"};
 assert.deepEqual(validatePayoutProfile(valid),{bank_name:"Example Bank",account_name:"Example Referrer",account_number:"0123456789"});
 for(const accountNumber of ["123456789","01234567890","01234abc89",1234567890])assert.equal(validatePayoutProfile({...valid,accountNumber}),null);
 assert.equal(maskAccountNumber("0123456789"),"••••••6789");
});
test("plain PDF header, EOF, size and known active-content rejection",()=>{
 const bytes=s=>new TextEncoder().encode(s);
 assert(validateSignedPdf(bytes("%PDF-1.7\nplain\n%%EOF")));
 for(const content of ["plain","%PDF-1.7\n/JavaScript\n%%EOF","%PDF-1.7\n/EmbeddedFile\n%%EOF","%PDF-1.7\n/J#53\n%%EOF","%PDF-1.7\n/Launch\n%%EOF","%PDF-1.7\n/ObjStm\n%%EOF","%PDF-1.7\n/URI\n%%EOF"])assert.equal(validateSignedPdf(bytes(content)),false);
 assert.equal(validateSignedPdf(new Uint8Array(5*1024*1024+1)),false);
});
test("five working days skips weekends and reviewed public holidays",()=>{
 assert.equal(fifthWorkingDay("2026-10-23",["2026-10-26"],"2026-11-02"),"2026-11-02");
});
test("downloaded agreement font streams pass while escaped action names remain rejected",()=>{
 assert(validateSignedPdf(readFileSync(new URL('../public/downloads/forge-referral-agreement-draft.pdf',import.meta.url))));
 assert.equal(validateSignedPdf(new TextEncoder().encode('%PDF-1.7\n/Java#53cript\n%%EOF')),false);
});
test("unknown holiday coverage fails closed and invalid dates reject",()=>{
 assert.throws(()=>fifthWorkingDay("2026-10-23",[],"2026-10-25"));
 assert.throws(()=>fifthWorkingDay("2026-02-30",[],"2026-12-31"));
});
test("body limit applies to streamed bytes even without a content-length",async()=>{
 const request=new Request("https://example.test",{method:"POST",body:"12345"});
 await assert.rejects(()=>boundedBody(request,4));
 assert.equal(new TextDecoder().decode(await boundedBody(new Request("https://example.test",{method:"POST",body:"1234"}),4)),"1234");
});
