import {handleStagingWelcome} from '@/lib/recruitment/staging-pilot';
import {sendTrainingWelcome} from '@/lib/recruitment/invitation-provider';
export const dynamic='force-dynamic';
export const maxDuration=30;
export function POST(request:Request){return handleStagingWelcome(request,process.env,mail=>sendTrainingWelcome({...process.env,TRAINING_INVITATIONS_ENABLED:'true',TRAINING_DESTINATION_READY:'true',EMAIL_DELIVERY_ENABLED:'true'},mail));}
