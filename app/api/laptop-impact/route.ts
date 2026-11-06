import {unstable_cache} from 'next/cache';
import {readLaptopRecords} from '@/lib/server/laptop-records';
const counts=unstable_cache(async()=> (await readLaptopRecords()).publicCounts,['forge-laptop-public-counts-v2'],{revalidate:60});
export async function GET() {
 try {return Response.json({...await counts(),checkedAt:new Date().toISOString()},{headers:{'Cache-Control':'public, max-age=30, s-maxage=60'}});}
 catch {return Response.json({error:'Current request counts are temporarily unavailable.'},{status:503,headers:{'Cache-Control':'no-store'}});}
}
