/** A separate build can live below the existing operations app without taking its root. */
export function trainingBasePath(value=process.env.NEXT_PUBLIC_TRAINING_BASE_PATH||''){
 if(value!==''&&value!=='/instructor-training')throw Error('Invalid training base path');return value;
}
export function trainingPath(path:string){if(!path.startsWith('/')||path.startsWith('//')||/[?#\\]/.test(path))throw Error('Invalid training path');return trainingBasePath()+path;}
export const trainingDashboardUrl='https://app.forgeintellitech.com/instructor-training/join/training';
