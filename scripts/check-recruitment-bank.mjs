import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {validateRecruitmentBank} from '../lib/recruitment/bank.ts';
const path=resolve(process.argv[2]||'private-assets/recruitment-bank/bank.json');
try{const report=validateRecruitmentBank(JSON.parse(await readFile(path,'utf8')));console.log(JSON.stringify(report));if(!report.valid)process.exitCode=1;}catch{console.error('The private recruitment bank could not be read or parsed.');process.exitCode=1;}
