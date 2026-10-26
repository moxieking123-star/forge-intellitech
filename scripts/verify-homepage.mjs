import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const binary = process.argv[2];
const base = process.argv[3] || "http://127.0.0.1:3001";
assert(
  binary,
  "Pass the installed agent-browser binary as the first argument.",
);
assert(
  ["127.0.0.1", "localhost"].includes(new URL(base).hostname),
  "Run these checks against a local preview only.",
);
const evidence = [];
function browser(...args) {
  const output = execFileSync(
    binary,
    ["--session", "forge-home", "--json", ...args],
    { encoding: "utf8", timeout: 90000 },
  );
  const result = JSON.parse(output);
  assert(result.success, result.error || `Browser command failed: ${args[0]}`);
  return result.data;
}
function evaluate(code) {
  const output = execFileSync(
    binary,
    ["--session", "forge-home", "--json", "eval", "--stdin"],
    { encoding: "utf8", input: code, timeout: 45000 },
  );
  const result = JSON.parse(output);
  assert(result.success, result.error || "Browser evaluation failed");
  return typeof result.data.result === "string"
    ? JSON.parse(result.data.result)
    : result.data.result;
}
const layoutScript = readFileSync(
  new URL("../docs/redesign/verification/check-layout.js", import.meta.url),
  "utf8",
);
browser("open", base);
browser("wait", "1000");
if (
  evaluate(
    'JSON.stringify(document.body.innerText.includes("We value your privacy"))',
  )
)
  browser("find", "role", "button", "click", "--name", "Reject All");

for (const width of [320, 390, 768, 1440]) {
  browser("set", "viewport", String(width), "1000");
  browser("wait", "500");
  const layout = evaluate(layoutScript);
  assert.equal(layout.overflow, false, `Horizontal overflow at ${width}px`);
  assert.equal(layout.h1Count, 1);
  assert.deepEqual(layout.brokenAnchors, []);
  evidence.push({ check: "responsive layout", ...layout });
}

browser("set", "viewport", "390", "1000");
browser("click", 'button[aria-controls="home-menu"]');
browser("wait", "150");
let layout = evaluate(layoutScript);
assert(layout.menuOpen && layout.bodyScrollLocked);
assert.equal(layout.focusedControl, "Close navigation");
browser("press", "Escape");
browser("wait", "150");
layout = evaluate(layoutScript);
assert(!layout.menuOpen && !layout.bodyScrollLocked);
assert.equal(layout.focusedControl, "Open navigation");
evidence.push({ check: "menu Escape and focus restoration", passed: true });

browser("click", 'button[aria-controls="home-menu"]');
browser("click", 'dialog a[href="/endless-possibilities"]');
browser("wait", "800");
const anchor = evaluate(
  'JSON.stringify({open:!!document.querySelector("dialog[open]"),path:location.pathname})',
);
assert(!anchor.open && anchor.path === "/endless-possibilities");
evidence.push({ check: "mobile movement navigation", ...anchor });

browser("open", base);
browser("click", 'details[class*="movementDetails"] > summary');
browser("wait", "1000");
assert(
  evaluate(
    'JSON.stringify(document.getElementById("movement-details").closest("details").open)',
  ),
);
evidence.push({ check: "movement explanation disclosure", passed: true });
browser("click", "#stories article:first-of-type summary");
browser("wait", "800");
if (
  evaluate(
    'JSON.stringify(document.querySelectorAll("#stories details[open]").length)',
  ) === 0
) {
  browser("click", "#stories article:first-of-type summary");
  browser("wait", "200");
}
assert.equal(
  evaluate(
    'JSON.stringify(document.querySelectorAll("#stories details[open]").length)',
  ),
  1,
);
evidence.push({ check: "case story expansion", passed: true });

for (const [name, status] of [
  ["BiteBank", "In development"],
  ["Forge TechUp Dashboard", "Testing"],
  ["Trego", "In development"],
  ["Forge All-In", "In development"],
]) {
  browser("find", "role", "button", "click", "--name", name, "--exact");
  browser("wait", "150");
  const product = evaluate(
    'JSON.stringify({name:document.getElementById("product-title").textContent,text:document.querySelector("#products dialog[open]").textContent,focused:document.activeElement.getAttribute("aria-label")})',
  );
  assert.equal(product.name, name);
  assert(product.text.includes(status));
  assert.equal(product.focused, "Close product details");
  browser("press", "Escape");
  assert.equal(
    evaluate(
      "JSON.stringify(document.activeElement.getAttribute('aria-label') || document.activeElement.textContent.trim())",
    ),
    name,
  );
  evidence.push({
    check: "product status and keyboard dismissal",
    name,
    status,
    passed: true,
  });
}

