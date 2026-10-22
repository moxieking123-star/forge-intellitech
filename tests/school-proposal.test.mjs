import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProposalRequest, proposalEmail } from '../lib/school-proposal.ts';
const valid={name:'School Lead',school:'Example School',email:'lead@example.test',website:'',consent:'yes'};
test('proposal request requires identity, valid email and explicit delivery consent',()=>{
  assert.deepEqual(parseProposalRequest(valid),{name:valid.name,school:valid.school,email:valid.email});
  for(const changes of [{consent:''},{website:'bot'},{email:'a@b\nBcc:x@y.test'},{name:''},{school:[]},{email:'bad'}]) assert.equal(parseProposalRequest({...valid,...changes}),null);
});
test('proposal email escapes user input and makes no newsletter subscription',()=>{
  const content=proposalEmail({name:'<script>alert(1)</script>',school:'A & B',email:'test@example.test'});
  assert(!content.html.includes('<script>')); assert(content.html.includes('A &amp; B'));
  assert(content.text.includes('31 December 2026'));assert(content.html.includes('not a newsletter subscription'));
});
