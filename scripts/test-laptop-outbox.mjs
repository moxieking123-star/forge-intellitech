import {PGlite} from '../private-assets/sql-harness/node_modules/@electric-sql/pglite/dist/index.js';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const db=new PGlite();
try {
 await db.exec(`create role anon; create role authenticated; create role service_role; create schema forge_redesign_test; create table forge_redesign_test.participation_submissions(id uuid primary key,kind text,payload jsonb);`);
 await db.exec(fs.readFileSync('supabase/migrations/20261104143000_laptop_acknowledgment_outbox.sql','utf8'));
 const id='00000000-0000-4000-8000-000000000001';
 await db.query(`insert into forge_redesign_test.participation_submissions values ($1,'contact',$2::jsonb)`,[id,JSON.stringify({name:'Fictional',email:'fictional@example.invalid',subject:'Give a Child a Laptop — student support request',submissionSource:'endless-possibilities',message:'I am the: Student\n\nStudent name: Sample'})]);
 assert.equal((await db.query('select public.forge_laptop_reply_enqueue($1) as result',[id])).rows[0].result.duplicate,false);
 assert.equal((await db.query('select public.forge_laptop_reply_enqueue($1) as result',[id])).rows[0].result.duplicate,true);
 const job=(await db.query('select public.forge_laptop_reply_claim() as result')).rows[0].result;
 assert.equal(job.kind,'student');
 assert.equal((await db.query('select public.forge_laptop_reply_claim() as result')).rows[0].result,null);
 assert.equal((await db.query('select public.forge_laptop_reply_finish($1,$2,$3,null) as result',[job.id,'00000000-0000-4000-8000-000000000099','sample-provider'])).rows[0].result,false);
 assert.equal((await db.query('select public.forge_laptop_reply_finish($1,$2,$3,null) as result',[job.id,job.lease_token,'sample-provider'])).rows[0].result,true);
 assert.equal((await db.query('select public.forge_laptop_reply_claim() as result')).rows[0].result,null);
 const acl=(await db.query(`select has_function_privilege('anon','public.forge_laptop_reply_enqueue(uuid)','EXECUTE') as anonymous,has_function_privilege('authenticated','public.forge_laptop_reply_claim()','EXECUTE') as signedin`)).rows[0];
 assert.equal(acl.anonymous,false);assert.equal(acl.signedin,false);
 console.log('PASS: outbox SQL, duplicate protection, exclusive lease, receipt ownership, accepted-send suppression, private permissions. No live writes or email.');
} finally {await db.close();}
