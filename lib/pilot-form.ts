import type {OfferId} from "@/data/memo-content";
export type PilotFields = {name:string;email:string;role:string;company:string;offer:string;consent:boolean};
export type PilotErrors = Partial<Record<keyof PilotFields,string>>;
export const emptyPilot: PilotFields = {name:"",email:"",role:"",company:"",offer:"",consent:false};
export function validatePilot(fields:PilotFields):PilotErrors {
  const errors:PilotErrors={};
  if(!fields.name.trim())errors.name="Enter your name.";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))errors.email="Enter a valid email address.";
  if(!["owner","accountant"].includes(fields.role))errors.role="Select your role in the pilot.";
  if(!fields.company.trim())errors.company="Enter your company or firm.";
  if(fields.offer&&!/^[1-5]$/.test(fields.offer))errors.offer="Choose one of the proposed modules.";
  if(!fields.consent)errors.consent="Confirm the email opt-in to preview your request.";
  return errors;
}
export function selectedOffer(value:string):OfferId|undefined {return /^[1-5]$/.test(value)?Number(value) as OfferId:undefined}
