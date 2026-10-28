import {recruitmentService} from '@/lib/server/recruitment';
import {handleRecruitmentRequest} from '@/lib/recruitment/http';
export const dynamic='force-dynamic';
function handle(request:Request){return handleRecruitmentRequest(request,{enabled:process.env.RECRUITMENT_BACKEND_ENABLED==='true',service:recruitmentService});}
export const GET=handle;
export const POST=handle;
