import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import assert from "node:assert/strict";
const binary = process.argv[2],
  base = "http://127.0.0.1:3001";
function run(args, input) {
  let out;
  try {
    out = execFileSync(binary, ["--session", "forge-home", "--json", ...args], {
      encoding: "utf8",
      input,
      timeout: 90000,
    });
  } catch (e) {
    if (e.stdout?.includes('"success":true')) out = e.stdout;
    else throw e;
  }
  const r = JSON.parse(out);
  assert(r.success, r.error);
  return r.data;
}
const ev = (code) => {
  const r = run(["eval", "--stdin"], code);
  return typeof r.result === "string" ? JSON.parse(r.result) : r.result;
};
const routes = [
  "/earn-with-forge",
  "/earn-with-forge/onboard",
  "/programmes/onboard",
  "/programmes/resources",
  "/about",
  "/work",
  "/join",
  "/contact",
  "/programmes",
  "/blog",
  "/gallery",
  "/privacy",
  "/terms",
  "/join/apply",
  "/programmes/enquire",
  "/endless-possibilities/give-a-child-a-laptop/donate",
  "/endless-possibilities/give-a-child-a-laptop/request-support",
  "/blog/the-future-we-can-start-building",
];
mkdirSync("docs/redesign/full-site", { recursive: true });
const results = [];
run(["open", base]);
ev(
  `localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false}));true`,
);
for (const route of routes) {
  assert.equal((await fetch(base + route,{headers:{Connection:"close"}})).status, 200);
  run(["open", base + route]);
  run(["wait", "250"]);
  for (const w of [390, 1440]) {
    run(["set", "viewport", String(w), "1000"]);
    const a = ev(
      `JSON.stringify({headingColour:getComputedStyle(document.querySelector('h1')).color,width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,title:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,broken:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(h.slice(1))),images:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src),analytics:[...document.scripts].filter(s=>/googletagmanager|va.vercel|vitals.vercel/.test(s.src)).length})`,
    );
    assert(a.scroll <= w, route + " overflow " + JSON.stringify(a));
    assert.equal(a.h1, 1, route);
    assert.notEqual(a.headingColour,"rgb(240, 249, 255)",route+" legacy pale heading");
    assert.equal(a.main, 1, route);
    assert.deepEqual(a.broken, [], route);
    assert.deepEqual(a.images, [], route);
    assert.equal(a.analytics, 0, "analytics before consent");
    results.push({ route, ...a });
    if (["/about", "/programmes", "/blog", "/contact", "/work", "/earn-with-forge", "/programmes/resources", "/programmes/onboard"].includes(route))
      run(["screenshot", `docs/redesign/full-site/${route.slice(1).replaceAll("/","-")}-${w}.png`]);
  }
  console.log("PASS", route);
}
// Reachable internal destinations, checked without submitting any forms.
const targets = new Set();
for (const route of routes) {
  const html = await (await fetch(base + route,{headers:{Connection:"close"}})).text();
  for (const m of html.matchAll(/href="(\/(?!\/)[^"#?]*)/g))
    if (!m[1].startsWith("/_next") && !/\.(png|ico|woff|webp)/.test(m[1]))
      targets.add(m[1]);
}
for (const target of targets) {
  const r = await fetch(base + target,{headers:{Connection:"close"}});
  assert(r.status < 400, target + " " + r.status);
}
// Negative API checks do not write to storage.
for (const body of [
  {},
  { name: "Test", email: "invalid", message: "test" },
  { name: [], email: "a@b.test", message: "test" },
]) {
  const r = await fetch(base + "/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  assert.equal(r.status, 400);
}
// One school journey: required validation, review/back, mocked failure + mocked success.
run(["open", base + "/programmes/enquire"]);
run(["wait", "400"]);
run(["click", "button[type=submit]"]);
assert(
  ev(
    `JSON.stringify(document.querySelectorAll('[aria-invalid=true]').length>0)`,
  ),
);
function fill(id, value) {
  run(["fill", "#" + id, value]);
}
fill("school", "Preview Test School");
run(["select", "#level", "Secondary"]);
fill("location", "Lagos");
run(["click", "button[type=submit]"]);
fill("name", "Preview Reviewer");
fill("email", "preview@example.test");
fill("phone", "08012345678");
fill("role", "School lead");
fill("message", "Local preview only; not a real submission.");
run(["click", "button[type=submit]"]);
assert(
  ev(
    `JSON.stringify(document.body.innerText.includes('Review your answers.'))`,
  ),
);
run(["check", "#contactConsent"]);
ev(
  `window.__requests=[];window.fetch=async(...args)=>{window.__requests.push(JSON.parse(args[1].body));return new Response(JSON.stringify({error:'mock unavailable'}),{status:503})};true`,
);
run(["click", "button[type=submit]"]);
run(["wait", "150"]);
assert(
  ev(
    `JSON.stringify(document.body.innerText.includes('Your answers are still here'))`,
  ),
);
assert(
  ev(`JSON.stringify(document.body.innerText.includes('Preview Test School'))`),
);
ev(
  `window.fetch=async()=>new Response(JSON.stringify({success:true}),{status:201});true`,
);
run(["click", "button[type=submit]"]);
run(["wait", "150"]);
assert(
  ev(`JSON.stringify(document.body.innerText.includes('Enquiry received.'))`),
);
writeFileSync(
  "docs/redesign/full-site/browser-results.json",
  JSON.stringify(
    {
      result: "passed",
      routes: results,
      internalLinks: targets.size,
      api: "Invalid requests rejected without writes",
      form: "School journey: validation, review, retained answers on mocked 503, confirmation on mocked 201. No real submission.",
    },
    null,
    2,
  ),
);
console.log(
  "ALL PASS",
  results.length,
  "responsive checks;",
  targets.size,
  "internal links",
);
