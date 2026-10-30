import {handleTrainingHandoff} from '@/lib/recruitment/handoff-http';
import {trainingHandoff} from '@/lib/server/training-handoff';
export const dynamic='force-dynamic';
export function POST(request:Request){return handleTrainingHandoff(request,{enabled:process.env.TRAINING_SIGN_IN_ENABLED==='true',exchange:trainingHandoff});}
