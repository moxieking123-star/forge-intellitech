import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
const schema=JSON.parse(fs.readFileSync(new URL('../integrations/apps-script/training-store-schema.json',import.meta.url)));
function fixture(){
 const sheets=Object.fromEntries(Object.entries(schema.sheets).map(([name,headers])=>[name,{rows:[headers.slice()]}]));
 sheets.Training_Config.rows.push(['SchemaVersion',schema.version],['Environment','test'],['WriteEnabled',true]);
 for(const sheet of Object.values(sheets)){
  sheet.getLastRow=()=>sheet.rows.length;
  sheet.getRange=(row,col,height=1,width=1)=>({getValues:()=>Array.from({length:height},(_,r)=>Array.from({length:width},(_,c)=>sheet.rows[row+r-1]?.[col+c-1]??'')),setValues(values){for(let r=0;r<height;r++){sheet.rows[row+r-1]??=[];for(let c=0;c<width;c++){const v=values[r][c];if(typeof v==='string'&&/^\s*[=+@-]/.test(v))throw Error('Formula injection');sheet.rows[row+r-1][col+c-1]=v;}}return this;}});
 }
 let released=0, opened=[];
 const context=vm.createContext({Date,JSON,Number,Object,Array,Error,RegExp,SpreadsheetApp:{openById:id=>{opened.push(id);return {getSheetByName:name=>sheets[name]};}},LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>released++})},Utilities:{getUuid:()=>crypto.randomUUID(),DigestAlgorithm:{SHA_256:'sha256'},computeDigest:(_,s)=>[...crypto.createHash('sha256').update(s).digest()]}});
 vm.runInContext(fs.readFileSync(new URL('../integrations/apps-script/TrainingStore.gs',import.meta.url),'utf8'),context);
 return {sheets,context,opened,released:()=>released,store:()=>context.forgeTrainingCreateStore_({enabled:true,spreadsheetId:'fictional_workbook_1234567890'})};
}
const profile={applicantId:'app-1',verifiedEmail:'person@example.invalid',displayName:'=HYPERLINK("bad")',assessmentReceiptId:'receipt-1',access:'trainee'};
test('requires explicit configuration, exact headers and an isolated enabled test store',()=>{const f=fixture();assert.throws(()=>f.context.forgeTrainingCreateStore_({enabled:true}));f.sheets.Training_Config.rows[3][1]=false;assert.throws(()=>f.store());f.sheets.Training_Config.rows[3][1]=true;f.sheets.Trainees.rows[0][0]='Wrong';assert.throws(()=>f.store());});
test('mutations require a lock and lock is released after errors',()=>{const f=fixture(),s=f.store();assert.throws(()=>s.createTrainee(profile));assert.throws(()=>s.withLock(()=>{throw Error('fixture');}));assert.equal(f.released(),1);});
test('provisions one restricted profile with literal text and rejects duplicate identity',()=>{const f=fixture(),s=f.store();s.withLock(()=>{const p=s.createTrainee(profile);assert.equal(p.access,'trainee');assert.equal(s.findTrainee('app-1').displayName,profile.displayName);assert.throws(()=>s.createTrainee(profile));});assert.equal(f.sheets.Trainees.rows.length,2);assert.equal(f.sheets.Trainees.rows[1][5],'trainee');assert.ok(!f.sheets.Trainees.rows[1][3].startsWith('='));});
test('persists event receipts and nonce hashes across adapter instances',()=>{const f=fixture(),s=f.store(),nonce='b'.repeat(48);s.withLock(()=>{s.rememberNonce(nonce,Math.floor(Date.now()/1000)+360);s.reserveEvent('event-1','a'.repeat(64));s.completeEvent('event-1','a'.repeat(64),'TRN-one');});const second=f.store();assert.equal(second.hasNonce(nonce),true);assert.equal(second.getEvent('event-1').traineeId,'TRN-one');assert.ok(!JSON.stringify(f.sheets.Training_Nonces.rows).includes(nonce));});
test('rejects conflicting events and profile role escalation',()=>{const f=fixture(),s=f.store();s.withLock(()=>{s.reserveEvent('event-1','a'.repeat(64));assert.throws(()=>s.completeEvent('event-1','b'.repeat(64),'TRN-one'));assert.throws(()=>s.createTrainee({...profile,access:'admin'}));});});
test('round trips reserved literal prefixes and refuses writes after configuration changes',()=>{const f=fixture(),s=f.store();s.withLock(()=>{const p=s.createTrainee({...profile,displayName:'~forge-text~not-json'});assert.equal(p.displayName,'~forge-text~not-json');});f.sheets.Training_Config.rows[3][1]=false;assert.throws(()=>s.withLock(()=>s.reserveEvent('later','a'.repeat(64))));assert.equal(f.released(),2);});
test('fails closed on duplicate persisted profiles',()=>{const f=fixture(),s=f.store();s.withLock(()=>s.createTrainee(profile));f.sheets.Trainees.rows.push(f.sheets.Trainees.rows[1].slice());assert.throws(()=>s.findTrainee('app-1'),/Ambiguous/);});
