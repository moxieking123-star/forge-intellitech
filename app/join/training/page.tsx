import type {Metadata} from 'next';
import TrainingEntry from '@/components/recruitment/TrainingEntry';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Instructor preparation — Forge',robots:{index:false,follow:false}};
export default function Page(){
 if(process.env.TRAINING_SIGN_IN_ENABLED!=='true')return <div style={{maxWidth:800,margin:'60px auto',padding:24}}><h1>Your training space is being prepared.</h1><p>We’ll email you when your verified trainee entry is ready. For help, contact work@forgeintellitech.com.</p></div>;
 return <TrainingEntry/>;
}
