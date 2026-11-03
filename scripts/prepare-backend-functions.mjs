import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
for(const name of await readdir(new URL('supabase/functions/',root))){
 let config;try{config=JSON.parse(await readFile(new URL(`supabase/functions/${name}/bundle.json`,root),'utf8'));}catch{continue;}
 for(const [output,source] of Object.entries(config.sharedSources)){const target=new URL(`supabase/functions/${name}/${output}`,root);await mkdir(new URL('.',target),{recursive:true});await writeFile(target,await readFile(new URL(source,root),'utf8'));}
}
console.log('Backend shared modules prepared; no deployment or email sent.');
