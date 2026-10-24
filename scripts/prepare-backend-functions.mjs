import {readFile,writeFile,readdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
for(const name of await readdir(new URL('supabase/functions/',root))){
 let config;try{config=JSON.parse(await readFile(new URL(`supabase/functions/${name}/bundle.json`,root),'utf8'));}catch{continue;}
 for(const [output,source] of Object.entries(config.sharedSources))await writeFile(new URL(`supabase/functions/${name}/${output}`,root),await readFile(new URL(source,root),'utf8'));
}
console.log('Backend shared modules prepared; no deployment or email sent.');
