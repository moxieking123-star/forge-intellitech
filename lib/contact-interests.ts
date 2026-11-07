export const contactInterests=['School partnership','Products & technology','Giving a laptop','Volunteering or partnering','Earn with Forge','LaunchPad','In-school LaunchPad','Intern with Forge','Government-school seminars','Sponsorship or patronage','Partnership or investment','Something else'] as const;
export function contactInterest(value:string|undefined){
 if(['software','all-in','bitebank','trego','dashboard'].includes(value || ''))return 'Products & technology';
 return ({referral:'Earn with Forge',laptop:'Giving a laptop',launchpad:'LaunchPad','in-school-launchpad':'In-school LaunchPad',internship:'Intern with Forge',seminars:'Government-school seminars',patron:'Sponsorship or patronage',sponsor:'Sponsorship or patronage',partnership:'Partnership or investment',volunteer:'Volunteering or partnering',school:'School partnership'} as Record<string,string>)[value || ''] || 'Something else';
}
export function contactRoute(interest:string){
 if(interest==='School partnership')return {inquiryType:'schools',submissionSource:'programmes'} as const;
 if(['Giving a laptop','Volunteering or partnering','LaunchPad','In-school LaunchPad','Intern with Forge','Government-school seminars','Sponsorship or patronage'].includes(interest))return {inquiryType:'support',submissionSource:'endless-possibilities'} as const;
 return {inquiryType:interest==='Partnership or investment'?'partnership':'general',submissionSource:'general'} as const;
}
