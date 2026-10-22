import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.argv[2]).href);
const base=process.argv[3]||'http://127.0.0.1:3004';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext();const page=await context.newPage();
 await page.goto(base+'/admin');
 await page.getByRole('heading',{name:'Staff sign-in',exact:true}).waitFor();
 await page.getByText('Email sign-in is awaiting secure mail configuration.',{exact:false}).waitFor();
 assert(await page.getByRole('button',{name:'Email sign-in link',exact:true}).isDisabled());
 assert.equal(await page.getByRole('heading',{name:'Review queue',exact:true}).count(),0);
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 await page.evaluate(()=>localStorage.setItem('forge-cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false})));
 await page.goto(base+'/programmes/onboard');
 await page.fill('#onboard-schoolName','Synthetic Browser Foundation School');
 await page.selectOption('#onboard-level','Primary');
 await page.fill('#onboard-location','Fictional test location');
 await page.fill('#onboard-learnerCount','25');
 await page.fill('#onboard-startPeriod','Next term');
 await page.fill('#onboard-context','Synthetic browser test, no real learners');
 await page.getByRole('button',{name:'Next',exact:true}).click();
 await page.fill('#onboard-name','Synthetic Adult Contact');
 await page.fill('#onboard-email','school-browser-smoke@invalid.example');
 await page.fill('#onboard-phone','08000000000');
 await page.fill('#onboard-role','School owner');
 await page.getByRole('button',{name:'Review answers',exact:true}).click();
 await page.locator('#onboard-consent').check();
 const result=page.waitForResponse(r=>r.url().endsWith('/api/schools/onboard')&&r.request().method()==='POST');
 await page.getByRole('button',{name:'Send onboarding request',exact:true}).click();
 const response=await result;const data=await response.json();assert.equal(response.status(),201,JSON.stringify(data));
 await page.getByRole('heading',{name:'Your onboarding request is saved.',exact:true}).waitFor();
 await page.getByText(data.id,{exact:true}).waitFor();
 await page.getByText('Email notification is pending',{exact:false}).waitFor();
 const unauth=await page.evaluate(async()=>{const res=await fetch('/api/staff/schools',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list'})});return res.status});assert.equal(unauth,401);
 console.log(JSON.stringify({passed:true,requestId:data.id,checks:['signed-out admin shows no queue','SMTP gate honest','four viewport widths','school form to Next to edge to database','saved reference shown','email pending shown','unauthenticated admin API denied']}));
}finally{await browser.close();}
