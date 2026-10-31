import {timingSafeEqual} from 'node:crypto';
export function trainingWorkerAuthorized(request:Request,secret:unknown){
 if(request.method!=='POST'||typeof secret!=='string'||!/^[a-f0-9]{64}$/i.test(secret))return false;
 const expected='Bearer '+secret,actual=request.headers.get('authorization')||'';
 const actualBytes=Buffer.from(actual),expectedBytes=Buffer.from(expected);
 return actualBytes.length===expectedBytes.length&&timingSafeEqual(actualBytes,expectedBytes);
}
