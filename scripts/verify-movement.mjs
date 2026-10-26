import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
const binary = process.argv[2];
const base = process.argv[3] || "http://127.0.0.1:3001";
assert(binary, "Pass the installed agent-browser binary");
assert(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Local preview only",
);
const evidence = [];
function run(args, input) {
  const result = JSON.parse(
    execFileSync(binary, ["--session", "forge-home", "--json", ...args], {
      encoding: "utf8",
      input,
      timeout: 90000,
    }),
  );
  assert(result.success, result.error || args[0]);
  return result.data;
}
const browser = (...args) => run(args);
function evaluate(code) {
  const data = run(["eval", "--stdin"], code);
  return typeof data.result === "string"
    ? JSON.parse(data.result)
    : data.result;
}
const route = "/endless-possibilities/give-a-child-a-laptop";
assert.equal((await fetch(base + route)).status, 200);
browser("open", base + route);
browser("wait", "700");
if (
  evaluate(
    'JSON.stringify(document.body.innerText.includes("We value your privacy"))',
  )
)
  browser("find", "role", "button", "click", "--name", "Reject All");
for (const width of [320, 390, 768, 1440]) {
  browser("set", "viewport", String(width), "1000");
  browser("wait", "200");
  const layout = evaluate(
    `JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>!document.getElementById(h.slice(1)))})`,
  );
  assert.equal(layout.width, layout.scrollWidth, `Overflow at ${width}`);
  assert.equal(layout.h1, 1);
  assert.deepEqual(layout.brokenAnchors, []);
  evidence.push({ check: "responsive movement page", ...layout });
}
browser("set", "viewport", "390", "1000");
browser("click", 'a[href="#give-device"]');
browser("wait", "1200");
assert(
  Math.abs(
    evaluate(
      'JSON.stringify(document.getElementById("give-device").getBoundingClientRect().top)',
    ),
  ) < 100,
);
evidence.push({ check: "hero donation anchor", passed: true });
for (const [label, interest, title] of [
  ["Volunteer", "volunteer", "You do not have to do everything"],
  ["Teach a skill", "educator", "What you know"],
  ["Sponsor learning", "sponsor", "Help the learning continue"],
  ["Become a patron", "patron", "Stand behind"],
  ["Partner with us", "partnership", "Bring the reach"],
  ["Give a laptop", "laptop", "A device you can spare"],
]) {
  browser("find", "role", "button", "click", "--name", label, "--exact");
  const state = evaluate(
    `JSON.stringify({selected:document.querySelectorAll('[aria-controls="contribution-detail"][aria-pressed="true"]').length,text:document.getElementById('contribution-detail').textContent,link:document.querySelector('#contribution-detail a').getAttribute('href')})`,
  );
  assert.equal(state.selected, 1);
  assert(state.text.includes(title));
  assert.equal(state.link, `/contact?interest=${interest}`);
  evidence.push({
    check: "contribution choice",
    label,
    interest,
    passed: true,
  });
}
browser("focus", 'button[aria-controls="contribution-detail"]:nth-child(2)');
browser("press", "Space");
assert(
  evaluate(
    'JSON.stringify(document.querySelector("#contribution-detail a").getAttribute("href"))',
  ).endsWith("volunteer"),
);
evidence.push({ check: "keyboard contribution choice", passed: true });
browser("click", "details:nth-of-type(2) > summary");
assert(
  evaluate(
    `JSON.stringify([...document.querySelectorAll('details[open]')].some(d=>d.textContent.includes('128 GB SSD')))`,
  ),
);
evidence.push({ check: "device FAQ", passed: true });
browser("click", 'button[aria-controls="home-menu"]');
browser("press", "Escape");
assert.equal(
  evaluate('JSON.stringify(document.activeElement.getAttribute("aria-label"))'),
  "Open navigation",
);
evidence.push({ check: "mobile navigation dismissal", passed: true });
const seo = evaluate(
  `JSON.stringify({title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,ogImage:document.querySelector('meta[property="og:image"]')?.content})`,
);
assert(seo.title.includes("Endless Possibilities"));
assert.equal(
  seo.canonical,
  "https://forgeintellitech.com/endless-possibilities/give-a-child-a-laptop",
);
assert(seo.description.includes("full year"));
evidence.push({ check: "movement metadata", ...seo });
for (const [interest, subject, type] of [
  ["student-support", "Endless Possibilities — student support enquiry", "support"],
  ["volunteer", "Endless Possibilities — volunteer enquiry", "support"],
  ["educator", "Endless Possibilities — educator enquiry", "support"],
  ["sponsor", "Endless Possibilities — sponsorship enquiry", "support"],
  ["patron", "Endless Possibilities — patron enquiry", "partnership"],
]) {
  browser("open", `${base}/contact?interest=${interest}`);
  browser("wait", "300");
  const form = evaluate(
    'JSON.stringify({subject:document.getElementById("subject").value,type:document.getElementById("inquiryType").value})',
  );
  assert.equal(form.subject, subject);
  assert.equal(form.type, type);
  evidence.push({
    check: "enquiry handoff without submission",
    interest,
    passed: true,
  });
}
browser("open", base + route);
for (const width of [1440, 390]) {
  browser("set", "viewport", String(width), "1000");
  browser("wait", "300");
  browser(
    "screenshot",
    fileURLToPath(
      new URL(
        `../docs/redesign/endless-possibilities/laptop-${width}.png`,
        import.meta.url,
      ),
    ),
    "--full",
  );
  const images = evaluate(
    "JSON.stringify([...document.images].filter(i=>!i.complete || i.naturalWidth===0).map(i=>i.src))",
  );
  assert.deepEqual(images, []);
}
browser("set", "viewport", "1440", "1000");
browser(
  "screenshot",
  fileURLToPath(
    new URL(
      "../docs/redesign/endless-possibilities/laptop-opening.png",
      import.meta.url,
    ),
  ),
);
const hub = "/endless-possibilities";
browser("open", base + hub);
const childSlugs = [
  "launchpad",
  "give-a-child-a-laptop",
  "in-school-launchpad",
  "intern-with-forge",
  "public-school-seminars",
];
for (const width of [320, 390, 768, 1440]) {
  browser("set", "viewport", String(width), "1000");
  const state = evaluate(
    `JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,links:[...document.querySelectorAll('#initiatives a')].map(a=>a.getAttribute('href'))})`,
  );
  assert.equal(state.width, state.scrollWidth);
  assert.equal(state.h1, 1);
  assert.deepEqual(
    state.links,
    childSlugs.map((slug) => `${hub}/${slug}`),
  );
  evidence.push({
    check: "movement hub layout and initiative links",
    ...state,
  });
  if ([390, 1440].includes(width))
    browser(
      "screenshot",
      fileURLToPath(
        new URL(
          `../docs/redesign/endless-possibilities/hub-${width}.png`,
          import.meta.url,
        ),
      ),
      "--full",
    );
}
browser("find", "role", "button", "click", "--name", "Give a laptop", "--exact");
assert.equal(evaluate('JSON.stringify(document.querySelector("#contribution-detail a").getAttribute("href"))'), `${hub}/give-a-child-a-laptop`);
evidence.push({check:"hub donation choice leads to initiative details",passed:true});
browser("click", `#initiatives a[href="${hub}/in-school-launchpad"]`);
assert.equal(
  evaluate("JSON.stringify(location.pathname)"),
  `${hub}/in-school-launchpad`,
);
evidence.push({ check: "hub to initiative journey", passed: true });
for (const slug of childSlugs.filter(
  (slug) => slug !== "give-a-child-a-laptop",
)) {
  const response = await fetch(base + hub + "/" + slug);
  assert.equal(response.status, 200);
  browser("open", base + hub + "/" + slug);
  for (const width of [390, 1440]) {
    browser("set", "viewport", String(width), "1000");
    const state = evaluate(
      `JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel="canonical"]')?.href,back:document.querySelector('nav[aria-label="Breadcrumb"] a')?.getAttribute('href')})`,
    );
    assert.equal(state.width, state.scrollWidth);
    assert.equal(state.h1, 1);
    assert.equal(state.canonical, `https://forgeintellitech.com${hub}/${slug}`);
    assert.equal(state.back, hub);
    evaluate(
      `JSON.stringify((document.querySelectorAll('img').forEach(i=>i.loading='eager'),true))`,
    );
    browser("wait", "400");
    browser(
      "screenshot",
      fileURLToPath(
        new URL(
          `../docs/redesign/endless-possibilities/${slug}-${width}.png`,
          import.meta.url,
        ),
      ),
      "--full",
    );
    assert.deepEqual(
      evaluate(
        "JSON.stringify([...document.images].filter(i=>!i.complete || i.naturalWidth===0).map(i=>i.src))",
      ),
      [],
    );
    evidence.push({
      check: "initiative page, navigation and images",
      slug,
      ...state,
    });
  }
}
const legacy = await fetch(base + "/launchpad");
assert(legacy.url.endsWith("/endless-possibilities/launchpad"));
assert.equal((await fetch(base + hub + "/unknown-initiative")).status, 404);
for (const [interest, type] of [
  ["launchpad", "partnership"],
  ["in-school-launchpad", "schools"],
  ["internship", "careers"],
  ["seminars", "schools"],
]) {
  browser("open", `${base}/contact?interest=${interest}`);
  browser("wait", "300");
  assert.equal(
    evaluate('JSON.stringify(document.getElementById("inquiryType").value)'),
    type,
  );
  evidence.push({
    check: "initiative enquiry prefill without submission",
    interest,
    passed: true,
  });
}
browser("open", base + hub);
browser("set", "viewport", "1440", "1000");
const errors = browser("errors");
assert.deepEqual(errors.errors, []);
const result = {
  result: "passed",
  preview: base + hub,
  evidence,
  browserErrors: errors,
};
writeFileSync(
  new URL(
    "../docs/redesign/endless-possibilities/browser-results.json",
    import.meta.url,
  ),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result, null, 2));