browser("open", `${base}/contact?interest=laptop`);
browser("wait", "500");
const donor = evaluate(
  'JSON.stringify({subject:document.getElementById("subject").value,type:document.getElementById("inquiryType").value})',
);
assert.equal(donor.subject, "Give a Child a Laptop — donor interest");
assert.equal(donor.type, "support");
evidence.push({ check: "donor handoff without submission", ...donor });
browser("open", `${base}/contact?interest=partnership`);
browser("wait", "300");
assert.equal(
  evaluate('JSON.stringify(document.getElementById("inquiryType").value)'),
  "partnership",
);
evidence.push({
  check: "partnership handoff without submission",
  passed: true,
});

for (const route of ["/programmes", "/techup", "/join", "/launchpad"]) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, route);
  evidence.push({
    check: "existing destination",
    route,
    status: response.status,
  });
}
browser("open", `${base}/programmes`);
for (const width of [390, 1440]) {
  browser("set", "viewport", String(width), "1000");
  const programmeLayout = evaluate(layoutScript);
  assert.equal(programmeLayout.overflow, false);
  assert.equal(programmeLayout.h1Count, 1);
  assert.deepEqual(programmeLayout.brokenAnchors, []);
  assert(
    evaluate(
      'JSON.stringify(document.body.textContent.includes("For primary schools") && document.body.textContent.includes("For secondary schools"))',
    ),
  );
  browser(
    "screenshot",
    fileURLToPath(
      new URL(
        `../docs/redesign/editorial/programmes-${width}.png`,
        import.meta.url,
      ),
    ),
    "--full",
  );
  evidence.push({
    check: "school programmes responsive layout",
    ...programmeLayout,
  });
}
browser("open", `${base}/contact?interest=schools`);
browser("wait", "400");
assert.equal(
  evaluate('JSON.stringify(document.getElementById("inquiryType").value)'),
  "schools",
);
evidence.push({
  check: "school enquiry prefill without submission",
  passed: true,
});
browser("open", base);
const seo = evaluate(
  `JSON.stringify({title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,socialImage:document.querySelector('meta[property="og:image"]')?.content,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)["@type"])})`,
);
assert(seo.title.includes("Forge Intellitech"));
assert(seo.description.includes("Endless Possibilities"));
assert.equal(new URL(seo.canonical).href, "https://forgeintellitech.com/");
assert(seo.socialImage.endsWith("/images/home/studio-beginning.webp"));
assert(seo.schemas.includes("Organization"));
evidence.push({ check: "rendered homepage SEO", ...seo });
browser("set", "viewport", "1054", "1492");
browser(
  "screenshot",
  fileURLToPath(
    new URL(
      "../docs/redesign/editorial/desktop-reference-width.png",
      import.meta.url,
    ),
  ),
  "--full",
);
browser("set", "viewport", "1440", "1000");
browser("wait", "500");
browser(
  "screenshot",
  fileURLToPath(
    new URL("../docs/redesign/verification/desktop-final.png", import.meta.url),
  ),
  "--full",
);
browser("set", "viewport", "390", "1000");
browser(
  "screenshot",
  fileURLToPath(
    new URL("../docs/redesign/verification/mobile-final.png", import.meta.url),
  ),
  "--full",
);
browser(
  "screenshot",
  fileURLToPath(
    new URL(
      "../docs/redesign/verification/mobile-opening-final.png",
      import.meta.url,
    ),
  ),
);
const finalLayout = evaluate(layoutScript);
assert.deepEqual(finalLayout.missingImages, []);
evidence.push({ check: "final loaded image set", ...finalLayout });
const result = {
  result: "passed",
  preview: base,
  evidence,
  browserErrors: browser("errors"),
};
writeFileSync(
  new URL(
    "../docs/redesign/verification/browser-results.json",
    import.meta.url,
  ),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result, null, 2));
