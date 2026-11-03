// A portable visual review artifact, rendered from the actual preview components.
// This is not a replacement for the Next.js interactive application.
const fs=require("node:fs"),path=require("node:path"),Module=require("node:module"),ts=require("typescript"),React=require("react"),{renderToStaticMarkup}=require("react-dom/server");
const root=path.resolve(__dirname,"..");
const resolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,...rest){return resolve.call(this,request.startsWith("@/")?path.join(root,request.slice(2)):request,parent,...rest);};
for(const extension of [".ts",".tsx"])require.extensions[extension]=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,file);
async function main(){
 process.env.NEXT_PUBLIC_FORGE_PREVIEW="true";
 const names=["ArrowRight","ArrowLeft","CheckCircle","CaretDown","List","X","WhatsappLogo","Feather","EnvelopeSimple","PaintBrush","Code","ChartBar","Cpu","Laptop","UsersThree","GraduationCap"];
 const icons=Object.assign({},...await Promise.all(names.map(n=>import(`@phosphor-icons/react/dist/csr/${n}`))));
 let current="/";
 const assets=new Map();
 function asset(src){if(assets.has(src))return assets.get(src);const file=path.join(root,"public",src);if(!fs.existsSync(file))return src;const type=src.endsWith(".webp")?"image/webp":src.endsWith(".png")?"image/png":"image/jpeg";const data=`data:${type};base64,${fs.readFileSync(file).toString("base64")}`;assets.set(src,data);return data;}
 const load=Module._load;
 Module._load=function(request,parent,...rest){if(request.startsWith("@phosphor-icons/react"))return icons;if(request==="next/navigation")return {usePathname:()=>current};if(request==="next/image")return function Img({src,alt,fill,width,height,priority}){return React.createElement("img",{src:asset(src),alt,width:fill?undefined:width,height:fill?undefined:height,loading:priority?"eager":"lazy",style:fill?{position:"absolute",inset:0,width:"100%",height:"100%"}:undefined});};if(request==="next/link")return function Link({href,children,prefetch,replace,scroll,...props}){return React.createElement("a",{href,...props},children);};return load.call(this,request,parent,...rest);};
 const {default:Home}=require("../components/forge/Home.tsx"),{default:Shell}=require("../components/forge/Shell.tsx"),pages=require("../components/forge/ContentPages.tsx");
 const targets=[["/","index.html",Home],["/about","company.html",pages.AboutPage],["/programmes","schools.html",pages.ProgrammesPage],["/products","products.html",pages.ProductsPage],["/endless-possibilities","movement.html",pages.MovementPage],["/endless-possibilities/give-a-child-a-laptop","laptops.html",pages.LaptopPage],["/endless-possibilities/give-a-child-a-laptop/request-support","request-laptop.html",pages.SupportPage],["/endless-possibilities/give-a-child-a-laptop/donate","give-laptop.html",pages.DonatePage],["/contact","contact.html",pages.ContactPage]];
 const links=new Map(targets.map(([url,file])=>[url,file]));links.set("/programmes/enquire","contact.html");
 const font=fs.readFileSync(path.join(root,"node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2")).toString("base64");
 const css=`@font-face{font-family:'Manrope Variable';font-style:normal;font-weight:200 800;src:url(data:font/woff2;base64,${font}) format('woff2')}html{scroll-behavior:smooth}body{margin:0}button,input,select,textarea{font:inherit}button{cursor:pointer}a{color:inherit}img{max-width:100%}summary{cursor:pointer}`+fs.readFileSync(path.join(root,"components/forge/forge.css"),"utf8");
 const out=path.join(root,"preview");fs.mkdirSync(out,{recursive:true});
 for(const [url,file,Component]of targets){current=url;let markup=renderToStaticMarkup(React.createElement(Shell,null,React.createElement(Component)));markup=markup.replace(/href="([^"#?]+)([^\"]*)"/g,(all,url,suffix)=>links.has(url)?`href="${links.get(url)}${suffix}"`:all).replace('Frontend preview · Forms do not send or save details','Visual snapshot · Forms disabled · Open the Next.js preview for interactions');
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Forge — visual snapshot</title><style>${css}</style></head><body>${markup}<script>document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();alert('This is a visual snapshot. Forms and multi-step interactions are available in the Next.js frontend preview; no details were sent.')}));document.querySelectorAll('[aria-controls="forge-menu"]').forEach(b=>b.addEventListener('click',()=>document.getElementById('forge-menu').showModal()));document.querySelectorAll('[aria-label="Close navigation"]').forEach(b=>b.addEventListener('click',()=>document.getElementById('forge-menu').close()));document.querySelectorAll('[role="switch"]').forEach(b=>{b.disabled=true;b.title='Available in the interactive frontend preview'});</script></body></html>`;
 fs.writeFileSync(path.join(out,file),html);console.log(file,Buffer.byteLength(html));
 }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
