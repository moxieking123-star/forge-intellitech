import {trainingBridgeDestination} from './bridge-config.ts';
import {boundedBody} from '../referrals/agreement.ts';
export async function sendProvisionEnvelope(destination:string,envelope:unknown,fetcher:typeof fetch=fetch,parentSignal?:AbortSignal){
 const target=trainingBridgeDestination(destination);if(!target)throw Error('Invalid training destination');
 let url=target,method='POST';let body:string|undefined=JSON.stringify(envelope);
 // Google may finish a sheet write after the caller's previous 12s deadline.
 // Share one bounded cold-start budget across all redirects; never reset it.
 const budget=AbortSignal.timeout(30000);
 const signal=parentSignal?AbortSignal.any([parentSignal,budget]):budget;
 for(let redirects=0;redirects<=3;redirects++){
  const response=await fetcher(url,{method,headers:method==='POST'?{'Content-Type':'application/json'}:{},body,redirect:'manual',cache:'no-store',signal});
  if([301,302,303,307,308].includes(response.status)){
   const location=response.headers.get('location');if(!location)throw Error('Invalid training redirect');
   const next=new URL(location,url);
   if(next.protocol!=='https:'||next.port||next.username||next.password||!['script.google.com','script.googleusercontent.com'].includes(next.hostname))throw Error('Untrusted training redirect');
   await response.body?.cancel();
   if(response.status===303||((response.status===301||response.status===302)&&method==='POST')){method='GET';body=undefined;}
   url=next.href;continue;
  }
  if(!response.ok)throw Error('Training bridge unavailable');
  const receipt=await boundedBody(response,4096);return JSON.parse(new TextDecoder().decode(receipt));
 }
 throw Error('Too many training redirects');
}
