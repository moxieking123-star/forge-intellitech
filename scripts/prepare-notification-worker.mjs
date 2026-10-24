import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
for(const name of ['notification-delivery.ts','school-proposal.ts']) await writeFile(new URL(`supabase/functions/forge-notification-worker/${name}`,root),await readFile(new URL(`lib/${name}`,root),'utf8'));
console.log('Shared modules staged. No deployment or sending.');
