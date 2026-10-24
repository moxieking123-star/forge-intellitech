import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {readFileSync} from 'node:fs';
const b=await chromium.launch({channel:'chrome',headless:true});try{const p=await b.newPage({viewport:{width:800,height:1100},reducedMotion:'reduce'});await p.setContent(readFileSync('docs/redesign/story/cartoon-scenes.html','utf8'));await p.screenshot({path:'docs/redesign/story/cartoon-scenes.png',fullPage:true});console.log('Eight-scene storyboard captured.');}finally{await b.close();}
