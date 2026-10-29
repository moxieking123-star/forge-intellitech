/** Restrict the server transport to an explicitly configured Apps Script /exec URL. */
export function trainingBridgeDestination(value:unknown):string|null{
 if(typeof value!=='string'||value.length>600)return null;
 try{const url=new URL(value);return url.protocol==='https:'&&url.hostname==='script.google.com'&&!url.port&&!url.username&&!url.password&&!url.search&&!url.hash&&/^\/macros\/s\/[a-zA-Z0-9_-]{20,300}\/exec$/.test(url.pathname)?url.href:null;}catch{return null;}
}
