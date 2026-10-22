import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const base='http://127.0.0.1:3001';
const sitemap=await(await fetch(base+'/sitemap.xml')).text();
const routes=[...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname).concat(['/join/apply','/programmes/enquire','/earn-with-forge/onboard','/endless-possibilities/give-a-child-a-laptop/donate','/endless-possibilities/give-a-child-a-laptop/request-support']))];
const pages=[],links=new Set(),titles=new Set(),descriptions=new Set();
for(const route of routes){
 const response=await fetch(base+route);assert.equal(response.status,200,route);
 const html=await response.text(),title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1],description=html.match(/<meta name="description" content="([^"]*)"/)?.[1],canonical=html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
 assert(title&&description&&canonical,route+' missing metadata');assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,route+' heading count');
 assert(!titles.has(title),route+' duplicate title');assert(!descriptions.has(description),route+' duplicate description');titles.add(title);descriptions.add(description);
 assert.equal(new URL(canonical).host,'forgeintellitech.com');assert.equal(new URL(canonical).pathname.replace(/\/$/,''),route.replace(/\/$/,''),route+' canonical');
 for(const match of html.matchAll(/href="([^"\s]+)"/g)){const href=match[1].replaceAll('&amp;','&');if(href.startsWith('/')&&!href.startsWith('//')&&!href.startsWith('/_next/')&&!/\.(?:css|js|png|webp|jpe?g|woff2?|svg|ico)(?:\?|$)/i.test(href))links.add(new URL(href,base).pathname);}
 pages.push({route,title,description,canonical});
}
for(const route of links){const response=await fetch(base+route,{redirect:'follow'});assert(response.ok,route+' broken internal destination '+response.status);}
writeFileSync('docs/redesign/frontend-review/seo-results.json',JSON.stringify({result:'passed',pages,checkedInternalDestinations:[...links],note:'Local rendered HTML checks; no search rankings, backlinks or indexing performance measured.'},null,2));
console.log(`PASS ${pages.length} pages: unique titles/descriptions, one H1, production canonicals; ${links.size} internal destinations healthy.`);
