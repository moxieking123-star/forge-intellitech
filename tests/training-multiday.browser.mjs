import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const base='http://localhost:3013/instructor-training';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1100},acceptDownloads:true,reducedMotion:'reduce'});
 const user={id:'00000000-0000-4000-8000-000000000001',email:'fictional@example.invalid',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString(),email_confirmed_at:new Date().toISOString()};
 await context.addInitScript(user=>sessionStorage.setItem('forge-recruitment',JSON.stringify({access_token:'fixture-access-token',refresh_token:'fixture-refresh-token',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user})),user);
 const page=await context.newPage();page.setDefaultTimeout(60000);page.on('pageerror',e=>console.log('Browser error:',e.message));page.on('requestfailed',r=>console.log('Failed request:',new URL(r.url()).pathname,r.failure()?.errorText));
 await page.route('**/api/recruitment/config',r=>r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture-anon',emailLoginEnabled:true}}));
 await page.route('**/auth/v1/user*',r=>r.fulfill({json:user}));
 await page.route('**/api/recruitment/handoff',r=>r.fulfill({json:{token:'x'.repeat(43),traineeId:'TRN-fixture',access:'trainee',expiresAt:Date.now()+3600000}}));

 let state={programme:null,completed:[],submission:null,submissions:[]},lastCommand;
 await page.route('**/api/recruitment/workspace',r=>{const p=r.request().postDataJSON();lastCommand=p;
 if(p.operation==='select')state={programme:p.programme,completed:[],submission:null,submissions:[]};
 if(p.operation==='complete')state.completed=[...new Set([...state.completed,p.lessonId])];
 if(p.operation==='submit'){const row={lessonId:p.lessonId,id:p.requestId,text:p.text,submittedAt:new Date().toISOString(),review:null};state.submissions=state.submissions.filter(x=>x.lessonId!==p.lessonId).concat(row);if(p.lessonId==='day-1'){const {lessonId,...value}=row;state.submission=value;}}
 return r.fulfill({json:state});});
 await page.goto(base+'/join/training',{waitUntil:'domcontentloaded',timeout:120000});await page.getByRole('button',{name:'Open my training entry'}).click();
 await page.getByRole('button',{name:'Choose ElyTech preparation'}).click();
 const nav=page.getByRole('navigation',{name:'Preparation days'});
 const choose=async day=>{await nav.getByRole('button').nth(day-1).click();await page.getByLabel(`Your Day ${day} assignment`,{exact:true}).waitFor();};
 await choose(2);const draft='A fictional day two build with a demonstration and independent practice.';
 await page.getByLabel('Your Day 2 assignment',{exact:true}).fill(draft);
 await choose(14);await page.getByLabel('Your Day 14 assignment',{exact:true}).fill('A fictional final portfolio with reflection and a practical learning check.');
 await choose(2);assert.equal(await page.getByLabel('Your Day 2 assignment',{exact:true}).inputValue(),draft);
 await page.getByRole('button',{name:'Mark Day 2 as practised',exact:true}).click();await page.getByText('Day 2 - Practised',{exact:true}).waitFor();assert.equal(lastCommand.lessonId,'day-2');
 await page.getByRole('button',{name:'Submit assignment',exact:true}).click();await page.getByText('Assignment received. It has not been reviewed yet.',{exact:true}).waitFor();assert.equal(lastCommand.lessonId,'day-2');assert((await nav.getByRole('button').nth(1).innerText()).includes('Awaiting review'));
 state.submissions[0].review={id:'00000000-0000-4000-8000-000000000099',status:'needs_changes',feedback:'Show the hands slowly, then let the learner try independently.',reviewedAt:new Date().toISOString()};
 await page.getByRole('button',{name:'Refresh feedback',exact:true}).click();await page.getByRole('heading',{name:'A next step from Forge.',exact:true}).waitFor();assert((await nav.getByRole('button').nth(1).innerText()).includes('Changes requested'));
 await choose(14);assert.equal(await page.getByRole('region',{name:'Staff feedback'}).count(),0);await page.getByRole('button',{name:'Submit assignment',exact:true}).click();await page.getByText('Assignment received. It has not been reviewed yet.',{exact:true}).waitFor();assert.equal(lastCommand.lessonId,'day-14');
 await page.reload();await page.getByRole('button',{name:'Open my training entry'}).click();await page.getByRole('heading',{name:'ElyTech: learn it. Explain it. Help someone build.'}).waitFor();await choose(2);assert.equal(await page.getByLabel('Your Day 2 assignment',{exact:true}).inputValue(),draft);await page.getByRole('heading',{name:'A next step from Forge.',exact:true}).waitFor();
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 console.log('Multi-day browser: draft switching, exact-day save, review isolation and reload restoration passed with fictional data.');
}finally{await browser.close();}
