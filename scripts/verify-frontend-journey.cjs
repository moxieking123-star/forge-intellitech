// Offline rendered-markup checks. Browser interaction and visual QA are separate.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const Module = require("node:module");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const project = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(project, request.slice(2)) : request, parent, ...rest);
};
for (const extension of [".ts", ".tsx"]) {
  require.extensions[extension] = function(module, filename) {
    const source = fs.readFileSync(filename, "utf8");
    module._compile(ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText, filename);
  };
}
require.extensions[".css"]=(module)=>{module.exports={};};
async function main() {
// Phosphor's published require target is .cjs.js inside a type:module package.
// Import its real ESM exports for this standalone Node harness; Next uses ESM.
const iconNames = ["ArrowRight","ArrowLeft","CheckCircle","CaretDown","List","X","WhatsappLogo","Feather","EnvelopeSimple","PaintBrush","Code","ChartBar","Cpu","Laptop","UsersThree","GraduationCap"];
const icons = Object.assign({}, ...await Promise.all(iconNames.map(name => import(`@phosphor-icons/react/dist/csr/${name}`))));
const originalLoad = Module._load;
Module._load = function(request, parent, ...rest) {
  return request.startsWith("@phosphor-icons/react") ? icons : originalLoad.call(this, request, parent, ...rest);
};
process.env.NEXT_PUBLIC_FORGE_PREVIEW="true";
const {default:Home} = require("../components/forge/Home.tsx");
const pages = require("../components/forge/ContentPages.tsx");
const {LaptopApplication,EnquiryForm} = require("../components/forge/PreviewForms.tsx");
const render = (Component, props={}) => renderToStaticMarkup(React.createElement(Component, props));
const home = render(Home);
assert.equal((home.match(/<h1\b/g)||[]).length,1,"Homepage must have one h1");
for(const url of ["/programmes","/products","/endless-possibilities","/earn-with-forge","/endless-possibilities/give-a-child-a-laptop/request-support","/endless-possibilities/give-a-child-a-laptop/donate"])
  assert(home.includes(`href="${url}"`),`Missing homepage route ${url}`);
assert(home.includes("Find your place at Forge."),"Homepage enquiry form missing");
assert(home.indexOf('class="fg-earn"')>home.indexOf("See what we are working on."),"Referral invitation should follow stories");
assert(home.includes("We are Forge."),"Company identity must lead");
assert(!home.includes("Tom and Jerry"),"Copyrighted interactive must not return");
const ids=[...home.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,"Homepage IDs must be unique");
for(const name of ["AboutPage","ProgrammesPage","ProductsPage","MovementPage","LaptopPage","SupportPage","DonatePage","ContactPage"]){
  const html=render(pages[name]);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${name} needs one h1`);
}
for(const product of ["all-in","dashboard","bitebank","trego"]){
  assert(render(pages.ProductDetail,{id:product}).includes("Purpose &amp; current scope"),`${product} missing detail`);
}
const application=render(LaptopApplication);
assert(application.includes("Teacher")&&application.includes("Parent or guardian")&&application.includes("Student"),"All applicant roles must be present");
assert(application.includes("Nothing is sent or saved"),"Application must state preview limits");
assert(!application.includes("type=\"file\""),"Initial application must not request documents");
assert(render(EnquiryForm).includes("data-forge-form"),"Demo forms must bypass the legacy submission guard");
const formsSource=fs.readFileSync(path.join(project,"components/forge/Forms.tsx"),"utf8");
assert(!/localStorage|sessionStorage|supabase/.test(formsSource),"Preview forms must not send or persist personal details");
const imageSources=new Set();
for(const component of ["Home.tsx","ContentPages.tsx"]){
  for(const match of fs.readFileSync(path.join(project,"components/forge",component),"utf8").matchAll(/\/images\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpg)/g)) imageSources.add(match[0]);
}
for(const image of imageSources) assert(fs.existsSync(path.join(project,"public",image)),`Missing visual asset ${image}`);
console.log(`PASS: homepage identity, six audience routes, enquiry, referral position, eight destinations, four products, applicant roles, no personal-data writes, and ${imageSources.size} image assets.`);
console.log("Browser interactions, mobile layout and visual comparison are not covered by these offline checks.");
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
