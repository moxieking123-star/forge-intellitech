import {chromium} from 'file:///C:/Users/Forge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3010';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();page.setDefaultTimeout(30000);
 const id='c1010101-0101-4101-8101-010101010101';
 const row={referral_id:id,version:'draft-2026-10-22-v1',content_hash:'a'.repeat(64),signed_hash:'b'.repeat(64),downloaded_at:'2026-10-20T10:00:00Z',uploaded_at:'2026-10-21T10:00:00Z',status:'uploaded_awaiting_review',review_state:'pending',review_version:1,school_contract_signed_at:null,school_name:'Fictional Review School',location:'Lagos',code:'FRG-0123456789AB',stage:'school_requested',account_status:'active',school_id:id,school_status:'reviewing',school_version:1,contract:null,history:[]};
 let review,uploaded=false,deny=false;
 await context.addInitScript(()=>{localStorage.setItem('cookie-consent',JSON.stringify({necessary:true,analytics:false,marketing:false}));sessionStorage.setItem('forge-staff-preview',JSON.stringify({access_token:'fixture-access',refresh_token:'fixture-refresh',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,token_type:'bearer',user:{id:'b3030303-0303-4303-8303-030303030303',email:'fixture@invalid.example',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:new Date().toISOString()}}));});
 await page.route('**/api/staff/config',r=>r.fulfill({json:{url:'https://deblssilgleuiccsgdcy.supabase.co',key:'fixture',emailLoginEnabled:false}}));
 await page.route('**/auth/v1/logout*',r=>r.fulfill({status:204}));
 await page.route('**/api/staff/agreements',async r=>{
  if(deny)return r.fulfill({status:403,json:{error:'Administrator access required.'}});
  if(r.request().headers()['content-type']?.startsWith('multipart/')){uploaded=true;row.contract={id,signedOn:'2026-10-22',hash:'c'.repeat(64),recordedAt:'2026-10-23T10:00:00Z',note:'Fixture original signed contract checked.'};row.status='effective';return r.fulfill({json:{saved:true}});}
  const body=r.request().postDataJSON();
  if(body.action==='list')return r.fulfill({json:{total:1,items:[row]}});
  if(['document','contract_document'].includes(body.action))return r.fulfill({contentType:'application/pdf',headers:{'Content-Disposition':'attachment; filename="fixture.pdf"'},body:'%PDF-1.4\nfixture\n%%EOF'});
  if(body.action==='review'){review=body.payload;row.review_state=review.decision;row.review_version++;row.status='approved_awaiting_school';return r.fulfill({json:{saved:true}});}
  return r.fulfill({status:400,json:{error:'Unknown fixture action'}});
 });
 await page.goto(base+'/admin/agreements',{waitUntil:'domcontentloaded',timeout:90000});
 await page.getByRole('button',{name:/Fictional Review School/}).click();
 assert.equal(await page.getByRole('button',{name:'Save document review',exact:true}).isDisabled(),true);
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download signed referral PDF'}).click();await download;
 await page.getByLabel('Reason and evidence checked').fill('Fixture signed copy and parties checked.');
 await page.getByRole('checkbox',{name:/I checked the current document/}).check();
 await page.getByRole('button',{name:'Save document review',exact:true}).click();await page.getByText('Document review recorded with an audit entry.').waitFor();
 assert.equal(review.version,1);assert.equal(review.hash,'b'.repeat(64));assert.equal(review.reviewed,true);
 await page.getByRole('button',{name:/Fictional Review School/}).click();
 await page.getByLabel('Date the school contract was signed').fill('2026-10-22');
 await page.getByLabel('Signed school-contract PDF').setInputFiles({name:'fictional-contract.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\nfixture\n%%EOF')});
 await page.getByLabel('Signing evidence and review note').fill('Fixture original signed contract checked.');await page.getByRole('checkbox',{name:/I reviewed the contract signed/}).check();
 await page.getByRole('button',{name:'Record school-contract evidence',exact:true}).click();await page.getByText('Private school-contract evidence recorded. No teaching start or payment was triggered.').waitFor();assert.equal(uploaded,true);
 await page.getByRole('button',{name:/Fictional Review School/}).click();await page.getByText('This record is locked. It cannot be changed through early document review.').waitFor();assert.equal(await page.getByRole('button',{name:'Record school-contract evidence',exact:true}).count(),0);
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 deny=true;await page.getByRole('button',{name:'Refresh agreements'}).click();await page.getByRole('alert').filter({hasText:'Administrator access required.'}).waitFor();assert.equal(await page.getByRole('button',{name:/Fictional Review School/}).count(),0);
 await page.getByRole('button',{name:'Sign out',exact:true}).click();await page.getByRole('heading',{name:'Staff sign-in'}).waitFor();
 console.log('PASS mocked UI: PDF-gated decision, hash/version/declaration, contract upload, immutable locked state, 1440/768/390px, denial clears records, sign-out.');
 for(const [origin,token,status] of [[base,null,401],['https://untrusted.example','bad',403],[base,'bad',401]]){
  const res=await fetch(base+'/api/staff/agreements',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify({action:'list',payload:{}})});assert.equal(res.status,status);
 }
 console.log('PASS real HTTP: missing/invalid staff identities and cross-origin denied.');
}catch(error){console.error(error);process.exitCode=1;}finally{await Promise.race([browser.close(),new Promise(r=>setTimeout(r,5000))]);}
