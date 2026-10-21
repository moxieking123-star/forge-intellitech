import { stories } from "../lib/stories.ts";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
const binary = process.argv[2],
  base = "http://127.0.0.1:3001";
const routes = [
  "/",
  "/about",
  "/work",
  "/join",
  "/contact",
  "/privacy",
  "/terms",
  "/earn-with-forge",
  "/earn-with-forge/onboard",
  "/programmes",
  "/programmes/enquire",
  "/programmes/onboard",
  "/programmes/resources",
  "/join/apply",
  "/endless-possibilities",
  "/endless-possibilities/give-a-child-a-laptop",
  "/endless-possibilities/give-a-child-a-laptop/donate",
  "/endless-possibilities/give-a-child-a-laptop/request-support",
  "/endless-possibilities/launchpad",
  "/endless-possibilities/in-school-launchpad",
  "/endless-possibilities/intern-with-forge",
  "/endless-possibilities/public-school-seminars",
  "/gallery",
  "/blog",
  ...stories.map((s) => "/blog/" + s.slug),
];
function b(args, input) {
 let output;
 try { output=execFileSync(binary,["--session","forge-home","--json",...args],{encoding:"utf8",input,timeout:45000}); }
 catch(error){if(error.stdout?.includes('"success":true'))output=error.stdout;else throw error;}
 const result=JSON.parse(output);assert(result.success,result.error);return result.data;
}

function ev(s) {
  const r = b(["eval", "--stdin"], s);
  return typeof r.result === "string" ? JSON.parse(r.result) : r.result;
}
const seen = new Map(),
  evidence = [];
for (const route of routes) {
  b(["open", base + route]);
  b(["wait", "300"]);
  for (const w of [390, 1440]) {
    b(["set", "viewport", String(w), "1000"]);
    const r = ev(
      `JSON.stringify({width:innerWidth,scroll:document.documentElement.scrollWidth,sources:[...document.querySelectorAll('main img')].map(i=>{const u=new URL(i.getAttribute('src'),location.href);return u.searchParams.get('url')||u.pathname}).filter(s=>!s.includes('/brand/')&&!s.includes('/products/')),bad:[...document.querySelectorAll('main img')].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)})`,
    );
    assert(r.scroll <= w, route + " overflow");
    assert.deepEqual(r.bad, [], route);
    assert(r.sources.length > 0, route + " has no editorial image");
    if (w === 1440) {
      for (const src of r.sources) {
        assert(
          !seen.has(src),
          `${src} repeated on ${seen.get(src)} and ${route}`,
        );
        seen.set(src, route);
      }
    }
    evidence.push({ route, ...r });
    if (
      [
        "/about",
        "/programmes",
        "/endless-possibilities/give-a-child-a-laptop",
      ].includes(route)
    )
      b([
        "screenshot",
        `docs/redesign/imagery/${route.slice(1).replaceAll("/", "-")}-${w}.png`,
      ]);
  }
  console.log("PASS", route);
}
writeFileSync(
  "docs/redesign/imagery/browser-results.json",
  JSON.stringify(
    { result: "passed", editorialImages: seen.size, checks: evidence },
    null,
    2,
  ),
);
console.log("PASS unique editorial images:", seen.size);
