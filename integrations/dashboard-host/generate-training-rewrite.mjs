import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
export function trainingRewrite(target,config={}){
 const url=new URL(target);if(url.protocol!=='https:'||url.username||url.password||url.port||url.search||url.hash||url.pathname!=='/'||!/^[-a-z0-9]+\.vercel\.app$/.test(url.hostname))throw Error('Use the reviewed training deployment HTTPS root URL.');
 if(!config||typeof config!=='object'||Array.isArray(config)||config.routes||config.redirects?.some(rule=>rule.source?.startsWith('/instructor-training')))throw Error('Review the existing host routing before merging training.');
 if(config.rewrites&&!Array.isArray(config.rewrites))throw Error('Review the existing rewrite phases before merging training.');
 const existing=config.rewrites||[];if(existing.some(rule=>rule.source?.startsWith('/instructor-training')))throw Error('Training rewrite already exists. Review it instead of duplicating it.');
 return {...config,rewrites:[{source:'/instructor-training',destination:url.origin+'/instructor-training'},{source:'/instructor-training/:path*',destination:url.origin+'/instructor-training/:path*'},...existing]};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){
 const [target,existing]=process.argv.slice(2);console.log(JSON.stringify(trainingRewrite(target,existing?JSON.parse(fs.readFileSync(existing,'utf8')):{}),null,2));
}
